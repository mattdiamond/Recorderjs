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
/*! exports provided: WavePCM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WavePCM\", function() { return WavePCM; });\n\n  \nvar recorder;\n\nconst WavePCM = function( config ){\n\n  var config = Object.assign({\n    wavBitDepth: 16\n  }, config);\n\n  if ( !config['wavSampleRate'] ) {\n    throw new Error(\"wavSampleRate value is required to record. NOTE: Audio is not resampled!\");\n  }\n\n  if ( [8, 16, 24, 32].indexOf( config['wavBitDepth'] ) === -1 ) {\n    throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n  }\n\n  this.bitDepth = config['wavBitDepth'];\n  this.sampleRate = config['wavSampleRate'];\n  this.recordedBuffers = [];\n  this.bytesPerSample = this.bitDepth / 8;\n};\n\nWavePCM.prototype.record = function( buffers ){\n  this.numberOfChannels = this.numberOfChannels || buffers.length;\n  var bufferLength = buffers[0].length;\n  var reducedData = new Uint8Array( bufferLength * this.numberOfChannels * this.bytesPerSample );\n\n  // Interleave\n  for ( var i = 0; i < bufferLength; i++ ) {\n    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {\n\n      var outputIndex = ( i * this.numberOfChannels + channel ) * this.bytesPerSample;\n\n      // clip the signal if it exceeds [-1, 1]\n      var sample = Math.max(-1, Math.min(1, buffers[ channel ][ i ]));\n\n      // bit reduce and convert to integer\n      switch ( this.bytesPerSample ) {\n        case 4: // 32 bits signed\n          sample = sample * 2147483647.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          reducedData[ outputIndex + 3 ] = sample >> 24;\n          break;\n\n        case 3: // 24 bits signed\n          sample = sample * 8388607.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          break;\n\n        case 2: // 16 bits signed\n          sample = sample * 32767.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          break;\n\n        case 1: // 8 bits unsigned\n          reducedData[ outputIndex ] = (sample + 1) * 127.5;\n          break;\n\n        default:\n          throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n      }\n    }\n  }\n\n  this.recordedBuffers.push( reducedData );\n};\n\nWavePCM.prototype.requestData = function(){\n  var bufferLength = this.recordedBuffers[0].length;\n  var dataLength = this.recordedBuffers.length * bufferLength;\n  var headerLength = 44;\n  var wav = new Uint8Array( headerLength + dataLength );\n  var view = new DataView( wav.buffer );\n\n  view.setUint32( 0, 1380533830, false ); // RIFF identifier 'RIFF'\n  view.setUint32( 4, 36 + dataLength, true ); // file length minus RIFF identifier length and file description length\n  view.setUint32( 8, 1463899717, false ); // RIFF type 'WAVE'\n  view.setUint32( 12, 1718449184, false ); // format chunk identifier 'fmt '\n  view.setUint32( 16, 16, true ); // format chunk length\n  view.setUint16( 20, 1, true ); // sample format (raw)\n  view.setUint16( 22, this.numberOfChannels, true ); // channel count\n  view.setUint32( 24, this.sampleRate, true ); // sample rate\n  view.setUint32( 28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true ); // byte rate (sample rate * block align)\n  view.setUint16( 32, this.bytesPerSample * this.numberOfChannels, true ); // block align (channel count * bytes per sample)\n  view.setUint16( 34, this.bitDepth, true ); // bits per sample\n  view.setUint32( 36, 1684108385, false); // data chunk identifier 'data'\n  view.setUint32( 40, dataLength, true ); // data chunk length\n\n  for (var i = 0; i < this.recordedBuffers.length; i++ ) {\n    wav.set( this.recordedBuffers[i], i * bufferLength + headerLength );\n  }\n\n  return {message: 'page', page: wav};\n};\n\n\n// Run in AudioWorkletGlobal scope\nif (global['registerProcessor'] && global['AudioWorkletProcessor']) {\n\n  class EncoderWorklet extends global['AudioWorkletProcessor'] {\n\n    constructor(){\n      super();\n      this.continueProcess = true;\n      this.port.onmessage = ({ data }) => {\n        switch( data['command'] ){\n\n          case 'done':\n            if (recorder) {\n              this.postPage(recorder.requestData());\n              this.port.postMessage( {message: 'done'} );\n              recorder = null;\n            }\n            break;\n\n          case 'close':\n            this.continueProcess = false;\n            break;\n\n          case 'init':\n            recorder = new WavePCM( data );\n            this.port.postMessage( {message: 'ready'} );\n            break;\n\n          default:\n            // Ignore any unknown commands and continue recieving commands\n        }\n      }\n    }\n\n    process(inputs) {\n      if (recorder && inputs[0]){\n        recorder.record( inputs[0] );\n      }\n      return this.continueProcess;\n    }\n\n    postPage(pageData) {\n      if (pageData) {\n        this.port.postMessage( pageData, [pageData.page.buffer] );\n      }\n    }\n  }\n\n  global['registerProcessor']('encoder-worklet', EncoderWorklet);\n}\n\n// run in scriptProcessor worker scope\nelse {\n  var postPageGlobal = (pageData) => {\n    if (pageData) {\n      global['postMessage']( pageData, [pageData.page.buffer] );\n    }\n  }\n\n  global['onmessage'] = ({ data }) => {\n\n    switch( data['command'] ){\n\n      case 'record':\n        if (recorder) {\n          recorder.record( data['buffers'] );\n        }\n        break;\n\n      case 'done':\n        if (recorder) {\n          postPageGlobal(recorder.requestData());\n          global['postMessage']( {message: 'done'} );\n          recorder = null;\n        }\n        break;\n\n      case 'close':\n        global['close']();\n        break;\n\n      case 'init':\n        recorder = new WavePCM( data );\n        global['postMessage']( {message: 'ready'} );\n        break;\n\n      default:\n        // Ignore any unknown commands and continue recieving commands\n    }\n  };\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvd2F2ZVdvcmtlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy93YXZlV29ya2VyLmpzPzA3NTEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4gIFxudmFyIHJlY29yZGVyO1xuXG5leHBvcnQgY29uc3QgV2F2ZVBDTSA9IGZ1bmN0aW9uKCBjb25maWcgKXtcblxuICB2YXIgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgd2F2Qml0RGVwdGg6IDE2XG4gIH0sIGNvbmZpZyk7XG5cbiAgaWYgKCAhY29uZmlnWyd3YXZTYW1wbGVSYXRlJ10gKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwid2F2U2FtcGxlUmF0ZSB2YWx1ZSBpcyByZXF1aXJlZCB0byByZWNvcmQuIE5PVEU6IEF1ZGlvIGlzIG5vdCByZXNhbXBsZWQhXCIpO1xuICB9XG5cbiAgaWYgKCBbOCwgMTYsIDI0LCAzMl0uaW5kZXhPZiggY29uZmlnWyd3YXZCaXREZXB0aCddICkgPT09IC0xICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgOCwgMTYsIDI0IGFuZCAzMiBiaXRzIHBlciBzYW1wbGUgYXJlIHN1cHBvcnRlZFwiKTtcbiAgfVxuXG4gIHRoaXMuYml0RGVwdGggPSBjb25maWdbJ3dhdkJpdERlcHRoJ107XG4gIHRoaXMuc2FtcGxlUmF0ZSA9IGNvbmZpZ1snd2F2U2FtcGxlUmF0ZSddO1xuICB0aGlzLnJlY29yZGVkQnVmZmVycyA9IFtdO1xuICB0aGlzLmJ5dGVzUGVyU2FtcGxlID0gdGhpcy5iaXREZXB0aCAvIDg7XG59O1xuXG5XYXZlUENNLnByb3RvdHlwZS5yZWNvcmQgPSBmdW5jdGlvbiggYnVmZmVycyApe1xuICB0aGlzLm51bWJlck9mQ2hhbm5lbHMgPSB0aGlzLm51bWJlck9mQ2hhbm5lbHMgfHwgYnVmZmVycy5sZW5ndGg7XG4gIHZhciBidWZmZXJMZW5ndGggPSBidWZmZXJzWzBdLmxlbmd0aDtcbiAgdmFyIHJlZHVjZWREYXRhID0gbmV3IFVpbnQ4QXJyYXkoIGJ1ZmZlckxlbmd0aCAqIHRoaXMubnVtYmVyT2ZDaGFubmVscyAqIHRoaXMuYnl0ZXNQZXJTYW1wbGUgKTtcblxuICAvLyBJbnRlcmxlYXZlXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGJ1ZmZlckxlbmd0aDsgaSsrICkge1xuICAgIGZvciAoIHZhciBjaGFubmVsID0gMDsgY2hhbm5lbCA8IHRoaXMubnVtYmVyT2ZDaGFubmVsczsgY2hhbm5lbCsrICkge1xuXG4gICAgICB2YXIgb3V0cHV0SW5kZXggPSAoIGkgKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMgKyBjaGFubmVsICkgKiB0aGlzLmJ5dGVzUGVyU2FtcGxlO1xuXG4gICAgICAvLyBjbGlwIHRoZSBzaWduYWwgaWYgaXQgZXhjZWVkcyBbLTEsIDFdXG4gICAgICB2YXIgc2FtcGxlID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIGJ1ZmZlcnNbIGNoYW5uZWwgXVsgaSBdKSk7XG5cbiAgICAgIC8vIGJpdCByZWR1Y2UgYW5kIGNvbnZlcnQgdG8gaW50ZWdlclxuICAgICAgc3dpdGNoICggdGhpcy5ieXRlc1BlclNhbXBsZSApIHtcbiAgICAgICAgY2FzZSA0OiAvLyAzMiBiaXRzIHNpZ25lZFxuICAgICAgICAgIHNhbXBsZSA9IHNhbXBsZSAqIDIxNDc0ODM2NDcuNSAtIDAuNTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggXSA9IHNhbXBsZTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAxIF0gPSBzYW1wbGUgPj4gODtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAyIF0gPSBzYW1wbGUgPj4gMTY7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMyBdID0gc2FtcGxlID4+IDI0O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzogLy8gMjQgYml0cyBzaWduZWRcbiAgICAgICAgICBzYW1wbGUgPSBzYW1wbGUgKiA4Mzg4NjA3LjUgLSAwLjU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4IF0gPSBzYW1wbGU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMSBdID0gc2FtcGxlID4+IDg7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMiBdID0gc2FtcGxlID4+IDE2O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gMTYgYml0cyBzaWduZWRcbiAgICAgICAgICBzYW1wbGUgPSBzYW1wbGUgKiAzMjc2Ny41IC0gMC41O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCBdID0gc2FtcGxlO1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDEgXSA9IHNhbXBsZSA+PiA4O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTogLy8gOCBiaXRzIHVuc2lnbmVkXG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4IF0gPSAoc2FtcGxlICsgMSkgKiAxMjcuNTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgOCwgMTYsIDI0IGFuZCAzMiBiaXRzIHBlciBzYW1wbGUgYXJlIHN1cHBvcnRlZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLnJlY29yZGVkQnVmZmVycy5wdXNoKCByZWR1Y2VkRGF0YSApO1xufTtcblxuV2F2ZVBDTS5wcm90b3R5cGUucmVxdWVzdERhdGEgPSBmdW5jdGlvbigpe1xuICB2YXIgYnVmZmVyTGVuZ3RoID0gdGhpcy5yZWNvcmRlZEJ1ZmZlcnNbMF0ubGVuZ3RoO1xuICB2YXIgZGF0YUxlbmd0aCA9IHRoaXMucmVjb3JkZWRCdWZmZXJzLmxlbmd0aCAqIGJ1ZmZlckxlbmd0aDtcbiAgdmFyIGhlYWRlckxlbmd0aCA9IDQ0O1xuICB2YXIgd2F2ID0gbmV3IFVpbnQ4QXJyYXkoIGhlYWRlckxlbmd0aCArIGRhdGFMZW5ndGggKTtcbiAgdmFyIHZpZXcgPSBuZXcgRGF0YVZpZXcoIHdhdi5idWZmZXIgKTtcblxuICB2aWV3LnNldFVpbnQzMiggMCwgMTM4MDUzMzgzMCwgZmFsc2UgKTsgLy8gUklGRiBpZGVudGlmaWVyICdSSUZGJ1xuICB2aWV3LnNldFVpbnQzMiggNCwgMzYgKyBkYXRhTGVuZ3RoLCB0cnVlICk7IC8vIGZpbGUgbGVuZ3RoIG1pbnVzIFJJRkYgaWRlbnRpZmllciBsZW5ndGggYW5kIGZpbGUgZGVzY3JpcHRpb24gbGVuZ3RoXG4gIHZpZXcuc2V0VWludDMyKCA4LCAxNDYzODk5NzE3LCBmYWxzZSApOyAvLyBSSUZGIHR5cGUgJ1dBVkUnXG4gIHZpZXcuc2V0VWludDMyKCAxMiwgMTcxODQ0OTE4NCwgZmFsc2UgKTsgLy8gZm9ybWF0IGNodW5rIGlkZW50aWZpZXIgJ2ZtdCAnXG4gIHZpZXcuc2V0VWludDMyKCAxNiwgMTYsIHRydWUgKTsgLy8gZm9ybWF0IGNodW5rIGxlbmd0aFxuICB2aWV3LnNldFVpbnQxNiggMjAsIDEsIHRydWUgKTsgLy8gc2FtcGxlIGZvcm1hdCAocmF3KVxuICB2aWV3LnNldFVpbnQxNiggMjIsIHRoaXMubnVtYmVyT2ZDaGFubmVscywgdHJ1ZSApOyAvLyBjaGFubmVsIGNvdW50XG4gIHZpZXcuc2V0VWludDMyKCAyNCwgdGhpcy5zYW1wbGVSYXRlLCB0cnVlICk7IC8vIHNhbXBsZSByYXRlXG4gIHZpZXcuc2V0VWludDMyKCAyOCwgdGhpcy5zYW1wbGVSYXRlICogdGhpcy5ieXRlc1BlclNhbXBsZSAqIHRoaXMubnVtYmVyT2ZDaGFubmVscywgdHJ1ZSApOyAvLyBieXRlIHJhdGUgKHNhbXBsZSByYXRlICogYmxvY2sgYWxpZ24pXG4gIHZpZXcuc2V0VWludDE2KCAzMiwgdGhpcy5ieXRlc1BlclNhbXBsZSAqIHRoaXMubnVtYmVyT2ZDaGFubmVscywgdHJ1ZSApOyAvLyBibG9jayBhbGlnbiAoY2hhbm5lbCBjb3VudCAqIGJ5dGVzIHBlciBzYW1wbGUpXG4gIHZpZXcuc2V0VWludDE2KCAzNCwgdGhpcy5iaXREZXB0aCwgdHJ1ZSApOyAvLyBiaXRzIHBlciBzYW1wbGVcbiAgdmlldy5zZXRVaW50MzIoIDM2LCAxNjg0MTA4Mzg1LCBmYWxzZSk7IC8vIGRhdGEgY2h1bmsgaWRlbnRpZmllciAnZGF0YSdcbiAgdmlldy5zZXRVaW50MzIoIDQwLCBkYXRhTGVuZ3RoLCB0cnVlICk7IC8vIGRhdGEgY2h1bmsgbGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlY29yZGVkQnVmZmVycy5sZW5ndGg7IGkrKyApIHtcbiAgICB3YXYuc2V0KCB0aGlzLnJlY29yZGVkQnVmZmVyc1tpXSwgaSAqIGJ1ZmZlckxlbmd0aCArIGhlYWRlckxlbmd0aCApO1xuICB9XG5cbiAgcmV0dXJuIHttZXNzYWdlOiAncGFnZScsIHBhZ2U6IHdhdn07XG59O1xuXG5cbi8vIFJ1biBpbiBBdWRpb1dvcmtsZXRHbG9iYWwgc2NvcGVcbmlmIChnbG9iYWxbJ3JlZ2lzdGVyUHJvY2Vzc29yJ10gJiYgZ2xvYmFsWydBdWRpb1dvcmtsZXRQcm9jZXNzb3InXSkge1xuXG4gIGNsYXNzIEVuY29kZXJXb3JrbGV0IGV4dGVuZHMgZ2xvYmFsWydBdWRpb1dvcmtsZXRQcm9jZXNzb3InXSB7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuY29udGludWVQcm9jZXNzID0gdHJ1ZTtcbiAgICAgIHRoaXMucG9ydC5vbm1lc3NhZ2UgPSAoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgc3dpdGNoKCBkYXRhWydjb21tYW5kJ10gKXtcblxuICAgICAgICAgIGNhc2UgJ2RvbmUnOlxuICAgICAgICAgICAgaWYgKHJlY29yZGVyKSB7XG4gICAgICAgICAgICAgIHRoaXMucG9zdFBhZ2UocmVjb3JkZXIucmVxdWVzdERhdGEoKSk7XG4gICAgICAgICAgICAgIHRoaXMucG9ydC5wb3N0TWVzc2FnZSgge21lc3NhZ2U6ICdkb25lJ30gKTtcbiAgICAgICAgICAgICAgcmVjb3JkZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdjbG9zZSc6XG4gICAgICAgICAgICB0aGlzLmNvbnRpbnVlUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdpbml0JzpcbiAgICAgICAgICAgIHJlY29yZGVyID0gbmV3IFdhdmVQQ00oIGRhdGEgKTtcbiAgICAgICAgICAgIHRoaXMucG9ydC5wb3N0TWVzc2FnZSgge21lc3NhZ2U6ICdyZWFkeSd9ICk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBJZ25vcmUgYW55IHVua25vd24gY29tbWFuZHMgYW5kIGNvbnRpbnVlIHJlY2lldmluZyBjb21tYW5kc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2VzcyhpbnB1dHMpIHtcbiAgICAgIGlmIChyZWNvcmRlciAmJiBpbnB1dHNbMF0pe1xuICAgICAgICByZWNvcmRlci5yZWNvcmQoIGlucHV0c1swXSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuY29udGludWVQcm9jZXNzO1xuICAgIH1cblxuICAgIHBvc3RQYWdlKHBhZ2VEYXRhKSB7XG4gICAgICBpZiAocGFnZURhdGEpIHtcbiAgICAgICAgdGhpcy5wb3J0LnBvc3RNZXNzYWdlKCBwYWdlRGF0YSwgW3BhZ2VEYXRhLnBhZ2UuYnVmZmVyXSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbFsncmVnaXN0ZXJQcm9jZXNzb3InXSgnZW5jb2Rlci13b3JrbGV0JywgRW5jb2RlcldvcmtsZXQpO1xufVxuXG4vLyBydW4gaW4gc2NyaXB0UHJvY2Vzc29yIHdvcmtlciBzY29wZVxuZWxzZSB7XG4gIHZhciBwb3N0UGFnZUdsb2JhbCA9IChwYWdlRGF0YSkgPT4ge1xuICAgIGlmIChwYWdlRGF0YSkge1xuICAgICAgZ2xvYmFsWydwb3N0TWVzc2FnZSddKCBwYWdlRGF0YSwgW3BhZ2VEYXRhLnBhZ2UuYnVmZmVyXSApO1xuICAgIH1cbiAgfVxuXG4gIGdsb2JhbFsnb25tZXNzYWdlJ10gPSAoeyBkYXRhIH0pID0+IHtcblxuICAgIHN3aXRjaCggZGF0YVsnY29tbWFuZCddICl7XG5cbiAgICAgIGNhc2UgJ3JlY29yZCc6XG4gICAgICAgIGlmIChyZWNvcmRlcikge1xuICAgICAgICAgIHJlY29yZGVyLnJlY29yZCggZGF0YVsnYnVmZmVycyddICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2RvbmUnOlxuICAgICAgICBpZiAocmVjb3JkZXIpIHtcbiAgICAgICAgICBwb3N0UGFnZUdsb2JhbChyZWNvcmRlci5yZXF1ZXN0RGF0YSgpKTtcbiAgICAgICAgICBnbG9iYWxbJ3Bvc3RNZXNzYWdlJ10oIHttZXNzYWdlOiAnZG9uZSd9ICk7XG4gICAgICAgICAgcmVjb3JkZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjbG9zZSc6XG4gICAgICAgIGdsb2JhbFsnY2xvc2UnXSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgIHJlY29yZGVyID0gbmV3IFdhdmVQQ00oIGRhdGEgKTtcbiAgICAgICAgZ2xvYmFsWydwb3N0TWVzc2FnZSddKCB7bWVzc2FnZTogJ3JlYWR5J30gKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIElnbm9yZSBhbnkgdW5rbm93biBjb21tYW5kcyBhbmQgY29udGludWUgcmVjaWV2aW5nIGNvbW1hbmRzXG4gICAgfVxuICB9O1xufVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/waveWorker.js\n");

/***/ })

/******/ });
});