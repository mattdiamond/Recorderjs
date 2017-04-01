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

		global.AudioContext = function(){
			this.createGain = function(){
				return { gain: {}};
			};
			this.createScriptProcessor = function(){
				return {};
			}
		};

		global.navigator = {
			getUserMedia: function(){}
		};

		global.document = {
			createDocumentFragment: function(){}
		};

		var Recorder = require('require-uncached')('../dist/recorder.min');

		it('should support Recording', function () {
	    	expect(Recorder.isRecordingSupported()).to.be.ok;
	    });

		it('should create an instance with default config', function () {
			var rec = new Recorder();

	    	expect(rec).to.be.an.instanceof(Recorder);
	    	expect(rec.config).to.have.property('bufferLength', 4096);
	    	expect(rec.config).to.have.property('monitorGain', 0);
	    	expect(rec.config).to.have.property('numberOfChannels', 1);
	    	expect(rec.config).to.have.property('encoderSampleRate', 48000);
	    	expect(rec.config).to.have.property('encoderPath', 'encoderWorker.min.js');
	    	expect(rec.config).to.have.property('streamPages', false);
	    	expect(rec.config).to.have.property('leaveStreamOpen', false);
	    	expect(rec.config).to.have.property('maxBuffersPerPage', 40);
	    	expect(rec.config).to.have.property('encoderApplication', 2049);
	    	expect(rec.config).to.have.property('encoderFrameSize', 20);
	    	expect(rec.config).to.have.property('resampleQuality', 3);
	    });

		it('should create an instance with custom config', function () {
			var rec = new Recorder({
				bufferLength: 2048,
		        monitorGain: 100,
		        numberOfChannels: 2,
		        bitRate: 16000,
		        encoderSampleRate: 16000,
		        encoderPath: "../dist/encoderWorker.min.js",
		        streamPages: true,
		        leaveStreamOpen: true,
		        maxBuffersPerPage: 1000,
		        encoderApplication: 2048,
		        encoderFrameSize: 40,
		        resampleQuality: 10
			});

	    	expect(rec).to.be.an.instanceof(Recorder);
	    	expect(rec.config).to.have.property('bufferLength', 2048);
	    	expect(rec.config).to.have.property('monitorGain', 100);
	    	expect(rec.config).to.have.property('numberOfChannels', 2);
	    	expect(rec.config).to.have.property('bitRate', 16000);
	    	expect(rec.config).to.have.property('encoderSampleRate', 16000);
	    	expect(rec.config).to.have.property('encoderPath', '../dist/encoderWorker.min.js');
	    	expect(rec.config).to.have.property('streamPages', true);
	    	expect(rec.config).to.have.property('leaveStreamOpen', true);
	    	expect(rec.config).to.have.property('maxBuffersPerPage', 1000);
	    	expect(rec.config).to.have.property('encoderApplication', 2048);
	    	expect(rec.config).to.have.property('encoderFrameSize', 40);
	    	expect(rec.config).to.have.property('resampleQuality', 10);
	    });

	});

});
