var Recorder = function( config ){

  var that = this;

  if ( !Recorder.isRecordingSupported() ) {
    throw "Recording is not supported in this browser";
  }

  config = config || {};
  config.recordOpus = config.recordOpus === false ? false : true;
  config.bitDepth = (config.recordOpus ? 16 : config.bitDepth) || 16;
  config.bufferLength = config.bufferLength || 4096;
  config.enableMonitoring = config.enableMonitoring || false;
  config.numberOfChannels = config.numberOfChannels || 1;
  config.sampleRate = config.sampleRate || (config.recordOpus ? 48000 : this.audioContext.sampleRate);
  config.streamOptions = config.streamOptions || {
    optional: [],
    mandatory: {
      googEchoCancellation: false,
      googAutoGainControl: false,
      googNoiseSuppression: false,
      googHighpassFilter: false
    }
  };

  this.config = config;
  this.state = "inactive";
  this.eventTarget = document.createDocumentFragment();
  this.scriptProcessorNode = this.audioContext.createScriptProcessor( config.bufferLength, config.numberOfChannels, config.numberOfChannels );
  this.scriptProcessorNode.onaudioprocess = function( e ){ that.recordBuffers( e.inputBuffer ); };
  this.scriptProcessorNode.connect( this.audioContext.destination );
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
  this.eventTarget.addEventListener( type, listener, useCapture );
};

Recorder.prototype.audioContext = new Recorder.AudioContextConstructor();

Recorder.prototype.disableMonitoring = function(){
  this.config.enableMonitoring = false;
  if ( this.sourceEndNode ) {
    this.sourceEndNode.disconnect( this.audioContext.destination );
  }
};

Recorder.prototype.enableMonitoring = function(){
  this.config.enableMonitoring = true;
  if ( this.sourceEndNode ) {
    this.sourceEndNode.connect( this.audioContext.destination );
  }
};

Recorder.prototype.initWorker = function(){
  var that = this;
  this.worker = new Worker( this.config.workerPath || 'recorderWorker.js' );
  this.worker.addEventListener( "message", function( e ) {
    that.eventTarget.dispatchEvent( new CustomEvent( 'dataAvailable', {
      "detail": new Blob( [e.data], { type: that.config.recordOpus ? "audio/ogg" : "audio/wav" } )
    }));
  });
  this.worker.postMessage({
    command: "start",
    bitDepth: this.config.bitDepth,
    bufferLength: this.config.bufferLength,
    inputSampleRate: this.audioContext.sampleRate,
    numberOfChannels: this.config.numberOfChannels,
    outputSampleRate: this.config.sampleRate,
    recordOpus: this.config.recordOpus
  });
};

Recorder.prototype.onStreamInit = function( stream ){
  this.stream = stream;
  this.sourceNode = this.audioContext.createMediaStreamSource( stream );
  this.sourceEndNode = this.sourceNode;

  // reduce aliasing noise with 4th order butterworth filter
  if ( this.config.sampleRate < this.audioContext.sampleRate ) {
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

  this.state = "recording";
  this.recordingTime = 0;
  this.eventTarget.dispatchEvent( new Event( 'start' ) );
  this.eventTarget.dispatchEvent( new CustomEvent( 'recordingProgress', { "detail": this.recordingTime } ) );
};

Recorder.prototype.pause = function(){
  if ( this.state === "recording" ){
    this.state = "paused";
    this.eventTarget.dispatchEvent( new Event( 'pause' ) );
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
    this.eventTarget.dispatchEvent( new CustomEvent( 'recordingProgress', { "detail": this.recordingTime } ) );
  }
};

Recorder.prototype.removeEventListener = function( type, listener, useCapture ){
  this.eventTarget.removeEventListener( type, listener, useCapture );
};

Recorder.prototype.requestData = function( callback ) {
  if ( this.state !== "recording" ) {
    this.worker.postMessage({ command: "requestData" });
  }
};

Recorder.prototype.resume = function( callback ) {
  if ( this.state === "paused" ) {
    this.state = "recording";
    this.eventTarget.dispatchEvent( new Event( 'resume' ) );
  }
};

Recorder.prototype.start = function(){
  if ( this.state === "inactive" ) {
    var that = this;
    this.initWorker();
    Recorder.getUserMedia( 
      { audio : this.config.streamOptions },
      function( stream ){ that.onStreamInit( stream ); },
      function( e ){ that.eventTarget.dispatchEvent( new ErrorEvent( "error", { error: e, message: e.message, filename: e.fileName,lineno: e.lineNumber ) ); }
    );
  };
};

Recorder.prototype.stop = function(){
  if ( this.state !== "inactive" ) {

    if ( this.filterNode ) {
      this.filterNode.disconnect( this.filterNode2 );
      this.sourceNode.disconnect( this.filterNode );
    }

    this.sourceEndNode.disconnect( this.scriptProcessorNode );
    this.sourceEndNode.disconnect( this.audioContext.destination );
    this.stream.stop();

    this.state = "inactive";
    this.eventTarget.dispatchEvent( new Event( 'stop' ) );
    this.requestData();
    this.worker.postMessage({ command: "stop" });
  }
};
