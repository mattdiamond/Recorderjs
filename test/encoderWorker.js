var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var requireUncached = require('require-uncached');
var Promise = require('promise');

chai.use(sinonChai);
var should = chai.should();
var expect = chai.expect;


describe('encoderWorker', function() {

  var encoderWorker = require('../dist/encoderWorker.min');
  var sandbox = sinon.sandbox.create();

  beforeEach(function(){
    global.postMessage = sandbox.stub();
    global.close = sandbox.stub();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should initialize', function () {
    expect(encoderWorker).to.be.defined;
  });

});