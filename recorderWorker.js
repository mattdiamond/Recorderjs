this.onmessage = function( e ){
  switch( e.data.command ){

    case 'recordBuffers':
      this.recorder.recordBuffers( e.data.buffers );
      break;

    case 'get':
      var data = this.recorder.get( e.data.format );
      this.postMessage( data, [data.buffer] );
      break;

    case 'doneRecording':
      if ( this.recorder instanceof OggOpus ) {
        this.recorder.encodeFinalFrame();
      }
      break;

    case 'init':
      if ( e.data.recordOpus ) {
        importScripts( 'oggopus.js' );
        this.recorder = new OggOpus( e.data );
      }
      else {
        importScripts( 'wavepcm.js' );
        this.recorder = new WavePCM( e.data );
      }
      break;
  }
};