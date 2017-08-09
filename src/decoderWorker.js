"use strict";

var decoder;
global['onmessage'] = function( e ){
  switch( e['data']['command'] ){

    case 'decode':
      if (decoder){
        decoder.decode( e['data']['pages'] );
      }
      break;

    case 'done':
      if (decoder) {
        decoder.sendLastBuffer();
      }
      break;

    case 'init':
      decoder = new OggOpusDecoder( e['data'] );
      break;

    default:
      // Ignore any unknown commands and continue recieving commands
  }
};

var OggOpusDecoder = function( config ){

  this.config = Object.assign({ 
    bufferLength: 4096, // Define size of outgoing buffer
    decoderSampleRate: 48000, // Desired decoder sample rate.
    outputBufferSampleRate: 48000, // Desired output sample rate. Audio will be resampled
    resampleQuality: 3, // Value between 0 and 10 inclusive. 10 being highest quality.
  }, config );

  this.outputBuffers = [];
};

OggOpusDecoder._opus_decoder_create = _opus_decoder_create;
OggOpusDecoder._opus_decoder_destroy = _opus_decoder_destroy;
OggOpusDecoder._speex_resampler_process_interleaved_float = _speex_resampler_process_interleaved_float;
OggOpusDecoder._speex_resampler_init = _speex_resampler_init;
OggOpusDecoder._speex_resampler_destroy = _speex_resampler_destroy;
OggOpusDecoder._opus_decode_float = _opus_decode_float;
OggOpusDecoder._free = _free;
OggOpusDecoder._malloc = _malloc;

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
          var outputSampleLength = OggOpusDecoder._opus_decode_float( this.decoder, this.decoderBufferPointer, this.decoderBufferIndex, this.decoderOutputPointer, this.decoderOutputMaxLength, 0);
          var resampledLength = Math.ceil( outputSampleLength * this.config.outputBufferSampleRate / this.config.decoderSampleRate );
          HEAP32[ this.decoderOutputLengthPointer >> 2 ] = outputSampleLength;
          HEAP32[ this.resampleOutputLengthPointer >> 2 ] = resampledLength;
          OggOpusDecoder._speex_resampler_process_interleaved_float( this.resampler, this.decoderOutputPointer, this.decoderOutputLengthPointer, this.resampleOutputBufferPointer, this.resampleOutputLengthPointer );
          this.sendToOutputBuffers( HEAPF32.subarray( this.resampleOutputBufferPointer >> 2, (this.resampleOutputBufferPointer >> 2) + resampledLength * this.numberOfChannels ) );
          this.decoderBufferIndex = 0;
        }
      }
    }
  }, this );
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
  this.initResampler();
};

OggOpusDecoder.prototype.initCodec = function() {

  if ( this.decoder ) {
    OggOpusDecoder._opus_decoder_destroy( this.decoder );
    OggOpusDecoder._free( this.decoderBufferPointer );
    OggOpusDecoder._free( this.decoderOutputLengthPointer );
    OggOpusDecoder._free( this.decoderOutputPointer );
  }

  var errReference = OggOpusDecoder._malloc( 4 );
  this.decoder = OggOpusDecoder._opus_decoder_create( this.config.decoderSampleRate, this.numberOfChannels, errReference );
  OggOpusDecoder._free( errReference );

  this.decoderBufferMaxLength = 4000;
  this.decoderBufferPointer = OggOpusDecoder._malloc( this.decoderBufferMaxLength );
  this.decoderBuffer = HEAPU8.subarray( this.decoderBufferPointer, this.decoderBufferPointer + this.decoderBufferMaxLength );
  this.decoderBufferIndex = 0;

  this.decoderOutputLengthPointer = OggOpusDecoder._malloc( 4 );
  this.decoderOutputMaxLength = this.config.decoderSampleRate * this.numberOfChannels * 120 / 1000; // Max 120ms frame size
  this.decoderOutputPointer = OggOpusDecoder._malloc( this.decoderOutputMaxLength * 4 ); // 4 bytes per sample
};

OggOpusDecoder.prototype.initResampler = function() {

  if ( this.resampler ) {
    OggOpusDecoder._speex_resampler_destroy( this.resampler );
    OggOpusDecoder._free( this.resampleOutputLengthPointer );
    OggOpusDecoder._free( this.resampleOutputBufferPointer );
  }

  var errLocation = OggOpusDecoder._malloc( 4 );
  this.resampler = OggOpusDecoder._speex_resampler_init( this.numberOfChannels, this.config.decoderSampleRate, this.config.outputBufferSampleRate, this.config.resampleQuality, errLocation );
  OggOpusDecoder._free( errLocation );

  this.resampleOutputLengthPointer = OggOpusDecoder._malloc( 4 );
  this.resampleOutputMaxLength = Math.ceil( this.decoderOutputMaxLength * this.config.outputBufferSampleRate / this.config.decoderSampleRate );
  this.resampleOutputBufferPointer = OggOpusDecoder._malloc( this.resampleOutputMaxLength * 4 ); // 4 bytes per sample
};

OggOpusDecoder.prototype.resetOutputBuffers = function(){
  this.outputBuffers = [];
  this.outputBufferArrayBuffers = [];
  this.outputBufferIndex = 0;

  for ( var i = 0; i < this.numberOfChannels; i++ ) {
    this.outputBuffers.push( new Float32Array( this.config.bufferLength ) );
    this.outputBufferArrayBuffers.push( this.outputBuffers[i].buffer );
  }
};

OggOpusDecoder.prototype.sendLastBuffer = function(){
  this.sendToOutputBuffers( new Float32Array( ( this.config.bufferLength - this.outputBufferIndex ) * this.numberOfChannels ) );
  global['postMessage'](null);
  global['close']();
};

OggOpusDecoder.prototype.sendToOutputBuffers = function( mergedBuffers ){
  var dataIndex = 0;
  var mergedBufferLength = mergedBuffers.length / this.numberOfChannels;

  while ( dataIndex < mergedBufferLength ) {
    var amountToCopy = Math.min( mergedBufferLength - dataIndex, this.config.bufferLength - this.outputBufferIndex );

    if (this.numberOfChannels === 1) {
      this.outputBuffers[0].set( mergedBuffers.subarray( dataIndex, dataIndex + amountToCopy ), this.outputBufferIndex );
    }

    // Deinterleave
    else {
      for ( var i = 0; i < amountToCopy; i++ ) {
        this.outputBuffers.forEach( function( buffer, channelIndex ) {
          buffer[ this.outputBufferIndex + i ] = mergedBuffers[ ( dataIndex + i ) * this.numberOfChannels + channelIndex ];
        }, this);
      }
    }

    dataIndex += amountToCopy;
    this.outputBufferIndex += amountToCopy;

    if ( this.outputBufferIndex == this.config.bufferLength ) {
      global['postMessage']( this.outputBuffers, this.outputBufferArrayBuffers );
      this.resetOutputBuffers();
    }
  }
};


module.exports = OggOpusDecoder;
