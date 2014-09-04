(function(window){

  var WORKER_PATH = 'recorderWorker.js';

  var Recorder = function(source, cfg){
    var config = cfg || {};
    var bufferLen = config.bufferLen || 4096;
    var context = source.context;
    context.createScriptProcessor = context.createScriptProcessor || context.createJavaScriptNode;
    var node = context.createScriptProcessor(bufferLen, 2, 2);
    var worker = new Worker(config.workerPath || WORKER_PATH);
    worker.postMessage({
      command: 'init',
      config: {
        sampleRate: context.sampleRate
      }
    });
    var isRecording = false,
      currCallback;

    node.onaudioprocess = function(e){
      if (isRecording) {
        worker.postMessage({
          command: 'record',
          buffer: [
            e.inputBuffer.getChannelData(0),
            e.inputBuffer.getChannelData(1)
          ]
        });
      }
    };

    this.isRecording = function(){
      return isRecording;
    };

    this.record = function(){
      isRecording = true;
    };

    this.stop = function(){
      isRecording = false;
    };

    this.clear = function(){
      worker.postMessage({ command: 'clear' });
    };

    this.getBuffer = function(cb) {
      currCallback = cb || config.callback;
      worker.postMessage({ command: 'getBuffer' })
    };

    this.exportWAV = function(cb, type){
      currCallback = cb || config.callback;
      type = type || config.type || 'audio/wav';
      if (!currCallback) throw new Error('Callback not set');
      worker.postMessage({
        command: 'exportWAV',
        type: type
      });
    };

    worker.onmessage = function(e){
      var blob = e.data;
      currCallback(blob);
    };

    source.connect(node);
    node.connect(context.destination);    //this should not be necessary
  };

  Recorder.forceDownload = function(blob, filename){
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var link = window.document.createElement('a');
    link.href = url;
    link.download = filename || 'output.wav';
    var click = document.createEvent("Event");
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  };

  window.Recorder = Recorder;

})(window);
