importScripts( 'libopus.js', 'resampler.js' );

var OggOpusDecoder = function( config, worker ){
  this.sampleRate = config.resampledrate = config.sampleRate || 48000;
  this.bufferLength = config.bufferLength || 4098;
  this.outputBuffers = [];
  this.worker = worker;
  this.decoderSampleRate = config.originalSampleRate = 48000;
  this.resampler = new Resampler( config );

  if ( this.numberOfChannels === 1 ) {
    this.deinterleave = function( mergedBuffers ) { return [mergedBuffers]; };
  }
};

OggOpusDecoder.prototype.decode = function( typedArray ) {
  this.getPageBoundaries( typedArray.buffer ).map( function( pageStart, index, pages ) {

    var pageEnd = pages[ index + 1 ] || typedArray.length;
    var dataView = new DataView( typedArray.buffer, pageEnd - pageStart, pageStart );
    var headerType = dataView.getUint8( 5 );
    var pageIndex = dataView.getUint32( 18 );

    // Beginning of stream
    if ( headerType & 2 ) {
      this.numberOfChannels = dataView.getUint8( 37 );
      this.resetOutputBuffers();
      this.initCodec();
    }

    if ( pageIndex > 1 ) {

      var segmentTableLength = dataView.getUint8( 26 );
      var segmentTableIndex = pageStart + 27 + segmentTableLength;

      for ( var i = 0; i < segmentTableLength; i++ ) {

        var packetLength = dataView.getUint8( 27 + i );
        this.decoderBuffer.set( typedArray.subarray( segmentTableIndex, segmentTableIndex += packetLength ), this.decoderBufferIndex );
        this.decoderBufferIndex += packetLength;

        if ( packetLength < 255 ) {
          var outputSampleLength = _opus_decode_float( this.decoder, this.decoderBufferPointer, this.decoderBufferIndex, this.decoderOutputPointer, this.decoderOutputMaxLength, 0);
          this.parseDecodedData( this.decoderOutputBuffer.subarray( 0, outputSampleLength ) );
          this.decoderBufferIndex = 0;
        }
      }
    }

    // End of stream
    if ( headerType & 4 ) {
      this.sendLastBuffer();
      this.worker.close();
    }
  }, this);
};

OggOpusDecoder.prototype.deinterleave = function( mergedBuffers ) {
  var deinterleavedData = [];
  var lengthDeinterleaved = mergedBuffers.length / this.numberOfChannels;

  for ( var i = 0; i < this.numberOfChannels; i++ ) {
    deinterleavedData.push( new Float32Array( lengthDeinterleaved ) );
  }

  for ( var i = 0; i < mergedBuffers.length; i++ ) {
    var channel = i % this.numberOfChannels;
    this.outputBuffers[ channel ][ this.outputBufferIndex ] = mergedBuffers[ i ];
    this.outputBufferIndex += ( channel == deinterleavedData.length - 1 ) ? 1 : 0;
  }

  return deinterleavedData;
};

OggOpusDecoder.prototype.getPageBoundaries = function( typedArray ){
  var dataView = new DataView( typedArray.buffer );
  var pages = [];

  for ( var i = 0; i < dataView.length; i++ ) {
    if ( dataView.getUint32( i ) == 1399285583 ) {
      pages.push( i );
    }
  }

  return pages;
};

OggOpusDecoder.prototype.initCodec = function() {
  this.decoder = _opus_decoder_create( this.decoderSampleRate, this.numberOfChannels, allocate(4, 'i32', ALLOC_STACK) );
  this.decoderBufferMaxLength = 4000;
  this.decoderBufferPointer = _malloc( this.decoderBufferMaxLength );
  this.decoderBuffer = HEAPU8.subarray( this.decoderBufferPointer, this.decoderBufferPointer + this.decoderOutputMaxLength );
  this.decoderBufferIndex = 0;
  this.decoderOutputMaxLength = this.decoderSampleRate * this.numberOfChannels * 60 / 1000; // Max 60ms frame size 
  this.decoderOutputPointer = _malloc( this.decoderOutputMaxLength * 4 ); // 4 bytes per sample
  this.decoderOutputBuffer = HEAPF32.subarray( this.decoderOutputPointer >> 2, ( this.decoderOutputPointer >> 2 ) + this.decoderOutputMaxLength );
};

OggOpusDecoder.prototype.parseDecodedData = function(  ){
  var deinterleavedData = this.deinterleavedData( mergedBuffers );

  for ( var i = 0; i < deinterleavedData.length; i++ ) {
    deinterleavedData[ i ] = this.resampler.resample( deinterleavedData[i], i );
  }
  
  // Copy until buffer full, then publish

  this.worker.postMessage( this.outputBuffers, this.outputBufferArrayBuffers );
};

OggOpusDecoder.prototype.resetOutputBuffers = function(){
  this.outputBuffers = [];
  this.outputBufferArrayBuffers = [];
  this.outputBufferIndex = 0;
  for ( var i = 0; i < this.numberOfChannels; i++ ) {
    this.outputBuffers.push( new Float32Array( this.bufferLength ) );
    this.outputBufferArrayBuffers.push( this.outputBuffers[i].buffer );
  }
};

OggOpusDecoder.prototype.sendLastBuffer = function(){

};
