var chai = require('chai');
var should = chai.should();
var expect = chai.expect;


describe('Recorder', function() {

	describe('unmocked', function(){

		var Recorder = require('../src/recorder');

	    it('should not support Recording', function () {
	    	expect(Recorder.isRecordingSupported()).to.not.be.ok;
	    });

		it('should throw an error', function () {
	    	expect(Recorder).to.throw("Recording is not supported in this browser");
	    });
	});

	describe('mocked', function(){

		global.AudioContext = function(){};
		global.navigator = {
			getUserMedia: function(){}
		};

		var Recorder = require('require-uncached')('../src/recorder');

		it('should support Recording', function () {
	    	expect(Recorder.isRecordingSupported()).to.be.ok;
	    });

	});

});
