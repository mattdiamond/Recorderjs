var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var Recorder = require('../dist/recorder.min');


describe('Recorder', function() {

	describe('unmocked', function(){

	    it('should not support Recording', function () {
	    	expect(Recorder.isRecordingSupported()).to.not.be.ok;
	    });

		it('should throw an error', function () {
	    	expect(Recorder).to.throw("Recording is not supported in this browser");
	    });
	});

	describe('mocked', function(){

		before(function(){

		});
	});

});
