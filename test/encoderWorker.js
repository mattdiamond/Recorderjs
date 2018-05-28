var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");

chai.use(sinonChai);
var should = chai.should();
var expect = chai.expect;


describe('encoderWorker', function() {

  var Module = require('../dist/encoderWorker.min');
  var sandbox = sinon.sandbox.create();
  var _opus_encoder_create_spy;
  var _opus_encoder_ctl_spy;
  var _speex_resampler_process_interleaved_float_spy;
  var _speex_resampler_init_spy;
  var _opus_encode_float_spy;

  function getEncoder(config){
    return Module.mainReady.then(function(){
      _opus_encoder_create_spy = sandbox.spy(Module, '_opus_encoder_create');
      _opus_encoder_ctl_spy = sandbox.spy(Module, '_opus_encoder_ctl');
      _speex_resampler_process_interleaved_float_spy = sandbox.spy(Module, '_speex_resampler_process_interleaved_float');
      _speex_resampler_init_spy = sandbox.spy(Module, '_speex_resampler_init');
      _opus_encode_float_spy = sandbox.spy(Module, '_opus_encode_float');
      return new Module.OggOpusEncoder(config, Module);
    });
  };

  function getPacket(page, packetNumber){
    var dataView = new DataView(page.buffer);
    var packetTableLength = dataView.getUint8( 26, true );
    var packetLength = dataView.getUint8( 27 + packetNumber, true );
    return page.slice(27 + packetTableLength, 27 + packetTableLength + packetLength);
  }

  function getUTF8String(data) {
    return String.fromCharCode.apply(null, data);
  }

  beforeEach(function(){
    global.postMessage = sandbox.stub();
    global.close = sandbox.stub();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should initialize config', function () {
    return getEncoder().then(function(encoder){
      expect(encoder.config).to.have.property('numberOfChannels', 1);
      expect(encoder.config).to.have.property('encoderSampleRate', 48000);
      expect(encoder.config).to.have.property('maxBuffersPerPage', 40);
      expect(encoder.config).to.have.property('encoderApplication', 2049);
      expect(encoder.config).to.have.property('encoderFrameSize', 20);
      expect(encoder.config).to.have.property('bufferLength', 4096);
      expect(encoder.config).to.have.property('resampleQuality', 3);
      expect(encoder.config).to.have.property('originalSampleRate', 44100);
    });
  });

  it('should initialize encoder', function () {
    return getEncoder().then(function(encoder){
      expect(_opus_encoder_create_spy).to.have.been.calledOnce;
    });
  });

  it('should configure encoderBitRate', function () {
   return getEncoder({
      encoderBitRate: 16000
    }).then(function(encoder){
      expect(_opus_encoder_ctl_spy).to.have.been.calledWith(encoder.encoder, 4002, sinon.match.any);
    });
  });

  it('should configure complexity', function () {
    return getEncoder({
      encoderComplexity: 10
    }).then(function(encoder){
      expect(_opus_encoder_ctl_spy).to.have.been.calledWith(encoder.encoder, 4010, sinon.match.any)
    });
  });

  it('should default input sample rate field to originalSampleRate', function (done) {
    var pageBufferCount = 0;
    global.postMessage = function(page){
      pageBufferCount++;

      // First Page
      if (pageBufferCount == 1) {
        var pageData = getPacket(page);
        var dataView = new DataView(pageData.buffer);
        expect(dataView.getUint32(12, true)).to.equal(44100);
        done();
      }
    }

    getEncoder();
  });

  it('should override input sample rate field', function (done) {
    var pageBufferCount = 0;
    global.postMessage = function(page){
      pageBufferCount++;

      // First Page
      if (pageBufferCount == 1) {
        var pageData = getPacket(page, 1);
        var dataView = new DataView(pageData.buffer);
        expect(dataView.getUint32(12, true)).to.equal(16000);
        done();
      }
    }

    getEncoder({
      originalSampleRateOverride: 16000
    });

  });

  it('should have vendor \'RecorderJS\' in the second page', function (done) {
    var pageBufferCount = 0;
    global.postMessage = function(page){
      pageBufferCount++;

      // Second Page
      if (pageBufferCount == 2) {
        var pageData = getPacket(page, 1);
        var dataView = new DataView(pageData.buffer);
        var vendorLength = dataView.getUint8(8, true);
        var vendorData = pageData.subarray(12, 12 + vendorLength);
        expect(getUTF8String(vendorData)).to.equal('RecorderJS');
        done();
      }
    }

    getEncoder();
  });

  it('should set granule position to 0', function (done) {
    var pageBufferCount = 0;

    global.postMessage = function(page) {
      pageBufferCount++;

      if (pageBufferCount == 3) {
        var dataView = new DataView(page.buffer);
        expect(dataView.getUint32(6, true)).to.equal(0);
        expect(dataView.getInt32(10, true)).to.equal(0);
        done();
      }
    };

    getEncoder().then(function(encoder) {
      encoder.lastPositiveGranulePosition = 1;
      encoder.granulePosition = 0;
      encoder.generatePage();
    });
  });

  it('should set granule position to -1', function (done) {
    var pageBufferCount = 0;

    global.postMessage = function(page) {
      pageBufferCount++;

      if (pageBufferCount == 3) {
        var dataView = new DataView(page.buffer);
        expect(dataView.getUint32(6, true)).to.equal(4294967295);
        expect(dataView.getInt32(10, true)).to.equal(-1);
        done();
      }
    };

    getEncoder().then(function(encoder) {
      encoder.lastPositiveGranulePosition = 1;
      encoder.granulePosition = -1;
      encoder.generatePage();
    });
  });

  it('should set granule position to -2^32', function (done) {
    var pageBufferCount = 0;

    global.postMessage = function(page) {
      pageBufferCount++;

      if (pageBufferCount == 3) {
        var dataView = new DataView(page.buffer);
        expect(dataView.getUint32(6, true)).to.equal(0);
        expect(dataView.getInt32(10, true)).to.equal(-1);
        done();
      }
    };

    getEncoder().then(function(encoder) {
      encoder.lastPositiveGranulePosition = 1;
      encoder.granulePosition = -4294967296;
      encoder.generatePage();
    });
  });

  it('should set granule position to -2^32 - 1', function (done) {
    var pageBufferCount = 0;

    global.postMessage = function(page) {
      pageBufferCount++;

      if (pageBufferCount == 3) {
        var dataView = new DataView(page.buffer);
        expect(dataView.getUint32(6, true)).to.equal(4294967295);
        expect(dataView.getInt32(10, true)).to.equal(-2);
        done();
      }
    };

    getEncoder().then(function(encoder) {
      encoder.lastPositiveGranulePosition = 1;
      encoder.granulePosition = -4294967297;
      encoder.generatePage();
    });
  });

  it('should set granule position to 2^32 - 1', function (done) {
    var pageBufferCount = 0;

    global.postMessage = function(page) {
      pageBufferCount++;

      if (pageBufferCount == 3) {
        var dataView = new DataView(page.buffer);
        expect(dataView.getUint32(6, true)).to.equal(4294967295);
        expect(dataView.getInt32(10, true)).to.equal(0);
        done();
      }
    };

    getEncoder().then(function(encoder) {
      encoder.lastPositiveGranulePosition = 1;
      encoder.granulePosition = 4294967295;
      encoder.generatePage();
    });
  });

  it('should set granule position to 2^32', function (done) {
    var pageBufferCount = 0;

    global.postMessage = function(page) {
      pageBufferCount++;

      if (pageBufferCount == 3) {
        var dataView = new DataView(page.buffer);
        expect(dataView.getUint32(6, true)).to.equal(0);
        expect(dataView.getInt32(10, true)).to.equal(1);
        done();
      }
    };

    getEncoder().then(function(encoder) {
      encoder.lastPositiveGranulePosition = 1;
      encoder.granulePosition = 4294967296;
      encoder.generatePage();
    });
  });

  it('should set serial minimum value as 0', function (done) {
    sandbox.stub(Math, 'random').returns(0);
    var messageRecieved = false;

    global.postMessage = function(page){
      if (!messageRecieved) {
        messageRecieved = true;
        var dataView = new DataView(page.buffer);
        expect(dataView.getUint32(14, true)).to.equal(0);
        done();
      }
    }

    getEncoder();
  });

  it('should set serial maximum value as 2^32 - 1', function (done) {
    sandbox.stub(Math, 'random').returns(0.9999999999999);
    var messageRecieved = false;

    global.postMessage = function(page){
      if (!messageRecieved) {
        messageRecieved = true;
        var dataView = new DataView(page.buffer);
        expect(dataView.getUint32(14, true)).to.equal(4294967295);
        done();
      }
    }

    getEncoder();
  });

});
