importScripts('vendor/libmp3lame.js');

var mp3codec,
  recBuffers = [],
  recLength = 0;

this.onmessage = function(e) {
  switch (e.data.command) {
    case 'init':
      init(e.data.config);
      break;
    case 'record':
      record(e.data.buffer);
      break;
    case 'exportAudio':
      exportAudio();
      break;
    case 'clear':
      clear();
      break;
  }
};

function init(config) {
  if (!config) {
    config = {};
  }

  mp3codec = Lame.init();

  Lame.set_mode(mp3codec, config.mode || Lame.MONO);
  Lame.set_num_channels(mp3codec, config.channels || 1);
  Lame.set_out_samplerate(mp3codec, config.sampleRateOut || 22050);
  Lame.set_in_samplerate(mp3codec, config.sampleRate || 44100);
  Lame.set_bitrate(mp3codec, config.bitrate || 128);

  Lame.init_params(mp3codec);
}

function record(buffer) {
  var mp3data = Lame.encode_buffer_ieee_float(mp3codec, buffer[0], buffer[0]);
  recBuffers.push(mp3data.data);
  recLength += mp3data.data.length;
}

function exportAudio() {
  var mp3data = Lame.encode_flush(mp3codec);

  recBuffers.push(mp3data.data);
  recLength += mp3data.data.length;

  var buffer = mergeBuffers(recBuffers, recLength);
  var view = new Uint8Array(buffer);

  var audioBlob = new Blob([view], {
    type: "audio/mp3"
  });

  this.postMessage(audioBlob);
}

function clear() {
  Lame.close(mp3codec);
  mp3codec = null;

  recBuffers = [];
  recLength = 0;
}

function mergeBuffers(recBuffers, recLength) {
  //Float32Array
  var result = new Float32Array(recLength);

  var offset = 0;

  for (var i = 0; i < recBuffers.length; i++) {
    result.set(recBuffers[i], offset);
    offset += recBuffers[i].length;
  }

  return result;
}
