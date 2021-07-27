

// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module !== 'undefined' ? Module : {};

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DecoderWorker"] = factory();
	else
		root["DecoderWorker"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/decoderWorker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0RlY29kZXJXb3JrZXIvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzP2NkMDAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/webpack/buildin/global.js\n");

/***/ }),

/***/ "./src/decoderWorker.js":
/*!******************************!*\
  !*** ./src/decoderWorker.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n\nvar decoder;\nvar mainReadyResolve;\nvar mainReady = new Promise(function (resolve) {\n  mainReadyResolve = resolve;\n});\n\nglobal['onmessage'] = function (e) {\n  mainReady.then(function () {\n    switch (e['data']['command']) {\n      case 'decode':\n        if (decoder) {\n          decoder.decode(e['data']['pages']);\n        }\n\n        break;\n\n      case 'done':\n        if (decoder) {\n          decoder.sendLastBuffer();\n          global['close']();\n        }\n\n        break;\n\n      case 'init':\n        decoder = new OggOpusDecoder(e['data'], Module);\n        break;\n\n      default: // Ignore any unknown commands and continue recieving commands\n\n    }\n  });\n};\n\nvar OggOpusDecoder = function OggOpusDecoder(config, Module) {\n  if (!Module) {\n    throw new Error('Module with exports required to initialize a decoder instance');\n  }\n\n  this.mainReady = mainReady; // Expose for unit testing\n\n  this.config = Object.assign({\n    bufferLength: 4096,\n    // Define size of outgoing buffer\n    decoderSampleRate: 48000,\n    // Desired decoder sample rate.\n    outputBufferSampleRate: 48000,\n    // Desired output sample rate. Audio will be resampled\n    resampleQuality: 3 // Value between 0 and 10 inclusive. 10 being highest quality.\n\n  }, config);\n  this._opus_decoder_create = Module._opus_decoder_create;\n  this._opus_decoder_destroy = Module._opus_decoder_destroy;\n  this._speex_resampler_process_interleaved_float = Module._speex_resampler_process_interleaved_float;\n  this._speex_resampler_init = Module._speex_resampler_init;\n  this._speex_resampler_destroy = Module._speex_resampler_destroy;\n  this._opus_decode_float = Module._opus_decode_float;\n  this._free = Module._free;\n  this._malloc = Module._malloc;\n  this.HEAPU8 = Module.HEAPU8;\n  this.HEAP32 = Module.HEAP32;\n  this.HEAPF32 = Module.HEAPF32;\n  this.outputBuffers = [];\n};\n\nOggOpusDecoder.prototype.decode = function (typedArray) {\n  var dataView = new DataView(typedArray.buffer);\n  this.getPageBoundaries(dataView).map(function (pageStart) {\n    var headerType = dataView.getUint8(pageStart + 5, true);\n    var pageIndex = dataView.getUint32(pageStart + 18, true); // Beginning of stream\n\n    if (headerType & 2) {\n      this.numberOfChannels = dataView.getUint8(pageStart + 37, true);\n      this.init();\n    } // Decode page\n\n\n    if (pageIndex > 1) {\n      var segmentTableLength = dataView.getUint8(pageStart + 26, true);\n      var segmentTableIndex = pageStart + 27 + segmentTableLength;\n\n      for (var i = 0; i < segmentTableLength; i++) {\n        var packetLength = dataView.getUint8(pageStart + 27 + i, true);\n        this.decoderBuffer.set(typedArray.subarray(segmentTableIndex, segmentTableIndex += packetLength), this.decoderBufferIndex);\n        this.decoderBufferIndex += packetLength;\n\n        if (packetLength < 255) {\n          var outputSampleLength = this._opus_decode_float(this.decoder, this.decoderBufferPointer, this.decoderBufferIndex, this.decoderOutputPointer, this.decoderOutputMaxLength, 0);\n\n          var resampledLength = Math.ceil(outputSampleLength * this.config.outputBufferSampleRate / this.config.decoderSampleRate);\n          this.HEAP32[this.decoderOutputLengthPointer >> 2] = outputSampleLength;\n          this.HEAP32[this.resampleOutputLengthPointer >> 2] = resampledLength;\n\n          this._speex_resampler_process_interleaved_float(this.resampler, this.decoderOutputPointer, this.decoderOutputLengthPointer, this.resampleOutputBufferPointer, this.resampleOutputLengthPointer);\n\n          this.sendToOutputBuffers(this.HEAPF32.subarray(this.resampleOutputBufferPointer >> 2, (this.resampleOutputBufferPointer >> 2) + resampledLength * this.numberOfChannels));\n          this.decoderBufferIndex = 0;\n        }\n      } // End of stream\n\n\n      if (headerType & 4) {\n        this.sendLastBuffer();\n      }\n    }\n  }, this);\n};\n\nOggOpusDecoder.prototype.getPageBoundaries = function (dataView) {\n  var pageBoundaries = [];\n\n  for (var i = 0; i < dataView.byteLength - 32; i++) {\n    if (dataView.getUint32(i, true) == 1399285583) {\n      pageBoundaries.push(i);\n    }\n  }\n\n  return pageBoundaries;\n};\n\nOggOpusDecoder.prototype.init = function () {\n  this.resetOutputBuffers();\n  this.initCodec();\n  this.initResampler();\n};\n\nOggOpusDecoder.prototype.initCodec = function () {\n  if (this.decoder) {\n    this._opus_decoder_destroy(this.decoder);\n\n    this._free(this.decoderBufferPointer);\n\n    this._free(this.decoderOutputLengthPointer);\n\n    this._free(this.decoderOutputPointer);\n  }\n\n  var errReference = this._malloc(4);\n\n  this.decoder = this._opus_decoder_create(this.config.decoderSampleRate, this.numberOfChannels, errReference);\n\n  this._free(errReference);\n\n  this.decoderBufferMaxLength = 4000;\n  this.decoderBufferPointer = this._malloc(this.decoderBufferMaxLength);\n  this.decoderBuffer = this.HEAPU8.subarray(this.decoderBufferPointer, this.decoderBufferPointer + this.decoderBufferMaxLength);\n  this.decoderBufferIndex = 0;\n  this.decoderOutputLengthPointer = this._malloc(4);\n  this.decoderOutputMaxLength = this.config.decoderSampleRate * this.numberOfChannels * 120 / 1000; // Max 120ms frame size\n\n  this.decoderOutputPointer = this._malloc(this.decoderOutputMaxLength * 4); // 4 bytes per sample\n};\n\nOggOpusDecoder.prototype.initResampler = function () {\n  if (this.resampler) {\n    this._speex_resampler_destroy(this.resampler);\n\n    this._free(this.resampleOutputLengthPointer);\n\n    this._free(this.resampleOutputBufferPointer);\n  }\n\n  var errLocation = this._malloc(4);\n\n  this.resampler = this._speex_resampler_init(this.numberOfChannels, this.config.decoderSampleRate, this.config.outputBufferSampleRate, this.config.resampleQuality, errLocation);\n\n  this._free(errLocation);\n\n  this.resampleOutputLengthPointer = this._malloc(4);\n  this.resampleOutputMaxLength = Math.ceil(this.decoderOutputMaxLength * this.config.outputBufferSampleRate / this.config.decoderSampleRate);\n  this.resampleOutputBufferPointer = this._malloc(this.resampleOutputMaxLength * 4); // 4 bytes per sample\n};\n\nOggOpusDecoder.prototype.resetOutputBuffers = function () {\n  this.outputBuffers = [];\n  this.outputBufferArrayBuffers = [];\n  this.outputBufferIndex = 0;\n\n  for (var i = 0; i < this.numberOfChannels; i++) {\n    this.outputBuffers.push(new Float32Array(this.config.bufferLength));\n    this.outputBufferArrayBuffers.push(this.outputBuffers[i].buffer);\n  }\n};\n\nOggOpusDecoder.prototype.sendLastBuffer = function () {\n  this.sendToOutputBuffers(new Float32Array((this.config.bufferLength - this.outputBufferIndex) * this.numberOfChannels));\n  global['postMessage'](null);\n};\n\nOggOpusDecoder.prototype.sendToOutputBuffers = function (mergedBuffers) {\n  var dataIndex = 0;\n  var mergedBufferLength = mergedBuffers.length / this.numberOfChannels;\n\n  while (dataIndex < mergedBufferLength) {\n    var amountToCopy = Math.min(mergedBufferLength - dataIndex, this.config.bufferLength - this.outputBufferIndex);\n\n    if (this.numberOfChannels === 1) {\n      this.outputBuffers[0].set(mergedBuffers.subarray(dataIndex, dataIndex + amountToCopy), this.outputBufferIndex);\n    } // Deinterleave\n    else {\n        for (var i = 0; i < amountToCopy; i++) {\n          this.outputBuffers.forEach(function (buffer, channelIndex) {\n            buffer[this.outputBufferIndex + i] = mergedBuffers[(dataIndex + i) * this.numberOfChannels + channelIndex];\n          }, this);\n        }\n      }\n\n    dataIndex += amountToCopy;\n    this.outputBufferIndex += amountToCopy;\n\n    if (this.outputBufferIndex == this.config.bufferLength) {\n      global['postMessage'](this.outputBuffers, this.outputBufferArrayBuffers);\n      this.resetOutputBuffers();\n    }\n  }\n};\n\nif (!Module) {\n  Module = {};\n}\n\nModule['mainReady'] = mainReady;\nModule['OggOpusDecoder'] = OggOpusDecoder;\nModule['onRuntimeInitialized'] = mainReadyResolve;\nmodule.exports = Module;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZGVjb2Rlcldvcmtlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0RlY29kZXJXb3JrZXIvLi9zcmMvZGVjb2Rlcldvcmtlci5qcz8wYzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZGVjb2RlcjtcbnZhciBtYWluUmVhZHlSZXNvbHZlO1xudmFyIG1haW5SZWFkeSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpeyBtYWluUmVhZHlSZXNvbHZlID0gcmVzb2x2ZTsgfSk7XG5cbmdsb2JhbFsnb25tZXNzYWdlJ10gPSBmdW5jdGlvbiggZSApe1xuICBtYWluUmVhZHkudGhlbihmdW5jdGlvbigpe1xuICAgIHN3aXRjaCggZVsnZGF0YSddWydjb21tYW5kJ10gKXtcblxuICAgICAgY2FzZSAnZGVjb2RlJzpcbiAgICAgICAgaWYgKGRlY29kZXIpe1xuICAgICAgICAgIGRlY29kZXIuZGVjb2RlKCBlWydkYXRhJ11bJ3BhZ2VzJ10gKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZG9uZSc6XG4gICAgICAgIGlmIChkZWNvZGVyKSB7XG4gICAgICAgICAgZGVjb2Rlci5zZW5kTGFzdEJ1ZmZlcigpO1xuICAgICAgICAgIGdsb2JhbFsnY2xvc2UnXSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdpbml0JzpcbiAgICAgICAgZGVjb2RlciA9IG5ldyBPZ2dPcHVzRGVjb2RlciggZVsnZGF0YSddLCBNb2R1bGUgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIElnbm9yZSBhbnkgdW5rbm93biBjb21tYW5kcyBhbmQgY29udGludWUgcmVjaWV2aW5nIGNvbW1hbmRzXG4gICAgfVxuICB9KTtcbn07XG5cbnZhciBPZ2dPcHVzRGVjb2RlciA9IGZ1bmN0aW9uKCBjb25maWcsIE1vZHVsZSApe1xuXG4gIGlmICggIU1vZHVsZSApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB3aXRoIGV4cG9ydHMgcmVxdWlyZWQgdG8gaW5pdGlhbGl6ZSBhIGRlY29kZXIgaW5zdGFuY2UnKTtcbiAgfVxuXG4gIHRoaXMubWFpblJlYWR5ID0gbWFpblJlYWR5OyAvLyBFeHBvc2UgZm9yIHVuaXQgdGVzdGluZ1xuICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyBcbiAgICBidWZmZXJMZW5ndGg6IDQwOTYsIC8vIERlZmluZSBzaXplIG9mIG91dGdvaW5nIGJ1ZmZlclxuICAgIGRlY29kZXJTYW1wbGVSYXRlOiA0ODAwMCwgLy8gRGVzaXJlZCBkZWNvZGVyIHNhbXBsZSByYXRlLlxuICAgIG91dHB1dEJ1ZmZlclNhbXBsZVJhdGU6IDQ4MDAwLCAvLyBEZXNpcmVkIG91dHB1dCBzYW1wbGUgcmF0ZS4gQXVkaW8gd2lsbCBiZSByZXNhbXBsZWRcbiAgICByZXNhbXBsZVF1YWxpdHk6IDMsIC8vIFZhbHVlIGJldHdlZW4gMCBhbmQgMTAgaW5jbHVzaXZlLiAxMCBiZWluZyBoaWdoZXN0IHF1YWxpdHkuXG4gIH0sIGNvbmZpZyApO1xuXG4gIHRoaXMuX29wdXNfZGVjb2Rlcl9jcmVhdGUgPSBNb2R1bGUuX29wdXNfZGVjb2Rlcl9jcmVhdGU7XG4gIHRoaXMuX29wdXNfZGVjb2Rlcl9kZXN0cm95ID0gTW9kdWxlLl9vcHVzX2RlY29kZXJfZGVzdHJveTtcbiAgdGhpcy5fc3BlZXhfcmVzYW1wbGVyX3Byb2Nlc3NfaW50ZXJsZWF2ZWRfZmxvYXQgPSBNb2R1bGUuX3NwZWV4X3Jlc2FtcGxlcl9wcm9jZXNzX2ludGVybGVhdmVkX2Zsb2F0O1xuICB0aGlzLl9zcGVleF9yZXNhbXBsZXJfaW5pdCA9IE1vZHVsZS5fc3BlZXhfcmVzYW1wbGVyX2luaXQ7XG4gIHRoaXMuX3NwZWV4X3Jlc2FtcGxlcl9kZXN0cm95ID0gTW9kdWxlLl9zcGVleF9yZXNhbXBsZXJfZGVzdHJveTtcbiAgdGhpcy5fb3B1c19kZWNvZGVfZmxvYXQgPSBNb2R1bGUuX29wdXNfZGVjb2RlX2Zsb2F0O1xuICB0aGlzLl9mcmVlID0gTW9kdWxlLl9mcmVlO1xuICB0aGlzLl9tYWxsb2MgPSBNb2R1bGUuX21hbGxvYztcbiAgdGhpcy5IRUFQVTggPSBNb2R1bGUuSEVBUFU4O1xuICB0aGlzLkhFQVAzMiA9IE1vZHVsZS5IRUFQMzI7XG4gIHRoaXMuSEVBUEYzMiA9IE1vZHVsZS5IRUFQRjMyO1xuXG4gIHRoaXMub3V0cHV0QnVmZmVycyA9IFtdO1xufTtcblxuXG5PZ2dPcHVzRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oIHR5cGVkQXJyYXkgKSB7XG4gIHZhciBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyggdHlwZWRBcnJheS5idWZmZXIgKTtcbiAgdGhpcy5nZXRQYWdlQm91bmRhcmllcyggZGF0YVZpZXcgKS5tYXAoIGZ1bmN0aW9uKCBwYWdlU3RhcnQgKSB7XG4gICAgdmFyIGhlYWRlclR5cGUgPSBkYXRhVmlldy5nZXRVaW50OCggcGFnZVN0YXJ0ICsgNSwgdHJ1ZSApO1xuICAgIHZhciBwYWdlSW5kZXggPSBkYXRhVmlldy5nZXRVaW50MzIoIHBhZ2VTdGFydCArIDE4LCB0cnVlICk7XG5cbiAgICAvLyBCZWdpbm5pbmcgb2Ygc3RyZWFtXG4gICAgaWYgKCBoZWFkZXJUeXBlICYgMiApIHtcbiAgICAgIHRoaXMubnVtYmVyT2ZDaGFubmVscyA9IGRhdGFWaWV3LmdldFVpbnQ4KCBwYWdlU3RhcnQgKyAzNywgdHJ1ZSApO1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgLy8gRGVjb2RlIHBhZ2VcbiAgICBpZiAoIHBhZ2VJbmRleCA+IDEgKSB7XG4gICAgICB2YXIgc2VnbWVudFRhYmxlTGVuZ3RoID0gZGF0YVZpZXcuZ2V0VWludDgoIHBhZ2VTdGFydCArIDI2LCB0cnVlICk7XG4gICAgICB2YXIgc2VnbWVudFRhYmxlSW5kZXggPSBwYWdlU3RhcnQgKyAyNyArIHNlZ21lbnRUYWJsZUxlbmd0aDtcblxuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2VnbWVudFRhYmxlTGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIHZhciBwYWNrZXRMZW5ndGggPSBkYXRhVmlldy5nZXRVaW50OCggcGFnZVN0YXJ0ICsgMjcgKyBpLCB0cnVlICk7XG4gICAgICAgIHRoaXMuZGVjb2RlckJ1ZmZlci5zZXQoIHR5cGVkQXJyYXkuc3ViYXJyYXkoIHNlZ21lbnRUYWJsZUluZGV4LCBzZWdtZW50VGFibGVJbmRleCArPSBwYWNrZXRMZW5ndGggKSwgdGhpcy5kZWNvZGVyQnVmZmVySW5kZXggKTtcbiAgICAgICAgdGhpcy5kZWNvZGVyQnVmZmVySW5kZXggKz0gcGFja2V0TGVuZ3RoO1xuXG4gICAgICAgIGlmICggcGFja2V0TGVuZ3RoIDwgMjU1ICkge1xuICAgICAgICAgIHZhciBvdXRwdXRTYW1wbGVMZW5ndGggPSB0aGlzLl9vcHVzX2RlY29kZV9mbG9hdCggdGhpcy5kZWNvZGVyLCB0aGlzLmRlY29kZXJCdWZmZXJQb2ludGVyLCB0aGlzLmRlY29kZXJCdWZmZXJJbmRleCwgdGhpcy5kZWNvZGVyT3V0cHV0UG9pbnRlciwgdGhpcy5kZWNvZGVyT3V0cHV0TWF4TGVuZ3RoLCAwKTtcbiAgICAgICAgICB2YXIgcmVzYW1wbGVkTGVuZ3RoID0gTWF0aC5jZWlsKCBvdXRwdXRTYW1wbGVMZW5ndGggKiB0aGlzLmNvbmZpZy5vdXRwdXRCdWZmZXJTYW1wbGVSYXRlIC8gdGhpcy5jb25maWcuZGVjb2RlclNhbXBsZVJhdGUgKTtcbiAgICAgICAgICB0aGlzLkhFQVAzMlsgdGhpcy5kZWNvZGVyT3V0cHV0TGVuZ3RoUG9pbnRlciA+PiAyIF0gPSBvdXRwdXRTYW1wbGVMZW5ndGg7XG4gICAgICAgICAgdGhpcy5IRUFQMzJbIHRoaXMucmVzYW1wbGVPdXRwdXRMZW5ndGhQb2ludGVyID4+IDIgXSA9IHJlc2FtcGxlZExlbmd0aDtcbiAgICAgICAgICB0aGlzLl9zcGVleF9yZXNhbXBsZXJfcHJvY2Vzc19pbnRlcmxlYXZlZF9mbG9hdCggdGhpcy5yZXNhbXBsZXIsIHRoaXMuZGVjb2Rlck91dHB1dFBvaW50ZXIsIHRoaXMuZGVjb2Rlck91dHB1dExlbmd0aFBvaW50ZXIsIHRoaXMucmVzYW1wbGVPdXRwdXRCdWZmZXJQb2ludGVyLCB0aGlzLnJlc2FtcGxlT3V0cHV0TGVuZ3RoUG9pbnRlciApO1xuICAgICAgICAgIHRoaXMuc2VuZFRvT3V0cHV0QnVmZmVycyggdGhpcy5IRUFQRjMyLnN1YmFycmF5KCB0aGlzLnJlc2FtcGxlT3V0cHV0QnVmZmVyUG9pbnRlciA+PiAyLCAodGhpcy5yZXNhbXBsZU91dHB1dEJ1ZmZlclBvaW50ZXIgPj4gMikgKyByZXNhbXBsZWRMZW5ndGggKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMgKSApO1xuICAgICAgICAgIHRoaXMuZGVjb2RlckJ1ZmZlckluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBFbmQgb2Ygc3RyZWFtXG4gICAgICBpZiAoIGhlYWRlclR5cGUgJiA0ICkge1xuICAgICAgICB0aGlzLnNlbmRMYXN0QnVmZmVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB0aGlzICk7XG59O1xuXG5PZ2dPcHVzRGVjb2Rlci5wcm90b3R5cGUuZ2V0UGFnZUJvdW5kYXJpZXMgPSBmdW5jdGlvbiggZGF0YVZpZXcgKXtcbiAgdmFyIHBhZ2VCb3VuZGFyaWVzID0gW107XG5cbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgZGF0YVZpZXcuYnl0ZUxlbmd0aCAtIDMyOyBpKysgKSB7XG4gICAgaWYgKCBkYXRhVmlldy5nZXRVaW50MzIoIGksIHRydWUgKSA9PSAxMzk5Mjg1NTgzICkge1xuICAgICAgcGFnZUJvdW5kYXJpZXMucHVzaCggaSApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYWdlQm91bmRhcmllcztcbn07XG5cbk9nZ09wdXNEZWNvZGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5yZXNldE91dHB1dEJ1ZmZlcnMoKTtcbiAgdGhpcy5pbml0Q29kZWMoKTtcbiAgdGhpcy5pbml0UmVzYW1wbGVyKCk7XG59O1xuXG5PZ2dPcHVzRGVjb2Rlci5wcm90b3R5cGUuaW5pdENvZGVjID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKCB0aGlzLmRlY29kZXIgKSB7XG4gICAgdGhpcy5fb3B1c19kZWNvZGVyX2Rlc3Ryb3koIHRoaXMuZGVjb2RlciApO1xuICAgIHRoaXMuX2ZyZWUoIHRoaXMuZGVjb2RlckJ1ZmZlclBvaW50ZXIgKTtcbiAgICB0aGlzLl9mcmVlKCB0aGlzLmRlY29kZXJPdXRwdXRMZW5ndGhQb2ludGVyICk7XG4gICAgdGhpcy5fZnJlZSggdGhpcy5kZWNvZGVyT3V0cHV0UG9pbnRlciApO1xuICB9XG5cbiAgdmFyIGVyclJlZmVyZW5jZSA9IHRoaXMuX21hbGxvYyggNCApO1xuICB0aGlzLmRlY29kZXIgPSB0aGlzLl9vcHVzX2RlY29kZXJfY3JlYXRlKCB0aGlzLmNvbmZpZy5kZWNvZGVyU2FtcGxlUmF0ZSwgdGhpcy5udW1iZXJPZkNoYW5uZWxzLCBlcnJSZWZlcmVuY2UgKTtcbiAgdGhpcy5fZnJlZSggZXJyUmVmZXJlbmNlICk7XG5cbiAgdGhpcy5kZWNvZGVyQnVmZmVyTWF4TGVuZ3RoID0gNDAwMDtcbiAgdGhpcy5kZWNvZGVyQnVmZmVyUG9pbnRlciA9IHRoaXMuX21hbGxvYyggdGhpcy5kZWNvZGVyQnVmZmVyTWF4TGVuZ3RoICk7XG4gIHRoaXMuZGVjb2RlckJ1ZmZlciA9IHRoaXMuSEVBUFU4LnN1YmFycmF5KCB0aGlzLmRlY29kZXJCdWZmZXJQb2ludGVyLCB0aGlzLmRlY29kZXJCdWZmZXJQb2ludGVyICsgdGhpcy5kZWNvZGVyQnVmZmVyTWF4TGVuZ3RoICk7XG4gIHRoaXMuZGVjb2RlckJ1ZmZlckluZGV4ID0gMDtcblxuICB0aGlzLmRlY29kZXJPdXRwdXRMZW5ndGhQb2ludGVyID0gdGhpcy5fbWFsbG9jKCA0ICk7XG4gIHRoaXMuZGVjb2Rlck91dHB1dE1heExlbmd0aCA9IHRoaXMuY29uZmlnLmRlY29kZXJTYW1wbGVSYXRlICogdGhpcy5udW1iZXJPZkNoYW5uZWxzICogMTIwIC8gMTAwMDsgLy8gTWF4IDEyMG1zIGZyYW1lIHNpemVcbiAgdGhpcy5kZWNvZGVyT3V0cHV0UG9pbnRlciA9IHRoaXMuX21hbGxvYyggdGhpcy5kZWNvZGVyT3V0cHV0TWF4TGVuZ3RoICogNCApOyAvLyA0IGJ5dGVzIHBlciBzYW1wbGVcbn07XG5cbk9nZ09wdXNEZWNvZGVyLnByb3RvdHlwZS5pbml0UmVzYW1wbGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKCB0aGlzLnJlc2FtcGxlciApIHtcbiAgICB0aGlzLl9zcGVleF9yZXNhbXBsZXJfZGVzdHJveSggdGhpcy5yZXNhbXBsZXIgKTtcbiAgICB0aGlzLl9mcmVlKCB0aGlzLnJlc2FtcGxlT3V0cHV0TGVuZ3RoUG9pbnRlciApO1xuICAgIHRoaXMuX2ZyZWUoIHRoaXMucmVzYW1wbGVPdXRwdXRCdWZmZXJQb2ludGVyICk7XG4gIH1cblxuICB2YXIgZXJyTG9jYXRpb24gPSB0aGlzLl9tYWxsb2MoIDQgKTtcbiAgdGhpcy5yZXNhbXBsZXIgPSB0aGlzLl9zcGVleF9yZXNhbXBsZXJfaW5pdCggdGhpcy5udW1iZXJPZkNoYW5uZWxzLCB0aGlzLmNvbmZpZy5kZWNvZGVyU2FtcGxlUmF0ZSwgdGhpcy5jb25maWcub3V0cHV0QnVmZmVyU2FtcGxlUmF0ZSwgdGhpcy5jb25maWcucmVzYW1wbGVRdWFsaXR5LCBlcnJMb2NhdGlvbiApO1xuICB0aGlzLl9mcmVlKCBlcnJMb2NhdGlvbiApO1xuXG4gIHRoaXMucmVzYW1wbGVPdXRwdXRMZW5ndGhQb2ludGVyID0gdGhpcy5fbWFsbG9jKCA0ICk7XG4gIHRoaXMucmVzYW1wbGVPdXRwdXRNYXhMZW5ndGggPSBNYXRoLmNlaWwoIHRoaXMuZGVjb2Rlck91dHB1dE1heExlbmd0aCAqIHRoaXMuY29uZmlnLm91dHB1dEJ1ZmZlclNhbXBsZVJhdGUgLyB0aGlzLmNvbmZpZy5kZWNvZGVyU2FtcGxlUmF0ZSApO1xuICB0aGlzLnJlc2FtcGxlT3V0cHV0QnVmZmVyUG9pbnRlciA9IHRoaXMuX21hbGxvYyggdGhpcy5yZXNhbXBsZU91dHB1dE1heExlbmd0aCAqIDQgKTsgLy8gNCBieXRlcyBwZXIgc2FtcGxlXG59O1xuXG5PZ2dPcHVzRGVjb2Rlci5wcm90b3R5cGUucmVzZXRPdXRwdXRCdWZmZXJzID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5vdXRwdXRCdWZmZXJzID0gW107XG4gIHRoaXMub3V0cHV0QnVmZmVyQXJyYXlCdWZmZXJzID0gW107XG4gIHRoaXMub3V0cHV0QnVmZmVySW5kZXggPSAwO1xuXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHRoaXMubnVtYmVyT2ZDaGFubmVsczsgaSsrICkge1xuICAgIHRoaXMub3V0cHV0QnVmZmVycy5wdXNoKCBuZXcgRmxvYXQzMkFycmF5KCB0aGlzLmNvbmZpZy5idWZmZXJMZW5ndGggKSApO1xuICAgIHRoaXMub3V0cHV0QnVmZmVyQXJyYXlCdWZmZXJzLnB1c2goIHRoaXMub3V0cHV0QnVmZmVyc1tpXS5idWZmZXIgKTtcbiAgfVxufTtcblxuT2dnT3B1c0RlY29kZXIucHJvdG90eXBlLnNlbmRMYXN0QnVmZmVyID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5zZW5kVG9PdXRwdXRCdWZmZXJzKCBuZXcgRmxvYXQzMkFycmF5KCAoIHRoaXMuY29uZmlnLmJ1ZmZlckxlbmd0aCAtIHRoaXMub3V0cHV0QnVmZmVySW5kZXggKSAqIHRoaXMubnVtYmVyT2ZDaGFubmVscyApICk7XG4gIGdsb2JhbFsncG9zdE1lc3NhZ2UnXShudWxsKTtcbn07XG5cbk9nZ09wdXNEZWNvZGVyLnByb3RvdHlwZS5zZW5kVG9PdXRwdXRCdWZmZXJzID0gZnVuY3Rpb24oIG1lcmdlZEJ1ZmZlcnMgKXtcbiAgdmFyIGRhdGFJbmRleCA9IDA7XG4gIHZhciBtZXJnZWRCdWZmZXJMZW5ndGggPSBtZXJnZWRCdWZmZXJzLmxlbmd0aCAvIHRoaXMubnVtYmVyT2ZDaGFubmVscztcblxuICB3aGlsZSAoIGRhdGFJbmRleCA8IG1lcmdlZEJ1ZmZlckxlbmd0aCApIHtcbiAgICB2YXIgYW1vdW50VG9Db3B5ID0gTWF0aC5taW4oIG1lcmdlZEJ1ZmZlckxlbmd0aCAtIGRhdGFJbmRleCwgdGhpcy5jb25maWcuYnVmZmVyTGVuZ3RoIC0gdGhpcy5vdXRwdXRCdWZmZXJJbmRleCApO1xuXG4gICAgaWYgKHRoaXMubnVtYmVyT2ZDaGFubmVscyA9PT0gMSkge1xuICAgICAgdGhpcy5vdXRwdXRCdWZmZXJzWzBdLnNldCggbWVyZ2VkQnVmZmVycy5zdWJhcnJheSggZGF0YUluZGV4LCBkYXRhSW5kZXggKyBhbW91bnRUb0NvcHkgKSwgdGhpcy5vdXRwdXRCdWZmZXJJbmRleCApO1xuICAgIH1cblxuICAgIC8vIERlaW50ZXJsZWF2ZVxuICAgIGVsc2Uge1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgYW1vdW50VG9Db3B5OyBpKysgKSB7XG4gICAgICAgIHRoaXMub3V0cHV0QnVmZmVycy5mb3JFYWNoKCBmdW5jdGlvbiggYnVmZmVyLCBjaGFubmVsSW5kZXggKSB7XG4gICAgICAgICAgYnVmZmVyWyB0aGlzLm91dHB1dEJ1ZmZlckluZGV4ICsgaSBdID0gbWVyZ2VkQnVmZmVyc1sgKCBkYXRhSW5kZXggKyBpICkgKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMgKyBjaGFubmVsSW5kZXggXTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGF0YUluZGV4ICs9IGFtb3VudFRvQ29weTtcbiAgICB0aGlzLm91dHB1dEJ1ZmZlckluZGV4ICs9IGFtb3VudFRvQ29weTtcblxuICAgIGlmICggdGhpcy5vdXRwdXRCdWZmZXJJbmRleCA9PSB0aGlzLmNvbmZpZy5idWZmZXJMZW5ndGggKSB7XG4gICAgICBnbG9iYWxbJ3Bvc3RNZXNzYWdlJ10oIHRoaXMub3V0cHV0QnVmZmVycywgdGhpcy5vdXRwdXRCdWZmZXJBcnJheUJ1ZmZlcnMgKTtcbiAgICAgIHRoaXMucmVzZXRPdXRwdXRCdWZmZXJzKCk7XG4gICAgfVxuICB9XG59O1xuXG5cbmlmICghTW9kdWxlKSB7XG4gIE1vZHVsZSA9IHt9O1xufVxuXG5Nb2R1bGVbJ21haW5SZWFkeSddID0gbWFpblJlYWR5O1xuTW9kdWxlWydPZ2dPcHVzRGVjb2RlciddID0gT2dnT3B1c0RlY29kZXI7XG5Nb2R1bGVbJ29uUnVudGltZUluaXRpYWxpemVkJ10gPSBtYWluUmVhZHlSZXNvbHZlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZHVsZTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXBCQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/decoderWorker.js\n");

/***/ })

/******/ });
});


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = function(status, toThrow) {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === 'object';
ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

var nodeFS;
var nodePath;

if (ENVIRONMENT_IS_NODE) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = require('path').dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }

// include: node_shell_read.js


read_ = function shell_read(filename, binary) {
  if (!nodeFS) nodeFS = require('fs');
  if (!nodePath) nodePath = require('path');
  filename = nodePath['normalize'](filename);
  return nodeFS['readFileSync'](filename, binary ? null : 'utf8');
};

readBinary = function readBinary(filename) {
  var ret = read_(filename, true);
  if (!ret.buffer) {
    ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
};

// end include: node_shell_read.js
  if (process['argv'].length > 1) {
    thisProgram = process['argv'][1].replace(/\\/g, '/');
  }

  arguments_ = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  process['on']('unhandledRejection', abort);

  quit_ = function(status) {
    process['exit'](status);
  };

  Module['inspect'] = function () { return '[Emscripten Module object]'; };

} else
if (ENVIRONMENT_IS_SHELL) {

  if (typeof read != 'undefined') {
    read_ = function shell_read(f) {
      return read(f);
    };
  }

  readBinary = function readBinary(f) {
    var data;
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit === 'function') {
    quit_ = function(status) {
      quit(status);
    };
  }

  if (typeof print !== 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console === 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr !== 'undefined' ? printErr : print);
  }

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document !== 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {

// include: web_or_worker_shell_read.js


  read_ = function(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
  };

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = function(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = function(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };

// end include: web_or_worker_shell_read.js
  }

  setWindowTitle = function(title) { document.title = title };
} else
{
}

// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.warn.bind(console);

// Merge back in the overrides
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];

if (Module['thisProgram']) thisProgram = Module['thisProgram'];

if (Module['quit']) quit_ = Module['quit'];

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message




var STACK_ALIGN = 16;

function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
  return Math.ceil(size / factor) * factor;
}

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length-1] === '*') {
        return 4; // A pointer
      } else if (type[0] === 'i') {
        var bits = Number(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}

// include: runtime_functions.js


// Wraps a JS function as a wasm function with a given signature.
function convertJsFunctionToWasm(func, sig) {

  // If the type reflection proposal is available, use the new
  // "WebAssembly.Function" constructor.
  // Otherwise, construct a minimal wasm module importing the JS function and
  // re-exporting it.
  if (typeof WebAssembly.Function === "function") {
    var typeNames = {
      'i': 'i32',
      'j': 'i64',
      'f': 'f32',
      'd': 'f64'
    };
    var type = {
      parameters: [],
      results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
    };
    for (var i = 1; i < sig.length; ++i) {
      type.parameters.push(typeNames[sig[i]]);
    }
    return new WebAssembly.Function(type, func);
  }

  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    'e': {
      'f': func
    }
  });
  var wrappedFunc = instance.exports['f'];
  return wrappedFunc;
}

var freeTableIndexes = [];

// Weak map of functions in the table to their indexes, created on first use.
var functionsInTableMap;

function getEmptyTableSlot() {
  // Reuse a free index if there is one, otherwise grow.
  if (freeTableIndexes.length) {
    return freeTableIndexes.pop();
  }
  // Grow the table
  try {
    wasmTable.grow(1);
  } catch (err) {
    if (!(err instanceof RangeError)) {
      throw err;
    }
    throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
  }
  return wasmTable.length - 1;
}

// Add a wasm function to the table.
function addFunctionWasm(func, sig) {
  // Check if the function is already in the table, to ensure each function
  // gets a unique index. First, create the map if this is the first use.
  if (!functionsInTableMap) {
    functionsInTableMap = new WeakMap();
    for (var i = 0; i < wasmTable.length; i++) {
      var item = wasmTable.get(i);
      // Ignore null values.
      if (item) {
        functionsInTableMap.set(item, i);
      }
    }
  }
  if (functionsInTableMap.has(func)) {
    return functionsInTableMap.get(func);
  }

  // It's not in the table, add it now.

  var ret = getEmptyTableSlot();

  // Set the new value.
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    wasmTable.set(ret, func);
  } catch (err) {
    if (!(err instanceof TypeError)) {
      throw err;
    }
    var wrapped = convertJsFunctionToWasm(func, sig);
    wasmTable.set(ret, wrapped);
  }

  functionsInTableMap.set(func, ret);

  return ret;
}

function removeFunction(index) {
  functionsInTableMap.delete(wasmTable.get(index));
  freeTableIndexes.push(index);
}

// 'sig' parameter is required for the llvm backend but only when func is not
// already a WebAssembly function.
function addFunction(func, sig) {

  return addFunctionWasm(func, sig);
}

// end include: runtime_functions.js
// include: runtime_debug.js


// end include: runtime_debug.js
var tempRet0 = 0;

var setTempRet0 = function(value) {
  tempRet0 = value;
};

var getTempRet0 = function() {
  return tempRet0;
};



// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
var noExitRuntime = Module['noExitRuntime'] || true;

if (typeof WebAssembly !== 'object') {
  abort('no native wasm support detected');
}

// include: runtime_safe_heap.js


// In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
// In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)

/** @param {number} ptr
    @param {number} value
    @param {string} type
    @param {number|boolean=} noSafe */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch (type) {
      case 'i1': HEAP8[((ptr)>>0)] = value; break;
      case 'i8': HEAP8[((ptr)>>0)] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)] = tempI64[0],HEAP32[(((ptr)+(4))>>2)] = tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

/** @param {number} ptr
    @param {string} type
    @param {number|boolean=} noSafe */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch (type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}

// end include: runtime_safe_heap.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
/** @param {string|null=} returnType
    @param {Array=} argTypes
    @param {Arguments|Array=} args
    @param {Object=} opts */
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);

  ret = convertReturnValue(ret);
  if (stack !== 0) stackRestore(stack);
  return ret;
}

/** @param {string=} returnType
    @param {Array=} argTypes
    @param {Object=} opts */
function cwrap(ident, returnType, argTypes, opts) {
  argTypes = argTypes || [];
  // When the function takes numbers and returns a number, we can just return
  // the original function
  var numericArgs = argTypes.every(function(type){ return type === 'number'});
  var numericRet = returnType !== 'string';
  if (numericRet && numericArgs && !opts) {
    return getCFunc(ident);
  }
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((Uint8Array|Array<number>), number)} */
function allocate(slab, allocator) {
  var ret;

  if (allocator == ALLOC_STACK) {
    ret = stackAlloc(slab.length);
  } else {
    ret = _malloc(slab.length);
  }

  if (slab.subarray || slab.slice) {
    HEAPU8.set(/** @type {!Uint8Array} */(slab), ret);
  } else {
    HEAPU8.set(new Uint8Array(slab), ret);
  }
  return ret;
}

// include: runtime_strings.js


// runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

/**
 * @param {number} idx
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ArrayToString(heap, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
  while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

  if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(heap.subarray(idx, endPtr));
  } else {
    var str = '';
    // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = heap[idx++];
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      var u1 = heap[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      var u2 = heap[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
      }

      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
  return str;
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 * @param {number} ptr
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   heap: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array.
//                    This count should include the null terminator,
//                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) {
      var u1 = str.charCodeAt(++i);
      u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
    }
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 0xC0 | (u >> 6);
      heap[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 0xE0 | (u >> 12);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      heap[outIdx++] = 0xF0 | (u >> 18);
      heap[outIdx++] = 0x80 | ((u >> 12) & 63);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  heap[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) ++len;
    else if (u <= 0x7FF) len += 2;
    else if (u <= 0xFFFF) len += 3;
    else len += 4;
  }
  return len;
}

// end include: runtime_strings.js
// include: runtime_strings_extra.js


// runtime_strings_extra.js: Strings related runtime functions that are available only in regular runtime.

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAPU8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  var maxIdx = idx + maxBytesToRead / 2;
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var str = '';

    // If maxBytesToRead is not passed explicitly, it will be undefined, and the for-loop's condition
    // will always evaluate to true. The loop is then terminated on the first null char.
    for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0) break;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }

    return str;
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)] = codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)] = 0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr, maxBytesToRead) {
  var i = 0;

  var str = '';
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0) break;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
  return str;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)] = codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)] = 0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated
    @param {boolean=} dontAddNull */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  HEAP8.set(array, buffer);
}

/** @param {boolean=} dontAddNull */
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    HEAP8[((buffer++)>>0)] = str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)] = 0;
}

// end include: runtime_strings_extra.js
// Memory management

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  Module['HEAP8'] = HEAP8 = new Int8Array(buf);
  Module['HEAP16'] = HEAP16 = new Int16Array(buf);
  Module['HEAP32'] = HEAP32 = new Int32Array(buf);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
}

var TOTAL_STACK = 5242880;

var INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 16777216;

// include: runtime_init_table.js
// In regular non-RELOCATABLE mode the table is exported
// from the wasm module and this will be assigned once
// the exports are available.
var wasmTable;

// end include: runtime_init_table.js
// include: runtime_stack_check.js


// end include: runtime_stack_check.js
// include: runtime_assertions.js


// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;

function preRun() {

  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  runtimeInitialized = true;

  
  callRuntimeCallbacks(__ATINIT__);
}

function exitRuntime() {
  runtimeExited = true;
}

function postRun() {

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function getUniqueRunDependency(id) {
  return id;
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data

/** @param {string|number=} what */
function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  what += '';
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  what = 'abort(' + what + '). Build with -s ASSERTIONS=1 for more info.';

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// {{MEM_INITIALIZER}}

// include: memoryprofiler.js


// end include: memoryprofiler.js
// include: URIUtils.js


// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  // Prefix of data URIs emitted by SINGLE_FILE and related options.
  return filename.startsWith(dataURIPrefix);
}

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return filename.startsWith('file://');
}

// end include: URIUtils.js
  var wasmBinaryFile = 'decoderWorker.wasm';
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }

function getBinary(file) {
  try {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    if (readBinary) {
      return readBinary(file);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // If we don't have the binary yet, try to to load it asynchronously.
  // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
  // See https://github.com/github/fetch/pull/92#issuecomment-140665932
  // Cordova or Electron apps are typically loaded from a file:// url.
  // So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch === 'function'
      && !isFileURI(wasmBinaryFile)
    ) {
      return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
        if (!response['ok']) {
          throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
        }
        return response['arrayBuffer']();
      }).catch(function () {
          return getBinary(wasmBinaryFile);
      });
    }
    else {
      if (readAsync) {
        // fetch is not available or url is file => try XHR (readAsync uses XHR internally)
        return new Promise(function(resolve, reject) {
          readAsync(wasmBinaryFile, function(response) { resolve(new Uint8Array(/** @type{!ArrayBuffer} */(response))) }, reject)
        });
      }
    }
  }

  // Otherwise, getBinary should be able to get it synchronously
  return Promise.resolve().then(function() { return getBinary(wasmBinaryFile); });
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg,
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;

    Module['asm'] = exports;

    wasmMemory = Module['asm']['memory'];
    updateGlobalBufferAndViews(wasmMemory.buffer);

    wasmTable = Module['asm']['__indirect_function_table'];

    addOnInit(Module['asm']['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
  }
  // we can't run yet (except in a pthread, where we have a custom sync instantiator)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise().then(function(binary) {
      var result = WebAssembly.instantiate(binary, info);
      return result;
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);

      abort(reason);
    });
  }

  function instantiateAsync() {
    if (!wasmBinary &&
        typeof WebAssembly.instantiateStreaming === 'function' &&
        !isDataURI(wasmBinaryFile) &&
        // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
        !isFileURI(wasmBinaryFile) &&
        typeof fetch === 'function') {
      return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
        var result = WebAssembly.instantiateStreaming(response, info);
        return result.then(receiveInstantiationResult, function(reason) {
            // We expect the most common failure cause to be a bad MIME type for the binary,
            // in which case falling back to ArrayBuffer instantiation should work.
            err('wasm streaming compile failed: ' + reason);
            err('falling back to ArrayBuffer instantiation');
            return instantiateArrayBuffer(receiveInstantiationResult);
          });
      });
    } else {
      return instantiateArrayBuffer(receiveInstantiationResult);
    }
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      var exports = Module['instantiateWasm'](info, receiveInstance);
      return exports;
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

  instantiateAsync();
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// === Body ===

var ASM_CONSTS = {
  
};






  function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == 'function') {
          callback(Module); // Pass the module as the first argument.
          continue;
        }
        var func = callback.func;
        if (typeof func === 'number') {
          if (callback.arg === undefined) {
            wasmTable.get(func)();
          } else {
            wasmTable.get(func)(callback.arg);
          }
        } else {
          func(callback.arg === undefined ? null : callback.arg);
        }
      }
    }

  function demangle(func) {
      return func;
    }

  function demangleAll(text) {
      var regex =
        /\b_Z[\w\d_]+/g;
      return text.replace(regex,
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }

  function jsStackTrace() {
      var error = new Error();
      if (!error.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error();
        } catch(e) {
          error = e;
        }
        if (!error.stack) {
          return '(no stack trace available)';
        }
      }
      return error.stack.toString();
    }

  var runtimeKeepaliveCounter=0;
  function keepRuntimeAlive() {
      return noExitRuntime || runtimeKeepaliveCounter > 0;
    }

  function stackTrace() {
      var js = jsStackTrace();
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
      return demangleAll(js);
    }

  function _abort() {
      abort();
    }

  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }

  function abortOnCannotGrowMemory(requestedSize) {
      abort('OOM');
    }
  function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      abortOnCannotGrowMemory(requestedSize);
    }

  var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(stream, curr) {
        var buffer = SYSCALLS.buffers[stream];
        if (curr === 0 || curr === 10) {
          (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
          buffer.length = 0;
        } else {
          buffer.push(curr);
        }
      },varargs:undefined,get:function() {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },get64:function(low, high) {
        return low;
      }};
  function _fd_close(fd) {
      return 0;
    }

  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
  }

  function flush_NO_FILESYSTEM() {
      // flush anything remaining in the buffers during shutdown
      if (typeof _fflush !== 'undefined') _fflush(0);
      var buffers = SYSCALLS.buffers;
      if (buffers[1].length) SYSCALLS.printChar(1, 10);
      if (buffers[2].length) SYSCALLS.printChar(2, 10);
    }
  function _fd_write(fd, iov, iovcnt, pnum) {
      // hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[(((iov)+(i*8))>>2)];
        var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
        for (var j = 0; j < len; j++) {
          SYSCALLS.printChar(fd, HEAPU8[ptr+j]);
        }
        num += len;
      }
      HEAP32[((pnum)>>2)] = num
      return 0;
    }

  function _setTempRet0(val) {
      setTempRet0(val);
    }
var ASSERTIONS = false;



/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


var asmLibraryArg = {
  "abort": _abort,
  "emscripten_memcpy_big": _emscripten_memcpy_big,
  "emscripten_resize_heap": _emscripten_resize_heap,
  "fd_close": _fd_close,
  "fd_seek": _fd_seek,
  "fd_write": _fd_write,
  "setTempRet0": _setTempRet0
};
var asm = createWasm();
/** @type {function(...*):?} */
var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
  return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["__wasm_call_ctors"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opus_decoder_create = Module["_opus_decoder_create"] = function() {
  return (_opus_decoder_create = Module["_opus_decoder_create"] = Module["asm"]["opus_decoder_create"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opus_decode_float = Module["_opus_decode_float"] = function() {
  return (_opus_decode_float = Module["_opus_decode_float"] = Module["asm"]["opus_decode_float"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _opus_decoder_destroy = Module["_opus_decoder_destroy"] = function() {
  return (_opus_decoder_destroy = Module["_opus_decoder_destroy"] = Module["asm"]["opus_decoder_destroy"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _speex_resampler_init = Module["_speex_resampler_init"] = function() {
  return (_speex_resampler_init = Module["_speex_resampler_init"] = Module["asm"]["speex_resampler_init"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _speex_resampler_destroy = Module["_speex_resampler_destroy"] = function() {
  return (_speex_resampler_destroy = Module["_speex_resampler_destroy"] = Module["asm"]["speex_resampler_destroy"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _speex_resampler_process_interleaved_float = Module["_speex_resampler_process_interleaved_float"] = function() {
  return (_speex_resampler_process_interleaved_float = Module["_speex_resampler_process_interleaved_float"] = Module["asm"]["speex_resampler_process_interleaved_float"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var ___errno_location = Module["___errno_location"] = function() {
  return (___errno_location = Module["___errno_location"] = Module["asm"]["__errno_location"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackSave = Module["stackSave"] = function() {
  return (stackSave = Module["stackSave"] = Module["asm"]["stackSave"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackRestore = Module["stackRestore"] = function() {
  return (stackRestore = Module["stackRestore"] = Module["asm"]["stackRestore"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackAlloc = Module["stackAlloc"] = function() {
  return (stackAlloc = Module["stackAlloc"] = Module["asm"]["stackAlloc"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _malloc = Module["_malloc"] = function() {
  return (_malloc = Module["_malloc"] = Module["asm"]["malloc"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _free = Module["_free"] = function() {
  return (_free = Module["_free"] = Module["asm"]["free"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var dynCall_jiji = Module["dynCall_jiji"] = function() {
  return (dynCall_jiji = Module["dynCall_jiji"] = Module["asm"]["dynCall_jiji"]).apply(null, arguments);
};





// === Auto-generated postamble setup entry stuff ===



var calledRun;

/**
 * @constructor
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}

var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

/** @type {function(Array=)} */
function run(args) {
  args = args || arguments_;

  if (runDependencies > 0) {
    return;
  }

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
}
Module['run'] = run;

/** @param {boolean|number=} implicit */
function exit(status, implicit) {
  EXITSTATUS = status;

  // if this is just main exit-ing implicitly, and the status is 0, then we
  // don't need to do anything here and can just leave. if the status is
  // non-zero, though, then we need to report it.
  // (we may have warned about this earlier, if a situation justifies doing so)
  if (implicit && keepRuntimeAlive() && status === 0) {
    return;
  }

  if (keepRuntimeAlive()) {
  } else {

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);

    ABORT = true;
  }

  quit_(status, new ExitStatus(status));
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

run();





