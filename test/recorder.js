var chai = require('chai');
var should = chai.should();
var expect = chai.expect;


describe('Recorder', function() {

	describe('unmocked', function(){

		var Recorder = require('../dist/recorder.min');

	    it('should not support Recording', function () {
	    	expect(Recorder.isRecordingSupported()).to.not.be.ok;
	    });

		it('should throw an error', function () {
	    	expect(Recorder).to.throw("Recording is not supported in this browser");
	    });
	});

	describe('mocked', function(){

		var Recorder = require('../dist/recorder.min');

		before(function(){

		});
	});

});
