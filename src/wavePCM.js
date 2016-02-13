"use strict"
var wavPCM;
onmessage = function( e ){
  switch( e.data.command ){

    case 'record':
      if ( wavPCM ) {
        wavPCM.record( e.data.buffers );
      }
      break;

    case 'done':
      if ( wavPCM ) {
        wavPCM.requestData();
      }
      break;

    case 'init':
      wavPCM = new WavePCM( e.data );
      break;
  }
};

var WavePCM = function( config ){
  this.sampleRate = config.sampleRate || 48000;
  this.bitDepth = config.bitDepth || 16;
  this.recordedBuffers = [];
  this.bytesPerSample = this.bitDepth / 8;
};

WavePCM.prototype.bitReduce = function( floatData ){
  var outputData = new Uint8Array( floatData.length * this.bytesPerSample );
  var outputIndex = 0;

  for ( var i = 0; i < floatData.length; i++ ) {

    var sample = floatData[i];
    if ( sample > 1 ) sample = 1;
    else if ( sample < -1 ) sample = -1;

    switch ( this.bytesPerSample ) {
      case 4:
        sample = sample * 2147483648;
        outputData[ outputIndex++ ] = sample;
        outputData[ outputIndex++ ] = sample >> 8;
        outputData[ outputIndex++ ] = sample >> 16;
        outputData[ outputIndex++ ] = sample >> 24;
        break;

      case 3:
        sample = sample * 8388608;
        outputData[ outputIndex++ ] = sample;
        outputData[ outputIndex++ ] = sample >> 8;
        outputData[ outputIndex++ ] = sample >> 16;
        break;

      case 2:
        sample = sample * 32768;
        outputData[ outputIndex++ ] = sample;
        outputData[ outputIndex++ ] = sample >> 8;
        break;

      case 1:
        outputData[ outputIndex++ ] = (sample+1) * 128;
        break;

      default:
        throw "Only 8, 16, 24 and 32 bits per sample are supported";
    }
  }

  return outputData;
};

WavePCM.prototype.interleave = function( buffers ) {
  var outputData = new Float32Array( buffers[0].length * this.numberOfChannels );

  for ( var i = 0; i < buffers[0].length; i++ ) {
    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {
      outputData[ i * this.numberOfChannels + channel ] = buffers[ channel ][ i ];
    }
  }

  return outputData;
};

WavePCM.prototype.mergeBuffers = function() {
  var buffers = this.recordedBuffers;
  var bytesPerChunk = this.bufferLength * this.numberOfChannels * this.bytesPerSample;
  var mergedBuffers = new Uint8Array( buffers.length * bytesPerChunk );

  for (var i = 0; i < buffers.length; i++ ) {
    mergedBuffers.set( buffers[i], i*bytesPerChunk );
  }

  return mergedBuffers;
};

WavePCM.prototype.record = function( buffers ){
  this.numberOfChannels = this.numberOfChannels || buffers.length;
  this.bufferLength = this.bufferLength || buffers[0].length;
  this.recordedBuffers.push( this.bitReduce( this.interleave( buffers ) ) );
};

WavePCM.prototype.requestData = function(){
  var audioData = this.mergeBuffers();
  var wav = new Uint8Array( 44 + audioData.byteLength );
  var view = new DataView( wav.buffer );

  view.setUint32( 0, 1380533830, false ); // RIFF identifier 'RIFF'
  view.setUint32( 4, 36 + audioData.byteLength, true ); // file length minus RIFF identifier length and file description length
  view.setUint32( 8, 1463899717, false ); // RIFF type 'WAVE'
  view.setUint32( 12, 1718449184, false ); // format chunk identifier 'fmt '
  view.setUint32( 16, 16, true ); // format chunk length 
  view.setUint16( 20, 1, true ); // sample format (raw)
  view.setUint16( 22, this.numberOfChannels, true ); // channel count
  view.setUint32( 24, this.sampleRate, true ); // sample rate
  view.setUint32( 28, this.smpleRate * this.bytesPerSample * this.numberOfChannels, true ); // byte rate (sample rate * block align)
  view.setUint16( 32, this.bytesPerSample * this.numberOfChannels, true ); // block align (channel count * bytes per sample)
  view.setUint16( 34, this.bitDepth, true ); // bits per sample
  view.setUint32( 36, 1684108385, false); // data chunk identifier 'data'
  view.setUint32( 40, audioData.byteLength, true ); // data chunk length
  wav.set( audioData, 44 );

  postMessage( wav, [wav.buffer] );
  close();
};
