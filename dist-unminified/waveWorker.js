(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WaveWorker"] = factory();
	else
		root["WaveWorker"] = factory();
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

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1dhdmVXb3JrZXIvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzP2NkMDAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/webpack/buildin/global.js\n");

/***/ }),

/***/ "./src/waveWorker.js":
/*!***************************!*\
  !*** ./src/waveWorker.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n  \nvar recorder;\n\n// Run in AudioWorkletGlobal scope\nif (global['registerProcessor'] && global['AudioWorkletProcessor']) {\n\n  class EncoderWorklet extends global['AudioWorkletProcessor'] {\n\n    constructor(){\n      super();\n      this.continueProcess = true;\n      this.port.onmessage = ({ data }) => {\n        switch( data['command'] ){\n\n          case 'done':\n            if (recorder) {\n              this.postPage(this.recorder.requestData());\n              global['postMessage']( {message: 'done'} );\n              recorder = null;\n            }\n            break;\n\n          case 'close':\n            this.continueProcess = false;\n            break;\n\n          case 'init':\n            recorder = new WavePCM( e['data'] );\n            this.port.postMessage( {message: 'ready'} );\n            break;\n\n          default:\n            // Ignore any unknown commands and continue recieving commands\n        }\n      }\n    }\n\n    process(inputs) {\n      if (recorder && inputs[0]){\n        recorder.record( inputs[0] );\n      }\n      return this.continueProcess;\n    }\n\n    postPage(pageData) {\n      if (pageData) {\n        this.port.postMessage( pageData, [pageData.page.buffer] );\n      }\n    }\n  }\n\n  global['registerProcessor']('encoder-worklet', EncoderWorklet);\n}\n\n// run in scriptProcessor worker scope\nelse {\n  var postPageGlobal = (pageData) => {\n    if (pageData) {\n      global['postMessage']( pageData, [pageData.page.buffer] );\n    }\n  }\n\n  global['onmessage'] = ({ data }) => {\n\n    switch( data['command'] ){\n\n      case 'record':\n        if (recorder) {\n          recorder.record( e['data']['buffers'] );\n        }\n        break;\n\n      case 'done':\n        if (recorder) {\n          postPageGlobal(recorder.requestData());\n          global['postMessage']( {message: 'done'} );\n          recorder = null;\n        }\n        break;\n\n      case 'close':\n        this.continueProcess = false;\n        break;\n\n      case 'init':\n        recorder = new WavePCM( e['data'] );\n        global['postMessage']( {message: 'ready'} );\n        break;\n\n      default:\n        // Ignore any unknown commands and continue recieving commands\n    }\n  };\n}\n\nvar WavePCM = function( config ){\n\n  var config = Object.assign({\n    wavBitDepth: 16\n  }, config);\n\n  if ( !config['wavSampleRate'] ) {\n    throw new Error(\"wavSampleRate value is required to record. NOTE: Audio is not resampled!\");\n  }\n\n  if ( [8, 16, 24, 32].indexOf( config['wavBitDepth'] ) === -1 ) {\n    throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n  }\n\n  this.bitDepth = config['wavBitDepth'];\n  this.sampleRate = config['wavSampleRate'];\n  this.recordedBuffers = [];\n  this.bytesPerSample = this.bitDepth / 8;\n};\n\nWavePCM.prototype.record = function( buffers ){\n  this.numberOfChannels = this.numberOfChannels || buffers.length;\n  var bufferLength = buffers[0].length;\n  var reducedData = new Uint8Array( bufferLength * this.numberOfChannels * this.bytesPerSample );\n\n  // Interleave\n  for ( var i = 0; i < bufferLength; i++ ) {\n    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {\n\n      var outputIndex = ( i * this.numberOfChannels + channel ) * this.bytesPerSample;\n\n      // clip the signal if it exceeds [-1, 1]\n      var sample = Math.max(-1, Math.min(1, buffers[ channel ][ i ]));\n\n      // bit reduce and convert to integer\n      switch ( this.bytesPerSample ) {\n        case 4: // 32 bits signed\n          sample = sample * 2147483647.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          reducedData[ outputIndex + 3 ] = sample >> 24;\n          break;\n\n        case 3: // 24 bits signed\n          sample = sample * 8388607.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          break;\n\n        case 2: // 16 bits signed\n          sample = sample * 32767.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          break;\n\n        case 1: // 8 bits unsigned\n          reducedData[ outputIndex ] = (sample + 1) * 127.5;\n          break;\n\n        default:\n          throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n      }\n    }\n  }\n\n  this.recordedBuffers.push( reducedData );\n};\n\nWavePCM.prototype.requestData = function(){\n  var bufferLength = this.recordedBuffers[0].length;\n  var dataLength = this.recordedBuffers.length * bufferLength;\n  var headerLength = 44;\n  var wav = new Uint8Array( headerLength + dataLength );\n  var view = new DataView( wav.buffer );\n\n  view.setUint32( 0, 1380533830, false ); // RIFF identifier 'RIFF'\n  view.setUint32( 4, 36 + dataLength, true ); // file length minus RIFF identifier length and file description length\n  view.setUint32( 8, 1463899717, false ); // RIFF type 'WAVE'\n  view.setUint32( 12, 1718449184, false ); // format chunk identifier 'fmt '\n  view.setUint32( 16, 16, true ); // format chunk length\n  view.setUint16( 20, 1, true ); // sample format (raw)\n  view.setUint16( 22, this.numberOfChannels, true ); // channel count\n  view.setUint32( 24, this.sampleRate, true ); // sample rate\n  view.setUint32( 28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true ); // byte rate (sample rate * block align)\n  view.setUint16( 32, this.bytesPerSample * this.numberOfChannels, true ); // block align (channel count * bytes per sample)\n  view.setUint16( 34, this.bitDepth, true ); // bits per sample\n  view.setUint32( 36, 1684108385, false); // data chunk identifier 'data'\n  view.setUint32( 40, dataLength, true ); // data chunk length\n\n  for (var i = 0; i < this.recordedBuffers.length; i++ ) {\n    wav.set( this.recordedBuffers[i], i * bufferLength + headerLength );\n  }\n\n  return {message: 'page', page: wav};\n};\n\nmodule.exports = WavePCM\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvd2F2ZVdvcmtlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1dhdmVXb3JrZXIvLi9zcmMvd2F2ZVdvcmtlci5qcz8wNzUxIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuICBcbnZhciByZWNvcmRlcjtcblxuLy8gUnVuIGluIEF1ZGlvV29ya2xldEdsb2JhbCBzY29wZVxuaWYgKGdsb2JhbFsncmVnaXN0ZXJQcm9jZXNzb3InXSAmJiBnbG9iYWxbJ0F1ZGlvV29ya2xldFByb2Nlc3NvciddKSB7XG5cbiAgY2xhc3MgRW5jb2RlcldvcmtsZXQgZXh0ZW5kcyBnbG9iYWxbJ0F1ZGlvV29ya2xldFByb2Nlc3NvciddIHtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5jb250aW51ZVByb2Nlc3MgPSB0cnVlO1xuICAgICAgdGhpcy5wb3J0Lm9ubWVzc2FnZSA9ICh7IGRhdGEgfSkgPT4ge1xuICAgICAgICBzd2l0Y2goIGRhdGFbJ2NvbW1hbmQnXSApe1xuXG4gICAgICAgICAgY2FzZSAnZG9uZSc6XG4gICAgICAgICAgICBpZiAocmVjb3JkZXIpIHtcbiAgICAgICAgICAgICAgdGhpcy5wb3N0UGFnZSh0aGlzLnJlY29yZGVyLnJlcXVlc3REYXRhKCkpO1xuICAgICAgICAgICAgICBnbG9iYWxbJ3Bvc3RNZXNzYWdlJ10oIHttZXNzYWdlOiAnZG9uZSd9ICk7XG4gICAgICAgICAgICAgIHJlY29yZGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnY2xvc2UnOlxuICAgICAgICAgICAgdGhpcy5jb250aW51ZVByb2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgICAgICByZWNvcmRlciA9IG5ldyBXYXZlUENNKCBlWydkYXRhJ10gKTtcbiAgICAgICAgICAgIHRoaXMucG9ydC5wb3N0TWVzc2FnZSgge21lc3NhZ2U6ICdyZWFkeSd9ICk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBJZ25vcmUgYW55IHVua25vd24gY29tbWFuZHMgYW5kIGNvbnRpbnVlIHJlY2lldmluZyBjb21tYW5kc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2VzcyhpbnB1dHMpIHtcbiAgICAgIGlmIChyZWNvcmRlciAmJiBpbnB1dHNbMF0pe1xuICAgICAgICByZWNvcmRlci5yZWNvcmQoIGlucHV0c1swXSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuY29udGludWVQcm9jZXNzO1xuICAgIH1cblxuICAgIHBvc3RQYWdlKHBhZ2VEYXRhKSB7XG4gICAgICBpZiAocGFnZURhdGEpIHtcbiAgICAgICAgdGhpcy5wb3J0LnBvc3RNZXNzYWdlKCBwYWdlRGF0YSwgW3BhZ2VEYXRhLnBhZ2UuYnVmZmVyXSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbFsncmVnaXN0ZXJQcm9jZXNzb3InXSgnZW5jb2Rlci13b3JrbGV0JywgRW5jb2RlcldvcmtsZXQpO1xufVxuXG4vLyBydW4gaW4gc2NyaXB0UHJvY2Vzc29yIHdvcmtlciBzY29wZVxuZWxzZSB7XG4gIHZhciBwb3N0UGFnZUdsb2JhbCA9IChwYWdlRGF0YSkgPT4ge1xuICAgIGlmIChwYWdlRGF0YSkge1xuICAgICAgZ2xvYmFsWydwb3N0TWVzc2FnZSddKCBwYWdlRGF0YSwgW3BhZ2VEYXRhLnBhZ2UuYnVmZmVyXSApO1xuICAgIH1cbiAgfVxuXG4gIGdsb2JhbFsnb25tZXNzYWdlJ10gPSAoeyBkYXRhIH0pID0+IHtcblxuICAgIHN3aXRjaCggZGF0YVsnY29tbWFuZCddICl7XG5cbiAgICAgIGNhc2UgJ3JlY29yZCc6XG4gICAgICAgIGlmIChyZWNvcmRlcikge1xuICAgICAgICAgIHJlY29yZGVyLnJlY29yZCggZVsnZGF0YSddWydidWZmZXJzJ10gKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZG9uZSc6XG4gICAgICAgIGlmIChyZWNvcmRlcikge1xuICAgICAgICAgIHBvc3RQYWdlR2xvYmFsKHJlY29yZGVyLnJlcXVlc3REYXRhKCkpO1xuICAgICAgICAgIGdsb2JhbFsncG9zdE1lc3NhZ2UnXSgge21lc3NhZ2U6ICdkb25lJ30gKTtcbiAgICAgICAgICByZWNvcmRlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgICAgdGhpcy5jb250aW51ZVByb2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2luaXQnOlxuICAgICAgICByZWNvcmRlciA9IG5ldyBXYXZlUENNKCBlWydkYXRhJ10gKTtcbiAgICAgICAgZ2xvYmFsWydwb3N0TWVzc2FnZSddKCB7bWVzc2FnZTogJ3JlYWR5J30gKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIElnbm9yZSBhbnkgdW5rbm93biBjb21tYW5kcyBhbmQgY29udGludWUgcmVjaWV2aW5nIGNvbW1hbmRzXG4gICAgfVxuICB9O1xufVxuXG52YXIgV2F2ZVBDTSA9IGZ1bmN0aW9uKCBjb25maWcgKXtcblxuICB2YXIgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgd2F2Qml0RGVwdGg6IDE2XG4gIH0sIGNvbmZpZyk7XG5cbiAgaWYgKCAhY29uZmlnWyd3YXZTYW1wbGVSYXRlJ10gKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwid2F2U2FtcGxlUmF0ZSB2YWx1ZSBpcyByZXF1aXJlZCB0byByZWNvcmQuIE5PVEU6IEF1ZGlvIGlzIG5vdCByZXNhbXBsZWQhXCIpO1xuICB9XG5cbiAgaWYgKCBbOCwgMTYsIDI0LCAzMl0uaW5kZXhPZiggY29uZmlnWyd3YXZCaXREZXB0aCddICkgPT09IC0xICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgOCwgMTYsIDI0IGFuZCAzMiBiaXRzIHBlciBzYW1wbGUgYXJlIHN1cHBvcnRlZFwiKTtcbiAgfVxuXG4gIHRoaXMuYml0RGVwdGggPSBjb25maWdbJ3dhdkJpdERlcHRoJ107XG4gIHRoaXMuc2FtcGxlUmF0ZSA9IGNvbmZpZ1snd2F2U2FtcGxlUmF0ZSddO1xuICB0aGlzLnJlY29yZGVkQnVmZmVycyA9IFtdO1xuICB0aGlzLmJ5dGVzUGVyU2FtcGxlID0gdGhpcy5iaXREZXB0aCAvIDg7XG59O1xuXG5XYXZlUENNLnByb3RvdHlwZS5yZWNvcmQgPSBmdW5jdGlvbiggYnVmZmVycyApe1xuICB0aGlzLm51bWJlck9mQ2hhbm5lbHMgPSB0aGlzLm51bWJlck9mQ2hhbm5lbHMgfHwgYnVmZmVycy5sZW5ndGg7XG4gIHZhciBidWZmZXJMZW5ndGggPSBidWZmZXJzWzBdLmxlbmd0aDtcbiAgdmFyIHJlZHVjZWREYXRhID0gbmV3IFVpbnQ4QXJyYXkoIGJ1ZmZlckxlbmd0aCAqIHRoaXMubnVtYmVyT2ZDaGFubmVscyAqIHRoaXMuYnl0ZXNQZXJTYW1wbGUgKTtcblxuICAvLyBJbnRlcmxlYXZlXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGJ1ZmZlckxlbmd0aDsgaSsrICkge1xuICAgIGZvciAoIHZhciBjaGFubmVsID0gMDsgY2hhbm5lbCA8IHRoaXMubnVtYmVyT2ZDaGFubmVsczsgY2hhbm5lbCsrICkge1xuXG4gICAgICB2YXIgb3V0cHV0SW5kZXggPSAoIGkgKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMgKyBjaGFubmVsICkgKiB0aGlzLmJ5dGVzUGVyU2FtcGxlO1xuXG4gICAgICAvLyBjbGlwIHRoZSBzaWduYWwgaWYgaXQgZXhjZWVkcyBbLTEsIDFdXG4gICAgICB2YXIgc2FtcGxlID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIGJ1ZmZlcnNbIGNoYW5uZWwgXVsgaSBdKSk7XG5cbiAgICAgIC8vIGJpdCByZWR1Y2UgYW5kIGNvbnZlcnQgdG8gaW50ZWdlclxuICAgICAgc3dpdGNoICggdGhpcy5ieXRlc1BlclNhbXBsZSApIHtcbiAgICAgICAgY2FzZSA0OiAvLyAzMiBiaXRzIHNpZ25lZFxuICAgICAgICAgIHNhbXBsZSA9IHNhbXBsZSAqIDIxNDc0ODM2NDcuNSAtIDAuNTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggXSA9IHNhbXBsZTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAxIF0gPSBzYW1wbGUgPj4gODtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAyIF0gPSBzYW1wbGUgPj4gMTY7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMyBdID0gc2FtcGxlID4+IDI0O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzogLy8gMjQgYml0cyBzaWduZWRcbiAgICAgICAgICBzYW1wbGUgPSBzYW1wbGUgKiA4Mzg4NjA3LjUgLSAwLjU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4IF0gPSBzYW1wbGU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMSBdID0gc2FtcGxlID4+IDg7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMiBdID0gc2FtcGxlID4+IDE2O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjogLy8gMTYgYml0cyBzaWduZWRcbiAgICAgICAgICBzYW1wbGUgPSBzYW1wbGUgKiAzMjc2Ny41IC0gMC41O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCBdID0gc2FtcGxlO1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDEgXSA9IHNhbXBsZSA+PiA4O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTogLy8gOCBiaXRzIHVuc2lnbmVkXG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4IF0gPSAoc2FtcGxlICsgMSkgKiAxMjcuNTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgOCwgMTYsIDI0IGFuZCAzMiBiaXRzIHBlciBzYW1wbGUgYXJlIHN1cHBvcnRlZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLnJlY29yZGVkQnVmZmVycy5wdXNoKCByZWR1Y2VkRGF0YSApO1xufTtcblxuV2F2ZVBDTS5wcm90b3R5cGUucmVxdWVzdERhdGEgPSBmdW5jdGlvbigpe1xuICB2YXIgYnVmZmVyTGVuZ3RoID0gdGhpcy5yZWNvcmRlZEJ1ZmZlcnNbMF0ubGVuZ3RoO1xuICB2YXIgZGF0YUxlbmd0aCA9IHRoaXMucmVjb3JkZWRCdWZmZXJzLmxlbmd0aCAqIGJ1ZmZlckxlbmd0aDtcbiAgdmFyIGhlYWRlckxlbmd0aCA9IDQ0O1xuICB2YXIgd2F2ID0gbmV3IFVpbnQ4QXJyYXkoIGhlYWRlckxlbmd0aCArIGRhdGFMZW5ndGggKTtcbiAgdmFyIHZpZXcgPSBuZXcgRGF0YVZpZXcoIHdhdi5idWZmZXIgKTtcblxuICB2aWV3LnNldFVpbnQzMiggMCwgMTM4MDUzMzgzMCwgZmFsc2UgKTsgLy8gUklGRiBpZGVudGlmaWVyICdSSUZGJ1xuICB2aWV3LnNldFVpbnQzMiggNCwgMzYgKyBkYXRhTGVuZ3RoLCB0cnVlICk7IC8vIGZpbGUgbGVuZ3RoIG1pbnVzIFJJRkYgaWRlbnRpZmllciBsZW5ndGggYW5kIGZpbGUgZGVzY3JpcHRpb24gbGVuZ3RoXG4gIHZpZXcuc2V0VWludDMyKCA4LCAxNDYzODk5NzE3LCBmYWxzZSApOyAvLyBSSUZGIHR5cGUgJ1dBVkUnXG4gIHZpZXcuc2V0VWludDMyKCAxMiwgMTcxODQ0OTE4NCwgZmFsc2UgKTsgLy8gZm9ybWF0IGNodW5rIGlkZW50aWZpZXIgJ2ZtdCAnXG4gIHZpZXcuc2V0VWludDMyKCAxNiwgMTYsIHRydWUgKTsgLy8gZm9ybWF0IGNodW5rIGxlbmd0aFxuICB2aWV3LnNldFVpbnQxNiggMjAsIDEsIHRydWUgKTsgLy8gc2FtcGxlIGZvcm1hdCAocmF3KVxuICB2aWV3LnNldFVpbnQxNiggMjIsIHRoaXMubnVtYmVyT2ZDaGFubmVscywgdHJ1ZSApOyAvLyBjaGFubmVsIGNvdW50XG4gIHZpZXcuc2V0VWludDMyKCAyNCwgdGhpcy5zYW1wbGVSYXRlLCB0cnVlICk7IC8vIHNhbXBsZSByYXRlXG4gIHZpZXcuc2V0VWludDMyKCAyOCwgdGhpcy5zYW1wbGVSYXRlICogdGhpcy5ieXRlc1BlclNhbXBsZSAqIHRoaXMubnVtYmVyT2ZDaGFubmVscywgdHJ1ZSApOyAvLyBieXRlIHJhdGUgKHNhbXBsZSByYXRlICogYmxvY2sgYWxpZ24pXG4gIHZpZXcuc2V0VWludDE2KCAzMiwgdGhpcy5ieXRlc1BlclNhbXBsZSAqIHRoaXMubnVtYmVyT2ZDaGFubmVscywgdHJ1ZSApOyAvLyBibG9jayBhbGlnbiAoY2hhbm5lbCBjb3VudCAqIGJ5dGVzIHBlciBzYW1wbGUpXG4gIHZpZXcuc2V0VWludDE2KCAzNCwgdGhpcy5iaXREZXB0aCwgdHJ1ZSApOyAvLyBiaXRzIHBlciBzYW1wbGVcbiAgdmlldy5zZXRVaW50MzIoIDM2LCAxNjg0MTA4Mzg1LCBmYWxzZSk7IC8vIGRhdGEgY2h1bmsgaWRlbnRpZmllciAnZGF0YSdcbiAgdmlldy5zZXRVaW50MzIoIDQwLCBkYXRhTGVuZ3RoLCB0cnVlICk7IC8vIGRhdGEgY2h1bmsgbGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlY29yZGVkQnVmZmVycy5sZW5ndGg7IGkrKyApIHtcbiAgICB3YXYuc2V0KCB0aGlzLnJlY29yZGVkQnVmZmVyc1tpXSwgaSAqIGJ1ZmZlckxlbmd0aCArIGhlYWRlckxlbmd0aCApO1xuICB9XG5cbiAgcmV0dXJuIHttZXNzYWdlOiAncGFnZScsIHBhZ2U6IHdhdn07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdhdmVQQ01cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/waveWorker.js\n");

/***/ })

/******/ });
});