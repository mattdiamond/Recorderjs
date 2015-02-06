importScripts( 'libopus.js', 'wavepcm.js' );

var OggOpus = function( config ){

  this.numberOfChannels = config.numberOfChannels;
  this.inputSampleRate = config.inputSampleRate;
  this.outputSampleRate = config.outputSampleRate = 48000;
  this.bitDepth = config.bitDepth = 16;
  this.encoderApplication = config.encoderApplication || 2049; // 2048 = Voice, 2049 = Full Band Audio, 2051 = Restricted Low Delay
  this.encoderFrameSize = config.encoderFrameSize || 20; // 20ms frame
  this.samplesPerChannelPerPacket = this.outputSampleRate * this.encoderFrameSize / 1000;
  this.wavepcm = new WavePCM( config );
  this.packets = [];

  this.initChecksumTable();
  this.initCodec();
};

OggOpus.prototype.decode = function( packets ) {
  var outputSampleLength;
  var decodedAudio = new Int16Array( packets.length * this.encoderBufferLength );

  for ( var i = 0; i < packets.length; i++ ) {
    this.decoderBuffer.set( packets[i] );
    outputSampleLength = _opus_decode( this.decoder, this.decoderBufferPointer, packets[i].byteLength, this.decoderOutputPointer, this.decoderOutputMaxLength, 0);
    decodedAudio.set( this.decoderOutputBuffer, i*this.encoderBufferLength );
  }

  return new Uint8Array( decodedAudio.buffer );
};

OggOpus.prototype.encode = function( samples ) {
  var outputPackets = [];
  var sampleIndex = 0;
  var lengthToCopy;
  var outputPacketLength;

  while ( sampleIndex < samples.length ) {

    lengthToCopy = Math.min( this.encoderBufferLength - this.encoderBufferIndex, samples.length - sampleIndex );
    this.encoderBuffer.set( samples.subarray( sampleIndex, sampleIndex+lengthToCopy ), this.encoderBufferIndex );
    sampleIndex += lengthToCopy;
    this.encoderBufferIndex += lengthToCopy;

    if ( this.encoderBufferIndex === this.encoderBufferLength ) {
      outputPacketLength = _opus_encode_float( this.encoder, this.encoderBufferPointer, this.encoderBufferLengthPerChannel, this.encoderOutputPointer, this.encoderOutputMaxLength );
      outputPackets.push( new Uint8Array( this.encoderOutputBuffer.subarray(0, outputPacketLength) ) );
      this.encoderBufferIndex = 0;
    }
  }

  return outputPackets;
};

OggOpus.prototype.encodeFinalFrame = function() {
  return this.encode( new Float32Array( this.encoderBufferLength - this.encoderBufferIndex ) );
};

OggOpus.prototype.get = function( format ){
  switch( format ){
    case "ogg":
      return this.getFile( this.segmentPackets( this.packets ) );

    case "wav":
      return this.wavepcm.getFile( this.decode( this.packets ) );

    default:
      throw "Unsupported format: " + format;
  }
};

OggOpus.prototype.getChecksum = function( data ){
  var checksum = 0;
  for ( var i = 0; i < data.length; i++ ) {
    checksum = (checksum << 8) ^ this.checksumTable[ ((checksum>>>24) & 0xff) ^ data[i] ];
  }
  return checksum >>> 0;
};

OggOpus.prototype.getCommentPage = function( pageIndex ){
  var segmentDataBuffer = new ArrayBuffer( 24 );
  var segmentDataView = new DataView( segmentDataBuffer );
  var segmentData = new Uint8Array( segmentDataBuffer );
  var segmentTable = new Uint8Array(1);

  segmentTable[0] = segmentData.length;
  segmentDataView.setUint32( 0, 1332770163, false ) // Magic Signature 'Opus'
  segmentDataView.setUint32( 4, 1415669619, false ) // Magic Signature 'Tags'
  segmentDataView.setUint32( 8, 8, true ); // Vendor Length
  segmentDataView.setUint32( 12, 1382376303, false ); // Vendor name 'Reco'
  segmentDataView.setUint32( 16, 1919182194, false ); // Vendor name 'rder'
  segmentDataView.setUint32( 20, 0, true ); // User Comment List Length

  return this.getPage( 0, 0, pageIndex, segmentTable, segmentData );
};

OggOpus.prototype.getFile = function( pageData ){
  var lastPage = pageData[ pageData.length-1 ];
  var oggFile = new Uint8Array( lastPage.fileOffset + lastPage.segmentTable.length + lastPage.segmentData.length + 27 );
  var oggPageIndex = 0;

  oggFile.set( this.getIdPage( oggPageIndex++ ) );
  oggFile.set( this.getCommentPage( oggPageIndex++ ), 47 );

  for ( var i = 0; i < pageData.length; i++ ) {
    oggFile.set( this.getPage(
      pageData[i].headerType,
      pageData[i].granulePosition,
      oggPageIndex++,
      pageData[i].segmentTable,
      pageData[i].segmentData
    ), pageData[i].fileOffset );
  }

  return oggFile;
};

OggOpus.prototype.getIdPage = function( pageIndex ){
  var segmentDataBuffer = new ArrayBuffer( 19 );
  var segmentDataView = new DataView( segmentDataBuffer );
  var segmentData = new Uint8Array( segmentDataBuffer );
  var segmentTable = new Uint8Array(1);

  segmentTable[0] = segmentData.length;
  segmentDataView.setUint32( 0, 1332770163, false ) // Magic Signature 'Opus'
  segmentDataView.setUint32( 4, 1214603620, false ) // Magic Signature 'Head'
  segmentDataView.setUint8( 8, 1, true ); // Version
  segmentDataView.setUint8( 9, this.numberOfChannels, true ); // Channel count
  segmentDataView.setUint16( 10, 3840, true ); // pre-skip (80ms)
  segmentDataView.setUint32( 12, this.inputSampleRate, true ); // original sample rate
  segmentDataView.setUint16( 16, 0, true ); // output gain
  segmentDataView.setUint8( 18, 0, true ); // channel map 0 = mono or stereo

  return this.getPage( 2, 0, pageIndex, segmentTable, segmentData );
};

OggOpus.prototype.getPage = function( headerType, granulePosition, pageIndex, segmentTable, segmentData ){
  var numberOfSegments = segmentTable.length;
  var pageBuffer = new ArrayBuffer(  27 + numberOfSegments + segmentData.length );
  var pageBufferView = new DataView( pageBuffer );
  var page = new Uint8Array( pageBuffer );

  pageBufferView.setUint32( 0, 1332176723, false); // Capture Pattern starts all page headers 'OggS'
  pageBufferView.setUint8( 4, 0, true ); // Version
  pageBufferView.setUint8( 5, headerType, true ); // 1 = continuation, 2 = beginning of stream, 4 = end of stream

  // Number of samples upto and including this page at 48000 Hz into 64 bits
  pageBufferView.setUint32( 6, granulePosition, true );
  if ( granulePosition > 4294967296 || granulePosition < 0 ) {
    pageBufferView.setUint32( 10, Math.floor( granulePosition/4294967296 ), true );
  }

  pageBufferView.setUint32( 14, 0, true ); // Bitstream serial number
  pageBufferView.setUint32( 18, pageIndex, true ); // Page sequence number
  pageBufferView.setUint8( 26, numberOfSegments, true ); // Number of segments in page.
  page.set( segmentTable, 27 ); // Segment Table
  page.set( segmentData, 27 + numberOfSegments ); // Segment Data
  pageBufferView.setUint32( 22, this.getChecksum( page ), true ); // Checksum

  return page;
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
  this.encoderBufferIndex = 0;
  this.encoderBufferLengthPerChannel = this.outputSampleRate * this.encoderFrameSize / 1000
  this.encoderBufferLength = this.encoderBufferLengthPerChannel * this.numberOfChannels;
  this.encoderBufferPointer = _malloc( this.encoderBufferLength * 4 );
  this.encoderBuffer = HEAPF32.subarray( this.encoderBufferPointer >> 2, (this.encoderBufferPointer >> 2) + this.encoderBufferLength );
  this.encoderOutputMaxLength = 4000; 
  this.encoderOutputPointer = _malloc( this.encoderOutputMaxLength );
  this.encoderOutputBuffer = HEAPU8.subarray( this.encoderOutputPointer, this.encoderOutputPointer + this.encoderOutputMaxLength );

  this.decoder = _opus_decoder_create( this.outputSampleRate, this.numberOfChannels, allocate(4, 'i32', ALLOC_STACK) );
  this.decoderBufferPointer = _malloc( this.encoderOutputMaxLength );
  this.decoderBuffer = HEAPU8.subarray( this.decoderBufferPointer, this.decoderBufferPointer + this.encoderOutputMaxLength );
  this.decoderOutputMaxLength = this.encoderBufferLength * 2; // 2 bytes per sample
  this.decoderOutputPointer = _malloc( this.decoderOutputMaxLength );
  this.decoderOutputBuffer = HEAP16.subarray( this.decoderOutputPointer >> 1, (this.decoderOutputPointer + this.decoderOutputMaxLength) >> 1 );
};

OggOpus.prototype.recordBuffers = function( buffers ) {
  this.packets.push.apply( this.packets, this.encode( this.wavepcm.resampleAndInterleave( buffers ) ) );
};

OggOpus.prototype.segmentPackets = function( packets ) {
  var segmentTable = new Uint8Array( 255 );
  var segmentTableIndex = 0;
  var segmentData = new Uint8Array( 65025 );
  var segmentDataIndex = 0;
  var granulePosition = 0;
  var headerType = 0;
  var lastPositiveGranulePosition = 0;
  var segmentedPackets = [];
  var fileOffset = 99; // size of comment and id page
  var pageComplete = function(){

    segmentedPackets.push({
      segmentTable: new Uint8Array( segmentTable.subarray(0, segmentTableIndex) ),
      segmentData: new Uint8Array( segmentData.subarray(0, segmentDataIndex) ),
      headerType: headerType,
      granulePosition: (lastPositiveGranulePosition === granulePosition) ? -1 : granulePosition,
      fileOffset: fileOffset
    });

    fileOffset += 27 + segmentTableIndex + segmentDataIndex;
    segmentTableIndex = 0;
    segmentDataIndex = 0;
    if ( segmentedPackets[segmentedPackets.length-1].granulePosition !== -1 ) {
      lastPositiveGranulePosition = granulePosition;
    }
  };

  for ( var i = 0; i < packets.length; i++ ) {
    var remainingPacketLength = packets[i].length;
    var packetIndex = 0;

    while ( remainingPacketLength >= 0 ) {

      if ( segmentTableIndex === 255 ) {
        pageComplete();
        headerType = ( remainingPacketLength >= 255 ) ? 1 : 0;
      }

      var dataLength = Math.min( remainingPacketLength, 255 );
      segmentData.set( packets[i].subarray( packetIndex, dataLength ), segmentDataIndex );
      segmentTable[ segmentTableIndex++ ] = dataLength;
      packetIndex += dataLength;
      segmentDataIndex += dataLength;
      remainingPacketLength -= 255;
    }

    granulePosition += this.samplesPerChannelPerPacket;
  }

  headerType += 4;
  pageComplete();

  return segmentedPackets;
};