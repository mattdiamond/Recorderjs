 var WavePCM = function( config, worker ){

  this.worker = worker;
  this.originalSampleRate = config.originalSampleRate;
  this.bufferLength = config.bufferLength;
  this.bitDepth = config.bitDepth;
  this.numberOfChannels = config.numberOfChannels;
  this.resampledRate = config.resampledRate;

  this.recordedBuffers = [];
  this.bytesPerSample = this.bitDepth / 8;
  this.resampledBufferLength = Math.round( this.bufferLength * this.resampledRate / this.originalSampleRate );
  this.resampleRatio = this.bufferLength / this.resampledBufferLength;

  this.cachedSamples = [];
  for ( var i = 0; i < this.numberOfChannels; i++ ){
    this.cachedSamples[i] = [0,0];
  }

  if ( this.resampledRate === this.originalSampleRate ) {
    this.resample = function( buffer ) { return buffer; };
  }

  if ( this.numberOfChannels === 1 ) {
    this.interleave = function( buffers ) { return buffers[0]; };
    this.deinterleave = function( mergedBuffers ) { return [mergedBuffers]; };
  }
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

WavePCM.prototype.getFile = function( audioData ){
  var buffer = new ArrayBuffer( 44 + audioData.byteLength );
  var view = new DataView( buffer );
  var file = new Uint8Array( buffer );

  view.setUint32( 0, 1179011410, true ); // RIFF identifier 'RIFF'
  view.setUint32( 4, 36 + audioData.byteLength, true ); // file length minus RIFF identifier length and file description length
  view.setUint32( 8, 1163280727, true ); // RIFF type 'WAVE'
  view.setUint32( 12, 544501094, true ); // format chunk identifier 'fmt '
  view.setUint32( 16, 16, true ); // format chunk length 
  view.setUint16( 20, 1, true ); // sample format (raw)
  view.setUint16( 22, this.numberOfChannels, true ); // channel count
  view.setUint32( 24, this.resampledRate, true ); // sample rate
  view.setUint32( 28, this.resampledRate * this.bytesPerSample * this.numberOfChannels, true ); // byte rate (sample rate * block align)
  view.setUint16( 32, this.bytesPerSample * this.numberOfChannels, true ); // block align (channel count * bytes per sample)
  view.setUint16( 34, this.bitDepth, true ); // bits per sample
  view.setUint32( 36, 1635017060, true); // data chunk identifier 'data'
  view.setUint32( 40, audioData.byteLength, true ); // data chunk length
  file.set( audioData, 44 );

  return file;
};

WavePCM.prototype.mergeBuffers = function( buffers ) {
  var bytesPerChunk = this.resampledBufferLength * this.numberOfChannels * this.bytesPerSample;
  var mergedBuffers = new Uint8Array( buffers.length * bytesPerChunk );

  for (var i = 0; i < buffers.length; i++ ) {
    mergedBuffers.set( buffers[i], i*bytesPerChunk );
  }

  return mergedBuffers;
};

WavePCM.prototype.recordBuffers = function( buffers ){
  this.recordedBuffers.push( this.bitReduce( this.resampleAndInterleave( buffers ) ) );
};

WavePCM.prototype.requestData = function(){
  var data = this.getFile( this.mergeBuffers( this.recordedBuffers ) );
  this.worker.postMessage( data, [data.buffer] );
};

// From http://johncostella.webs.com/magic/
WavePCM.prototype.magicKernel = function( x ) {
  if ( x < -0.5 ) {
    return 0.5 * ( x + 1.5 ) * ( x + 1.5 );
  }
  else if ( x > 0.5 ) {
    return 0.5 * ( x - 1.5 ) * ( x - 1.5 );
  }
  return 0.75 - ( x * x );
};

WavePCM.prototype.interleave = function( buffers ) {
  var outputData = new Float32Array( this.resampledBufferLength * this.numberOfChannels );

  for ( var i = 0; i < this.resampledBufferLength; i++ ) {
    var resampleValue = (this.resampleRatio - 1) + (i * this.resampleRatio);
    var nearestPoint = Math.round( resampleValue );

    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {
      var channelData = buffers[ channel ];

      for ( var tap = -1; tap < 2; tap++ ) {
        var sampleValue = channelData[ nearestPoint + tap ] || this.cachedSamples[channel][ 1 + tap ] || channelData[ nearestPoint ];
        outputData[ i * this.numberOfChannels + channel ] += sampleValue * this.magicKernel( resampleValue - nearestPoint - tap );
      }
    }
  }

  return outputData;
};

WavePCM.prototype.deinterleave = function( mergedBuffers ) {
  var outputData = new Float32Array( this.mergedBuffers / this.numberOfChannels );

  for ( var i = 0; i < this.resampledBufferLength; i++ ) {
    var resampleValue = (this.resampleRatio - 1) + (i * this.resampleRatio);
    var nearestPoint = Math.round( resampleValue );

    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {
      var channelData = buffers[ channel ];

      for ( var tap = -1; tap < 2; tap++ ) {
        var sampleValue = channelData[ nearestPoint + tap ] || this.cachedSamples[channel][ 1 + tap ] || channelData[ nearestPoint ];
        outputData[ i * this.numberOfChannels + channel ] += sampleValue * this.magicKernel( resampleValue - nearestPoint - tap );
      }
    }
  }

  for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {
    this.cachedSamples[channel][0] = buffers[channel][ this.bufferLength - 2 ];
    this.cachedSamples[channel][1] = outputData[ this.resampledBufferLength - 1 ] = buffers[channel][ this.bufferLength - 1 ];
  }

  return outputData;
};

WavePCM.prototype.resample = function( buffer ) {
  var outputData = new Float32Array( this.resampledBufferLength );

  for ( var i = 0; i < this.resampledBufferLength - 1; i++ ) {
    var resampleValue = (this.resampleRatio - 1) + (i * this.resampleRatio);
    var nearestPoint = Math.round( resampleValue );

    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {
      var channelData = buffers[ channel ];

      for ( var tap = -1; tap < 2; tap++ ) {
        var sampleValue = channelData[ nearestPoint + tap ] || this.cachedSamples[channel][ 1 + tap ] || channelData[ nearestPoint ];
        outputData[ i * this.numberOfChannels + channel ] += sampleValue * this.magicKernel( resampleValue - nearestPoint - tap );
      }
    }
  }

  for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {
    this.cachedSamples[channel][0] = buffers[channel][ this.bufferLength - 2 ];
    this.cachedSamples[channel][1] = outputData[ this.resampledBufferLength - 1 ] = buffers[channel][ this.bufferLength - 1 ];
  }

  return outputData;
};