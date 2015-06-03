 var WavePCM = function( config, worker ){

  this.worker = worker;
  this.originalSampleRate = config.originalSampleRate;
  this.bufferLength = config.bufferLength;
  this.bitDepth = config.bitDepth || 16;
  this.numberOfChannels = config.numberOfChannels;
  this.resampledRate = config.resampledRate;

  this.recordedBuffers = [];
  this.bytesPerSample = this.bitDepth / 8;
  this.resampledBufferLength = Math.round( this.bufferLength * this.resampledRate / this.originalSampleRate );
  this.resampleRatio = this.bufferLength / this.resampledBufferLength;

  this.resamplerCache = [];
  for ( var i = 0; i < this.numberOfChannels; i++ ){
    this.resamplerCache[i] = [0,0];
  }

  if ( this.resampledRate === this.originalSampleRate ) {
    this.resample = function( buffer ) { return buffer; };
  }

  if ( this.numberOfChannels === 1 ) {
    this.interleave = function( buffers ) { return buffers[0]; };
    this.deinterleave = function( mergedBuffers ) { return [mergedBuffers]; };
  }
};

WavePCM.prototype.createFile = function( audioData ){
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
  var outputData = new buffers[0].constructor( this.resampledBufferLength * buffers.length );

  for ( var i = 0; i < this.resampledBufferLength; i++ ) {
    for ( var channel = 0; channel < buffers.length; channel++ ) {
      outputData[ i * buffers.length + channel ] = buffers[ channel ][ i ];
    }
  }

  return outputData;
};

WavePCM.prototype.deinterleave = function( mergedBuffers ) {
  var outputData = [];
  
  for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {
    outputData[ channel ] = new mergedBuffers.constructor( mergedBuffers.length / this.numberOfChannels );
  }

  for ( var i = 0; i < mergedBuffers.length; i++ ) {
    outputData[ i % this.numberOfChannels ] = mergedBuffers[i];
  }

  return outputData;
};

WavePCM.prototype.resample = function( buffer, channel ) {
  var outputData = new buffer.constructor( this.resampledBufferLength );

  for ( var i = 0; i < this.resampledBufferLength - 1; i++ ) {
    var resampleValue = (this.resampleRatio - 1) + (i * this.resampleRatio);
    var nearestPoint = Math.round( resampleValue );

    for ( var tap = -1; tap < 2; tap++ ) {
      var sampleValue = buffer[ nearestPoint + tap ] || resamplerCache[ channel ][ 1 + tap ] || buffer[ nearestPoint ];
      outputData[ i ] += sampleValue * this.magicKernel( resampleValue - nearestPoint - tap );
    }
  }

  resamplerCache[ channel ][0] = buffer[ this.bufferLength - 2 ];
  resamplerCache[ channel ][1] = outputData[ this.resampledBufferLength - 1 ] = buffer[ this.bufferLength - 1 ];

  return outputData;
};