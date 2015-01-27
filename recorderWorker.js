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

crcTable = (function(){
  var c;
  var crcTable = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    crcTable[n] = c;
  }
  return crcTable;
})();

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
  for (var i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
};

function getOgg( data ){
  var oggPages = [];
  var pagePackets = [];
  var pagePacketsSize = 0;
  var packetIndex = 0;
  var totalFileSize = 0;

  var oggHeader = getOggIdHeader( oggPages.length );
  var oggComment = getOggCommentHeader( oggPages.length );
  totalFileSize += oggHeader.length + oggComment.length;
  oggPages.push( oggHeader );
  oggPages.push( oggComment );

  while ( packetIndex < data.length ) {

    pagePacketsSize += data[ packetIndex ].byteLength;
    pagePackets.push( data[ packetIndex ] );

    if ( packetIndex === (data.length - 1) || (pagePacketsSize + data[ packetIndex+1 ].byteLength) > 65536 ) {
      var headerType = (packetIndex === (data.length - 1)) ? 4 : 0;
      var page = getOggPage( pagePackets, encoderBufferLength * pagePackets.length, pagePacketsSize, oggPages.length, headerType );
      totalFileSize += page.byteLength;
      oggPages.push( page );
      pagePacketsSize = 0;
      pagePackets = [];
    }

    packetIndex++;
  }

  var oggFile = new Uint8Array( totalFileSize );
  var oggFileOffset = 0;
  for ( var i = 0; i < oggPages.length; i++ ) {
    oggFile.set( oggPages[i], oggFileOffset );
    oggFileOffset += oggPages[i].byteLength;
  }

  return oggFile;
}

function getOggIdHeader( pageIndex ){
  var packetBuffer = new ArrayBuffer( 28 );
  var view = new DataView( packetBuffer );
  var packet = new Uint8Array( packetBuffer );

  writeString( view, 0, 'OpusHead' ); // Magic Signature
  view.setUint8( 8, 1, true ); // Version
  view.setUint8( 9, numberOfChannels, true ); // Channel count
  view.setUint16( 10, 0, true ); // pre-skip
  view.setUint32( 12, outputSampleRate, true ); // original sample rate
  view.setUint16( 16, 0, true ); // output gain
  view.setUint8( 18, 0, true ); // channel map 0 = mono or stereo

  return getOggPage( [packet], -1, packet.length, pageIndex, 2 );
}

function getOggCommentHeader( pageIndex ){
  var vendor = "Recorder.js";
  var packetBuffer = new ArrayBuffer( 12 + vendor.length );
  var view = new DataView( packetBuffer );
  var packet = new Uint8Array( packetBuffer );

  writeString( view, 0, 'OpusTags' ); // Magic Signature
  view.setUint32( 8, vendor.length, true ); // Vendor Length
  writeString( view, 12, vendor ); // Vendor name

  return getOggPage( [packet], -1, packet.length, pageIndex, 0 );
}

function getOggPage( pagePackets, granule, pagePacketSize, pageIndex, headerType ){
  var numberOfPackets = pagePackets.length;
  var packetOffset = 27 + numberOfPackets;
  var pageBuffer = new ArrayBuffer( packetOffset + pagePacketSize );
  var view = new DataView( pageBuffer );
  var page = new Uint8Array( pageBuffer );

  writeString( view, 0, 'OggS' ); // Capture Pattern starts all page headers
  view.setUint8( 4, 0, true ); // Version
  view.setUint8( 5, headerType, true ); // 0 = continuation, 1 = beginning of stream, 2 = end of stream
  view.setUint32( 6, granule >> 32, true ); // Number of samples at 48000 Hz in page or -1. second 32 bits
  view.setUint32( 10, granule, true ); // Number of samples at 48000 Hz in page or -1. first 32 bits
  view.setUint32( 14, 0, true ); // Bitstream serial number
  view.setUint32( 18, pageIndex, true ); // Page sequence number
  view.setUint8( 26, numberOfPackets, true ); // Number of Packets in page.

  for ( var i = 0; i < numberOfPackets; i++ ) {
    view.setUint8( 27 + i, pagePackets[i].length, true ); // Update segment table
    page.set( pagePackets[i], packetOffset ); // Add Packet
    packetOffset += pagePackets[i].length;
  }

  view.setUint32( 22, crc32( page ), true ); // Checksum
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