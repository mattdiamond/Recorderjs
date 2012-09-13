(function(window){

  var Recorder = function(source, bufferLen){
    bufferLen = bufferLen || 4096;
    this.context = source.context;
    this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
    this.worker = new Worker('recorderWorker.js');
    var recording = false;

    this.node.onaudioprocess = function(e){
      if (!recording) return;
      this.worker.postMessage({
        command: 'record',
        buffer: e.inputBuffer
      });
    }

    this.record = function(){
      recording = true;
    }

    this.stop = function(){
      recording = false;
    }

    this.clear = function(){
      this.worker.postMessage({ command: 'clear' });
    }

    this.exportWAV = function(){
      this.worker.postMessage({ command: 'exportWAV' });
    }

    source.connect(this.node);
    this.node.connect(this.context.destination);    //this should not be necessary
  }

  window.Recorder = Recorder;

  window.onmessage = function(e){
    var waveData = e.data;
    var uri = "data:audio/wav;base64," + btoa(waveData);
    window.open(uri);
  }

})(window);