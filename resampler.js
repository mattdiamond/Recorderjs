 var Resampler = function( config ){

  this.originalSampleRate = config.originalSampleRate;
  this.bufferLength = config.bufferLength;
  this.numberOfChannels = config.numberOfChannels;
  this.resampledRate = config.resampledRate;
  this.resampledBufferLength = Math.round( this.bufferLength * this.resampledRate / this.originalSampleRate );
  this.resampleRatio = this.bufferLength / this.resampledBufferLength;
  this.lastSampleCache = [];

  for ( var i = 0; i < this.numberOfChannels; i++ ){
    this.lastSampleCache[i] = [0,0];
  }

  if ( this.resampledRate === this.originalSampleRate ) {
    this.resample = function( buffer ) { return buffer; };
  }
};

// From http://johncostella.webs.com/magic/
Resampler.prototype.magicKernel = function( x ) {
  if ( x < -0.5 ) {
    return 0.5 * ( x + 1.5 ) * ( x + 1.5 );
  }
  else if ( x > 0.5 ) {
    return 0.5 * ( x - 1.5 ) * ( x - 1.5 );
  }
  return 0.75 - ( x * x );
};

Resampler.prototype.resample = function( buffer, channel ) {
  var outputData = new buffer.constructor( this.resampledBufferLength );

  for ( var i = 0; i < this.resampledBufferLength - 1; i++ ) {
    var resampleValue = ( this.resampleRatio - 1 ) + ( i * this.resampleRatio );
    var nearestPoint = Math.round( resampleValue );

    for ( var tap = -1; tap < 2; tap++ ) {
      var sampleValue = buffer[ nearestPoint + tap ] || this.lastSampleCache[ channel ][ 1 + tap ] || buffer[ nearestPoint ];
      outputData[ i ] += sampleValue * this.magicKernel( resampleValue - nearestPoint - tap );
    }
  }

  this.lastSampleCache[ channel ][ 0 ] = buffer[ this.bufferLength - 2 ];
  this.lastSampleCache[ channel ][ 1 ] = outputData[ this.resampledBufferLength - 1 ] = buffer[ this.bufferLength - 1 ];

  return outputData;
};