var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");

chai.use(sinonChai);
var should = chai.should();
var expect = chai.expect;


describe('encoderWorker', function() {

  var OggOpusEncoder = require('../dist/encoderWorker.min');
  var sandbox = sinon.sandbox.create();
  var _opus_encoder_create_spy;
  var _opus_encoder_ctl_spy;
  var _speex_resampler_process_interleaved_float_spy;
  var _speex_resampler_init_spy;
  var _opus_encode_float_spy;

  beforeEach(function(){
    global.postMessage = sandbox.stub();
    global.close = sandbox.stub();
    _opus_encoder_create_spy = sandbox.spy(OggOpusEncoder, '_opus_encoder_create');
    _opus_encoder_ctl_spy = sandbox.spy(OggOpusEncoder, '_opus_encoder_ctl');
    _speex_resampler_process_interleaved_float_spy = sandbox.spy(OggOpusEncoder, '_speex_resampler_process_interleaved_float');
    _speex_resampler_init_spy = sandbox.spy(OggOpusEncoder, '_speex_resampler_init');
    _opus_encode_float_spy = sandbox.spy(OggOpusEncoder, '_opus_encode_float');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should initialize config', function () {
    var encoder = new OggOpusEncoder({
      originalSampleRate: 44100
    });

    expect(encoder).to.have.property('numberOfChannels', 1);
    expect(encoder).to.have.property('encoderSampleRate', 48000);
    expect(encoder).to.have.property('maxBuffersPerPage', 40);
    expect(encoder).to.have.property('encoderApplication', 2049);
    expect(encoder).to.have.property('encoderFrameSize', 20);
    expect(encoder).to.have.property('bufferLength', 4096);
    expect(encoder).to.have.property('resampleQuality', 3);
    expect(encoder).to.have.property('originalSampleRate', 44100);
  });

  it('should initialize encoder', function () {
    var encoder = new OggOpusEncoder({
      originalSampleRate: 44100
    });

    expect(_opus_encoder_create_spy).to.have.been.calledOnce;
  });

  it('should configure bitRate', function () {
    var encoder = new OggOpusEncoder({
      originalSampleRate: 44100,
      bitRate: 16000
    });

    expect(_opus_encoder_ctl_spy).to.have.been.calledWith(encoder.encoder, 4002, sinon.match.any);
  });

  it('should configure compexity', function () {
    var encoder = new OggOpusEncoder({
      originalSampleRate: 44100,
      encoderComplexity: 10
    });

    expect(_opus_encoder_ctl_spy).to.have.been.calledWith(encoder.encoder, 4010, sinon.match.any);
  });

});