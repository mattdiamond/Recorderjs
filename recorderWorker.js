this.onmessage = function( e ){
  switch( e.data.command ){

    case 'recordBuffers':
      this.recorder.recordBuffers( e.data.buffers );
      break;

    case 'requestData':
      var data = this.recorder.requestData();
      this.postMessage( data, [data.buffer] );
      break;

    case 'stop':
      this.close();
      break;

    case 'start':
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