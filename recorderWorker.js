var audioData = [],
  numberOfChannels,
  inputSampleRate,
  outputSampleRate,
  bufferLength,
  bitDepth,
  bytesPerSample,
  resampledBufferLength,
  resampleRatio;

this.onmessage = function( e ){
  switch( e.data.command ){

    case 'record':
      for (var channel = 0; channel < numberOfChannels; channel++) {
        audioData[ channel ].push( bitReduce( resample( e.data.channels[ channel ] ) ) );
      }
      break;

    case 'get':
      this.postMessage( audioData );
      break;

    case 'getInterleaved':
      var interleavedData = interleave( audioData );
      this.postMessage( interleavedData, [interleavedData.buffer] );
      break;

    case 'getWav':
      var wavData = getWav( audioData );
      this.postMessage( wavData, [wavData.buffer] );
      break;

    case 'init':
      init( e.data );
      break;
  }
};

function bitReduce( data ){

  var outputData = new Uint8Array( resampledBufferLength * bytesPerSample );
  var outputIndex = 0;

  for ( var i = 0; i < resampledBufferLength; i++ ) {

    var sample = data[i];
    if ( sample > 1 ) sample = 1;
    else if ( sample < -1 ) sample = -1;

    switch ( bytesPerSample ) {
      case 4:
        sample = sample * 2147483648;
        outputData[ outputIndex++ ] = sample;
        outputData[ outputIndex++ ] = sample >>> 8;
        outputData[ outputIndex++ ] = sample >>> 16;
        outputData[ outputIndex++ ] = sample >>> 24;
        break;

      case 3:
        sample = sample * 8388608;
        outputData[ outputIndex++ ] = sample;
        outputData[ outputIndex++ ] = sample >>> 8;
        outputData[ outputIndex++ ] = sample >>> 16;
        break;

      case 2:
        sample = sample * 32768;
        outputData[ outputIndex++ ] = sample;
        outputData[ outputIndex++ ] = sample >>> 8;
        break;

      case 1:
        outputData[ outputIndex++ ] = (sample+1) * 128;
        break;

      default:
        throw "Only 8, 16, 24 and 32 bits per sample are supported";
    }
  }

  return outputData;
}

function getWav( data ){
  var interleavedData = interleave( data );
  var dataLength = interleavedData.byteLength;
  var header = getWavHeader( dataLength );
  var wav = new Uint8Array( header.byteLength + dataLength );
  wav.set( header );
  wav.set( interleavedData, header.byteLength );
  return wav;
}

function getWavHeader( dataLength ) {
  var header = new ArrayBuffer( 44 );
  var view = new DataView( header );

  writeString( view, 0, 'RIFF' ); // RIFF identifier 'RIFF'
  view.setUint32( 4, 36 + dataLength, true ); // file length
  writeString( view, 8, 'WAVE' ); // RIFF type 'WAVE'
  writeString( view, 12, 'fmt ' ); // format chunk identifier 'fmt'
  view.setUint32( 16, 16, true ); // format chunk length 
  view.setUint16( 20, 1, true ); // sample format (raw)
  view.setUint16( 22, numberOfChannels, true ); // channel count
  view.setUint32( 24, outputSampleRate, true ); // sample rate
  view.setUint32( 28, outputSampleRate * bytesPerSample * numberOfChannels, true ); // byte rate (sample rate * block align)
  view.setUint16( 32, bytesPerSample * numberOfChannels, true ); // block align (channel count * bytes per sample)
  view.setUint16( 34, bitDepth, true ); // bits per sample
  writeString( view, 36, 'data' ); // data chunk identifier 'data'
  view.setUint32( 40, dataLength, true ); // data chunk length

  return new Uint8Array( header );
}

function init( config ){
  numberOfChannels = config.numberOfChannels;
  inputSampleRate = config.inputSampleRate;
  outputSampleRate = config.outputSampleRate;
  bitDepth = config.bitDepth;
  bufferLength = config.bufferLength;
  bytesPerSample = bitDepth / 8;
  resampledBufferLength = Math.round( (bufferLength * outputSampleRate) / inputSampleRate );
  resampleRatio = (bufferLength-1) / (resampledBufferLength-1);

  if ( outputSampleRate === inputSampleRate ) {
    resample = function( data ){ return data; };
  }

  for ( var channel = 0; channel < numberOfChannels; channel++ ) { 
    audioData[ channel ] = [];
  }
}

function interleave( data ){

  var numBlocks = data[0].length;
  var blockSize = resampledBufferLength * bytesPerSample;
  var interleavedData = new Uint8Array( numBlocks * numberOfChannels * blockSize );
  var interleavedIndex = 0;

  for ( var blockIndex = 0; blockIndex < numBlocks; blockIndex++ ) {
    var byteIndex = 0;
    while ( byteIndex < blockSize ) {
      for ( var channel = 0; channel < numberOfChannels; channel++ ) {
        switch ( bytesPerSample ) {
          case 4: interleavedData[ interleavedIndex+3 ] = data[ channel ][ blockIndex ][ byteIndex+3 ];
          case 3: interleavedData[ interleavedIndex+2 ] = data[ channel ][ blockIndex ][ byteIndex+2 ];
          case 2: interleavedData[ interleavedIndex+1 ] = data[ channel ][ blockIndex ][ byteIndex+1 ];
          case 1: interleavedData[ interleavedIndex ] = data[ channel ][ blockIndex ][ byteIndex ];
          default: interleavedIndex += bytesPerSample;
        }
      }
      byteIndex += bytesPerSample;
    }
  }

  return interleavedData;
}

function resample( data ){
  var resampledData = new Float32Array( resampledBufferLength );
  resampledData[resampledBufferLength-1] = data[bufferLength-1];

  for ( var i = 0; i < resampledBufferLength-1; i++ ) {
    var ir = i*resampleRatio;
    var op = Math.floor(ir);
    resampledData[i] = data[op] + (data[op+1]-data[op]) * (ir%1);
  }

  return resampledData;
}

function writeString( view, offset, string ){
  for ( var i = 0; i < string.length; i++ ){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}