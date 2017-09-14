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
  var Recorder = requireUncached('../dist/recorder.min');

  beforeEach(function(){
    global.AudioContext = sandbox.stub();
    global.AudioContext.prototype.createGain = sandbox.stub().returns({ 
      connect: sandbox.stub(),
      gain: {}
    });
    global.AudioContext.prototype.createScriptProcessor = sandbox.stub().returns({
      connect: sandbox.stub()
    });
    global.AudioContext.prototype.createMediaStreamSource = sandbox.stub().returns({ 
      connect: sandbox.stub()
    });
    global.AudioContext.prototype.sampleRate = 44100;

    global.Event = sandbox.stub();
    global.CustomEvent = sandbox.stub();
    global.ErrorEvent = sandbox.stub();

    global.navigator = {};
    global.navigator.mediaDevices = {};
    global.navigator.mediaDevices.getUserMedia = sandbox.stub().resolves({
      stop: sandbox.stub()
    });

    global.document = {};
    global.document.createDocumentFragment = sandbox.stub().returns({
      addEventListener: sandbox.stub(),
      removeEventListener: sandbox.stub(),
      dispatchEvent: sandbox.stub()
    });

    global.Worker = sandbox.stub();
    global.Worker.prototype.addEventListener = sandbox.stub();
    global.Worker.prototype.postMessage =  sandbox.stub();

    global.Promise = Promise;
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should support Recording', function () {
    expect(Recorder.isRecordingSupported()).to.be.ok;
  });

  it('should create an instance without config', function () {
    var rec = new Recorder();
    expect(global.AudioContext).to.have.been.calledWithNew;
    expect(rec.state).to.equal('inactive');
    expect(rec.config).to.have.property('bufferLength', 4096);
    expect(rec.config).to.have.property('monitorGain', 0);
    expect(rec.config).to.have.property('numberOfChannels', 1);
    expect(rec.config).to.have.property('encoderSampleRate', 48000);
    expect(rec.config).to.have.property('encoderPath', 'encoderWorker.min.js');
    expect(rec.config).to.have.property('streamPages', false);
    expect(rec.config).to.have.property('leaveStreamOpen', false);
    expect(rec.config).to.have.property('maxBuffersPerPage', 40);
    expect(rec.config).to.have.property('encoderApplication', 2049);
    expect(rec.config).to.have.property('encoderFrameSize', 20);
    expect(rec.config).to.have.property('resampleQuality', 3);
    expect(rec.config).to.have.property('wavBitDepth', 16);
    expect(rec.config).to.have.property('wavSampleRate', 44100);
  });

  it('should create an instance with config', function () {
    var rec = new Recorder({
      bufferLength: 2048,
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

    expect(global.AudioContext).to.have.been.calledWithNew;
    expect(rec.state).to.equal('inactive');
    expect(rec.config).to.have.property('bufferLength', 2048);
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
    expect(rec.config).to.have.property('wavSampleRate', 44100);
  });

  it('should initialize a new audio stream', function () {
    var rec = new Recorder();
 
    return rec.initStream().then(function(){
      expect(rec.stream).to.not.be.undefined;
      expect(rec.stream).to.have.property('stop');
      expect(global.navigator.mediaDevices.getUserMedia).to.have.been.calledOnce;
      expect(rec.eventTarget.dispatchEvent).to.have.been.calledOnce;
      expect(global.Event).to.have.been.calledOnce;
      expect(global.Event).to.have.been.calledWith("streamReady");
    });

  });

  it('should initialize a new audio stream with deprecated getUserMedia', function () {
    delete global.navigator.mediaDevices.getUserMedia;
    global.navigator.getUserMedia = sandbox.stub().yields({
      stop: sandbox.stub()
    });

    var rec = new Recorder();
    return rec.initStream().then(function(){
      expect(rec.stream).to.not.be.undefined;
      expect(rec.stream).to.have.property('stop');
      expect(global.navigator.getUserMedia).to.have.been.calledOnce;
      expect(rec.eventTarget.dispatchEvent).to.have.been.calledOnce;
      expect(global.Event).to.have.been.calledOnce;
      expect(global.Event).to.have.been.calledWith("streamReady");
    });
  });

  it('should use the existing audio stream if already initialized', function () {
    var rec = new Recorder();
    return rec.initStream().then(function(){
      return rec.initStream().then(function(){
        expect(rec.stream).to.not.be.undefined;
        expect(rec.stream).to.have.property('stop');
        expect(global.navigator.mediaDevices.getUserMedia).to.have.been.calledOnce;
        expect(rec.eventTarget.dispatchEvent).to.have.been.calledTwice;
        expect(global.Event).to.have.been.calledTwice;
        expect(global.Event).to.have.been.calledWith("streamReady");
      });
    });
  });

  it('should clear the audio stream', function () {
    var rec = new Recorder();
    return rec.initStream().then(function(){
      expect(rec.stream).to.not.be.undefined;
      rec.clearStream();
      expect(rec.stream).to.be.undefined;
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
    return rec.initStream().then(function(){
      expect(rec.stream).to.not.be.undefined;
      rec.clearStream();
      expect(stopTrack1).to.have.been.calledOnce;
      expect(stopTrack2).to.have.been.calledOnce;
      expect(rec.stream).to.be.undefined;
    });
  });

  it('should add an event listener', function () {
    var rec = new Recorder();
    rec.addEventListener( "a", "b");
    expect(rec.eventTarget.addEventListener).to.have.been.calledOnce;
    expect(rec.eventTarget.addEventListener).to.have.been.calledWith("a", "b", undefined);
  });

  it('should remove an event listener', function () {
    var rec = new Recorder();
    rec.removeEventListener("a", "b");
    expect(rec.eventTarget.removeEventListener).to.have.been.calledOnce;
    expect(rec.eventTarget.removeEventListener).to.have.been.calledWith("a", "b", undefined);
  });

  it('should start recording', function () {
    var rec = new Recorder();
    return rec.initStream().then(function(){
      rec.start();
      expect(global.Worker).to.have.been.calledWithNew;
      expect(rec.encoder.addEventListener).to.have.been.calledOnce;
      expect(rec.encoder.addEventListener).to.have.been.calledWith('message');
      expect(rec.state).to.equal('recording');
      expect(rec.scriptProcessorNode.connect).to.have.been.calledWith( rec.audioContext.destination );
      expect(global.Event).to.have.been.calledWith('start');
      expect(rec.encoder.postMessage).to.have.been.calledWith( rec.config );
    });
  });

  it('should call promise catch callback', function () {
    global.navigator.mediaDevices.getUserMedia = () => Promise.reject(new Error('PermissionDeniedError'));
    var rec = new Recorder();
    return rec.initStream().then(() => { 
      throw new Error('Unexpected promise resolving.');
    }, ev => {
      expect(ev).instanceof(Error);
      expect(ev.message).to.equal('PermissionDeniedError')
    })
  })
});
