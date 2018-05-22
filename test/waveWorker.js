var chai = require('chai');
var sinon = require('sinon');

var should = chai.should();
var expect = chai.expect;


describe('waveWorker', function() {

  var WavePCM = require('../dist/waveWorker.min');

  it('should should throw an error if wavSampleRate is not defined', function () {
    expect(WavePCM).to.throw("wavSampleRate value is required to record. NOTE: Audio is not resampled!");
  });

  it('should throw an error if unsupported waveBitDepth value specified', function () {
    expect(WavePCM.bind(WavePCM, {
      wavSampleRate: 44100,
      wavBitDepth: 40
    })).to.throw('Only 8, 16, 24 and 32 bits per sample are supported');
  });

  it('should initialize standard config', function () {
    var wavPCM = new WavePCM({
      wavSampleRate: 44100
    });

    expect(wavPCM).to.have.property('sampleRate', 44100);
    expect(wavPCM).to.have.property('bitDepth', 16);
    expect(wavPCM).to.have.property('bytesPerSample', 2);
  });

  it('should initialize custom config', function () {
    var wavPCM = new WavePCM({
      wavSampleRate: 44100,
      wavBitDepth: 8
    });

    expect(wavPCM).to.have.property('sampleRate', 44100);
    expect(wavPCM).to.have.property('bitDepth', 8);
    expect(wavPCM).to.have.property('bytesPerSample', 1);
  });

  it('should clamp float values to [-1,1]', function () {
    var wavPCM = new WavePCM({
      wavSampleRate: 44100,
      wavBitDepth: 32
    });

    wavPCM.record([new Float32Array([-2,2])]);
    var convertedAudio = new Int32Array(wavPCM.recordedBuffers[0].buffer);
    expect(convertedAudio[0]).to.equal(-2147483648);
    expect(convertedAudio[1]).to.equal(2147483647);
  });

  it('should convert values to be in valid 32bit range', function () {
    var wavPCM = new WavePCM({
      wavSampleRate: 44100,
      wavBitDepth: 32
    });

    wavPCM.record([new Float32Array([-1,1])]);
    var convertedAudio = new Int32Array(wavPCM.recordedBuffers[0].buffer);
    expect(convertedAudio[0]).to.equal(-2147483648);
    expect(convertedAudio[1]).to.equal(2147483647);
  });

  it('should convert values to be in valid 16bit range', function () {
    var wavPCM = new WavePCM({
      wavSampleRate: 44100,
      wavBitDepth: 16
    });

    wavPCM.record([new Float32Array([-1,1])]);
    var convertedAudio = new Int16Array(wavPCM.recordedBuffers[0].buffer);
    expect(convertedAudio[0]).to.equal(-32768);
    expect(convertedAudio[1]).to.equal(32767);
  });

  it('should convert values to be in valid 8bit range', function () {
    var wavPCM = new WavePCM({
      wavSampleRate: 44100,
      wavBitDepth: 8
    });

    wavPCM.record([new Float32Array([-1,1])]);
    var convertedAudio = new Uint8Array(wavPCM.recordedBuffers[0].buffer);
    expect(convertedAudio[0]).to.equal(0);
    expect(convertedAudio[1]).to.equal(255);
  });

});
