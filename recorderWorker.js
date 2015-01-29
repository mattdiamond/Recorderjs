importScripts('libopus.js');

var audioData = [],
  bitDepth,
  bufferLength,
  bytesPerSample,
  crcTable,
  decoder,
  decoderBufferPointer,
  decoderBuffer,
  decoderOutputMaxLength,
  decoderOutputPointer,
  decoderOutputBuffer,
  encoder,
  encoderBufferLengthPerChannel,
  encoderBufferLength,
  encoderBuffer,
  encoderBufferIndex,
  encoderOutputPointer,
  encoderOutputBuffer,
  encoderOutputMaxLength,
  inputSampleRate,
  interleavedAndResampledBuffer,
  interleavedAndResampledBufferLength,
  numberOfChannels,
  outputSampleRate,
  resampledBufferLength;

this.onmessage = function( e ){
  switch( e.data.command ){

    case 'record':
      opusEncode( e.data.channels );
      break;

    case 'clearEncoderBuffer':
      clearEncoderBuffer();
      break;

    case 'get':
      this.postMessage( audioData );
      break;

    case 'getInterleavedPCM':
      var interleavedData = opusDecode( audioData );
      this.postMessage( interleavedData, [interleavedData.buffer] );
      break;

    case 'getWav':
      var wavData = getWav( audioData );
      this.postMessage( wavData, [wavData.buffer] );
      break;

    case 'getOgg':
      var oggData = getOgg( audioData );
      this.postMessage( oggData, [oggData.buffer] );
      break;

    case 'init':
      init( e.data );
      break;
  }
};

function clearEncoderBuffer() {
  if ( encoderBufferIndex ) {
    var channelData = [];
    channelDataLength = (encoderBufferLength - encoderBufferIndex) / numberOfChannels;
    for ( var channel = 0; channel < numberOfChannels; channel++ ) {
      channelData.push( new Float32Array( channelDataLength ) );
    }
    opusEncode( channelData );
  }
}

function crc32( data ) {
  var crc = 0 ^ (-1);
  for ( var i = 0; i < data.length; i++ ) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}       

function segmentPackets( packets ) {
  var segmentTable = new Uint8Array( 255 );
  var segmentTableIndex = 0;
  var segmentData = new Uint8Array( 65025 );
  var segmentDataIndex = 0;
  var granulePosition = 0;
  var headerType = 0;
  var lastPositiveGranulePosition = 0;
  var output = [];

  var pageComplete = function(){

    output.push({
      segmentTable: new Uint8Array( segmentTable.subarray(0, segmentTableIndex) ),
      segmentData: new Uint8Array( segmentData.subarray(0, segmentDataIndex) ),
      headerType: headerType,
      granulePosition: lastPositiveGranulePosition === granulePosition ? -1 : granulePosition
    });

    segmentTableIndex = 0;
    segmentDataIndex = 0;
    lastPositiveGranulePosition = output[output.length-1].granulePosition === -1 ? lastPositiveGranulePosition : granulePosition;
  };

  for ( var i = 0; i < packets.length; i++ ) {

    var packetLength = packets[i].length
    var remainingPacketLength = packetLength;
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

    granulePosition += encoderBufferLengthPerChannel;
  }

  headerType += 4;
  pageComplete();

  return output;
}

function getOgg( data ){
  var oggPages = [];
  var page;
  var segmentData = segmentPackets( data );
  var totalFileSize = 0;

  page = getOggIdPage( oggPages.length );
  totalFileSize += page.length
  oggPages.push( page );

  page = getOggCommentPage( oggPages.length );
  totalFileSize += page.length;
  oggPages.push( page );

  for ( var i = 0; i < segmentData.length; i++ ) {
    page = getOggPage( segmentData[i].headerType, segmentData[i].granulePosition, oggPages.length, segmentData[i].segmentTable, segmentData[i].segmentData );
    totalFileSize += page.length;
    oggPages.push( page );
  }

  var oggFile = new Uint8Array( totalFileSize );
  var oggFileOffset = 0;
  for ( var i = 0; i < oggPages.length; i++ ) {
    oggFile.set( oggPages[i], oggFileOffset );
    oggFileOffset += oggPages[i].length;
  }

  return oggFile;
}

function getOggIdPage( pageIndex ){
  var segmentDataBuffer = new ArrayBuffer( 19 );
  var segmentDataView = new DataView( segmentDataBuffer );
  var segmentData = new Uint8Array( segmentDataBuffer );
  var segmentTable = new Uint8Array(1);

  segmentTable[0] = segmentData.length;
  writeString( segmentDataView, 0, 'OpusHead' ); // Magic Signature
  segmentDataView.setUint8( 8, 1, true ); // Version
  segmentDataView.setUint8( 9, numberOfChannels, true ); // Channel count
  segmentDataView.setUint16( 10, 3840, true ); // pre-skip (80ms)
  segmentDataView.setUint32( 12, inputSampleRate, true ); // original sample rate
  segmentDataView.setUint16( 16, 0, true ); // output gain
  segmentDataView.setUint8( 18, 0, true ); // channel map 0 = mono or stereo

  return getOggPage( 2, 0, pageIndex, segmentTable, segmentData );
}

function getOggCommentPage( pageIndex ){
  var vendor = "Recorder.js";
  var vendorLength = vendor.length;
  var segmentDataBuffer = new ArrayBuffer( 16 + vendorLength );
  var segmentDataView = new DataView( segmentDataBuffer );
  var segmentData = new Uint8Array( segmentDataBuffer );
  var segmentTable = new Uint8Array(1);

  segmentTable[0] = segmentData.length;
  writeString( segmentDataView, 0, 'OpusTags' ); // Magic Signature
  segmentDataView.setUint32( 8, vendorLength, true ); // Vendor Length
  writeString( segmentDataView, 12, vendor ); // Vendor name
  segmentDataView.setUint32( 12 + vendorLength, 0, true ); // User Comment List Length

  return getOggPage( 0, 0, pageIndex, segmentTable, segmentData );
}

function getOggPage( headerType, granulePosition, pageIndex, segmentTable, segmentData ){
  var numberOfSegments = segmentTable.length;
  var pageBuffer = new ArrayBuffer(  27 + numberOfSegments + segmentData.length );
  var pageBufferView = new DataView( pageBuffer );
  var page = new Uint8Array( pageBuffer );

  writeString( pageBufferView, 0, 'OggS' ); // Capture Pattern starts all page headers
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
  pageBufferView.setUint32( 22, crc32( page ), true ); // Checksum

  return page;
}

function getWav( data ){
  var interleavedData = opusDecode( data );
  var dataLength = interleavedData.byteLength;
  var header = getWavHeader( dataLength );
  var wav = new Uint16Array( header.byteLength + dataLength );

  wav.set( header );
  wav.set( interleavedData, header.byteLength );

  return wav;
}

function getWavHeader( dataLength ) {
  var header = new ArrayBuffer( 44 );
  var view = new DataView( header );

  writeString( view, 0, 'RIFF' ); // RIFF identifier 'RIFF'
  view.setUint32( 4, 36 + dataLength, true ); // file length
  writeString( view, 8, 'WAVE' ); // RIFF type 'WAVE'
  writeString( view, 12, 'fmt ' ); // format chunk identifier 'fmt'
  view.setUint32( 16, 16, true ); // format chunk length 
  view.setUint16( 20, 1, true ); // sample format (raw)
  view.setUint16( 22, numberOfChannels, true ); // channel count
  view.setUint32( 24, outputSampleRate, true ); // sample rate
  view.setUint32( 28, outputSampleRate * bytesPerSample * numberOfChannels, true ); // byte rate (sample rate * block align)
  view.setUint16( 32, bytesPerSample * numberOfChannels, true ); // block align (channel count * bytes per sample)
  view.setUint16( 34, bitDepth, true ); // bits per sample
  writeString( view, 36, 'data' ); // data chunk identifier 'data'
  view.setUint32( 40, dataLength, true ); // data chunk length

  return new Uint16Array( header );
}

function init( config ){
  bitDepth = 16;
  bytesPerSample = bitDepth / 8;
  outputSampleRate = 48000;
  numberOfChannels = config.numberOfChannels;
  inputSampleRate = config.inputSampleRate;
  bufferLength = config.bufferLength;
  resampledBufferLength = Math.round( bufferLength * outputSampleRate / inputSampleRate );
  resampleRatio = (bufferLength-1) / (resampledBufferLength-1);
  interleavedAndResampledBufferLength = resampledBufferLength * numberOfChannels;
  interleavedAndResampledBuffer = new Float32Array( interleavedAndResampledBufferLength );
  initEncoder();
  initDecoder();
  initCRCTable();
}

function initCRCTable(){
  var c;
  crcTable = [];
  for ( var n = 0; n < 256; n++ ) {
    c = n;
    for ( var k = 0; k < 8; k++ ) {
      c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    crcTable[n] = c;
  }
}

function initDecoder(){
  decoder = _opus_decoder_create( outputSampleRate, numberOfChannels, allocate(4, 'i32', ALLOC_STACK) );
  decoderBufferPointer = _malloc( encoderOutputMaxLength );
  decoderBuffer = HEAPU8.subarray( decoderBufferPointer, decoderBufferPointer + encoderOutputMaxLength );
  decoderOutputMaxLength = encoderBufferLength * 2;
  decoderOutputPointer = _malloc( decoderOutputMaxLength );
  decoderOutputBuffer = HEAP16.subarray( decoderOutputPointer >> 1, (decoderOutputPointer + decoderOutputMaxLength) >> 1 );
}

function initEncoder(){
  var encoderFrameSize = 20;
  var encoderApplication = 2049; // 2049 = Full Band Audio
  encoder = _opus_encoder_create( outputSampleRate, numberOfChannels, encoderApplication, allocate(4, 'i32', ALLOC_STACK) );
  encoderBufferLengthPerChannel = outputSampleRate * encoderFrameSize / 1000
  encoderBufferLength = encoderBufferLengthPerChannel * numberOfChannels;
  encoderBufferPointer = _malloc( encoderBufferLength * 4 );
  encoderBuffer = HEAPF32.subarray( encoderBufferPointer >> 2, (encoderBufferPointer >> 2) + encoderBufferLength );
  encoderBufferIndex = 0;
  encoderOutputMaxLength = 4000;
  encoderOutputPointer = _malloc( encoderOutputMaxLength );
  encoderOutputBuffer = HEAPU8.subarray( encoderOutputPointer, encoderOutputPointer + encoderOutputMaxLength );
}

function interleaveAndResample( channels ) {
  for (var i = 0; i < bufferLength - 1; i++ ) {
    var ir = i*resampleRatio;
    var op = Math.floor(ir);
    for ( var channel = 0; channel < numberOfChannels; channel++ ) {
      var channelData = channels[ channel ];
      interleavedAndResampledBuffer[i*numberOfChannels+channel] = channelData[op] + (channelData[op+1]-channelData[op]) * (ir-op);
    }
  }

  for ( var channel = 0; channel < numberOfChannels; channel++ ) {
    interleavedAndResampledBuffer[ resampledBufferLength - numberOfChannels + channel ] = channels[ channel ][ bufferLength-1 ];
  }

  return interleavedAndResampledBuffer;
}

function opusDecode( opusPackets ) {
  var audioDataLength = opusPackets.length;
  var outputSampleLength;
  var decodelen;
  var decodedAudio = [];
  var totalSampleLength = 0;

  for ( var i = 0; i < audioDataLength; i++ ) {
    packet = opusPackets[i];
    decoderBuffer.set( packet );
    outputSampleLength = _opus_decode( decoder, decoderBufferPointer, packet.byteLength, decoderOutputPointer, decoderOutputMaxLength, 0) * numberOfChannels;
    totalSampleLength += outputSampleLength;
    outputSamples = new Uint16Array( outputSampleLength );
    outputSamples.set( decoderOutputBuffer.subarray(0, outputSampleLength) );
    decodedAudio.push( outputSamples );
  }

  var outputData = new Uint16Array( totalSampleLength );
  var outputIndex = 0;
  for (var i = 0; i < decodedAudio.length; i++ ) {
    outputData.set( decodedAudio[i], outputIndex );
    outputIndex += decodedAudio[i].length;
  }

  return outputData;
}

function opusEncode( channels ) {
  var resampledBuffer = interleaveAndResample( channels );
  var resampledIndex = 0;
  var resampledLengthToCopy;
  var outputPacket;
  var outputPacketLength;

  while ( resampledIndex < interleavedAndResampledBufferLength ) {
    
    resampledLengthToCopy = Math.min( encoderBufferLength - encoderBufferIndex, interleavedAndResampledBufferLength - resampledIndex );
    encoderBuffer.set( resampledBuffer.subarray( resampledIndex, resampledIndex+resampledLengthToCopy ), encoderBufferIndex );
    resampledIndex += resampledLengthToCopy;
    encoderBufferIndex += resampledLengthToCopy;

    if ( encoderBufferIndex === encoderBufferLength ) {
      outputPacketLength = _opus_encode_float( encoder, encoderBufferPointer, encoderBufferLengthPerChannel, encoderOutputPointer, encoderOutputMaxLength );
      outputPacket = new Uint8Array( outputPacketLength );
      outputPacket.set( encoderOutputBuffer.subarray(0, outputPacketLength) );
      audioData.push( outputPacket );
      encoderBufferIndex = 0;
    }
  }
}

function writeString( view, offset, string ){
  for ( var i = 0; i < string.length; i++ ){
    view.setUint8( offset + i, string.charCodeAt(i) );
  }
}