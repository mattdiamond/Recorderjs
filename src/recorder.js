"use strict";

var getUserMedia = require("get-user-media-promise");
var AudioContext = global.AudioContext || global.webkitAudioContext;

var Recorder = function( config ){

  var that = this;

  if ( !Recorder.isRecordingSupported() ) {
    throw new Error("Recording is not supported in this browser");
  }

  this.state = "inactive";
  this.eventTarget = global.document.createDocumentFragment();
  this.monitorNode = this.audioContext.createGain();
  this.config = Object.assign({
    bufferLength: 4096,
    encoderApplication: 2049,
    encoderFrameSize: 20,
    encoderPath: 'encoderWorker.min.js',
    encoderSampleRate: 48000,
    leaveStreamOpen: false,
    maxBuffersPerPage: 40,
    monitorGain: 0,
    numberOfChannels: 1,
    originalSampleRate: this.audioContext.sampleRate,
    resampleQuality: 3,
    mediaTrackConstraints: true,
    streamPages: false,
    wavBitDepth: 16,
    wavSampleRate: this.audioContext.sampleRate
  }, config );

  this.initWorker();
  this.setMonitorGain( this.config.monitorGain );
  this.scriptProcessorNode = this.audioContext.createScriptProcessor( this.config.bufferLength, this.config.numberOfChannels, this.config.numberOfChannels );
  this.scriptProcessorNode.onaudioprocess = function( e ){
    that.encodeBuffers( e.inputBuffer );
  };
};

Recorder.isRecordingSupported = function(){
  return AudioContext && getUserMedia.isSupported;
};

Recorder.prototype.addEventListener = function( type, listener, useCapture ){
  this.eventTarget.addEventListener( type, listener, useCapture );
};

Recorder.prototype.audioContext = Recorder.isRecordingSupported() && new AudioContext();

Recorder.prototype.clearStream = function() {
  if ( this.stream ) {

    if ( this.stream.getTracks ) {
      this.stream.getTracks().forEach(function ( track ) {
        track.stop();
      });
    }

    else {
      this.stream.stop();
    }

    delete this.stream;
  }
};

Recorder.prototype.encodeBuffers = function( inputBuffer ){
  if ( this.state === "recording" ) {
    var buffers = [];
    for ( var i = 0; i < inputBuffer.numberOfChannels; i++ ) {
      buffers[i] = inputBuffer.getChannelData(i);
    }

    this.encoder.postMessage({
      command: "encode",
      buffers: buffers
    });
  }
};

Recorder.prototype.initStream = function(){
  var that = this;

  var onStreamInit = function( stream ){
    that.stream = stream;
    that.sourceNode = that.audioContext.createMediaStreamSource( stream );
    that.sourceNode.connect( that.scriptProcessorNode );
    that.sourceNode.connect( that.monitorNode );
    that.eventTarget.dispatchEvent( new global.Event( "streamReady" ) );
    return stream;
  };

  var onStreamError = function( e ){
    that.eventTarget.dispatchEvent( new global.ErrorEvent( "streamError", { error: e } ) );
    throw e;
  };

  var constraints = { audio : this.config.mediaTrackConstraints };

  if ( this.stream ) {
    this.eventTarget.dispatchEvent( new global.Event( "streamReady" ) );
    return global.Promise.resolve( this.stream );
  }

  return getUserMedia(constraints).then( onStreamInit, onStreamError );
};

Recorder.prototype.initWorker = function(){
  var that = this;
  this.encoder = new global.Worker( this.config.encoderPath );

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
};

Recorder.prototype.pause = function(){
  if ( this.state === "recording" ){
    this.state = "paused";
    this.eventTarget.dispatchEvent( new global.Event( 'pause' ) );
  }
};

Recorder.prototype.removeEventListener = function( type, listener, useCapture ){
  this.eventTarget.removeEventListener( type, listener, useCapture );
};

Recorder.prototype.resume = function() {
  if ( this.state === "paused" ) {
    this.state = "recording";
    this.eventTarget.dispatchEvent( new global.Event( 'resume' ) );
  }
};

Recorder.prototype.setMonitorGain = function( gain ){
  this.monitorNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);
};

Recorder.prototype.start = function(){
  if ( this.state === "inactive" && this.stream ) {

    this.encoder.postMessage(Object.assign({
      command: 'init'
    }, this.config));

    // First buffer can contain old data. Don't encode it.
    this.encodeBuffers = function(){
      delete this.encodeBuffers;
    };

    this.state = "recording";
    this.monitorNode.connect( this.audioContext.destination );
    this.scriptProcessorNode.connect( this.audioContext.destination );
    this.eventTarget.dispatchEvent( new global.Event( 'start' ) );
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
  if ( page === null ) {
    var outputData = new Uint8Array( this.totalLength );
    var outputIndex = 0;

    for ( var i = 0; i < this.recordedPages.length; i++ ) {
      outputData.set( this.recordedPages[i], outputIndex );
      outputIndex += this.recordedPages[i].length;
    }

    this.eventTarget.dispatchEvent( new global.CustomEvent( 'dataAvailable', {
      detail: outputData
    }));

    this.initWorker();
    this.eventTarget.dispatchEvent( new global.Event( 'stop' ) );
  }

  else {
    this.recordedPages.push( page );
    this.totalLength += page.length;
  }
};

Recorder.prototype.streamPage = function( page ) {
  if ( page === null ) {
    this.initWorker();
    this.eventTarget.dispatchEvent( new global.Event( 'stop' ) );
  }

  else {
    this.eventTarget.dispatchEvent( new global.CustomEvent( 'dataAvailable', {
      detail: page
    }));
  }
};


module.exports = Recorder;
