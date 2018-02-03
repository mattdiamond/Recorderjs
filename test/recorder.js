var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var requireUncached = require('require-uncached');
var Promise = require('promise');

chai.use(sinonChai);
var should = chai.should();
var expect = chai.expect;


describe('Recorder unsupported', function(){

  var Recorder = require('../dist/recorder.min');

  it('should not support Recording', function () {
    expect(Recorder.isRecordingSupported()).to.not.be.ok;
  });

  it('should throw an error', function () {
    expect(Recorder).to.throw("Recording is not supported in this browser");
  });

});

describe('Recorder', function(){

  var sandbox = sinon.sandbox.create();
  var Recorder;

  var requireRecorder = function(){
    Recorder = requireUncached('../dist/recorder.min');
    sinon.spy(Recorder.prototype, 'ondataavailable');
    sinon.spy(Recorder.prototype, 'onstart');
    sinon.spy(Recorder.prototype, 'onstop');
    sinon.spy(Recorder.prototype, 'onpause');
    sinon.spy(Recorder.prototype, 'onresume');
  };

  beforeEach(function(){
    global.AudioContext = sandbox.stub();
    global.AudioContext.prototype.createGain = () => {
      return {
        connect: sandbox.stub(),
        disconnect: sandbox.stub(),
        gain: {
          setTargetAtTime: sandbox.stub()
        }
      };
    };
    global.AudioContext.prototype.createScriptProcessor = sandbox.stub().returns({
      connect: sandbox.stub(),
      disconnect: sandbox.stub()
    });
    global.AudioContext.prototype.createMediaStreamSource = sandbox.stub().returns({ 
      connect: sandbox.stub(),
      disconnect: sandbox.stub()
    });
    global.AudioContext.prototype.sampleRate = 44100;
    global.AudioContext.prototype.close = sandbox.stub();

    global.Event = sandbox.stub();
    global.CustomEvent = sandbox.stub();
    global.ErrorEvent = sandbox.stub();

    global.navigator = {};
    global.navigator.mediaDevices = {};
    global.navigator.mediaDevices.getUserMedia = sandbox.stub().resolves({
      stop: sandbox.stub()
    });

    global.Worker = sandbox.stub();
    global.Worker.prototype.addEventListener = sandbox.stub();
    global.Worker.prototype.postMessage =  sandbox.stub();

    global.Promise = Promise;

    requireRecorder();
  });

  var mockWebkit = function(){
    delete global.AudioContext;
    global.webkitAudioContext = sandbox.stub();
    global.webkitAudioContext.prototype.createGain = () => {
      return {
        connect: sandbox.stub(),
        disconnect: sandbox.stub(),
        gain: {
          setTargetAtTime: sandbox.stub()
        }
      };
    };
    global.webkitAudioContext.prototype.createScriptProcessor = sandbox.stub().returns({
      connect: sandbox.stub(),
      disconnect: sandbox.stub()
    });
    global.webkitAudioContext.prototype.createMediaStreamSource = sandbox.stub().returns({ 
      connect: sandbox.stub(),
      disconnect: sandbox.stub()
    });
    global.webkitAudioContext.prototype.sampleRate = 44100;
    requireRecorder();
  };

  afterEach(function () {
    sandbox.restore();
  });

  it('should support Recording', function () {
    expect(Recorder.isRecordingSupported()).to.be.ok;
  });

  it('should create an instance without config', function () {
    var rec = new Recorder();
    expect(rec.state).to.equal('inactive');
    expect(rec.config).to.have.property('bufferLength', 4096);
    expect(rec.config).to.have.property('recordingGain', 1);
    expect(rec.config).to.have.property('monitorGain', 0);
    expect(rec.config).to.have.property('numberOfChannels', 1);
    expect(rec.config).to.have.property('encoderSampleRate', 48000);
    expect(rec.config).to.have.property('encoderPath', 'encoderWorker.min.js');
    expect(rec.config).to.have.property('streamPages', false);
    expect(rec.config).to.have.property('leaveStreamOpen', false);
    expect(rec.config).to.have.property('maxBuffersPerPage', 40);
    expect(rec.config).to.have.property('mediaTrackConstraints', true);
    expect(rec.config).to.have.property('encoderApplication', 2049);
    expect(rec.config).to.have.property('encoderFrameSize', 20);
    expect(rec.config).to.have.property('resampleQuality', 3);
    expect(rec.config).to.have.property('wavBitDepth', 16);
  });

  it('should support Recording with Safari Webkit', function () {
    mockWebkit();
    expect(Recorder.isRecordingSupported()).to.be.ok;
  });

  it('should create an instance with Safari Webkit', function () {
    mockWebkit();
    var rec = new Recorder();
    expect(rec.state).to.equal('inactive');
    expect(rec.config).to.have.property('bufferLength', 4096);
    expect(rec.config).to.have.property('recordingGain', 1);
    expect(rec.config).to.have.property('monitorGain', 0);
    expect(rec.config).to.have.property('numberOfChannels', 1);
    expect(rec.config).to.have.property('encoderSampleRate', 48000);
    expect(rec.config).to.have.property('encoderPath', 'encoderWorker.min.js');
    expect(rec.config).to.have.property('streamPages', false);
    expect(rec.config).to.have.property('leaveStreamOpen', false);
    expect(rec.config).to.have.property('maxBuffersPerPage', 40);
    expect(rec.config).to.have.property('mediaTrackConstraints', true);
    expect(rec.config).to.have.property('encoderApplication', 2049);
    expect(rec.config).to.have.property('encoderFrameSize', 20);
    expect(rec.config).to.have.property('resampleQuality', 3);
    expect(rec.config).to.have.property('wavBitDepth', 16);
  });

  it('should create an instance with config', function () {
    var rec = new Recorder({
      bufferLength: 2048,
      recordingGain: 0.5,
      monitorGain: 100,
      numberOfChannels: 2,
      bitRate: 16000,
      encoderSampleRate: 16000,
      encoderPath: "../dist/encoderWorker.min.js",
      streamPages: true,
      leaveStreamOpen: false,
      maxBuffersPerPage: 1000,
      encoderApplication: 2048,
      encoderFrameSize: 40,
      resampleQuality: 10,
      wavBitDepth: 32
    });

    expect(rec.state).to.equal('inactive');
    expect(rec.config).to.have.property('bufferLength', 2048);
    expect(rec.config).to.have.property('recordingGain', 0.5);
    expect(rec.config).to.have.property('monitorGain', 100);
    expect(rec.config).to.have.property('numberOfChannels', 2);
    expect(rec.config).to.have.property('bitRate', 16000);
    expect(rec.config).to.have.property('encoderSampleRate', 16000);
    expect(rec.config).to.have.property('encoderPath', '../dist/encoderWorker.min.js');
    expect(rec.config).to.have.property('streamPages', true);
    expect(rec.config).to.have.property('leaveStreamOpen', false);
    expect(rec.config).to.have.property('maxBuffersPerPage', 1000);
    expect(rec.config).to.have.property('encoderApplication', 2048);
    expect(rec.config).to.have.property('encoderFrameSize', 40);
    expect(rec.config).to.have.property('resampleQuality', 10);
    expect(rec.config).to.have.property('wavBitDepth', 32);
  });

  it('should start recording', function(){
    var rec = new Recorder();
    return rec.start().then( function(){
      expect(rec.state).to.equal('recording');
      expect(rec.sourceNode.connect).to.have.been.calledTwice;
      expect(rec.encoder.postMessage).to.have.been.calledWithMatch({ 
        command: 'init',
        wavSampleRate: 44100,
        originalSampleRate: 44100
      });
    });
  });

  it('should start recording with a new audio stream', function(){
    var rec = new Recorder();
    return rec.start().then( function(){
      expect(rec.stream).not.to.be.undefined;
      expect(rec.stream).to.have.property('stop');
      expect(rec.sourceNode).not.to.be.undefined;
      expect(global.navigator.mediaDevices.getUserMedia).to.have.been.calledOnce;
      expect(rec.audioContext.createMediaStreamSource).to.have.been.calledWith(rec.stream);
    });
  });

  it('should use the existing audio stream if already initialized', function(){
    var rec = new Recorder({
      leaveStreamOpen: true
    });

    return rec.start().then( function(){
      rec.stop();
      return rec.start().then( function(){
        expect(global.navigator.mediaDevices.getUserMedia).to.have.been.calledOnce;
      });
    });
  });

  it('should clear the audio stream', function () {
    var rec = new Recorder();
    return rec.start().then(function(){
      expect(rec.stream).to.not.be.undefined;
      rec.stop();
      expect(rec.stream).to.be.undefined;
    });
  });

  it('should close the audio context', function () {
    var rec = new Recorder();
    return rec.start().then(function(){
      expect(rec.audioContext).to.not.be.undefined;
      rec.stop();
      expect(rec.audioContext).to.be.undefined;
      expect(global.AudioContext.prototype.close).to.have.been.calledOnce;
    });
  });

  it('should clear the audio stream when stream contains tracks', function () {
    var stopTrack1 = sandbox.stub();
    var stopTrack2 = sandbox.stub();
    global.navigator.mediaDevices.getUserMedia = sandbox.stub().resolves({
      getTracks: sandbox.stub().returns([
        { stop: stopTrack1 },
        { stop: stopTrack2 }
      ])
    });

    var rec = new Recorder();
    return rec.start().then(function(){
      expect(rec.stream).to.not.be.undefined;
      rec.stop();
      expect(stopTrack1).to.have.been.calledOnce;
      expect(stopTrack2).to.have.been.calledOnce;
      expect(rec.stream).to.be.undefined;
    });
  });

  it('should stop recording', function () {
    var rec = new Recorder();
    var clearStreamSpy = sinon.spy(rec, 'clearStream');
    return rec.start().then(function(){
      rec.stop();
      expect(rec.state).to.equal('inactive');
      expect(rec.monitorGainNode.disconnect).to.have.been.calledOnce;
      expect(rec.scriptProcessorNode.disconnect).to.have.been.calledOnce;
      expect(rec.recordingGainNode.disconnect).to.have.been.calledOnce;
      expect(rec.sourceNode.disconnect).to.have.been.calledOnce;;
      expect(clearStreamSpy).to.have.been.calledOnce;
      expect(rec.stream).to.be.undefined;
      expect(rec.audioContext).to.be.undefined;
      expect(rec.encoder.postMessage).to.have.been.calledWithMatch({ command: 'done' });
    });
  });

  it('should set the recording gain', function () {
    var rec = new Recorder();
    return rec.start().then(function() {
      rec.setRecordingGain(0.3);
      expect(rec.config.recordingGain).to.equal(0.3);
    });
  });

  it('should stop recording and leave stream open', function () {
    var rec = new Recorder({
      leaveStreamOpen: true
    });
    var clearStreamSpy = sinon.spy(rec, 'clearStream');
    return rec.start().then(function(){
      rec.stop();
      expect(rec.state).to.equal('inactive');
      expect(rec.monitorGainNode.disconnect).to.have.been.calledOnce;
      expect(rec.scriptProcessorNode.disconnect).to.have.been.calledOnce;
      expect(rec.recordingGainNode.disconnect).to.have.been.calledOnce;
      expect(rec.sourceNode.disconnect).to.have.been.calledOnce;
      expect(clearStreamSpy).not.to.have.been.called;
      expect(rec.stream).not.to.be.undefined;
      expect(rec.audioContext).not.to.be.undefined;
      expect(rec.encoder.postMessage).to.have.been.calledWithMatch({ command: 'done' });
    });
  });

  it('should call start promise catch', function () {
    global.navigator.mediaDevices.getUserMedia = () => Promise.reject(new Error('PermissionDeniedError'));
    var rec = new Recorder();
    return rec.start().then( function(){ 
      throw new Error('Unexpected promise resolving.');
    }, function( ev ){
      expect(rec.state).to.equal('inactive');
      expect(ev).instanceof(Error);
      expect(ev.message).to.equal('PermissionDeniedError')
    });
  });

  it('should init worker', function () {
    var rec = new Recorder();
    expect(global.Worker).to.have.been.calledWithNew;
    expect(rec.encoder.addEventListener).to.have.been.calledOnce;
    expect(rec.encoder.addEventListener).to.have.been.calledWith('message');
  });

  it('should re-init worker when storePage completes', function () {
    var rec = new Recorder();
    expect(global.Worker).to.have.been.calledOnce;
    rec.storePage(null);
    expect(global.Worker).to.have.been.calledTwice;
  });

  it('should re-init worker when streamPage completes', function () {
    var rec = new Recorder();
    expect(global.Worker).to.have.been.calledOnce;
    rec.streamPage(null);
    expect(global.Worker).to.have.been.calledTwice;
  });
});
