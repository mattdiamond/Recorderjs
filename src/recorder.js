"use strict";
window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var Recorder = function( config ){

  if ( !Recorder.isRecordingSupported() ) {
    throw "Recording is not supported in this browser";
  }

  this.config = config = config || {};
  this.config.command = "init";
  this.config.bufferLength = config.bufferLength || 4096;
  this.config.monitorGain = config.monitorGain || 0;
  this.config.numberOfChannels = config.numberOfChannels || 1;
  this.config.originalSampleRate = this.audioContext.sampleRate;
  this.config.encoderSampleRate = config.encoderSampleRate || 48000;
  this.config.encoderPath = config.encoderPath || 'oggopusEncoder.js';
  this.config.streamPages = config.streamPages || false;
  this.config.leaveStreamOpen = config.leaveStreamOpen || false;
  this.config.maxBuffersPerPage = config.maxBuffersPerPage || 40;
  this.config.encoderApplication = config.encoderApplication || 2049;
  this.config.encoderFrameSize = config.encoderFrameSize || 20;
  this.config.streamOptions = config.streamOptions || {
    optional: [],
    mandatory: {
      googEchoCancellation: false,
      googAutoGainControl: false,
      googNoiseSuppression: false,
      googHighpassFilter: false
    }
  };

  this.state = "inactive";
  this.eventTarget = document.createDocumentFragment();
  this.createAudioNodes();
};

Recorder.isRecordingSupported = function(){
  return window.AudioContext && navigator.getUserMedia;
};

Recorder.prototype.addEventListener = function( type, listener, useCapture ){
  this.eventTarget.addEventListener( type, listener, useCapture );
};

Recorder.prototype.audioContext = new window.AudioContext();

Recorder.prototype.clearStream = function() {
  if ( this.stream ) {
    this.stream.getTracks().forEach(function ( track ) {
      track.stop();
    });
    delete this.stream;
  }
};

Recorder.prototype.createAudioNodes = function(){
  var that = this;
  this.scriptProcessorNode = this.audioContext.createScriptProcessor( this.config.bufferLength, this.config.numberOfChannels, this.config.numberOfChannels );
  this.scriptProcessorNode.onaudioprocess = function( e ){
    that.encodeBuffers( e.inputBuffer );
  };

  this.monitorNode = this.audioContext.createGain();
  this.setMonitorGain( this.config.monitorGain );

  if ( this.config.sampleRate < this.audioContext.sampleRate ) {
    this.createButterworthFilter();
  }
};

Recorder.prototype.createButterworthFilter = function(){
  this.filterNode = this.audioContext.createBiquadFilter();
  this.filterNode2 = this.audioContext.createBiquadFilter();
  this.filterNode3 = this.audioContext.createBiquadFilter();
  this.filterNode.type = this.filterNode2.type = this.filterNode3.type = "lowpass";

  var nyquistFreq = this.config.sampleRate / 2;
  this.filterNode.frequency.value = this.filterNode2.frequency.value = this.filterNode3.frequency.value = nyquistFreq - ( nyquistFreq / 3.5355 );
  this.filterNode.Q.value = 0.51764;
  this.filterNode2.Q.value = 0.70711;
  this.filterNode3.Q.value = 1.93184;

  this.filterNode.connect( this.filterNode2 );
  this.filterNode2.connect( this.filterNode3 );
  this.filterNode3.connect( this.scriptProcessorNode );
};

Recorder.prototype.encodeBuffers = function( inputBuffer ){
  if ( this.state === "recording" ) {
    var buffers = [];
    for ( var i = 0; i < inputBuffer.numberOfChannels; i++ ) {
      buffers[i] = inputBuffer.getChannelData(i);
    }

    this.encoder.postMessage({ command: "encode", buffers: buffers });
    this.duration += inputBuffer.duration;
    this.eventTarget.dispatchEvent( new CustomEvent( 'duration', { detail: this.duration } ) );
  }
};

Recorder.prototype.initStream = function(){
  if ( this.stream ) {
    this.eventTarget.dispatchEvent( new Event( "streamReady" ) );
    return;
  }

  var that = this;
  navigator.getUserMedia(
    { audio : this.config.streamOptions },
    function ( stream ) {
      that.stream = stream;
      that.sourceNode = that.audioContext.createMediaStreamSource( stream );
      that.sourceNode.connect( that.filterNode || that.scriptProcessorNode );
      that.sourceNode.connect( that.monitorNode );
      that.eventTarget.dispatchEvent( new Event( "streamReady" ) );
    },
    function ( e ) {
      that.eventTarget.dispatchEvent( new ErrorEvent( "streamError", { error: e } ) );
    }
  );
};

Recorder.prototype.pause = function(){
  if ( this.state === "recording" ){
    this.state = "paused";
    this.eventTarget.dispatchEvent( new Event( 'pause' ) );
  }
};

Recorder.prototype.removeEventListener = function( type, listener, useCapture ){
  this.eventTarget.removeEventListener( type, listener, useCapture );
};

Recorder.prototype.resume = function() {
  if ( this.state === "paused" ) {
    this.state = "recording";
    this.eventTarget.dispatchEvent( new Event( 'resume' ) );
  }
};

Recorder.prototype.setMonitorGain = function( gain ){
  this.monitorNode.gain.value = gain;
};

Recorder.prototype.start = function(){
  if ( this.state === "inactive" && this.stream ) {
    var that = this;
    this.encoder = new Worker( this.config.encoderPath );

    if (this.config.streamPages){
      this.encoder.addEventListener( "message", function( e ) {
        that.streamPage( e.data );
      });
    }

    else {
      this.recordedPages = [];
      this.totalLength = 0;
      this.encoder.addEventListener( "message", function( e ) {
        that.storePage( e.data );
      });
    }

    // First buffer can contain old data. Don't encode it.
    this.encodeBuffers = function(){
      delete this.encodeBuffers;
    };

    this.duration = 0;
    this.state = "recording";
    this.monitorNode.connect( this.audioContext.destination );
    this.scriptProcessorNode.connect( this.audioContext.destination );
    this.eventTarget.dispatchEvent( new Event( 'start' ) );
    this.eventTarget.dispatchEvent( new CustomEvent( 'duration', { detail: this.duration } ) );
    this.encoder.postMessage( this.config );
  }
};

Recorder.prototype.stop = function(){
  if ( this.state !== "inactive" ) {
    this.state = "inactive";
    this.monitorNode.disconnect();
    this.scriptProcessorNode.disconnect();

    if ( !this.config.leaveStreamOpen ) {
      this.clearStream();
    }

    this.encoder.postMessage({ command: "done" });
  }
};

Recorder.prototype.storePage = function( page ) {
  this.recordedPages.push( page );
  this.totalLength += page.length;

  // Stream is finished
  if ( page[5] & 4 ) {
    var outputData = new Uint8Array( this.totalLength );
    var outputIndex = 0;

    for ( var i = 0; i < this.recordedPages.length; i++ ) {
      outputData.set( this.recordedPages[i], outputIndex );
      outputIndex += this.recordedPages[i].length;
    }

    this.eventTarget.dispatchEvent( new CustomEvent( 'dataAvailable', {
      detail: new Blob( [outputData], { type: "audio/ogg" } )
    }));

    this.recordedPages = [];
    this.eventTarget.dispatchEvent( new Event( 'stop' ) );
  }
};

Recorder.prototype.streamPage = function( page ) {
  this.eventTarget.dispatchEvent( new CustomEvent( 'dataAvailable', {
    detail: new Blob( [page], { type: "audio/ogg" } )
  }));

  // Stream is finished
  if ( page[5] & 4 ) {
    this.eventTarget.dispatchEvent( new Event( 'stop' ) );
  }
};
