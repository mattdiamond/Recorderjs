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
  config.sampleRate = config.sampleRate || this.audioContext.sampleRate;
  config.workerPath = config.workerPath || 'recorderWorker.js';
  config.onReady = config.onReady || function(){};

  if ( config.recordOpus ) {
    config.sampleRate = 48000;
    config.bitDepth = 16;
  }

  this.config = config;
  this.scriptProcessorNode = this.audioContext.createScriptProcessor( config.bufferLength, config.numberOfChannels, config.numberOfChannels );
  this.scriptProcessorNode.onaudioprocess = function( e ){ that.recordBuffers( e.inputBuffer ); };
  this.scriptProcessorNode.connect( this.audioContext.destination );
  this.timerIncrementInMs = config.bufferLength / this.audioContext.sampleRate * 1000;

  this.reset();
  this.initStream( config.onReady );
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

Recorder.prototype.addHandler = function( callback ) {
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
  if ( this.sourceNode ) {
    this.sourceNode.disconnect( this.audioContext.destination );
  }
};

Recorder.prototype.doneRecording = function(){
  this.state = "stopped";
  this.worker.postMessage({
    command: "doneRecording"
  });

  if ( this.sourceNode ) {
    if ( this.filterNode ) {
      this.filterNode2.disconnect( this.audioContext.destination );
      this.filterNode2.disconnect( this.scriptProcessorNode );
      this.filterNode.disconnect( this.filterNode2 );
      this.sourceNode.disconnect( this.filterNode );
    }
    else {
      this.sourceNode.disconnect( this.audioContext.destination );
      this.sourceNode.disconnect( this.scriptProcessorNode );
    }
    this.stream.stop();
    this.sourceNode = this.filterNode = this.filterNode2 = this.stream = undefined;
  }
};

Recorder.prototype.enableMonitoring = function(){
  this.config.enableMonitoring = true;
  if ( this.sourceNode ) {
    this.sourceNode.connect( this.audioContext.destination );
  }
};

Recorder.prototype.get = function( format, callback ) {
  if ( this.state !== "recording" ) {
    this.addHandler( callback );
    this.worker.postMessage({ 
      command: "get",
      format: format
    });
  }
};

Recorder.prototype.getRecordingTime = function(){
  return this.recordingTimeInMs;
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

Recorder.prototype.initStream = function( success ){
  if ( this.sourceNode ) {
    return success();
  }

  this.state = "initializing";
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
    function( stream ){ that.onStreamInit( stream, success ); }, 
    function( e ){ throw e; }
  );
};

Recorder.prototype.onStreamInit = function( stream, success ){
  this.state = "paused";
  this.stream = stream;
  this.sourceNode = this.audioContext.createMediaStreamSource( stream );

  // -24db / octave butterworth to reduce aliasing noise
  if ( !this.config.disableFilter && this.config.sampleRate < this.audioContext.sampleRate ) {
    var nyquistRate = this.config.sampleRate / 2;
    this.filterNode = this.audioContext.createBiquadFilter();
    this.filterNode2 = this.audioContext.createBiquadFilter();
    this.filterNode.type = this.filterNode2.type = "lowpass";
    this.filterNode.frequency.value = this.filterNode2.frequency.value = nyquistRate - Math.pow( 10, Math.log(nyquistRate) - Math.log(nyquistRate/0.7071) * 0.2 );
    this.filterNode.Q.value = 0.54120;
    this.filterNode2.Q.value = 1.30657;
    this.sourceNode.connect( this.filterNode );
    this.filterNode.connect( this.filterNode2 );
    this.filterNode2.connect( this.scriptProcessorNode );
    if ( this.config.enableMonitoring ) {
      this.filterNode2.connect( this.audioContext.destination );
    }
  }

  else {
    this.sourceNode.connect( this.scriptProcessorNode );
    if ( this.config.enableMonitoring ) {
      this.sourceNode.connect( this.audioContext.destination );
    }
  }

  success();
};

Recorder.prototype.pauseRecording = function(){
  if ( this.state === "recording" ){
    this.state = "paused";
  }
};

Recorder.prototype.recordBuffers = function( inputBuffer ){
  if ( this.state === "recording" ) {

    this.recordingTimeInMs += this.timerIncrementInMs;

    var buffers = [];
    for (var i = 0; i < inputBuffer.numberOfChannels; i++) {
      buffers[i] = inputBuffer.getChannelData(i);
    }

    this.worker.postMessage({
      command: "recordBuffers",
      buffers: buffers
    });
  }
};

Recorder.prototype.reset = function(){

  if ( this.worker ) {
    this.worker.terminate();
  }

  this.recordingTimeInMs = 0;
  this.worker = new Worker( this.config.workerPath );
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
    this.state = "recording";
  };
};
