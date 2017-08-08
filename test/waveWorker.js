var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");

chai.use(sinonChai);
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

});
