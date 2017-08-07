var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var requireUncached = require('require-uncached');

chai.use(sinonChai);
var should = chai.should();
var expect = chai.expect;


describe('waveWorker', function() {

  var WavePCM = require('../dist/waveWorker.min');

  it('should initialize standard config', function () {
    var encoder = new WavePCM({});

    expect(encoder).to.have.property('sampleRate', 44100);
    expect(encoder).to.have.property('bitDepth', 16);
    expect(encoder).to.have.property('bytesPerSample', 2);
  });

  it('should initialize custom config', function () {
    var encoder = new WavePCM({
      wavSampleRate: 11025,
      wavBitDepth: 8
    });

    expect(encoder).to.have.property('sampleRate', 11025);
    expect(encoder).to.have.property('bitDepth', 8);
    expect(encoder).to.have.property('bytesPerSample', 1);
  });

  it('should reject bad config on record', function () {
    var encoder = new WavePCM({
      wavBitDepth: 40
    });

    expect(encoder).to.have.property('sampleRate', 44100);
    expect(encoder).to.have.property('bitDepth', 40);
    expect(encoder).to.have.property('bytesPerSample', 5);

    expect(function () {
      encoder.record([
        new Array(10).fill(0),
        new Array(10).fill(0)
      ]);
    }).to.throw('Only 8, 16, 24 and 32 bits per sample are supported');
  });

});
