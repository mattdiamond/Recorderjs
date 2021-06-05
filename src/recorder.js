"use strict";

var AudioContext = global.AudioContext || global.webkitAudioContext;


// Constructor
var Recorder = function( config = {} ){

  if ( !Recorder.isRecordingSupported() ) {
    throw new Error("Recording is not supported in this browser");
  }

  this.state = "inactive";
  this.config = Object.assign({
    bufferLength: 4096,
    encoderApplication: 2049,
    encoderFrameSize: 20,
    encoderPath: 'encoderWorker.min.js',
    encoderSampleRate: 48000,
    maxFramesPerPage: 40,
    mediaTrackConstraints: true,
    monitorGain: 0,
    numberOfChannels: 1,
    recordingGain: 1,
    resampleQuality: 3,
    streamPages: false,
    wavBitDepth: 16,
    sourceNode: { context: null },
  }, config );

  this.encodedSamplePosition = 0;
  this.initAudioContext();
  this.initialize = this.initWorklet().then(() => this.initEncoder());
};


// Static Methods
Recorder.isRecordingSupported = function(){
  const getUserMediaSupported = global.navigator && global.navigator.mediaDevices && global.navigator.mediaDevices.getUserMedia;
  return AudioContext && getUserMediaSupported && global.WebAssembly;
};

Recorder.version = '8.0.4';


// Instance Methods
Recorder.prototype.clearStream = function(){
  if ( this.stream ){

    if ( this.stream.getTracks ) {
      this.stream.getTracks().forEach(track => track.stop());
    }

    else {
      this.stream.stop();
    }
  }
};

Recorder.prototype.close = function() {
  this.monitorGainNode.disconnect();
  this.recordingGainNode.disconnect();

  if (this.sourceNode) {
    this.sourceNode.disconnect();
  }

  this.clearStream();

  if (this.encoder) {
    this.encoderNode.disconnect();
    this.encoder.postMessage({ command: "close" });
  }

  if ( !this.config.sourceNode.context ){
    return this.audioContext.close();
  }

  return Promise.resolve();
}

Recorder.prototype.encodeBuffers = function( inputBuffer ){
  if ( this.state === "recording" ) {
    var buffers = [];
    for ( var i = 0; i < inputBuffer.numberOfChannels; i++ ) {
      buffers[i] = inputBuffer.getChannelData(i);
    }

    this.encoder.postMessage({
      command: "encode",
      buffers: buffers
    });
  }
};

Recorder.prototype.initAudioContext = function(){
  this.audioContext = this.config.sourceNode.context ? this.config.sourceNode.context : new AudioContext();

  this.monitorGainNode = this.audioContext.createGain();
  this.setMonitorGain( this.config.monitorGain );

  this.recordingGainNode = this.audioContext.createGain();
  this.setRecordingGain( this.config.recordingGain );
};

Recorder.prototype.initEncoder = function() {

  if (this.audioContext.audioWorklet) {
    this.encoderNode = new AudioWorkletNode(this.audioContext, 'encoder-worklet', { numberOfOutputs: 0 });
    this.encoder = this.encoderNode.port;
  }

  else {
    console.log('audioWorklet support not detected. Falling back to scriptProcessor');

    // Skip the first buffer
    this.encodeBuffers = () => delete this.encodeBuffers;

    this.encoderNode = this.audioContext.createScriptProcessor( this.config.bufferLength, this.config.numberOfChannels, this.config.numberOfChannels );
    this.encoderNode.onaudioprocess = ({ inputBuffer }) => this.encodeBuffers( inputBuffer );
    this.encoderNode.connect( this.audioContext.destination ); // Requires connection to destination to process audio
    this.encoder = new global.Worker(this.config.encoderPath);
  }
};

Recorder.prototype.initSourceNode = function(){
  if ( this.config.sourceNode.context ) {
    this.sourceNode = this.config.sourceNode;
    return Promise.resolve();
  }

  return global.navigator.mediaDevices.getUserMedia({ audio : this.config.mediaTrackConstraints }).then( stream => {
    this.stream = stream;
    this.sourceNode = this.audioContext.createMediaStreamSource( stream );
  });
};

Recorder.prototype.initWorker = function(){
  var onPage = (this.config.streamPages ? this.streamPage : this.storePage).bind(this);

  this.recordedPages = [];
  this.totalLength = 0;

  return new Promise(resolve => {
    var callback = ({ data }) => {
      switch( data['message'] ){
        case 'ready':
          resolve();
          break;
        case 'page':
          this.encodedSamplePosition = data['samplePosition'];
          onPage(data['page']);
          break;
        case 'done':
          this.encoder.removeEventListener( "message", callback );
          this.finish();
          break;
      }
    };

    this.encoder.addEventListener( "message", callback );

    // must call start for messagePort messages
    if( this.encoder.start ) {
      this.encoder.start()
    }

    // exclude sourceNode
    const {sourceNode, ...config} = this.config;

    this.encoder.postMessage( Object.assign({
      command: 'init',
      originalSampleRate: this.audioContext.sampleRate,
      wavSampleRate: this.audioContext.sampleRate
    }, config));
  });
};

Recorder.prototype.initWorklet = function() {
  if (this.audioContext.audioWorklet) {
    return this.audioContext.audioWorklet.addModule(this.config.encoderPath);
  }

  return Promise.resolve();
}

Recorder.prototype.pause = function( flush ) {
  if ( this.state === "recording" ) {

    this.state = "paused";
    this.recordingGainNode.disconnect();

    if ( flush && this.config.streamPages ) {
      return new Promise(resolve => {

        var callback = ({ data }) => {
          if ( data["message"] === 'flushed' ) {
            this.encoder.removeEventListener( "message", callback );
            this.onpause();
            resolve();
          }
        };
        this.encoder.addEventListener( "message", callback );

        // must call start for messagePort messages
        if ( this.encoder.start ) {
          this.encoder.start()
        }

        this.encoder.postMessage( { command: "flush" } );
      });
    }
    this.onpause();
    return Promise.resolve();
  }
};

Recorder.prototype.resume = function() {
  if ( this.state === "paused" ) {
    this.state = "recording";
    this.recordingGainNode.connect(this.encoderNode);
    this.onresume();
  }
};

Recorder.prototype.setRecordingGain = function( gain ){
  this.config.recordingGain = gain;

  if ( this.recordingGainNode && this.audioContext ) {
    this.recordingGainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);
  }
};

Recorder.prototype.setMonitorGain = function( gain ){
  this.config.monitorGain = gain;

  if ( this.monitorGainNode && this.audioContext ) {
    this.monitorGainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);
  }
};

Recorder.prototype.start = function(){
  if ( this.state === "inactive" ) {
    this.state = 'loading';
    this.encodedSamplePosition = 0;

    return this.audioContext.resume()
      .then(() => this.initialize)
      .then(() => Promise.all([this.initSourceNode(), this.initWorker()]))
      .then(() => {
        this.state = "recording";
        this.encoder.postMessage({ command: 'getHeaderPages' });
        this.sourceNode.connect( this.monitorGainNode );
        this.sourceNode.connect( this.recordingGainNode );
        this.monitorGainNode.connect( this.audioContext.destination );
        this.recordingGainNode.connect( this.encoderNode );
        this.onstart();
      })
      .catch(error => {
        this.state = 'inactive';
        throw error;
      });
  }
  return Promise.resolve();
};

Recorder.prototype.stop = function(){
  if ( this.state === "paused" || this.state === "recording" ) {
    this.state = "inactive";

    // macOS and iOS requires the source to remain connected (in case stopped while paused)
    this.recordingGainNode.connect( this.encoderNode ); 

    this.monitorGainNode.disconnect();
    this.clearStream();

    return new Promise(resolve => {
      var callback = ({ data }) => {
        if ( data["message"] === 'done' ) {
          this.encoder.removeEventListener( "message", callback );
          resolve();
        }
      };

      this.encoder.addEventListener( "message", callback );

      // must call start for messagePort messages
      if( this.encoder.start ) {
        this.encoder.start()
      }

      this.encoder.postMessage({ command: "done" });
    });
  }
  return Promise.resolve();
};

Recorder.prototype.storePage = function( page ) {
  this.recordedPages.push( page );
  this.totalLength += page.length;
};

Recorder.prototype.streamPage = function( page ) {
  this.ondataavailable( page );
};

Recorder.prototype.finish = function() {
  if( !this.config.streamPages ) {
    var outputData = new Uint8Array( this.totalLength );
    this.recordedPages.reduce( function( offset, page ){
      outputData.set( page, offset );
      return offset + page.length;
    }, 0);

    this.ondataavailable( outputData );
  }
  this.onstop();
};


// Callback Handlers
Recorder.prototype.ondataavailable = function(){};
Recorder.prototype.onpause = function(){};
Recorder.prototype.onresume = function(){};
Recorder.prototype.onstart = function(){};
Recorder.prototype.onstop = function(){};


module.exports = Recorder;
