var Recorder = function(source, config){

  var context = source.context,
    _this = this,
    node;

  config = config || {};
  config.bufferLen = config.bufferLen || 4096;
  config.workerPath = config.workerPath || 'recorderWorker.js';
  config.mimeType = config.mimeType || 'audio/wav';

  this.worker = new Worker(config.workerPath);
  this.worker.postMessage({
    command: 'init',
    config: { sampleRate: context.sampleRate }
  });

  context.createScriptProcessor = context.createScriptProcessor || context.createJavaScriptNode;
  node = context.createScriptProcessor(config.bufferLen, 2, 2);
  node.onaudioprocess = function(e){ _this.recordSample(e.inputBuffer); };
  source.connect(node);
  node.connect(context.destination);
};

Recorder.forceDownload = function(blob, filename){
  var url = (URL || webkitURL).createObjectURL(blob);
  var link = document.createElement('a');
  link.href = url;
  link.download = filename || 'output.wav';
  var click = document.createEvent("Event");
  click.initEvent("click", true, true);
  link.dispatchEvent(click);
};

Recorder.prototype.clear = function(){
  this.worker.postMessage({ command: 'clear' });
};

Recorder.prototype.exportWAV = function(cb, mimeType){
  var exportWavHandler = function(e){
    e.stopPropagation();
    worker.removeEventListener("message", exportWavHandler);
    cb(e.data);
  };
  this.worker.addEventListener("message", exportWavHandler);
  this.worker.postMessage({
    command: 'exportWAV',
    type: mimeType || config.mimeType
  });
};

Recorder.prototype.getBuffer = function(cb) {
  var getBufferHandler = function(e){
    e.stopPropagation();
    worker.removeEventListener("message", getBufferHandler);
    cb(e.data);
  };
  this.worker.addEventListener("message", getBufferHandler);
  this.worker.postMessage({ command: 'getBuffer' });
};

Recorder.prototype.recordSample = function(inputBuffer){
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
