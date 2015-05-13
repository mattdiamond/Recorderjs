importScripts( 'libopus.js', 'wavepcm.js' );

var OggOpus = function( config ){
  this.numberOfChannels = config.numberOfChannels;
  this.inputSampleRate = config.inputSampleRate;
  this.outputSampleRate = config.outputSampleRate;
  this.onPageComplete = config.onPageComplete || this.onPageComplete;
  this.maxBuffersPerPage = config.recordOpus.maxBuffersPerPage || 40; // Limit latency for streaming
  this.encoderApplication = config.recordOpus.encoderApplication || 2049; // 2048 = Voice, 2049 = Full Band Audio, 2051 = Restricted Low Delay
  this.encoderFrameSize = config.recordOpus.encoderFrameSize || 20; // 20ms frame
  this.bitRate = config.recordOpus.bitRate;
  this.wavepcm = new WavePCM( config );

  this.pageIndex = 0;
  this.granulePosition = 0;
  this.segmentData = new Uint8Array( 65025 );
  this.segmentDataIndex = 0;
  this.segmentTable = new Uint8Array( 255 );
  this.segmentTableIndex = 0;
  this.pages = [];
  this.fileLength = 0;
  this.buffersInPage = 0;

  this.initChecksumTable();
  this.initCodec();
  this.generateIdPage();
  this.generateCommentPage();
};

OggOpus.prototype.encode = function( samples ) {
  var sampleIndex = 0;

  while ( sampleIndex < samples.length ) {

    var lengthToCopy = Math.min( this.encoderBufferLength - this.encoderBufferIndex, samples.length - sampleIndex );
    this.encoderBuffer.set( samples.subarray( sampleIndex, sampleIndex+lengthToCopy ), this.encoderBufferIndex );
    sampleIndex += lengthToCopy;
    this.encoderBufferIndex += lengthToCopy;

    if ( this.encoderBufferIndex === this.encoderBufferLength ) {
      var packetLength = _opus_encode_float( this.encoder, this.encoderBufferPointer, this.encoderSamplesPerChannelPerPacket, this.encoderOutputPointer, this.encoderOutputMaxLength );
      this.segmentPacket( packetLength );
      this.encoderBufferIndex = 0;
    }
  }

  this.buffersInPage++;
  if ( this.buffersInPage >= this.maxBuffersPerPage ) {
    this.generatePage();
  }
};

OggOpus.prototype.encodeFinalFrame = function() {
  this.encode( new Float32Array( this.encoderBufferLength - this.encoderBufferIndex ) );
  this.headerType += 4;
  this.generatePage();
};

OggOpus.prototype.getChecksum = function( data ){
  var checksum = 0;
  for ( var i = 0; i < data.length; i++ ) {
    checksum = (checksum << 8) ^ this.checksumTable[ ((checksum>>>24) & 0xff) ^ data[i] ];
  }
  return checksum >>> 0;
};

OggOpus.prototype.generateCommentPage = function(){
  var segmentDataView = new DataView( this.segmentData.buffer );
  segmentDataView.setUint32( 0, 1332770163, false ) // Magic Signature 'Opus'
  segmentDataView.setUint32( 4, 1415669619, false ) // Magic Signature 'Tags'
  segmentDataView.setUint32( 8, 8, true ); // Vendor Length
  segmentDataView.setUint32( 12, 1382376303, false ); // Vendor name 'Reco'
  segmentDataView.setUint32( 16, 1919182194, false ); // Vendor name 'rder'
  segmentDataView.setUint32( 20, 0, true ); // User Comment List Length
  this.segmentTableIndex = 1;
  this.segmentDataIndex = this.segmentTable[0] = 24;
  this.headerType = 0;
  this.generatePage();
};

OggOpus.prototype.generateIdPage = function(){
  var segmentDataView = new DataView( this.segmentData.buffer );
  segmentDataView.setUint32( 0, 1332770163, false ) // Magic Signature 'Opus'
  segmentDataView.setUint32( 4, 1214603620, false ) // Magic Signature 'Head'
  segmentDataView.setUint8( 8, 1, true ); // Version
  segmentDataView.setUint8( 9, this.numberOfChannels, true ); // Channel count
  segmentDataView.setUint16( 10, 3840, true ); // pre-skip (80ms)
  segmentDataView.setUint32( 12, this.inputSampleRate, true ); // original sample rate
  segmentDataView.setUint16( 16, 0, true ); // output gain
  segmentDataView.setUint8( 18, 0, true ); // channel map 0 = mono or stereo
  this.segmentTableIndex = 1;
  this.segmentDataIndex = this.segmentTable[0] = 19;
  this.headerType = 2;
  this.generatePage();
};

OggOpus.prototype.generatePage = function(){
  var granulePosition = ( this.lastPositiveGranulePosition === this.granulePosition) ? -1 : this.granulePosition;
  var pageBuffer = new ArrayBuffer(  27 + this.segmentTableIndex + this.segmentDataIndex );
  var pageBufferView = new DataView( pageBuffer );
  var page = new Uint8Array( pageBuffer );

  pageBufferView.setUint32( 0, 1332176723, false); // Capture Pattern starts all page headers 'OggS'
  pageBufferView.setUint8( 4, 0, true ); // Version
  pageBufferView.setUint8( 5, this.headerType, true ); // 1 = continuation, 2 = beginning of stream, 4 = end of stream

  // Number of samples upto and including this page at 48000Hz, into 64 bits
  pageBufferView.setUint32( 6, granulePosition, true );
  if ( granulePosition > 4294967296 || granulePosition < 0 ) {
    pageBufferView.setUint32( 10, Math.floor( granulePosition/4294967296 ), true );
  }

  pageBufferView.setUint32( 14, 0, true ); // Bitstream serial number
  pageBufferView.setUint32( 18, this.pageIndex++, true ); // Page sequence number
  pageBufferView.setUint8( 26, this.segmentTableIndex, true ); // Number of segments in page.
  page.set( this.segmentTable.subarray(0, this.segmentTableIndex), 27 ); // Segment Table
  page.set( this.segmentData.subarray(0, this.segmentDataIndex), 27 + this.segmentTableIndex ); // Segment Data
  pageBufferView.setUint32( 22, this.getChecksum( page ), true ); // Checksum

  this.onPageComplete( page );
  this.segmentTableIndex = 0;
  this.segmentDataIndex = 0;
  this.buffersInPage = 0;
  if ( granulePosition > 0 ) {
    this.lastPositiveGranulePosition = granulePosition;
  }
};

OggOpus.prototype.initChecksumTable = function(){
  this.checksumTable = [];
  for ( var i = 0; i < 256; i++ ) {
    var r = i << 24;
    for ( var j = 0; j < 8; j++ ) {
      r = ((r & 0x80000000) != 0) ? ((r << 1) ^ 0x04c11db7) : (r << 1);
    }
    this.checksumTable[i] = (r & 0xffffffff);
  }
};

OggOpus.prototype.initCodec = function() {
  this.encoder = _opus_encoder_create( this.outputSampleRate, this.numberOfChannels, this.encoderApplication, allocate(4, 'i32', ALLOC_STACK) );

  if ( this.bitRate ) {
    var bitRateLocation = _malloc( 4 );
    HEAP32[bitRateLocation >>> 2] = this.bitRate;
    _opus_encoder_ctl( this.encoder, 4002, bitRateLocation );
    _free( bitRateLocation );
  }

  this.encoderBufferIndex = 0;
  this.encoderSamplesPerChannelPerPacket = this.outputSampleRate * this.encoderFrameSize / 1000;
  this.encoderBufferLength = this.encoderSamplesPerChannelPerPacket * this.numberOfChannels;
  this.encoderBufferPointer = _malloc( this.encoderBufferLength * 4 );
  this.encoderBuffer = HEAPF32.subarray( this.encoderBufferPointer >> 2, (this.encoderBufferPointer >> 2) + this.encoderBufferLength );
  this.encoderOutputMaxLength = 4000; 
  this.encoderOutputPointer = _malloc( this.encoderOutputMaxLength );
  this.encoderOutputBuffer = HEAPU8.subarray( this.encoderOutputPointer, this.encoderOutputPointer + this.encoderOutputMaxLength );
};

OggOpus.prototype.onPageComplete = function( page ){
  this.fileLength += page.length;
  this.pages.push( page );
};

OggOpus.prototype.recordBuffers = function( buffers ) {
  this.encode( this.wavepcm.resampleAndInterleave( buffers ) );
};

OggOpus.prototype.requestData = function() {
  var data = new Uint8Array( this.fileLength );
  var offset = 0;
  for ( var i = 0; i < this.pages.length; i++ ) {
    data.set( this.pages[i], offset );
    offset += this.pages[i].length;
  }
  return data;
};

OggOpus.prototype.segmentPacket = function( packetLength ) {
  var packetIndex = 0;

  while ( packetLength >= 0 ) {

    if ( this.segmentTableIndex === 255 ) {
      this.generatePage();
      this.headerType = 1;
    }

    var segmentLength = Math.min( packetLength, 255 );
    this.segmentTable[ this.segmentTableIndex++ ] = segmentLength;
    this.segmentData.set( this.encoderOutputBuffer.subarray( packetIndex, packetIndex + segmentLength ), this.segmentDataIndex );
    this.segmentDataIndex += segmentLength;
    packetIndex += segmentLength;
    packetLength -= 255;
  }

  this.granulePosition += ( 48 * this.encoderFrameSize );
  if ( this.segmentTableIndex === 255 ) {
    this.generatePage();
    this.headerType = 0;
  }
};
