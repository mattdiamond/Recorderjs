(function(window){

  var WORKER_PATH = 'js/recorderjs/recorderWorker.js';

  var Recorder = function(source, bufferLen){
    bufferLen = bufferLen || 4096;
    this.context = source.context;
    this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
    var worker = new Worker(WORKER_PATH);
    worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate
      }
    });
    var recording = false;
    var config = {};

    this.node.onaudioprocess = function(e){
      if (!recording) return;
      worker.postMessage({
        command: 'record',
        buffer: [
          e.inputBuffer.getChannelData(0),
          e.inputBuffer.getChannelData(1)
        ]
      });
    }

    this.configure = function(cfg){
      config = cfg;
    }

    this.record = function(){
      recording = true;
    }

    this.stop = function(){
      recording = false;
    }

    this.clear = function(){
      worker.postMessage({ command: 'clear' });
    }

    this.exportWAV = function(cb){
      if (cb) config.callback = cb;
      if (!config.callback) throw new Error('Callback not set');
      worker.postMessage({ command: 'exportWAV' });
    }

    worker.onmessage = function(e){
      var waveData = e.data;
      var uri = "data:audio/wav;base64," + btoa(waveData);
      config.callback.call(window, uri);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination);    //this should not be necessary
  };

  window.Recorder = Recorder;

})(window);
