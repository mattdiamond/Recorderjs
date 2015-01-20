var Recorder = function( config ){

  var that = this;

  if ( !Recorder.isRecordingSupported() ) {
    throw "Recording is not supported in this browser";
  }

  this.audioContext = new Recorder.AudioContext();

  config = config || {};
  config.bufferLength = config.bufferLength || 4096;
  config.enableMonitoring = config.enableMonitoring || false;
  config.numberOfChannels = config.numberOfChannels || 1;
  config.bitDepth = config.bitDepth || 16;
  config.sampleRate = config.sampleRate || this.audioContext.sampleRate;
  config.workerPath = config.workerPath || 'recorderWorker.js';
  this.config = config;

  this.scriptProcessorNode = this.audioContext.createScriptProcessor( config.bufferLength, config.numberOfChannels, config.numberOfChannels );
  this.scriptProcessorNode.onaudioprocess = function( e ){ that.recordPCM( e.inputBuffer ); };
  this.scriptProcessorNode.connect( this.audioContext.destination );

  this.resetWorker();
  this.pauseRecording();
  this.initCallbackQueue = [];
  this.initStream();
};

Recorder.AudioContext = window.AudioContext || window.webkitAudioContext;

Recorder.getUserMedia = function( options, success, failure ) {
  if ( navigator.getUserMedia ) { navigator.getUserMedia( options, success, failure ); }
  else if ( navigator.webkitGetUserMedia ) { navigator.webkitGetUserMedia( options, success, failure ); }
  else if ( navigator.mozGetUserMedia ) { navigator.mozGetUserMedia( options, success, failure ); }
  else if ( navigator.msGetUserMedia ) { navigator.msGetUserMedia( options, success, failure ); }
  else { throw "getUserMedia is not supported in this browser"; }
};

Recorder.isRecordingSupported = function(){
  return Recorder.AudioContext && ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
};

Recorder.prototype.addHandler = function( cb ) {
  var that = this;
  var handler = function( e ){
    e.stopImmediatePropagation();
    that.worker.removeEventListener( "message", handler );
    cb.call( that, e.data );
  };
  this.worker.addEventListener( "message", handler );
}

Recorder.prototype.clear = function(){
  this.resetWorkers();
};

Recorder.prototype.disableMonitoring = function(){
  this.config.enableMonitoring = false;
  if (this.isInitialized) {
    this.sourceNode.disconnect( this.audioContext.destination );
  }
};

Recorder.prototype.enableMonitoring = function(){
  this.config.enableMonitoring = true;
  this.initStream( function(){
    this.sourceNode.connect( this.audioContext.destination );
  });
};

Recorder.prototype.get = function( callback ) {
  this.addHandler( callback );
  this.worker.postMessage({ 
    command: "get"
  });
};

Recorder.prototype.getInterleaved = function( callback ) {
  this.addHandler( callback );
  this.worker.postMessage({ 
    command: "getInterleaved"
  });
};

Recorder.prototype.getWav = function( callback, mimeType ) {
  this.addHandler( function( data ){
    callback( new Blob( [data], { type: mimeType || "audio/wav" } ) );
  });
  this.worker.postMessage({ 
    command: "getWav"
  });
};

Recorder.prototype.initStream = function( success ){

  success = success || function(){};
  if ( this.isInitialized ) {
    success.call( this );
  }

  else {
    this.initCallbackQueue.push( success );

    if ( !this.isInitializing ) {
      var that = this;
      this.isInitializing = true;

      Recorder.getUserMedia(
        { audio: {
            optional: [],
            mandatory: {
              googEchoCancellation: false,
              googAutoGainControl: false,
              googNoiseSuppression: false,
              googHighpassFilter: false
            }
        }},
        function( stream ){ that.onStreamInit( stream ); }, 
        function( e ){ throw e; }
      );
    }
  }
};

Recorder.prototype.isRecording = function(){
  return !this.isPaused;
};

Recorder.prototype.onStreamInit = function( stream ){
  this.stream = stream;
  this.sourceNode = this.audioContext.createMediaStreamSource( stream );
  this.sourceNode.connect( this.scriptProcessorNode );
  this.isInitializing = false;
  this.isInitialized = true;

  if ( this.config.enableMonitoring ) {
    this.sourceNode.connect( this.audioContext.destination );
  }

  while ( this.initCallbackQueue.length ) {
    this.initCallbackQueue.shift().call( this );
  }
};

Recorder.prototype.pauseRecording = function(){
  this.isPaused = true;
};

Recorder.prototype.recordPCM = function( inputBuffer ){
  if (!this.isPaused) {

    var channels = [];
    for (var i = 0; i < inputBuffer.numberOfChannels; i++) {
      channels[i] = inputBuffer.getChannelData(i);
    }

    this.worker.postMessage({
      command: "record",
      channels: channels
    });
  }
};

Recorder.prototype.resetWorker = function(){
  if ( this.worker ) { 
    this.worker.terminate();
  }
  this.worker = new Worker( this.config.workerPath );
  this.worker.postMessage({ 
    command: "init",
    numberOfChannels: this.config.numberOfChannels,
    inputSampleRate: this.audioContext.sampleRate,
    outputSampleRate: this.config.sampleRate,
    bufferLength: this.config.bufferLength,
    bitDepth: this.config.bitDepth
  });
};

Recorder.prototype.startRecording = function(){
  this.initStream( function(){ this.isPaused = false; } );
};

Recorder.prototype.stopRecording = function(){
  this.pauseRecording();
  if ( this.isInitialized ) {
    this.stream.stop();
    this.sourceNode.disconnect( this.audioContext.destination );
    this.sourceNode.disconnect( this.scriptProcessorNode );
    this.isInitialized = false;
  }
};
