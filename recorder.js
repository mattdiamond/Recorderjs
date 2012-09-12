(function(window){

  if (!window.PCMData){
    console.error('PCMData plugin not found');
    return;
  }

  var Recorder = function(source, bufferLen){
    bufferLen = bufferLen || 4096;
    this.context = source.context;
    this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
    var recBuffers = [];
    var recLength = 0;
    var recording = false;

    this.node.onaudioprocess = function(e){
      if (!recording) return;
      var bufferL = e.inputBuffer.getChannelData(0);
      var bufferR = e.inputBuffer.getChannelData(1);
      var interleaved = interleave(bufferL, bufferR);
      recBuffers.push(interleaved);
      recLength += interleaved.length;
    }

    this.record = function(){
      recording = true;
    }

    this.stop = function(){
      recording = false;
    }

    this.clear = function(){
      recBuffers = [];
      recLength = 0;
    }

    this.exportWAV = function(){
      var buffer = mergeBuffers(recBuffers, recLength);
      var waveData = PCMData.encode({
        sampleRate: 44100,
        channelCount:   2,
        bytesPerSample: 2,    //16bit
        data:       buffer
      });
      var uri = "data:audio/wav;base64," + btoa(waveData);
      window.open(uri);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination);    //this should not be necessary
  }

  /** internal functions **/

  function interleave(inputL, inputR){
    var length = inputL.length + inputR.length;
    var result = new Float32Array(length);

    var index = 0,
      inputIndex = 0;

    while (index < length){
      result[index++] = inputL[inputIndex];
      result[index++] = inputR[inputIndex];
      inputIndex++;
    }
    return result;
  }

  function mergeBuffers(recBuffers, recLength){
    var result = new Float32Array(recLength);
    var offset = 0;
    for (var i = 0; i < recBuffers.length; i++){
      result.set(recBuffers[i], offset);
      offset += recBuffers[i].length;
    }
    return result;
  }

  window.Recorder = Recorder;

})(window);