"use strict";

const { version } = require('../package.json');

var AudioContext = global.AudioContext || global.webkitAudioContext;


// Constructor
var Recorder = function( config ){

  if ( !Recorder.isRecordingSupported() ) {
    throw new Error("Recording is not supported in this browser");
  }

  if ( !config ) config = {};

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
    reuseWorker: false,
    wavBitDepth: 16,
  }, config );

  this.encodedSamplePosition = 0;
};


// Static Methods
Recorder.isRecordingSupported = function(){
  const getUserMediaSupported = global.navigator && global.navigator.mediaDevices && global.navigator.mediaDevices.getUserMedia;
  return AudioContext && getUserMediaSupported && global.WebAssembly;
};

Recorder.version = version;


// Instance Methods
Recorder.prototype.clearStream = function(){
  if ( this.stream ){

    if ( this.stream.getTracks ) {
      this.stream.getTracks().forEach( function( track ){
        track.stop();
      });
    }

    else {
      this.stream.stop();
    }

    delete this.stream;
  }

  if ( this.audioContext && this.closeAudioContext ){
    this.audioContext.close();
    delete this.audioContext;
  }
};

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

Recorder.prototype.initAudioContext = function( sourceNode ){
  if (sourceNode && sourceNode.context) {
    this.audioContext = sourceNode.context;
    this.closeAudioContext = false;
  }

  else {
    this.audioContext = new AudioContext();
    this.closeAudioContext = true;
  }

  return this.audioContext;
};

Recorder.prototype.initAudioGraph = function(){

  // First buffer can contain old data. Don't encode it.
  this.encodeBuffers = function(){
    delete this.encodeBuffers;
  };

  this.monitorGainNode = this.audioContext.createGain();
  this.setMonitorGain( this.config.monitorGain );
  this.monitorGainNode.connect( this.audioContext.destination );

  this.recordingGainNode = this.audioContext.createGain();
  this.setRecordingGain( this.config.recordingGain );
};

Recorder.prototype.initSourceNode = function( sourceNode ){
  if ( sourceNode && sourceNode.context ) {
    return global.Promise.resolve( sourceNode );
  }

  return global.navigator.mediaDevices.getUserMedia({ audio : this.config.mediaTrackConstraints }).then( ( stream ) => {
    this.stream = stream;
    return this.audioContext.createMediaStreamSource( stream );
  });
};

Recorder.prototype.loadWorker = function() {
  if ( !this.encoder ) {

    if (this.audioContext.audioWorklet) {
      return this.audioContext.audioWorklet.addModule(this.config.encoderPath).then(() => {
        this.encoderNode = new AudioWorkletNode(this.audioContext, 'encoder-worklet', { numberOfOutputs: 0 });
        this.encoder = this.encoderNode.port;
      });
    }

    else {
      console.log('audioWorklet support not detected. Falling back to scriptProcessor');
      this.encoderNode = this.audioContext.createScriptProcessor( this.config.bufferLength, this.config.numberOfChannels, this.config.numberOfChannels );
      this.encoderNode.onaudioprocess = ({ inputBuffer }) => this.encodeBuffers( inputBuffer );

      // Script processor needs to be connected to destination to work
      this.encoderNode.connect( this.audioContext.destination );
      this.encoder = new global.Worker(this.config.encoderPath);
    }
  }

  return Promise.resolve();
};

Recorder.prototype.initWorker = function(){
  var onPage = (this.config.streamPages ? this.streamPage : this.storePage).bind(this);

  this.recordedPages = [];
  this.totalLength = 0;

  return this.loadWorker().then(() => new Promise(resolve => {
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

    this.encoder.postMessage( Object.assign({
      command: 'init',
      originalSampleRate: this.audioContext.sampleRate,
      wavSampleRate: this.audioContext.sampleRate
    }, this.config));
  }));
};

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

Recorder.prototype.start = function( sourceNode ){
  if ( this.state === "inactive" ) {
    this.initAudioContext( sourceNode );
    this.initAudioGraph();

    this.encodedSamplePosition = 0;

    return Promise.all([this.initSourceNode(sourceNode), this.initWorker()]).then(results => {
      this.state = "recording";
      this.encoder.postMessage({ command: 'getHeaderPages' });

      this.sourceNode = results[0];
      this.sourceNode.connect( this.monitorGainNode );
      this.sourceNode.connect( this.recordingGainNode );
      this.recordingGainNode.connect( this.encoderNode );

      this.onstart();
    });
  }
};

Recorder.prototype.stop = function(){
  if ( this.state !== "inactive" ) {
    this.state = "inactive";
    this.monitorGainNode.disconnect();
    this.encoderNode.disconnect();
    this.recordingGainNode.disconnect();
    this.sourceNode.disconnect();
    this.clearStream();

    return new Promise(resolve => {
      var callback = ({ data }) => {
        if ( data["message"] === 'done' ) {

          // The initWorker handler might destroyed the encoder
          if (this.encoder) {
            this.encoder.removeEventListener( "message", callback );
          }

          resolve();
        }
      };

      this.encoder.addEventListener( "message", callback );

      // must call start for messagePort messages
      if( this.encoder.start ) {
        this.encoder.start()
      }

      this.encoder.postMessage({ command: "done" });
      if ( !this.config.reuseWorker ) {
        this.encoder.postMessage({ command: "close" });
      }
    });
  }
  return Promise.resolve();
};

Recorder.prototype.destroyWorker = function(){
  if ( this.state === "inactive" ) {
    if ( this.encoder ) {
      this.encoder.postMessage({ command: "close" });
      delete this.encoder;
    }
  }
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
  if ( !this.config.reuseWorker ) {
    delete this.encoder;
  }
};


// Callback Handlers
Recorder.prototype.ondataavailable = function(){};
Recorder.prototype.onpause = function(){};
Recorder.prototype.onresume = function(){};
Recorder.prototype.onstart = function(){};
Recorder.prototype.onstop = function(){};


module.exports = Recorder;
