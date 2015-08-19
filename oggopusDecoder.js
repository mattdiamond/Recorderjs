"use strict";
importScripts( 'libopus.js', 'resampler.js' );

var decoder;
onmessage = function( e ){
  switch( e.data.command ){

    case 'decode':
      if (decoder){
        decoder.decode( e.data.pages );
      }
      break;

    case 'done':
      if (decoder) {
        decoder.sendLastBuffer();
      }
      break;

    case 'init':
      decoder = new OggOpusDecoder( e.data );
      break;
  }
};

var OggOpusDecoder = function( config ){
  this.bufferLength = config.bufferLength || 4096;
  this.decoderSampleRate = config.decoderSampleRate || 48000;
  this.outputBufferSampleRate = config.outputBufferSampleRate || 48000;
  this.outputBuffers = [];
};

OggOpusDecoder.prototype.decode = function( typedArray ) {
  var dataView = new DataView( typedArray.buffer );
  this.getPageBoundaries( dataView ).map( function( pageStart ) {
    var headerType = dataView.getUint8( pageStart + 5, true );
    var pageIndex = dataView.getUint32( pageStart + 18, true );

    // Beginning of stream
    if ( headerType & 2 ) {
      this.numberOfChannels = dataView.getUint8( pageStart + 37, true );
      this.init();
    }

    // Decode page
    if ( pageIndex > 1 ) {
      var segmentTableLength = dataView.getUint8( pageStart + 26, true );
      var segmentTableIndex = pageStart + 27 + segmentTableLength;

      for ( var i = 0; i < segmentTableLength; i++ ) {
        var packetLength = dataView.getUint8( pageStart + 27 + i, true );
        this.decoderBuffer.set( typedArray.subarray( segmentTableIndex, segmentTableIndex += packetLength ), this.decoderBufferIndex );
        this.decoderBufferIndex += packetLength;

        if ( packetLength < 255 ) {
          var outputSampleLength = _opus_decode_float( this.decoder, this.decoderBufferPointer, this.decoderBufferIndex, this.decoderOutputPointer, this.decoderOutputMaxLength, 0);
          this.sendToOutputBuffers( this.decoderOutputBuffer.subarray( 0, outputSampleLength * this.numberOfChannels ) );
          this.decoderBufferIndex = 0;
        }
      }
    }
  }, this );
};

OggOpusDecoder.prototype.deinterleave = function( mergedBuffers ) {
  var deinterleavedData = [];
  var deinterleavedDataIndex = 0;

  for ( var i = 0; i < this.numberOfChannels; i++ ) {
    deinterleavedData.push( new Float32Array( mergedBuffers.length / this.numberOfChannels ) );
  }

  for ( var i = 0; i < mergedBuffers.length; i++ ) {
    var channel = i % this.numberOfChannels;
    deinterleavedData[ channel ][ deinterleavedDataIndex ] = mergedBuffers[ i ];
    deinterleavedDataIndex += ( channel == deinterleavedData.length - 1 ) ? 1 : 0;
  }

  return deinterleavedData;
};

OggOpusDecoder.prototype.getPageBoundaries = function( dataView ){
  var pageBoundaries = [];

  for ( var i = 0; i < dataView.byteLength - 32; i++ ) {
    if ( dataView.getUint32( i, true ) == 1399285583 ) {
      pageBoundaries.push( i );
    }
  }

  return pageBoundaries;
};

OggOpusDecoder.prototype.init = function(){
  this.resetOutputBuffers();
  this.initCodec();

  this.resampler = new Resampler({
    resampledRate: this.outputBufferSampleRate,
    originalSampleRate: this.decoderSampleRate,
    numberOfChannels: this.numberOfChannels
  });

  if ( this.numberOfChannels === 1 ) {
    this.deinterleave = function( mergedBuffers ) { return [mergedBuffers]; };
  }
};

OggOpusDecoder.prototype.initCodec = function() {
  this.decoder = _opus_decoder_create( this.decoderSampleRate, this.numberOfChannels, allocate(4, 'i32', ALLOC_STACK) );
  this.decoderBufferMaxLength = 4000;
  this.decoderBufferPointer = _malloc( this.decoderBufferMaxLength );
  this.decoderBuffer = HEAPU8.subarray( this.decoderBufferPointer, this.decoderBufferPointer + this.decoderBufferMaxLength );
  this.decoderBufferIndex = 0;
  this.decoderOutputMaxLength = this.decoderSampleRate * this.numberOfChannels * 120 / 1000; // Max 120ms frame size
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
  postMessage(null);
  close();
};

OggOpusDecoder.prototype.sendToOutputBuffers = function( mergedBuffers ){
  var data = this.deinterleave( mergedBuffers );
  var dataIndex = 0;

  for ( var channel = 0; channel < data.length; channel++ ) {
    data[ channel ] = this.resampler.resample( data[ channel ], channel );
  }

  while ( dataIndex < data[0].length ) {
    var amountToCopy = Math.min( data[0].length - dataIndex, this.bufferLength - this.outputBufferIndex );

    for ( var i = 0; i < data.length; i++ ) {
      this.outputBuffers[i].set( data[i].subarray( dataIndex, dataIndex + amountToCopy ), this.outputBufferIndex );
    }

    this.outputBufferIndex += amountToCopy;
    dataIndex += amountToCopy;

    if ( this.outputBufferIndex == this.bufferLength ) {
      postMessage( this.outputBuffers, this.outputBufferArrayBuffers );
      this.resetOutputBuffers();
    }
  }
};
