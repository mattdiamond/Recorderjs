var Recorder = function(source, config){

  var _this = this,
    bufferLen,
    context = source.context,
    node,
    workerPath;

  config = config || {};
  bufferLen = config.bufferLen || 4096;
  workerPath = config.workerPath || 'recorderWorker.js';
  this.mimeType = config.mimeType || 'audio/wav';
  this.downloadFilename = config.downloadFilename || 'recording.wav';

  this.worker = new Worker(workerPath);
  this.worker.postMessage({
    command: 'init',
    config: { sampleRate: context.sampleRate }
  });

  context.createScriptProcessor = context.createScriptProcessor || context.createJavaScriptNode;
  node = context.createScriptProcessor(bufferLen, 2, 2);
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
  this.getWAVBlob( function(blob){
    var url = (URL || webkitURL).createObjectURL(blob),
      link = document.createElement('a'),
      click = document.createEvent("Event");

    link.href = url;
    link.download = filename || this.downloadFilename;
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  });
};

Recorder.prototype.getWAVBlob = function(cb, mimeType){
  var exportWavHandler = function(e){ this.callbackHandler(e, cb, exportWavHandler) });
  this.worker.addEventListener("message", exportWavHandler);
  this.worker.postMessage({
    command: 'exportWAV',
    type: mimeType || this.mimeType
  });
};

Recorder.prototype.getBuffer = function(cb) {
  var getBufferHandler = function(e){ this.callbackHandler(e, cb, getBufferHandler) });
  this.worker.addEventListener("message", getBufferHandler);
  this.worker.postMessage({ command: 'getBuffer' });
};

Recorder.prototype.recordBuffer = function(inputBuffer){
  if (this.isRecording) {
    this.worker.postMessage({
      command: 'record',
      buffer: [
        inputBuffer.getChannelData(0),
        inputBuffer.getChannelData(1)
      ]
    });
  }
};

Recorder.prototype.startRecording = function(){
  this.isRecording = true;
};

Recorder.prototype.stopRecording = function(){
  this.isRecording = false;
};
