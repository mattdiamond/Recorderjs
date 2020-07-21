(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/waveWorker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/waveWorker.js":
/*!***************************!*\
  !*** ./src/waveWorker.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst WavePCM = function( config ){\n\n  var config = Object.assign({\n    wavBitDepth: 16,\n    numberOfChannels: 1,\n  }, config);\n\n  if ( !config['wavSampleRate'] ) {\n    throw new Error(\"wavSampleRate value is required to record. NOTE: Audio is not resampled!\");\n  }\n\n  if ( [8, 16, 24, 32].indexOf( config['wavBitDepth'] ) === -1 ) {\n    throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n  }\n\n  this.numberOfChannels = config['numberOfChannels'];\n  this.bitDepth = config['wavBitDepth'];\n  this.sampleRate = config['wavSampleRate'];\n  this.recordedBuffers = [];\n  this.bytesPerSample = this.bitDepth / 8;\n};\n\nWavePCM.prototype.record = function( buffers ){\n  var bufferLength = buffers[0].length;\n  var reducedData = new Uint8Array( bufferLength * this.numberOfChannels * this.bytesPerSample );\n\n  // Interleave\n  for ( var i = 0; i < bufferLength; i++ ) {\n    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {\n\n      var outputIndex = ( i * this.numberOfChannels + channel ) * this.bytesPerSample;\n\n      // clip the signal if it exceeds [-1, 1]\n      var sample = Math.max(-1, Math.min(1, buffers[ channel ][ i ]));\n\n      // bit reduce and convert to integer\n      switch ( this.bytesPerSample ) {\n        case 4: // 32 bits signed\n          sample = sample * 2147483647.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          reducedData[ outputIndex + 3 ] = sample >> 24;\n          break;\n\n        case 3: // 24 bits signed\n          sample = sample * 8388607.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          break;\n\n        case 2: // 16 bits signed\n          sample = sample * 32767.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          break;\n\n        case 1: // 8 bits unsigned\n          reducedData[ outputIndex ] = (sample + 1) * 127.5;\n          break;\n\n        default:\n          throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n      }\n    }\n  }\n\n  this.recordedBuffers.push( reducedData );\n};\n\nWavePCM.prototype.requestData = function(){\n  var bufferLength = this.recordedBuffers[0].length;\n  var dataLength = this.recordedBuffers.length * bufferLength;\n  var headerLength = 44;\n  var wav = new Uint8Array( headerLength + dataLength );\n  var view = new DataView( wav.buffer );\n\n  view.setUint32( 0, 1380533830, false ); // RIFF identifier 'RIFF'\n  view.setUint32( 4, 36 + dataLength, true ); // file length minus RIFF identifier length and file description length\n  view.setUint32( 8, 1463899717, false ); // RIFF type 'WAVE'\n  view.setUint32( 12, 1718449184, false ); // format chunk identifier 'fmt '\n  view.setUint32( 16, 16, true ); // format chunk length\n  view.setUint16( 20, 1, true ); // sample format (raw)\n  view.setUint16( 22, this.numberOfChannels, true ); // channel count\n  view.setUint32( 24, this.sampleRate, true ); // sample rate\n  view.setUint32( 28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true ); // byte rate (sample rate * block align)\n  view.setUint16( 32, this.bytesPerSample * this.numberOfChannels, true ); // block align (channel count * bytes per sample)\n  view.setUint16( 34, this.bitDepth, true ); // bits per sample\n  view.setUint32( 36, 1684108385, false); // data chunk identifier 'data'\n  view.setUint32( 40, dataLength, true ); // data chunk length\n\n  for (var i = 0; i < this.recordedBuffers.length; i++ ) {\n    wav.set( this.recordedBuffers[i], i * bufferLength + headerLength );\n  }\n\n  return {message: 'page', page: wav};\n};\n\n\n// Run in AudioWorkletGlobal scope\nif (typeof registerProcessor === 'function') {\n\n  class EncoderWorklet extends AudioWorkletProcessor {\n\n    constructor(){\n      super();\n      this.continueProcess = true;\n      this.port.onmessage = ({ data }) => {\n        switch( data['command'] ){\n\n          case 'done':\n            if (this.recorder) {\n              this.postPage(this.recorder.requestData());\n              this.port.postMessage( {message: 'done'} );\n              delete this.recorder;\n            }\n            break;\n\n          case 'close':\n            this.continueProcess = false;\n            break;\n\n          case 'init':\n            this.recorder = new WavePCM( data );\n            this.port.postMessage( {message: 'ready'} );\n            break;\n\n          default:\n            // Ignore any unknown commands and continue recieving commands\n        }\n      }\n    }\n\n    process(inputs) {\n      if (this.recorder && inputs[0] && inputs[0].length && inputs[0][0] && inputs[0][0].length){\n        this.recorder.record( inputs[0] );\n      }\n      return this.continueProcess;\n    }\n\n    postPage(pageData) {\n      if (pageData) {\n        this.port.postMessage( pageData, [pageData.page.buffer] );\n      }\n    }\n  }\n\n  registerProcessor('encoder-worklet', EncoderWorklet);\n}\n\n// run in scriptProcessor worker scope\nelse {\n  var recorder;\n  var postPageGlobal = (pageData) => {\n    if (pageData) {\n      postMessage( pageData, [pageData.page.buffer] );\n    }\n  }\n\n  onmessage = ({ data }) => {\n\n    switch( data['command'] ){\n\n      case 'encode':\n        if (recorder) {\n          recorder.record( data['buffers'] );\n        }\n        break;\n\n      case 'done':\n        if (recorder) {\n          postPageGlobal(recorder.requestData());\n          postMessage( {message: 'done'} );\n          recorder = null;\n        }\n        break;\n\n      case 'close':\n        close();\n        break;\n\n      case 'init':\n        recorder = new WavePCM( data );\n        postMessage( {message: 'ready'} );\n        break;\n\n      default:\n        // Ignore any unknown commands and continue recieving commands\n    }\n  };\n}\n\n\n// Exports for unit testing.\nvar module = module || {};\nmodule.exports = WavePCM;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvd2F2ZVdvcmtlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy93YXZlV29ya2VyLmpzPzA3NTEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFdhdmVQQ00gPSBmdW5jdGlvbiggY29uZmlnICl7XG5cbiAgdmFyIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHdhdkJpdERlcHRoOiAxNixcbiAgICBudW1iZXJPZkNoYW5uZWxzOiAxLFxuICB9LCBjb25maWcpO1xuXG4gIGlmICggIWNvbmZpZ1snd2F2U2FtcGxlUmF0ZSddICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIndhdlNhbXBsZVJhdGUgdmFsdWUgaXMgcmVxdWlyZWQgdG8gcmVjb3JkLiBOT1RFOiBBdWRpbyBpcyBub3QgcmVzYW1wbGVkIVwiKTtcbiAgfVxuXG4gIGlmICggWzgsIDE2LCAyNCwgMzJdLmluZGV4T2YoIGNvbmZpZ1snd2F2Qml0RGVwdGgnXSApID09PSAtMSApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IDgsIDE2LCAyNCBhbmQgMzIgYml0cyBwZXIgc2FtcGxlIGFyZSBzdXBwb3J0ZWRcIik7XG4gIH1cblxuICB0aGlzLm51bWJlck9mQ2hhbm5lbHMgPSBjb25maWdbJ251bWJlck9mQ2hhbm5lbHMnXTtcbiAgdGhpcy5iaXREZXB0aCA9IGNvbmZpZ1snd2F2Qml0RGVwdGgnXTtcbiAgdGhpcy5zYW1wbGVSYXRlID0gY29uZmlnWyd3YXZTYW1wbGVSYXRlJ107XG4gIHRoaXMucmVjb3JkZWRCdWZmZXJzID0gW107XG4gIHRoaXMuYnl0ZXNQZXJTYW1wbGUgPSB0aGlzLmJpdERlcHRoIC8gODtcbn07XG5cbldhdmVQQ00ucHJvdG90eXBlLnJlY29yZCA9IGZ1bmN0aW9uKCBidWZmZXJzICl7XG4gIHZhciBidWZmZXJMZW5ndGggPSBidWZmZXJzWzBdLmxlbmd0aDtcbiAgdmFyIHJlZHVjZWREYXRhID0gbmV3IFVpbnQ4QXJyYXkoIGJ1ZmZlckxlbmd0aCAqIHRoaXMubnVtYmVyT2ZDaGFubmVscyAqIHRoaXMuYnl0ZXNQZXJTYW1wbGUgKTtcblxuICAvLyBJbnRlcmxlYXZlXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGJ1ZmZlckxlbmd0aDsgaSsrICkge1xuICAgIGZvciAoIHZhciBjaGFubmVsID0gMDsgY2hhbm5lbCA8IHRoaXMubnVtYmVyT2ZDaGFubmVsczsgY2hhbm5lbCsrICkge1xuXG4gICAgICB2YXIgb3V0cHV0SW5kZXggPSAoIGkgKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMgKyBjaGFubmVsICkgKiB0aGlzLmJ5dGVzUGVyU2FtcGxlO1xuXG4gICAgICAvLyBjbGlwIHRoZSBzaWduYWwgaWYgaXQgZXhjZWVkcyBbLTEsIDFdXG4gICAgICB2YXIgc2FtcGxlID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIGJ1ZmZlcnNbIGNoYW5uZWwgXVsgaSBdKSk7XG5cbiAgICAgIC8vIGJpdCByZWR1Y2UgYW5kIGNvbnZlcnQgdG8gaW50ZWdlclxuICAgICAgc3dpdGNoICggdGhpcy5ieXRlc1BlclNhbXBsZSApIHtcbiAgICAgICAgY2FzZSA0OiAvLyAzMiBiaXRzIHNpZ25lZFxuICAgICAgICAgIHNhbXBsZSA9IHNhbXBsZSAqIDIxNDc0ODM2NDcuNSAtIDAuNTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggXSA9IHNhbXBsZTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAxIF0gPSBzYW1wbGUgPj4gODtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAyIF0gPSBzYW1wbGUgPj4gMTY7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMyBdID0gc2FtcGxlID4+IDI0O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzogLy8gMjQgYml0cyBzaWduZWRcbiAgICAgICAgICBzYW1wbGUgPSBzYW1wbGUgKiA4Mzg4NjA3LjUgLSAwLjU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4IF0gPSBzYW1wbGU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMSBdID0gc2FtcGxlID4+IDg7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMiBdID0gc2FtcGxlID4+IDE2O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gMTYgYml0cyBzaWduZWRcbiAgICAgICAgICBzYW1wbGUgPSBzYW1wbGUgKiAzMjc2Ny41IC0gMC41O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCBdID0gc2FtcGxlO1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDEgXSA9IHNhbXBsZSA+PiA4O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTogLy8gOCBiaXRzIHVuc2lnbmVkXG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4IF0gPSAoc2FtcGxlICsgMSkgKiAxMjcuNTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgOCwgMTYsIDI0IGFuZCAzMiBiaXRzIHBlciBzYW1wbGUgYXJlIHN1cHBvcnRlZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLnJlY29yZGVkQnVmZmVycy5wdXNoKCByZWR1Y2VkRGF0YSApO1xufTtcblxuV2F2ZVBDTS5wcm90b3R5cGUucmVxdWVzdERhdGEgPSBmdW5jdGlvbigpe1xuICB2YXIgYnVmZmVyTGVuZ3RoID0gdGhpcy5yZWNvcmRlZEJ1ZmZlcnNbMF0ubGVuZ3RoO1xuICB2YXIgZGF0YUxlbmd0aCA9IHRoaXMucmVjb3JkZWRCdWZmZXJzLmxlbmd0aCAqIGJ1ZmZlckxlbmd0aDtcbiAgdmFyIGhlYWRlckxlbmd0aCA9IDQ0O1xuICB2YXIgd2F2ID0gbmV3IFVpbnQ4QXJyYXkoIGhlYWRlckxlbmd0aCArIGRhdGFMZW5ndGggKTtcbiAgdmFyIHZpZXcgPSBuZXcgRGF0YVZpZXcoIHdhdi5idWZmZXIgKTtcblxuICB2aWV3LnNldFVpbnQzMiggMCwgMTM4MDUzMzgzMCwgZmFsc2UgKTsgLy8gUklGRiBpZGVudGlmaWVyICdSSUZGJ1xuICB2aWV3LnNldFVpbnQzMiggNCwgMzYgKyBkYXRhTGVuZ3RoLCB0cnVlICk7IC8vIGZpbGUgbGVuZ3RoIG1pbnVzIFJJRkYgaWRlbnRpZmllciBsZW5ndGggYW5kIGZpbGUgZGVzY3JpcHRpb24gbGVuZ3RoXG4gIHZpZXcuc2V0VWludDMyKCA4LCAxNDYzODk5NzE3LCBmYWxzZSApOyAvLyBSSUZGIHR5cGUgJ1dBVkUnXG4gIHZpZXcuc2V0VWludDMyKCAxMiwgMTcxODQ0OTE4NCwgZmFsc2UgKTsgLy8gZm9ybWF0IGNodW5rIGlkZW50aWZpZXIgJ2ZtdCAnXG4gIHZpZXcuc2V0VWludDMyKCAxNiwgMTYsIHRydWUgKTsgLy8gZm9ybWF0IGNodW5rIGxlbmd0aFxuICB2aWV3LnNldFVpbnQxNiggMjAsIDEsIHRydWUgKTsgLy8gc2FtcGxlIGZvcm1hdCAocmF3KVxuICB2aWV3LnNldFVpbnQxNiggMjIsIHRoaXMubnVtYmVyT2ZDaGFubmVscywgdHJ1ZSApOyAvLyBjaGFubmVsIGNvdW50XG4gIHZpZXcuc2V0VWludDMyKCAyNCwgdGhpcy5zYW1wbGVSYXRlLCB0cnVlICk7IC8vIHNhbXBsZSByYXRlXG4gIHZpZXcuc2V0VWludDMyKCAyOCwgdGhpcy5zYW1wbGVSYXRlICogdGhpcy5ieXRlc1BlclNhbXBsZSAqIHRoaXMubnVtYmVyT2ZDaGFubmVscywgdHJ1ZSApOyAvLyBieXRlIHJhdGUgKHNhbXBsZSByYXRlICogYmxvY2sgYWxpZ24pXG4gIHZpZXcuc2V0VWludDE2KCAzMiwgdGhpcy5ieXRlc1BlclNhbXBsZSAqIHRoaXMubnVtYmVyT2ZDaGFubmVscywgdHJ1ZSApOyAvLyBibG9jayBhbGlnbiAoY2hhbm5lbCBjb3VudCAqIGJ5dGVzIHBlciBzYW1wbGUpXG4gIHZpZXcuc2V0VWludDE2KCAzNCwgdGhpcy5iaXREZXB0aCwgdHJ1ZSApOyAvLyBiaXRzIHBlciBzYW1wbGVcbiAgdmlldy5zZXRVaW50MzIoIDM2LCAxNjg0MTA4Mzg1LCBmYWxzZSk7IC8vIGRhdGEgY2h1bmsgaWRlbnRpZmllciAnZGF0YSdcbiAgdmlldy5zZXRVaW50MzIoIDQwLCBkYXRhTGVuZ3RoLCB0cnVlICk7IC8vIGRhdGEgY2h1bmsgbGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlY29yZGVkQnVmZmVycy5sZW5ndGg7IGkrKyApIHtcbiAgICB3YXYuc2V0KCB0aGlzLnJlY29yZGVkQnVmZmVyc1tpXSwgaSAqIGJ1ZmZlckxlbmd0aCArIGhlYWRlckxlbmd0aCApO1xuICB9XG5cbiAgcmV0dXJuIHttZXNzYWdlOiAncGFnZScsIHBhZ2U6IHdhdn07XG59O1xuXG5cbi8vIFJ1biBpbiBBdWRpb1dvcmtsZXRHbG9iYWwgc2NvcGVcbmlmICh0eXBlb2YgcmVnaXN0ZXJQcm9jZXNzb3IgPT09ICdmdW5jdGlvbicpIHtcblxuICBjbGFzcyBFbmNvZGVyV29ya2xldCBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuY29udGludWVQcm9jZXNzID0gdHJ1ZTtcbiAgICAgIHRoaXMucG9ydC5vbm1lc3NhZ2UgPSAoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgc3dpdGNoKCBkYXRhWydjb21tYW5kJ10gKXtcblxuICAgICAgICAgIGNhc2UgJ2RvbmUnOlxuICAgICAgICAgICAgaWYgKHRoaXMucmVjb3JkZXIpIHtcbiAgICAgICAgICAgICAgdGhpcy5wb3N0UGFnZSh0aGlzLnJlY29yZGVyLnJlcXVlc3REYXRhKCkpO1xuICAgICAgICAgICAgICB0aGlzLnBvcnQucG9zdE1lc3NhZ2UoIHttZXNzYWdlOiAnZG9uZSd9ICk7XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJlY29yZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdjbG9zZSc6XG4gICAgICAgICAgICB0aGlzLmNvbnRpbnVlUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdpbml0JzpcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIgPSBuZXcgV2F2ZVBDTSggZGF0YSApO1xuICAgICAgICAgICAgdGhpcy5wb3J0LnBvc3RNZXNzYWdlKCB7bWVzc2FnZTogJ3JlYWR5J30gKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIElnbm9yZSBhbnkgdW5rbm93biBjb21tYW5kcyBhbmQgY29udGludWUgcmVjaWV2aW5nIGNvbW1hbmRzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzKGlucHV0cykge1xuICAgICAgaWYgKHRoaXMucmVjb3JkZXIgJiYgaW5wdXRzWzBdICYmIGlucHV0c1swXS5sZW5ndGggJiYgaW5wdXRzWzBdWzBdICYmIGlucHV0c1swXVswXS5sZW5ndGgpe1xuICAgICAgICB0aGlzLnJlY29yZGVyLnJlY29yZCggaW5wdXRzWzBdICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5jb250aW51ZVByb2Nlc3M7XG4gICAgfVxuXG4gICAgcG9zdFBhZ2UocGFnZURhdGEpIHtcbiAgICAgIGlmIChwYWdlRGF0YSkge1xuICAgICAgICB0aGlzLnBvcnQucG9zdE1lc3NhZ2UoIHBhZ2VEYXRhLCBbcGFnZURhdGEucGFnZS5idWZmZXJdICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJQcm9jZXNzb3IoJ2VuY29kZXItd29ya2xldCcsIEVuY29kZXJXb3JrbGV0KTtcbn1cblxuLy8gcnVuIGluIHNjcmlwdFByb2Nlc3NvciB3b3JrZXIgc2NvcGVcbmVsc2Uge1xuICB2YXIgcmVjb3JkZXI7XG4gIHZhciBwb3N0UGFnZUdsb2JhbCA9IChwYWdlRGF0YSkgPT4ge1xuICAgIGlmIChwYWdlRGF0YSkge1xuICAgICAgcG9zdE1lc3NhZ2UoIHBhZ2VEYXRhLCBbcGFnZURhdGEucGFnZS5idWZmZXJdICk7XG4gICAgfVxuICB9XG5cbiAgb25tZXNzYWdlID0gKHsgZGF0YSB9KSA9PiB7XG5cbiAgICBzd2l0Y2goIGRhdGFbJ2NvbW1hbmQnXSApe1xuXG4gICAgICBjYXNlICdlbmNvZGUnOlxuICAgICAgICBpZiAocmVjb3JkZXIpIHtcbiAgICAgICAgICByZWNvcmRlci5yZWNvcmQoIGRhdGFbJ2J1ZmZlcnMnXSApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdkb25lJzpcbiAgICAgICAgaWYgKHJlY29yZGVyKSB7XG4gICAgICAgICAgcG9zdFBhZ2VHbG9iYWwocmVjb3JkZXIucmVxdWVzdERhdGEoKSk7XG4gICAgICAgICAgcG9zdE1lc3NhZ2UoIHttZXNzYWdlOiAnZG9uZSd9ICk7XG4gICAgICAgICAgcmVjb3JkZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjbG9zZSc6XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdpbml0JzpcbiAgICAgICAgcmVjb3JkZXIgPSBuZXcgV2F2ZVBDTSggZGF0YSApO1xuICAgICAgICBwb3N0TWVzc2FnZSgge21lc3NhZ2U6ICdyZWFkeSd9ICk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBJZ25vcmUgYW55IHVua25vd24gY29tbWFuZHMgYW5kIGNvbnRpbnVlIHJlY2lldmluZyBjb21tYW5kc1xuICAgIH1cbiAgfTtcbn1cblxuXG4vLyBFeHBvcnRzIGZvciB1bml0IHRlc3RpbmcuXG52YXIgbW9kdWxlID0gbW9kdWxlIHx8IHt9O1xubW9kdWxlLmV4cG9ydHMgPSBXYXZlUENNO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/waveWorker.js\n");

/***/ })

/******/ });
});