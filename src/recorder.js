"use strict";

var getUserMedia = global.navigator && global.navigator.mediaDevices && global.navigator.mediaDevices.getUserMedia;
var AudioContext = global.AudioContext || global.webkitAudioContext;

var Recorder = function( config ){
  var self = this;

  if ( !Recorder.isRecordingSupported() ) {
    throw new Error("Recording is not supported in this browser");
  }

  this.state = "inactive";
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
  this.scriptProcessorNode.onaudioprocess = function( e ) {
    self.encodeBuffers( e.inputBuffer );
  };
};


// Static Methods
Recorder.isRecordingSupported = function(){
  return AudioContext && getUserMedia;
};


// Instance Methods
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
  var self = this;
  var onStreamInit = function( stream ) {
    self.stream = stream;
    self.sourceNode = self.audioContext.createMediaStreamSource( stream );
    self.sourceNode.connect( self.scriptProcessorNode );
    self.sourceNode.connect( self.monitorNode );
    return stream;
  };

  var onStreamError = function( e ) {
    throw e;
  };

  if ( this.stream ) {
    return global.Promise.resolve( this.stream );
  }

  return getUserMedia({ audio : this.config.mediaTrackConstraints }).then( onStreamInit, onStreamError );
};

Recorder.prototype.initWorker = function(){
  var self = this;
  var streamPage = function( e ) { self.streamPage( e.data ); };
  var storePage = function( e ) { self.storePage( e.data ); };

  this.recordedPages = [];
  this.totalLength = 0;
  this.encoder = new global.Worker( this.config.encoderPath );
  this.encoder.addEventListener( "message", this.config.streamPages ? streamPage : storePage );
};

Recorder.prototype.pause = function(){
  if ( this.state === "recording" ){
    this.state = "paused";
    this.onpause();
  }
};

Recorder.prototype.resume = function() {
  if ( this.state === "paused" ) {
    this.state = "recording";
    this.onresume();
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
    this.onstart();
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

    this.ondataavailable( outputData );
    this.initWorker();
    this.onstop();
  }

  else {
    this.recordedPages.push( page );
    this.totalLength += page.length;
  }
};

Recorder.prototype.streamPage = function( page ) {
  if ( page === null ) {
    this.initWorker();
    this.onstop();
  }

  else {
    this.ondataavailable(page);
  }
};


// Callback Handlers
Recorder.prototype.ondataavailable = function(){};
Recorder.prototype.onpause = function(){};
Recorder.prototype.onresume = function(){};
Recorder.prototype.onstart = function(){};
Recorder.prototype.onstop = function(){};


module.exports = Recorder;
