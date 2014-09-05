var Recorder = function(source, config){

  var that = this,
    context = source.context,
    bufferLen,
    workerPath,
    numberOfChannels,
    node;

  config = config || {};
  bufferLen = config.bufferLen || 4096;
  workerPath = config.workerPath || 'recorderWorker.js';
  numberOfChannels = config.numberOfChannels || 2;
  this.mimeType = config.mimeType || 'audio/wav';
  this.downloadFilename = config.downloadFilename || 'recording.wav';

  this.worker = new Worker(workerPath);
  this.worker.postMessage({
    command: 'init',
    config: {
      sampleRate: context.sampleRate,
      numberOfChannels: numberOfChannels
    }
  });

  context.createScriptProcessor = context.createScriptProcessor || context.createJavaScriptNode;
  node = context.createScriptProcessor(bufferLen, numberOfChannels, numberOfChannels);
  node.onaudioprocess = function(e){ that.addToBuffer(e.inputBuffer); };
  source.connect(node);
  node.connect(context.destination);
};

Recorder.prototype.addToBuffer = function(inputBuffer){

  var buffer;
  if (this.isRecording) {

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

Recorder.prototype.callbackHandler = function(e, cb, handlerRef){
  if (!e.hasBeenCaptured) {
    e.hasBeenCaptured = true;
    this.worker.removeEventListener("message", handlerRef);
    cb(e.data);
  }
};

Recorder.prototype.clear = function(){
  this.worker.postMessage({ command: 'clear' });
};

Recorder.prototype.getWavBlob = function(cb, mimeType){

  var that = this,
    getWavBlobHandler = function(e){ that.callbackHandler(e, cb, getWavBlobHandler); };

  this.worker.addEventListener("message", getWavBlobHandler);
  this.worker.postMessage({
    command: 'getWavBlob',
    mimeType: mimeType || this.mimeType
  });
};

Recorder.prototype.getBuffer = function(cb) {

  var that = this,
    getBufferHandler = function(e){ that.callbackHandler(e, cb, getBufferHandler); };

  this.worker.addEventListener("message", getBufferHandler);
  this.worker.postMessage({ command: 'getBuffer' });
};

Recorder.prototype.startRecording = function(){
  this.isRecording = true;
};

Recorder.prototype.stopRecording = function(){
  this.isRecording = false;
};
