"use strict";

var decoder;
self['onmessage'] = function( e ){
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
  }
};

var OggOpusDecoder = function( config ){
  this.bufferLength = config['bufferLength'] || 4096;
  this.decoderSampleRate = config['decoderSampleRate'] || 48000;
  this.outputBufferSampleRate = config['outputBufferSampleRate'] || 48000;
  this.resampleQuality = config['resampleQuality'] || 3;
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
          var resampledLength = Math.ceil( outputSampleLength * this.outputBufferSampleRate / this.decoderSampleRate );
          HEAP32[ this.decoderOutputLengthPointer >> 2 ] = outputSampleLength;
          HEAP32[ this.resampleOutputLengthPointer >> 2 ] = resampledLength;
          _speex_resampler_process_interleaved_float( this.resampler, this.decoderOutputPointer, this.decoderOutputLengthPointer, this.resampleOutputBufferPointer, this.resampleOutputLengthPointer );
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
    _opus_decoder_destroy( this.decoder );
    _free( this.decoderBufferPointer );
    _free( this.decoderOutputLengthPointer );
    _free( this.decoderOutputPointer );
  }

  var errReference = _malloc( 4 );
  this.decoder = _opus_decoder_create( this.decoderSampleRate, this.numberOfChannels, errReference );
  _free( errReference );

  this.decoderBufferMaxLength = 4000;
  this.decoderBufferPointer = _malloc( this.decoderBufferMaxLength );
  this.decoderBuffer = HEAPU8.subarray( this.decoderBufferPointer, this.decoderBufferPointer + this.decoderBufferMaxLength );
  this.decoderBufferIndex = 0;

  this.decoderOutputLengthPointer = _malloc( 4 );
  this.decoderOutputMaxLength = this.decoderSampleRate * this.numberOfChannels * 120 / 1000; // Max 120ms frame size
  this.decoderOutputPointer = _malloc( this.decoderOutputMaxLength * 4 ); // 4 bytes per sample
};

OggOpusDecoder.prototype.initResampler = function() {

  if ( this.resampler ) {
    _speex_resampler_destroy( this.resampler );
    _free( this.resampleOutputLengthPointer );
    _free( this.resampleOutputBufferPointer );
  }

  var errLocation = _malloc( 4 );
  this.resampler = _speex_resampler_init( this.numberOfChannels, this.decoderSampleRate, this.outputBufferSampleRate, this.resampleQuality, errLocation );
  _free( errLocation );

  this.resampleOutputLengthPointer = _malloc( 4 );
  this.resampleOutputMaxLength = Math.ceil( this.decoderOutputMaxLength * this.outputBufferSampleRate / this.decoderSampleRate );
  this.resampleOutputBufferPointer = _malloc( this.resampleOutputMaxLength * 4 ); // 4 bytes per sample
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
  self['postMessage'](null);
  self['close']();
};

OggOpusDecoder.prototype.sendToOutputBuffers = function( mergedBuffers ){
  var dataIndex = 0;
  var mergedBufferLength = mergedBuffers.length / this.numberOfChannels;

  while ( dataIndex < mergedBufferLength ) {
    var amountToCopy = Math.min( mergedBufferLength - dataIndex, this.bufferLength - this.outputBufferIndex );

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

    if ( this.outputBufferIndex == this.bufferLength ) {
      self['postMessage']( this.outputBuffers, this.outputBufferArrayBuffers );
      this.resetOutputBuffers();
    }
  }
};
