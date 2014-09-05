var numberOfChannels,
  recBuffers,
  recLength,
  sampleRate;


this.onmessage = function(e){
  switch(e.data.command){
    case 'init':
      init(e.data.config);
      break;
    case 'record':
      record(e.data.buffer);
      break;
    case 'getWAVBlob':
      getWAVBlob(e.data.type);
      break;
    case 'getBuffer':
      getBuffer();
      break;
    case 'clear':
      clear();
      break;
  }
};

function init(config){
  sampleRate = config.sampleRate;
  numberOfChannels = config.numberOfChannels;
  clear();
}

function record(inputBuffer){
  for (var i = 0; i < numberOfChannels; i++){
    recBuffers[i].push( inputBuffer[i] );
  }
  recLength += inputBuffer[0].length;
}

function getWAVBlob(type){
  var mergedBuffers = mergeAllBuffers();
  var interleavedSamples = interleave(mergedBuffers);
  var dataview = encodeWAV(interleavedSamples);
  var audioBlob = new Blob([dataview], { type: type });

  this.postMessage(audioBlob);
}

function getBuffer() {
  this.postMessage( mergeAllBuffers() );
}

function clear(){
  recLength = 0;
  recBuffers = [];
  for (var i = 0; i < numberOfChannels; i++){
    recBuffers.push([]);
  }
}

function mergeAllBuffers(){
  var buffers = [];
  for (var i = 0; i < numberOfChannels; i++){
    buffers.push( mergeBuffer(recBuffers[i]) );
  }
  return buffers
}

function mergeBuffer(recBuffer){
  var result = new Float32Array(recLength);
  var offset = 0;
  for (var i = 0; i < recBuffer.length; i++){
    result.set(recBuffer[i], offset);
    offset += recBuffer[i].length;
  }
  return result;
}

function interleave( mergedBuffers ){
  var length = 0;
  for (var i = 0; i < numberOfChannels; i++) {
    length += mergedBuffers[i].length;
  }
  var result = new Float32Array(length);

  var index = 0,
    inputIndex = 0;

  while (index < length){
    for (var i = 0; i < numberOfChannels; i++) {
      result[index++] = mergedBuffers[i][inputIndex];
    }
    inputIndex++;
  }
  return result;
}

function floatTo16BitPCM(output, offset, input){
  for (var i = 0; i < input.length; i++, offset+=2){
    var s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}

function writeString(view, offset, string){
  for (var i = 0; i < string.length; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function encodeWAV(interleavedSamples){
  var dataLength = interleavedSamples.length * 2
  var buffer = new ArrayBuffer(44 + dataLength);
  var view = new DataView(buffer);
  var bitsPerSample = 16;

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* file length */
  view.setUint32(4, 36 + dataLength, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, numberOfChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, (sampleRate * bitsPerSample * numberOfChannels) / 8, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, (bitsPerSample * numberOfChannels) / 8, true);
  /* bits per sample */
  view.setUint16(34, bitsPerSample, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, dataLength, true);

  floatTo16BitPCM(view, 44, interleavedSamples);

  return view;
}
