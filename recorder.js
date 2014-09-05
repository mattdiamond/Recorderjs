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
  node.onaudioprocess = function(e){ that.recordBuffer(e.inputBuffer); };
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

  var that = this;
  this.getWAVBlob( function(blob){

    var url = (URL || webkitURL).createObjectURL(blob),
      link = document.createElement('a'),
      click = document.createEvent("Event");

    link.href = url;
    link.download = filename || that.downloadFilename;
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  });
};

Recorder.prototype.getWAVBlob = function(cb, mimeType){

  var that = this,
    getWAVBlobHandler = function(e){ that.callbackHandler(e, cb, getWAVBlobHandler); };

  this.worker.addEventListener("message", getWAVBlobHandler);
  this.worker.postMessage({
    command: 'getWAVBlob',
    type: mimeType || this.mimeType
  });
};

Recorder.prototype.getBuffer = function(cb) {

  var that = this,
    getBufferHandler = function(e){ that.callbackHandler(e, cb, getBufferHandler); };

  this.worker.addEventListener("message", getBufferHandler);
  this.worker.postMessage({ command: 'getBuffer' });
};

Recorder.prototype.recordBuffer = function(inputBuffer){
  var buffer;

  if (this.isRecording) {

    buffer = [];
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
