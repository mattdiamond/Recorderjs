var Recorder = function( config ){

  var that = this;

  if ( !Recorder.isRecordingSupported() ) {
    throw "Recording is not supported in this browser";
  }

  config = config || {};
  config.bitDepth = config.bitDepth || 16;
  config.bufferLength = config.bufferLength || 4096;
  config.disableFilter = config.disableFilter || false;
  config.enableMonitoring = config.enableMonitoring || false;
  config.numberOfChannels = config.numberOfChannels || 1;
  config.recordOpus = (config.recordOpus === false) ? false : true;
  config.sampleRate = config.sampleRate || this.sampleRate;
  config.workerPath = config.workerPath || 'recorderWorker.js';

  if ( config.recordOpus ) {
    config.sampleRate = 48000;
    config.bitDepth = 16;
  }

  this.config = config;
  this.worker = new Worker( this.config.workerPath );
  this.scriptProcessorNode = this.audioContext.createScriptProcessor( config.bufferLength, config.numberOfChannels, config.numberOfChannels );
  this.scriptProcessorNode.onaudioprocess = function( e ){ that.recordBuffers( e.inputBuffer ); };
  this.scriptProcessorNode.connect( this.audioContext.destination );
  this.reset();
  this.initStream();
};

Recorder.AudioContextConstructor = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

Recorder.getUserMedia = function( options, success, failure ) {
  if ( navigator.getUserMedia ) { navigator.getUserMedia( options, success, failure ); }
  else if ( navigator.webkitGetUserMedia ) { navigator.webkitGetUserMedia( options, success, failure ); }
  else if ( navigator.mozGetUserMedia ) { navigator.mozGetUserMedia( options, success, failure ); }
  else if ( navigator.msGetUserMedia ) { navigator.msGetUserMedia( options, success, failure ); }
  else { throw "getUserMedia is not supported in this browser"; }
};

Recorder.isRecordingSupported = function(){
  return Recorder.AudioContextConstructor && ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
};

Recorder.prototype.addEventListener = function( type, listener, useCapture ){
  this.worker.addEventListener( type, listener, useCapture );
};

Recorder.prototype.addWorkerCallback = function( callback ) {
  var that = this;
  var handler = function( e ){
    e.stopImmediatePropagation();
    that.worker.removeEventListener( "message", handler );
    callback.call( that, e.data );
  };
  this.worker.addEventListener( "message", handler );
};

Recorder.prototype.audioContext = new Recorder.AudioContextConstructor();

Recorder.prototype.disableMonitoring = function(){
  this.config.enableMonitoring = false;
  if ( this.sourceEndNode ) {
    this.sourceEndNode.disconnect( this.audioContext.destination );
  }
};

Recorder.prototype.doneRecording = function(){
  this.worker.postMessage({
    command: "doneRecording"
  });

  if ( this.sourceNode ) {
    if ( this.filterNode ) {
      this.filterNode.disconnect( this.filterNode2 );
      this.sourceNode.disconnect( this.filterNode );
    }
    this.sourceEndNode.disconnect( this.scriptProcessorNode );
    this.sourceEndNode.disconnect( this.audioContext.destination );
    this.stream.stop();
    this.sourceNode = this.sourceEndNode = this.filterNode = this.filterNode2 = this.stream = undefined;
  }

  this.updateState( "stopped" );
};

Recorder.prototype.enableMonitoring = function(){
  this.config.enableMonitoring = true;
  if ( this.sourceEndNode ) {
    this.sourceEndNode.connect( this.audioContext.destination );
  }
};

Recorder.prototype.get = function( format, callback ) {
  if ( this.state !== "recording" ) {
    this.addWorkerCallback( callback );
    this.worker.postMessage({ 
      command: "get",
      format: format
    });
  }
};

Recorder.prototype.getWav = function( callback, mimeType ) {
  this.get( "wav", function( data ){
    callback( new Blob( [data], { type: mimeType || "audio/wav" } ) );
  });
};

Recorder.prototype.getOgg = function( callback, mimeType ) {
  this.get( "ogg", function( data ){
    callback( new Blob( [data], { type: mimeType || "audio/ogg" } ) );
  });
};

Recorder.prototype.initStream = function(){
  this.updateState( "initializing" );
  var that = this;
  var audioOptions = { 
    optional: [],
    mandatory: {
      googEchoCancellation: false,
      googAutoGainControl: false,
      googNoiseSuppression: false,
      googHighpassFilter: false
    }
  };

  Recorder.getUserMedia(
    { audio : audioOptions },
    function( stream ){ that.onStreamInit( stream ); }, 
    function( e ){ throw e; }
  );
};

Recorder.prototype.onStreamInit = function( stream ){;
  this.stream = stream;
  this.sourceNode = this.audioContext.createMediaStreamSource( stream );
  this.sourceEndNode = this.sourceNode;

  // 4th order butterworth low pass filter to reduce aliasing noise
  if ( !this.config.disableFilter && this.config.sampleRate < this.sampleRate ) {
    var nyquistRate = this.config.sampleRate / 2;
    this.filterNode = this.audioContext.createBiquadFilter();
    this.filterNode2 = this.audioContext.createBiquadFilter();
    this.filterNode.type = this.filterNode2.type = "lowpass";
    this.filterNode.frequency.value = nyquistRate - Math.pow( 10, Math.log(nyquistRate) / Math.LN10 - Math.log(nyquistRate/0.7071) * 0.2 / Math.LN10 );
    this.filterNode2.frequency.value = this.filterNode.frequency.value;
    this.filterNode.Q.value = 0.54120;
    this.filterNode2.Q.value = 1.30657;
    this.sourceNode.connect( this.filterNode );
    this.filterNode.connect( this.filterNode2 );
    this.filterNode2.connect( this.scriptProcessorNode );
    this.sourceEndNode = this.filterNode2;
  }

  this.sourceEndNode.connect( this.scriptProcessorNode );
  if ( this.config.enableMonitoring ) {
    this.sourceEndNode.connect( this.audioContext.destination );
  }

  this.updateState( "paused" );
};

Recorder.prototype.pauseRecording = function(){
  if ( this.state === "recording" ){
    this.updateState( "paused" );
  }
};

Recorder.prototype.recordBuffers = function( inputBuffer ){
  if ( this.state === "recording" ) {

    var buffers = [];
    for ( var i = 0; i < inputBuffer.numberOfChannels; i++ ) {
      buffers[i] = inputBuffer.getChannelData(i);
    }

    this.worker.postMessage({ command: "recordBuffers", buffers: buffers });
    this.recordingTime += inputBuffer.duration;
    this.worker.dispatchEvent( new CustomEvent( 'recordingTimeChange', { "detail": this.recordingTime } ) );
  }
};

Recorder.prototype.removeEventListener = function( type, listener, useCapture ){
  this.worker.removeEventListener( type, listener, useCapture );
};

Recorder.prototype.reset = function(){
  this.recordingTime = 0;
  this.worker.dispatchEvent( new CustomEvent( 'recordingTimeChange', { "detail": this.recordingTime } ) );
  this.worker.postMessage({
    command: "init",
    bitDepth: this.config.bitDepth,
    bufferLength: this.config.bufferLength,
    inputSampleRate: this.audioContext.sampleRate,
    numberOfChannels: this.config.numberOfChannels,
    outputSampleRate: this.config.sampleRate,
    recordOpus: this.config.recordOpus
  });
};

Recorder.prototype.startRecording = function(){
  if ( this.state === "paused" ){
    this.updateState( "recording" );
  };
};

Recorder.prototype.updateState = function( state ){
  this.state = state;
  this.worker.dispatchEvent( new CustomEvent( 'stateChange', { "detail": this.state } ) );
};
