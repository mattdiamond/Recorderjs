this.onmessage = function( e ){
  var worker = this;
  switch( e.data.command ){

    case 'recordBuffers':
      worker.recorder.recordBuffers( e.data.buffers );
      break;

    case 'requestData':
      worker.recorder.requestData()
      break;

    case 'stop':
      worker.close();
      break;

    case 'start':
      importScripts( 'oggopusEncoder.js' );
      worker.recorder = new OggOpusEncoder( e.data, worker );
      break;
  }
};
