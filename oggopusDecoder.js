importScripts( 'libopus.js', 'resampler.js' );

var OggOpusDecoder = function( config, worker ){
  this.worker = worker;
  this.bufferLength = config.bufferLength || 4096;
  this.decoderSampleRate = config.originalSampleRate = config.decoderSampleRate || 48000;
  this.outputBuffers = [];
  config.resampledrate = config.outputBufferSampleRate || 48000;
  this.resampler = new Resampler( config );
};

OggOpusDecoder.prototype.decode = function( typedArray ) {
  var dataView = new DataView( typedArray.buffer );
  this.getPageBoundaries( dataView ).map( function( pageStart ) {
    var headerType = dataView.getUint8( pageStart + 5 );
    var pageIndex = dataView.getUint32( pageStart + 18 );

    // Beginning of stream
    if ( headerType & 2 ) {
      this.numberOfChannels = dataView.getUint8( pageStart + 37 );
      this.resetOutputBuffers();
      this.initCodec();
      if ( this.numberOfChannels === 1 ) {
        this.deinterleave = function( mergedBuffers ) { return [mergedBuffers]; };
      }
    }

    // Decode page
    if ( pageIndex > 1 ) {
      var segmentTableLength = dataView.getUint8( pageStart + 26 );
      var segmentTableIndex = pageStart + 27 + segmentTableLength;

      for ( var i = 0; i < segmentTableLength; i++ ) {
        var packetLength = dataView.getUint8( pageStart + 27 + i );
        this.decoderBuffer.set( typedArray.subarray( segmentTableIndex, segmentTableIndex += packetLength ), this.decoderBufferIndex );
        this.decoderBufferIndex += packetLength;

        if ( packetLength < 255 ) {
          var outputSampleLength = _opus_decode_float( this.decoder, this.decoderBufferPointer, this.decoderBufferIndex, this.decoderOutputPointer, this.decoderOutputMaxLength, 0);
          this.sendToOutputBuffers( this.decoderOutputBuffer.subarray( 0, outputSampleLength ) );
          this.decoderBufferIndex = 0;
        }
      }
    }

    // End of stream
    if ( headerType & 4 ) {
      this.sendLastBuffer();
      this.worker.close();
    }
  }, this );
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

OggOpusDecoder.prototype.getPageBoundaries = function( dataView ){
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
  this.sendToOutputBuffers( new Float32Array( ( this.bufferLength - this.outputBufferIndex ) * this.numberOfChannels ) );
};

OggOpusDecoder.prototype.sendToOutputBuffers = function( mergedBuffers ){
  var data = this.deinterleave( mergedBuffers );
  var dataIndex = 0;

  for ( var i = 0; i < data.length; i++ ) {
    data[i] = this.resampler.resample( data[i], i );
  }

  while ( dataIndex < data[0].length ) {
    var amountToCopy = Math.min( data[0].length - dataIndex, this.bufferLength - this.outputBufferIndex );

    for ( var i = 0; i < data.length; i++ ) {
      this.outputBuffers[i].set( data[i].subarray( dataIndex, amountToCopy ), outputBufferIndex );
    }

    this.outputBufferIndex += amountToCopy;
    dataIndex += amountToCopy;

    if ( this.outputBufferIndex == this.bufferLength ) {
      this.worker.postMessage( this.outputBuffers, this.outputBufferArrayBuffers );
      this.resetOutputBuffers();
    }
  }
};
