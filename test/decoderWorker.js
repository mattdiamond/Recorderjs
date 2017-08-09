var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var requireUncached = require('require-uncached');
var fs = require('fs');

chai.use(sinonChai);
var should = chai.should();
var expect = chai.expect;


describe('decoderWorker', function() {

  var OggOpusDecoder = require('../dist/decoderWorker.min');
  var sandbox = sinon.sandbox.create();
  var decoder;
  var _opus_decoder_create_spy;
  var _opus_decoder_destroy_spy;
  var _speex_resampler_process_interleaved_float_spy;
  var _speex_resampler_init_spy;
  var _opus_decode_float_spy;
  var monoOpus = new Uint8Array(fs.readFileSync('test/sample/mono.opus'));
  var stereoOpus = new Uint8Array(fs.readFileSync('test/sample/stereo.opus'));
  var joinedMonoOpus = new Uint8Array(fs.readFileSync('test/sample/joinedMono.opus'));

  beforeEach(function(){
    global.postMessage = sandbox.stub();
    global.close = sandbox.stub();
    decoder = new OggOpusDecoder();
    _opus_decoder_create_spy = sandbox.spy(OggOpusDecoder, '_opus_decoder_create');
    _opus_decoder_destroy_spy = sandbox.spy(OggOpusDecoder, '_opus_decoder_destroy');
    _speex_resampler_process_interleaved_float_spy = sandbox.spy(OggOpusDecoder, '_speex_resampler_process_interleaved_float');
    _speex_resampler_init_spy = sandbox.spy(OggOpusDecoder, '_speex_resampler_init');
    _speex_resampler_destroy_spy = sandbox.spy(OggOpusDecoder, '_speex_resampler_destroy');
    _opus_decode_float_spy = sandbox.spy(OggOpusDecoder, '_opus_decode_float');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should initialize config', function () {
    expect(decoder.config).to.have.property('decoderSampleRate', 48000);
    expect(decoder.config).to.have.property('outputBufferSampleRate', 48000);
    expect(decoder.config).to.have.property('bufferLength', 4096);
    expect(decoder.config).to.have.property('resampleQuality', 3);
  });

  it('should decode mono', function () {
    decoder.decode(monoOpus);
    expect(_opus_decoder_create_spy).to.have.been.calledOnce;
    expect(_opus_decode_float_spy).to.have.callCount(121);
    expect(_speex_resampler_process_interleaved_float_spy).to.have.callCount(121);
  });

  it('should decode stereo', function () {
    decoder.decode(stereoOpus);
    expect(_opus_decoder_create_spy).to.have.been.calledOnce;
    expect(_opus_decode_float_spy).to.have.callCount(113);
    expect(_speex_resampler_process_interleaved_float_spy).to.have.callCount(113);
  });

  it('should decode joined file', function () {
    decoder.decode(joinedMonoOpus);
    expect(_opus_decoder_create_spy).to.have.been.calledTwice;
    expect(_opus_decode_float_spy).to.have.callCount(242);
    expect(_speex_resampler_process_interleaved_float_spy).to.have.callCount(242);
  });

  it('should decode two files', function () {
    decoder.decode(monoOpus);
    decoder.decode(monoOpus);
    expect(_opus_decoder_create_spy).to.have.been.calledTwice;
    expect(_opus_decode_float_spy).to.have.callCount(242);
    expect(_speex_resampler_process_interleaved_float_spy).to.have.callCount(242);
  });
});