AudioContext = AudioContext || webkitAudioContext || mozAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var Recorder = function( config ){

  if ( !Recorder.isRecordingSupported() ) {
    throw "Recording is not supported in this browser";
  }

  config = config || {};
  config.recordOpus = (config.recordOpus === false) ? false : config.recordOpus || true;
  config.bitDepth = config.recordOpus ? 16 : config.bitDepth || 16;
  config.bufferLength = config.bufferLength || 4096;
  config.monitorGain = config.monitorGain || 0;
  config.numberOfChannels = config.numberOfChannels || 1;
  config.sampleRate = config.sampleRate || (config.recordOpus ? 48000 : this.audioContext.sampleRate);
  config.workerPath = config.workerPath || 'recorderWorker.js';
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
  this.createAudioNodes();
  this.initStream();
};

Recorder.isRecordingSupported = function(){
  return AudioContext && navigator.getUserMedia;
};

Recorder.prototype.addEventListener = function( type, listener, useCapture ){
  this.eventTarget.addEventListener( type, listener, useCapture );
};

Recorder.prototype.audioContext = new AudioContext();

Recorder.prototype.createAudioNodes = function(){
  var that = this;
  this.scriptProcessorNode = this.audioContext.createScriptProcessor( this.config.bufferLength, this.config.numberOfChannels, this.config.numberOfChannels );
  this.scriptProcessorNode.onaudioprocess = function( e ){ that.recordBuffers( e.inputBuffer ); };
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

Recorder.prototype.initStream = function(){
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

Recorder.prototype.setMonitorGain = function( gain ){
  this.monitorNode.gain.value = gain;
};

Recorder.prototype.start = function(){
  if ( this.state === "inactive" && this.sourceNode ) {

    var that = this;
    this.worker = new Worker( this.config.workerPath );
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

    this.state = "recording";
    this.recordingTime = 0;
    this.monitorNode.connect( this.audioContext.destination );
    this.scriptProcessorNode.connect( this.audioContext.destination );
    this.recordBuffers = function(){ delete this.recordBuffers }; // First buffer can contain old data
    this.eventTarget.dispatchEvent( new Event( 'start' ) );
    this.eventTarget.dispatchEvent( new CustomEvent( 'recordingProgress', { "detail": this.recordingTime } ) );
  }
};

Recorder.prototype.stop = function(){
  if ( this.state !== "inactive" ) {
    this.monitorNode.disconnect();
    this.scriptProcessorNode.disconnect();
    this.state = "inactive";
    this.eventTarget.dispatchEvent( new Event( 'stop' ) );
    this.worker.postMessage({ command: "requestData" });
    this.worker.postMessage({ command: "stop" });
  }
};
