 "use strict";

 var Resampler = function( config ){
  this.originalSampleRate = config.originalSampleRate;
  this.numberOfChannels = config.numberOfChannels;
  this.resampledRate = config.resampledRate;
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
  var resampledBufferLength = Math.round( buffer.length * this.resampledRate / this.originalSampleRate );
  var resampleRatio = buffer.length / resampledBufferLength;
  var outputData = new Float32Array( resampledBufferLength );

  for ( var i = 0; i < resampledBufferLength - 1; i++ ) {
    var resampleValue = ( resampleRatio - 1 ) + ( i * resampleRatio );
    var nearestPoint = Math.round( resampleValue );

    for ( var tap = -1; tap < 2; tap++ ) {
      var sampleValue = buffer[ nearestPoint + tap ] || this.lastSampleCache[ channel ][ 1 + tap ] || buffer[ nearestPoint ];
      outputData[ i ] += sampleValue * this.magicKernel( resampleValue - nearestPoint - tap );
    }
  }

  this.lastSampleCache[ channel ][ 0 ] = buffer[ buffer.length - 2 ];
  this.lastSampleCache[ channel ][ 1 ] = outputData[ resampledBufferLength - 1 ] = buffer[ buffer.length - 1 ];

  return outputData;
};
