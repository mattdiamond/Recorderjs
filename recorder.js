var Recorder = function(config){

  var that = this;

  if ( !Recorder.isRecordingSupported() ) {
    throw "Recording is not supported in this browser";
  }

  config = config || {};
  config.bufferLen = config.bufferLen || 4096;
  config.workerPath = config.workerPath || 'recorderWorker.js';
  config.numberOfChannels = config.numberOfChannels || 2;
  config.enableMonitoring = config.enableMonitoring || false;
  config.mimeType = config.mimeType || 'audio/wav';
  this.config = config;

  this.initCallbackQueue = [];
  this.worker = new Worker(config.workerPath);

  this.audioContext = new AudioContext();
  this.audioContext.createScriptProcessor = this.audioContext.createScriptProcessor || this.audioContext.createJavaScriptNode;
  this.scriptProcessorNode = this.audioContext.createScriptProcessor(config.bufferLen, config.numberOfChannels, config.numberOfChannels);
  this.scriptProcessorNode.onaudioprocess = function(e){ that.addToBuffer(e.inputBuffer); };
  this.scriptProcessorNode.connect(this.audioContext.destination);

  this.pauseRecording();
  this.initStream( function(){
    that.worker.postMessage({
      command: 'init',
      config: {
        sampleRate: that.audioContext.sampleRate,
        numberOfChannels: that.config.numberOfChannels
      }
    });
  });
};

Recorder.prototype.addToBuffer = function(inputBuffer){

  var buffer;
  if (!this.isPaused) {

    buffer = [];
    for (var i = 0; i < inputBuffer.numberOfChannels; i++) {
      buffer.push( inputBuffer.getChannelData(i) );
    }

    this.worker.postMessage({
      command: 'addToBuffer',
      buffer: buffer
    });
  }
};

Recorder.prototype.workerCallbackHandler = function(e, cb, handlerRef){
  if (!e.hasBeenCaptured) {
    e.hasBeenCaptured = true;
    this.worker.removeEventListener("message", handlerRef);
    cb(e.data);
  }
};

Recorder.prototype.clear = function(){
  this.worker.postMessage({ command: 'clear' });
};

Recorder.prototype.disableMonitoring = function(){
  if (this.isInitialized) {
    this.sourceNode.disconnect(this.audioContext.destination);
  }
};

Recorder.prototype.enableMonitoring = function(){
  var that = this;
  this.initStream(function(){
    that.sourceNode.connect(that.audioContext.destination);
  });
};

Recorder.prototype.getWavBlob = function(cb, mimeType){

  var that = this,
    getWavBlobHandler = function(e){ that.workerCallbackHandler(e, cb, getWavBlobHandler); };

  this.worker.addEventListener("message", getWavBlobHandler);
  this.worker.postMessage({
    command: 'getWavBlob',
    mimeType: mimeType || this.config.mimeType
  });
};

Recorder.prototype.getBuffer = function(cb) {

  var that = this,
    getBufferHandler = function(e){ that.workerCallbackHandler(e, cb, getBufferHandler); };

  this.worker.addEventListener("message", getBufferHandler);
  this.worker.postMessage({ command: 'getBuffer' });
};

Recorder.prototype.initStream = function(success){

  if (this.isInitialized) {
    success();
  }

  else {
    this.initCallbackQueue.push(success);

    if (!this.isInitializing) {
      this.isInitializing = true;
      success = success || function(){};

      var that = this;
      var gotAudioStream = function(stream) {
        that.stream = stream;
        that.sourceNode = that.audioContext.createMediaStreamSource(stream);
        that.sourceNode.connect(that.scriptProcessorNode);

        that.isInitializing = false;
        that.isInitialized = true;

        if (that.config.enableMonitoring) {
          that.enableMonitoring();
        }

        while ( that.initCallbackQueue.length ) {
          that.initCallbackQueue.shift()();
        }
      };

      navigator.getUserMedia( { audio: true }, gotAudioStream, function(e){ throw e } );
    }
  }
};

Recorder.prototype.pauseRecording = function(){
  this.isPaused = true;
};

Recorder.prototype.startRecording = function(){
  var that = this;
  this.initStream( function(){ that.isPaused = false; } );
};

Recorder.prototype.stopRecording = function(){
  this.pauseRecording();
  if (this.isInitialized) {
    this.stream.stop();
    this.disableMonitoring();
    this.sourceNode.disconnect(this.scriptProcessorNode);
    this.isInitialized = false;
  }
};

Recorder.isRecordingSupported = function(){
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  return navigator.getUserMedia && window.AudioContext;
};