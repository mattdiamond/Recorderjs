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

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanM/Y2QwMCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/webpack/buildin/global.js\n");

/***/ }),

/***/ "./src/waveWorker.js":
/*!***************************!*\
  !*** ./src/waveWorker.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n\nconst WavePCM = function( config ){\n\n  var config = Object.assign({\n    wavBitDepth: 16\n  }, config);\n\n  if ( !config['wavSampleRate'] ) {\n    throw new Error(\"wavSampleRate value is required to record. NOTE: Audio is not resampled!\");\n  }\n\n  if ( [8, 16, 24, 32].indexOf( config['wavBitDepth'] ) === -1 ) {\n    throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n  }\n\n  this.bitDepth = config['wavBitDepth'];\n  this.sampleRate = config['wavSampleRate'];\n  this.recordedBuffers = [];\n  this.bytesPerSample = this.bitDepth / 8;\n};\n\nWavePCM.prototype.record = function( buffers ){\n  this.numberOfChannels = this.numberOfChannels || buffers.length;\n  var bufferLength = buffers[0].length;\n  var reducedData = new Uint8Array( bufferLength * this.numberOfChannels * this.bytesPerSample );\n\n  // Interleave\n  for ( var i = 0; i < bufferLength; i++ ) {\n    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {\n\n      var outputIndex = ( i * this.numberOfChannels + channel ) * this.bytesPerSample;\n\n      // clip the signal if it exceeds [-1, 1]\n      var sample = Math.max(-1, Math.min(1, buffers[ channel ][ i ]));\n\n      // bit reduce and convert to integer\n      switch ( this.bytesPerSample ) {\n        case 4: // 32 bits signed\n          sample = sample * 2147483647.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          reducedData[ outputIndex + 3 ] = sample >> 24;\n          break;\n\n        case 3: // 24 bits signed\n          sample = sample * 8388607.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          break;\n\n        case 2: // 16 bits signed\n          sample = sample * 32767.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          break;\n\n        case 1: // 8 bits unsigned\n          reducedData[ outputIndex ] = (sample + 1) * 127.5;\n          break;\n\n        default:\n          throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n      }\n    }\n  }\n\n  this.recordedBuffers.push( reducedData );\n};\n\nWavePCM.prototype.requestData = function(){\n  var bufferLength = this.recordedBuffers[0].length;\n  var dataLength = this.recordedBuffers.length * bufferLength;\n  var headerLength = 44;\n  var wav = new Uint8Array( headerLength + dataLength );\n  var view = new DataView( wav.buffer );\n\n  view.setUint32( 0, 1380533830, false ); // RIFF identifier 'RIFF'\n  view.setUint32( 4, 36 + dataLength, true ); // file length minus RIFF identifier length and file description length\n  view.setUint32( 8, 1463899717, false ); // RIFF type 'WAVE'\n  view.setUint32( 12, 1718449184, false ); // format chunk identifier 'fmt '\n  view.setUint32( 16, 16, true ); // format chunk length\n  view.setUint16( 20, 1, true ); // sample format (raw)\n  view.setUint16( 22, this.numberOfChannels, true ); // channel count\n  view.setUint32( 24, this.sampleRate, true ); // sample rate\n  view.setUint32( 28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true ); // byte rate (sample rate * block align)\n  view.setUint16( 32, this.bytesPerSample * this.numberOfChannels, true ); // block align (channel count * bytes per sample)\n  view.setUint16( 34, this.bitDepth, true ); // bits per sample\n  view.setUint32( 36, 1684108385, false); // data chunk identifier 'data'\n  view.setUint32( 40, dataLength, true ); // data chunk length\n\n  for (var i = 0; i < this.recordedBuffers.length; i++ ) {\n    wav.set( this.recordedBuffers[i], i * bufferLength + headerLength );\n  }\n\n  return {message: 'page', page: wav};\n};\n\n\n// Run in AudioWorkletGlobal scope\nif (global['registerProcessor'] && global['AudioWorkletProcessor']) {\n\n  class EncoderWorklet extends global['AudioWorkletProcessor'] {\n\n    constructor(){\n      super();\n      this.continueProcess = true;\n      this.port.onmessage = ({ data }) => {\n        switch( data['command'] ){\n\n          case 'done':\n            if (this.recorder) {\n              this.postPage(this.recorder.requestData());\n              this.port.postMessage( {message: 'done'} );\n              delete this.recorder;\n            }\n            break;\n\n          case 'close':\n            this.continueProcess = false;\n            break;\n\n          case 'init':\n            this.recorder = new WavePCM( data );\n            this.port.postMessage( {message: 'ready'} );\n            break;\n\n          default:\n            // Ignore any unknown commands and continue recieving commands\n        }\n      }\n    }\n\n    process(inputs) {\n      if (this.recorder && inputs[0]){\n        this.recorder.record( inputs[0] );\n      }\n      return this.continueProcess;\n    }\n\n    postPage(pageData) {\n      if (pageData) {\n        this.port.postMessage( pageData, [pageData.page.buffer] );\n      }\n    }\n  }\n\n  global['registerProcessor']('encoder-worklet', EncoderWorklet);\n}\n\n// run in scriptProcessor worker scope\nelse {\n  var recorder;\n  var postPageGlobal = (pageData) => {\n    if (pageData) {\n      global['postMessage']( pageData, [pageData.page.buffer] );\n    }\n  }\n\n  global['onmessage'] = ({ data }) => {\n\n    switch( data['command'] ){\n\n      case 'encode':\n        if (recorder) {\n          recorder.record( data['buffers'] );\n        }\n        break;\n\n      case 'done':\n        if (recorder) {\n          postPageGlobal(recorder.requestData());\n          global['postMessage']( {message: 'done'} );\n          recorder = null;\n        }\n        break;\n\n      case 'close':\n        global['close']();\n        break;\n\n      case 'init':\n        recorder = new WavePCM( data );\n        global['postMessage']( {message: 'ready'} );\n        break;\n\n      default:\n        // Ignore any unknown commands and continue recieving commands\n    }\n  };\n\n  // Exports for unit testing. Causes script error when interpreted in AudioWorklet Global scope\n  module.exports = WavePCM;\n}\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvd2F2ZVdvcmtlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy93YXZlV29ya2VyLmpzPzA3NTEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFdhdmVQQ00gPSBmdW5jdGlvbiggY29uZmlnICl7XG5cbiAgdmFyIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHdhdkJpdERlcHRoOiAxNlxuICB9LCBjb25maWcpO1xuXG4gIGlmICggIWNvbmZpZ1snd2F2U2FtcGxlUmF0ZSddICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIndhdlNhbXBsZVJhdGUgdmFsdWUgaXMgcmVxdWlyZWQgdG8gcmVjb3JkLiBOT1RFOiBBdWRpbyBpcyBub3QgcmVzYW1wbGVkIVwiKTtcbiAgfVxuXG4gIGlmICggWzgsIDE2LCAyNCwgMzJdLmluZGV4T2YoIGNvbmZpZ1snd2F2Qml0RGVwdGgnXSApID09PSAtMSApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IDgsIDE2LCAyNCBhbmQgMzIgYml0cyBwZXIgc2FtcGxlIGFyZSBzdXBwb3J0ZWRcIik7XG4gIH1cblxuICB0aGlzLmJpdERlcHRoID0gY29uZmlnWyd3YXZCaXREZXB0aCddO1xuICB0aGlzLnNhbXBsZVJhdGUgPSBjb25maWdbJ3dhdlNhbXBsZVJhdGUnXTtcbiAgdGhpcy5yZWNvcmRlZEJ1ZmZlcnMgPSBbXTtcbiAgdGhpcy5ieXRlc1BlclNhbXBsZSA9IHRoaXMuYml0RGVwdGggLyA4O1xufTtcblxuV2F2ZVBDTS5wcm90b3R5cGUucmVjb3JkID0gZnVuY3Rpb24oIGJ1ZmZlcnMgKXtcbiAgdGhpcy5udW1iZXJPZkNoYW5uZWxzID0gdGhpcy5udW1iZXJPZkNoYW5uZWxzIHx8IGJ1ZmZlcnMubGVuZ3RoO1xuICB2YXIgYnVmZmVyTGVuZ3RoID0gYnVmZmVyc1swXS5sZW5ndGg7XG4gIHZhciByZWR1Y2VkRGF0YSA9IG5ldyBVaW50OEFycmF5KCBidWZmZXJMZW5ndGggKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMgKiB0aGlzLmJ5dGVzUGVyU2FtcGxlICk7XG5cbiAgLy8gSW50ZXJsZWF2ZVxuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBidWZmZXJMZW5ndGg7IGkrKyApIHtcbiAgICBmb3IgKCB2YXIgY2hhbm5lbCA9IDA7IGNoYW5uZWwgPCB0aGlzLm51bWJlck9mQ2hhbm5lbHM7IGNoYW5uZWwrKyApIHtcblxuICAgICAgdmFyIG91dHB1dEluZGV4ID0gKCBpICogdGhpcy5udW1iZXJPZkNoYW5uZWxzICsgY2hhbm5lbCApICogdGhpcy5ieXRlc1BlclNhbXBsZTtcblxuICAgICAgLy8gY2xpcCB0aGUgc2lnbmFsIGlmIGl0IGV4Y2VlZHMgWy0xLCAxXVxuICAgICAgdmFyIHNhbXBsZSA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBidWZmZXJzWyBjaGFubmVsIF1bIGkgXSkpO1xuXG4gICAgICAvLyBiaXQgcmVkdWNlIGFuZCBjb252ZXJ0IHRvIGludGVnZXJcbiAgICAgIHN3aXRjaCAoIHRoaXMuYnl0ZXNQZXJTYW1wbGUgKSB7XG4gICAgICAgIGNhc2UgNDogLy8gMzIgYml0cyBzaWduZWRcbiAgICAgICAgICBzYW1wbGUgPSBzYW1wbGUgKiAyMTQ3NDgzNjQ3LjUgLSAwLjU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4IF0gPSBzYW1wbGU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMSBdID0gc2FtcGxlID4+IDg7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMiBdID0gc2FtcGxlID4+IDE2O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDMgXSA9IHNhbXBsZSA+PiAyNDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6IC8vIDI0IGJpdHMgc2lnbmVkXG4gICAgICAgICAgc2FtcGxlID0gc2FtcGxlICogODM4ODYwNy41IC0gMC41O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCBdID0gc2FtcGxlO1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDEgXSA9IHNhbXBsZSA+PiA4O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDIgXSA9IHNhbXBsZSA+PiAxNjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6IC8vIDE2IGJpdHMgc2lnbmVkXG4gICAgICAgICAgc2FtcGxlID0gc2FtcGxlICogMzI3NjcuNSAtIDAuNTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggXSA9IHNhbXBsZTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAxIF0gPSBzYW1wbGUgPj4gODtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDE6IC8vIDggYml0cyB1bnNpZ25lZFxuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCBdID0gKHNhbXBsZSArIDEpICogMTI3LjU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IDgsIDE2LCAyNCBhbmQgMzIgYml0cyBwZXIgc2FtcGxlIGFyZSBzdXBwb3J0ZWRcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5yZWNvcmRlZEJ1ZmZlcnMucHVzaCggcmVkdWNlZERhdGEgKTtcbn07XG5cbldhdmVQQ00ucHJvdG90eXBlLnJlcXVlc3REYXRhID0gZnVuY3Rpb24oKXtcbiAgdmFyIGJ1ZmZlckxlbmd0aCA9IHRoaXMucmVjb3JkZWRCdWZmZXJzWzBdLmxlbmd0aDtcbiAgdmFyIGRhdGFMZW5ndGggPSB0aGlzLnJlY29yZGVkQnVmZmVycy5sZW5ndGggKiBidWZmZXJMZW5ndGg7XG4gIHZhciBoZWFkZXJMZW5ndGggPSA0NDtcbiAgdmFyIHdhdiA9IG5ldyBVaW50OEFycmF5KCBoZWFkZXJMZW5ndGggKyBkYXRhTGVuZ3RoICk7XG4gIHZhciB2aWV3ID0gbmV3IERhdGFWaWV3KCB3YXYuYnVmZmVyICk7XG5cbiAgdmlldy5zZXRVaW50MzIoIDAsIDEzODA1MzM4MzAsIGZhbHNlICk7IC8vIFJJRkYgaWRlbnRpZmllciAnUklGRidcbiAgdmlldy5zZXRVaW50MzIoIDQsIDM2ICsgZGF0YUxlbmd0aCwgdHJ1ZSApOyAvLyBmaWxlIGxlbmd0aCBtaW51cyBSSUZGIGlkZW50aWZpZXIgbGVuZ3RoIGFuZCBmaWxlIGRlc2NyaXB0aW9uIGxlbmd0aFxuICB2aWV3LnNldFVpbnQzMiggOCwgMTQ2Mzg5OTcxNywgZmFsc2UgKTsgLy8gUklGRiB0eXBlICdXQVZFJ1xuICB2aWV3LnNldFVpbnQzMiggMTIsIDE3MTg0NDkxODQsIGZhbHNlICk7IC8vIGZvcm1hdCBjaHVuayBpZGVudGlmaWVyICdmbXQgJ1xuICB2aWV3LnNldFVpbnQzMiggMTYsIDE2LCB0cnVlICk7IC8vIGZvcm1hdCBjaHVuayBsZW5ndGhcbiAgdmlldy5zZXRVaW50MTYoIDIwLCAxLCB0cnVlICk7IC8vIHNhbXBsZSBmb3JtYXQgKHJhdylcbiAgdmlldy5zZXRVaW50MTYoIDIyLCB0aGlzLm51bWJlck9mQ2hhbm5lbHMsIHRydWUgKTsgLy8gY2hhbm5lbCBjb3VudFxuICB2aWV3LnNldFVpbnQzMiggMjQsIHRoaXMuc2FtcGxlUmF0ZSwgdHJ1ZSApOyAvLyBzYW1wbGUgcmF0ZVxuICB2aWV3LnNldFVpbnQzMiggMjgsIHRoaXMuc2FtcGxlUmF0ZSAqIHRoaXMuYnl0ZXNQZXJTYW1wbGUgKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMsIHRydWUgKTsgLy8gYnl0ZSByYXRlIChzYW1wbGUgcmF0ZSAqIGJsb2NrIGFsaWduKVxuICB2aWV3LnNldFVpbnQxNiggMzIsIHRoaXMuYnl0ZXNQZXJTYW1wbGUgKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMsIHRydWUgKTsgLy8gYmxvY2sgYWxpZ24gKGNoYW5uZWwgY291bnQgKiBieXRlcyBwZXIgc2FtcGxlKVxuICB2aWV3LnNldFVpbnQxNiggMzQsIHRoaXMuYml0RGVwdGgsIHRydWUgKTsgLy8gYml0cyBwZXIgc2FtcGxlXG4gIHZpZXcuc2V0VWludDMyKCAzNiwgMTY4NDEwODM4NSwgZmFsc2UpOyAvLyBkYXRhIGNodW5rIGlkZW50aWZpZXIgJ2RhdGEnXG4gIHZpZXcuc2V0VWludDMyKCA0MCwgZGF0YUxlbmd0aCwgdHJ1ZSApOyAvLyBkYXRhIGNodW5rIGxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yZWNvcmRlZEJ1ZmZlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgd2F2LnNldCggdGhpcy5yZWNvcmRlZEJ1ZmZlcnNbaV0sIGkgKiBidWZmZXJMZW5ndGggKyBoZWFkZXJMZW5ndGggKTtcbiAgfVxuXG4gIHJldHVybiB7bWVzc2FnZTogJ3BhZ2UnLCBwYWdlOiB3YXZ9O1xufTtcblxuXG4vLyBSdW4gaW4gQXVkaW9Xb3JrbGV0R2xvYmFsIHNjb3BlXG5pZiAoZ2xvYmFsWydyZWdpc3RlclByb2Nlc3NvciddICYmIGdsb2JhbFsnQXVkaW9Xb3JrbGV0UHJvY2Vzc29yJ10pIHtcblxuICBjbGFzcyBFbmNvZGVyV29ya2xldCBleHRlbmRzIGdsb2JhbFsnQXVkaW9Xb3JrbGV0UHJvY2Vzc29yJ10ge1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmNvbnRpbnVlUHJvY2VzcyA9IHRydWU7XG4gICAgICB0aGlzLnBvcnQub25tZXNzYWdlID0gKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIHN3aXRjaCggZGF0YVsnY29tbWFuZCddICl7XG5cbiAgICAgICAgICBjYXNlICdkb25lJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnJlY29yZGVyKSB7XG4gICAgICAgICAgICAgIHRoaXMucG9zdFBhZ2UodGhpcy5yZWNvcmRlci5yZXF1ZXN0RGF0YSgpKTtcbiAgICAgICAgICAgICAgdGhpcy5wb3J0LnBvc3RNZXNzYWdlKCB7bWVzc2FnZTogJ2RvbmUnfSApO1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5yZWNvcmRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnY2xvc2UnOlxuICAgICAgICAgICAgdGhpcy5jb250aW51ZVByb2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyID0gbmV3IFdhdmVQQ00oIGRhdGEgKTtcbiAgICAgICAgICAgIHRoaXMucG9ydC5wb3N0TWVzc2FnZSgge21lc3NhZ2U6ICdyZWFkeSd9ICk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBJZ25vcmUgYW55IHVua25vd24gY29tbWFuZHMgYW5kIGNvbnRpbnVlIHJlY2lldmluZyBjb21tYW5kc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2VzcyhpbnB1dHMpIHtcbiAgICAgIGlmICh0aGlzLnJlY29yZGVyICYmIGlucHV0c1swXSl7XG4gICAgICAgIHRoaXMucmVjb3JkZXIucmVjb3JkKCBpbnB1dHNbMF0gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNvbnRpbnVlUHJvY2VzcztcbiAgICB9XG5cbiAgICBwb3N0UGFnZShwYWdlRGF0YSkge1xuICAgICAgaWYgKHBhZ2VEYXRhKSB7XG4gICAgICAgIHRoaXMucG9ydC5wb3N0TWVzc2FnZSggcGFnZURhdGEsIFtwYWdlRGF0YS5wYWdlLmJ1ZmZlcl0gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxbJ3JlZ2lzdGVyUHJvY2Vzc29yJ10oJ2VuY29kZXItd29ya2xldCcsIEVuY29kZXJXb3JrbGV0KTtcbn1cblxuLy8gcnVuIGluIHNjcmlwdFByb2Nlc3NvciB3b3JrZXIgc2NvcGVcbmVsc2Uge1xuICB2YXIgcmVjb3JkZXI7XG4gIHZhciBwb3N0UGFnZUdsb2JhbCA9IChwYWdlRGF0YSkgPT4ge1xuICAgIGlmIChwYWdlRGF0YSkge1xuICAgICAgZ2xvYmFsWydwb3N0TWVzc2FnZSddKCBwYWdlRGF0YSwgW3BhZ2VEYXRhLnBhZ2UuYnVmZmVyXSApO1xuICAgIH1cbiAgfVxuXG4gIGdsb2JhbFsnb25tZXNzYWdlJ10gPSAoeyBkYXRhIH0pID0+IHtcblxuICAgIHN3aXRjaCggZGF0YVsnY29tbWFuZCddICl7XG5cbiAgICAgIGNhc2UgJ2VuY29kZSc6XG4gICAgICAgIGlmIChyZWNvcmRlcikge1xuICAgICAgICAgIHJlY29yZGVyLnJlY29yZCggZGF0YVsnYnVmZmVycyddICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2RvbmUnOlxuICAgICAgICBpZiAocmVjb3JkZXIpIHtcbiAgICAgICAgICBwb3N0UGFnZUdsb2JhbChyZWNvcmRlci5yZXF1ZXN0RGF0YSgpKTtcbiAgICAgICAgICBnbG9iYWxbJ3Bvc3RNZXNzYWdlJ10oIHttZXNzYWdlOiAnZG9uZSd9ICk7XG4gICAgICAgICAgcmVjb3JkZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjbG9zZSc6XG4gICAgICAgIGdsb2JhbFsnY2xvc2UnXSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgIHJlY29yZGVyID0gbmV3IFdhdmVQQ00oIGRhdGEgKTtcbiAgICAgICAgZ2xvYmFsWydwb3N0TWVzc2FnZSddKCB7bWVzc2FnZTogJ3JlYWR5J30gKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIElnbm9yZSBhbnkgdW5rbm93biBjb21tYW5kcyBhbmQgY29udGludWUgcmVjaWV2aW5nIGNvbW1hbmRzXG4gICAgfVxuICB9O1xuXG4gIC8vIEV4cG9ydHMgZm9yIHVuaXQgdGVzdGluZy4gQ2F1c2VzIHNjcmlwdCBlcnJvciB3aGVuIGludGVycHJldGVkIGluIEF1ZGlvV29ya2xldCBHbG9iYWwgc2NvcGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBXYXZlUENNO1xufVxuXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/waveWorker.js\n");

/***/ })

/******/ });
});