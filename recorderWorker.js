importScripts('pcmdata.min.js');

var recLength = 0,
  recBuffers = [],
  sampleRate;

this.onmessage = function(e){
  switch(e.data.command){
    case 'init':
      init(e.data.config);
      break;
    case 'record':
      record(e.data.buffer);
      break;
    case 'exportWAV':
      exportWAV(e.data.type);
      break;
    case 'clear':
      clear();
      break;
  }
};

function init(config){
  sampleRate = config.sampleRate;
}

function record(inputBuffer){
  var bufferL = inputBuffer[0];
  var bufferR = inputBuffer[1];
  var interleaved = interleave(bufferL, bufferR);
  recBuffers.push(interleaved);
  recLength += interleaved.length;
}

function exportWAV(type){
  var buffer = mergeBuffers(recBuffers, recLength);
  var waveData = PCMData.encode({
    sampleRate:     sampleRate,
    channelCount:   2,
    bytesPerSample: 2,    //16bit
    data:           buffer
  });
  var byteArray = new Uint8Array(waveData.length);
  for (var i = 0; i < waveData.length; i++){
    byteArray[i] = waveData.charCodeAt(i);
  }
  var audioBlob = new Blob([byteArray], { type: type });
  this.postMessage(audioBlob);
}

function clear(){
  recLength = 0;
  recBuffers = [];
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