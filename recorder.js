var Recorder = function(source, config){

  var _this = this,
    bufferLen,
    context = source.context,
    numberOfChannels,
    node,
    workerPath;

  config = config || {};
  bufferLen = config.bufferLen || 4096;
  workerPath = config.workerPath || 'recorderWorker.js';
  this.mimeType = config.mimeType || 'audio/wav';
  this.downloadFilename = config.downloadFilename || 'recording.wav';
  numberOfChannels = config.numberOfChannels || 2;

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
  node.onaudioprocess = function(e){ _this.recordBuffer(e.inputBuffer); };
  source.connect(node);
  node.connect(context.destination);
};

Recorder.prototype.callbackHandler = function(e, cb, handlerRef){
  e.stopPropagation();
  this.worker.removeEventListener("message", handlerRef);
  cb(e.data);
};

Recorder.prototype.clear = function(){
  this.worker.postMessage({ command: 'clear' });
};

Recorder.prototype.downloadWAV = function(filename){
  var _this = this;
  this.getWAVBlob( function(blob){

    var url = (URL || webkitURL).createObjectURL(blob),
      link = document.createElement('a'),
      click = document.createEvent("Event");

    link.href = url;
    link.download = filename || _this.downloadFilename;
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  });
};

Recorder.prototype.getWAVBlob = function(cb, mimeType){

  var _this = this,
    getWAVBlobHandler = function(e){ _this.callbackHandler(e, cb, getWAVBlobHandler); };

  this.worker.addEventListener("message", getWAVBlobHandler);
  this.worker.postMessage({
    command: 'getWAVBlob',
    type: mimeType || this.mimeType
  });
};

Recorder.prototype.getBuffer = function(cb) {

  var _this = this,
    getBufferHandler = function(e){ _this.callbackHandler(e, cb, getBufferHandler); };

  this.worker.addEventListener("message", getBufferHandler);
  this.worker.postMessage({ command: 'getBuffer' });
};

Recorder.prototype.recordBuffer = function(inputBuffer){
  if (this.isRecording) {

    var buffer = [];
    for (var i = 0; i < inputBuffer.numberOfChannels; i++) {
      buffer.push( inputBuffer.getChannelData(i) );
    }

    this.worker.postMessage({
      command: 'record',
      buffer: buffer
    });
  }
};

Recorder.prototype.startRecording = function(){
  this.isRecording = true;
};

Recorder.prototype.stopRecording = function(){
  this.isRecording = false;
};
