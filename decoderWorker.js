this.onmessage = function( e ){
  var worker = this;
  switch( e.data.command ){

    case 'decode':
      worker.decoder.decode( e.data.data );
      break;

    case 'stop':
      worker.close();
      break;

    case 'start':
      importScripts( 'oggopusDecoder.js' );
      worker.decoder = new OggOpusDecoder( e.data, worker );
      break;
  }
};
