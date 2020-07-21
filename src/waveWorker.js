"use strict";

const WavePCM = function( config ){

  var config = Object.assign({
    wavBitDepth: 16,
    numberOfChannels: 1,
  }, config);

  if ( !config['wavSampleRate'] ) {
    throw new Error("wavSampleRate value is required to record. NOTE: Audio is not resampled!");
  }

  if ( [8, 16, 24, 32].indexOf( config['wavBitDepth'] ) === -1 ) {
    throw new Error("Only 8, 16, 24 and 32 bits per sample are supported");
  }

  this.numberOfChannels = config['numberOfChannels'];
  this.bitDepth = config['wavBitDepth'];
  this.sampleRate = config['wavSampleRate'];
  this.recordedBuffers = [];
  this.bytesPerSample = this.bitDepth / 8;
};

WavePCM.prototype.record = function( buffers ){
  var bufferLength = buffers[0].length;
  var reducedData = new Uint8Array( bufferLength * this.numberOfChannels * this.bytesPerSample );

  // Interleave
  for ( var i = 0; i < bufferLength; i++ ) {
    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {

      var outputIndex = ( i * this.numberOfChannels + channel ) * this.bytesPerSample;

      // clip the signal if it exceeds [-1, 1]
      var sample = Math.max(-1, Math.min(1, buffers[ channel ][ i ]));

      // bit reduce and convert to integer
      switch ( this.bytesPerSample ) {
        case 4: // 32 bits signed
          sample = sample * 2147483647.5 - 0.5;
          reducedData[ outputIndex ] = sample;
          reducedData[ outputIndex + 1 ] = sample >> 8;
          reducedData[ outputIndex + 2 ] = sample >> 16;
          reducedData[ outputIndex + 3 ] = sample >> 24;
          break;

        case 3: // 24 bits signed
          sample = sample * 8388607.5 - 0.5;
          reducedData[ outputIndex ] = sample;
          reducedData[ outputIndex + 1 ] = sample >> 8;
          reducedData[ outputIndex + 2 ] = sample >> 16;
          break;

        case 2: // 16 bits signed
          sample = sample * 32767.5 - 0.5;
          reducedData[ outputIndex ] = sample;
          reducedData[ outputIndex + 1 ] = sample >> 8;
          break;

        case 1: // 8 bits unsigned
          reducedData[ outputIndex ] = (sample + 1) * 127.5;
          break;

        default:
          throw new Error("Only 8, 16, 24 and 32 bits per sample are supported");
      }
    }
  }

  this.recordedBuffers.push( reducedData );
};

WavePCM.prototype.requestData = function(){
  var bufferLength = this.recordedBuffers[0].length;
  var dataLength = this.recordedBuffers.length * bufferLength;
  var headerLength = 44;
  var wav = new Uint8Array( headerLength + dataLength );
  var view = new DataView( wav.buffer );

  view.setUint32( 0, 1380533830, false ); // RIFF identifier 'RIFF'
  view.setUint32( 4, 36 + dataLength, true ); // file length minus RIFF identifier length and file description length
  view.setUint32( 8, 1463899717, false ); // RIFF type 'WAVE'
  view.setUint32( 12, 1718449184, false ); // format chunk identifier 'fmt '
  view.setUint32( 16, 16, true ); // format chunk length
  view.setUint16( 20, 1, true ); // sample format (raw)
  view.setUint16( 22, this.numberOfChannels, true ); // channel count
  view.setUint32( 24, this.sampleRate, true ); // sample rate
  view.setUint32( 28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true ); // byte rate (sample rate * block align)
  view.setUint16( 32, this.bytesPerSample * this.numberOfChannels, true ); // block align (channel count * bytes per sample)
  view.setUint16( 34, this.bitDepth, true ); // bits per sample
  view.setUint32( 36, 1684108385, false); // data chunk identifier 'data'
  view.setUint32( 40, dataLength, true ); // data chunk length

  for (var i = 0; i < this.recordedBuffers.length; i++ ) {
    wav.set( this.recordedBuffers[i], i * bufferLength + headerLength );
  }

  return {message: 'page', page: wav};
};


// Run in AudioWorkletGlobal scope
if (typeof registerProcessor === 'function') {

  class EncoderWorklet extends AudioWorkletProcessor {

    constructor(){
      super();
      this.continueProcess = true;
      this.port.onmessage = ({ data }) => {
        switch( data['command'] ){

          case 'done':
            if (this.recorder) {
              this.postPage(this.recorder.requestData());
              this.port.postMessage( {message: 'done'} );
              delete this.recorder;
            }
            break;

          case 'close':
            this.continueProcess = false;
            break;

          case 'init':
            this.recorder = new WavePCM( data );
            this.port.postMessage( {message: 'ready'} );
            break;

          default:
            // Ignore any unknown commands and continue recieving commands
        }
      }
    }

    process(inputs) {
      if (this.recorder && inputs[0] && inputs[0].length && inputs[0][0] && inputs[0][0].length){
        this.recorder.record( inputs[0] );
      }
      return this.continueProcess;
    }

    postPage(pageData) {
      if (pageData) {
        this.port.postMessage( pageData, [pageData.page.buffer] );
      }
    }
  }

  registerProcessor('encoder-worklet', EncoderWorklet);
}

// run in scriptProcessor worker scope
else {
  var recorder;
  var postPageGlobal = (pageData) => {
    if (pageData) {
      postMessage( pageData, [pageData.page.buffer] );
    }
  }

  onmessage = ({ data }) => {

    switch( data['command'] ){

      case 'encode':
        if (recorder) {
          recorder.record( data['buffers'] );
        }
        break;

      case 'done':
        if (recorder) {
          postPageGlobal(recorder.requestData());
          postMessage( {message: 'done'} );
          recorder = null;
        }
        break;

      case 'close':
        close();
        break;

      case 'init':
        recorder = new WavePCM( data );
        postMessage( {message: 'ready'} );
        break;

      default:
        // Ignore any unknown commands and continue recieving commands
    }
  };
}


// Exports for unit testing.
var module = module || {};
module.exports = WavePCM;
