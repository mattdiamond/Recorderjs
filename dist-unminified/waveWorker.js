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
eval("/* WEBPACK VAR INJECTION */(function(global) {\n  \nvar recorder;\n\nglobal['onmessage'] = function( e ){\n  switch( e['data']['command'] ){\n\n    case 'encode':\n      if (recorder) {\n        recorder.record( e['data']['buffers'] );\n      }\n      break;\n\n    case 'done':\n      if (recorder) {\n        recorder.requestData();\n        recorder = null;\n      }\n      break;\n\n    case 'close':\n      global['close']();\n      break;\n\n    case 'init':\n      recorder = new WavePCM( e['data'] );\n      global['postMessage']( {message: 'ready'} );\n      break;\n\n    default:\n      // Ignore any unknown commands and continue recieving commands\n  }\n};\n\nvar WavePCM = function( config ){\n\n  var config = Object.assign({\n    wavBitDepth: 16\n  }, config);\n\n  if ( !config['wavSampleRate'] ) {\n    throw new Error(\"wavSampleRate value is required to record. NOTE: Audio is not resampled!\");\n  }\n\n  if ( [8, 16, 24, 32].indexOf( config['wavBitDepth'] ) === -1 ) {\n    throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n  }\n\n  this.bitDepth = config['wavBitDepth'];\n  this.sampleRate = config['wavSampleRate'];\n  this.recordedBuffers = [];\n  this.bytesPerSample = this.bitDepth / 8;\n};\n\nWavePCM.prototype.record = function( buffers ){\n  this.numberOfChannels = this.numberOfChannels || buffers.length;\n  var bufferLength = buffers[0].length;\n  var reducedData = new Uint8Array( bufferLength * this.numberOfChannels * this.bytesPerSample );\n\n  // Interleave\n  for ( var i = 0; i < bufferLength; i++ ) {\n    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {\n\n      var outputIndex = ( i * this.numberOfChannels + channel ) * this.bytesPerSample;\n\n      // clip the signal if it exceeds [-1, 1]\n      var sample = Math.max(-1, Math.min(1, buffers[ channel ][ i ]));\n\n      // bit reduce and convert to integer\n      switch ( this.bytesPerSample ) {\n        case 4: // 32 bits signed\n          sample = sample * 2147483647.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          reducedData[ outputIndex + 3 ] = sample >> 24;\n          break;\n\n        case 3: // 24 bits signed\n          sample = sample * 8388607.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          break;\n\n        case 2: // 16 bits signed\n          sample = sample * 32767.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          break;\n\n        case 1: // 8 bits unsigned\n          reducedData[ outputIndex ] = (sample + 1) * 127.5;\n          break;\n\n        default:\n          throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n      }\n    }\n  }\n\n  this.recordedBuffers.push( reducedData );\n};\n\nWavePCM.prototype.requestData = function(){\n  var bufferLength = this.recordedBuffers[0].length;\n  var dataLength = this.recordedBuffers.length * bufferLength;\n  var headerLength = 44;\n  var wav = new Uint8Array( headerLength + dataLength );\n  var view = new DataView( wav.buffer );\n\n  view.setUint32( 0, 1380533830, false ); // RIFF identifier 'RIFF'\n  view.setUint32( 4, 36 + dataLength, true ); // file length minus RIFF identifier length and file description length\n  view.setUint32( 8, 1463899717, false ); // RIFF type 'WAVE'\n  view.setUint32( 12, 1718449184, false ); // format chunk identifier 'fmt '\n  view.setUint32( 16, 16, true ); // format chunk length\n  view.setUint16( 20, 1, true ); // sample format (raw)\n  view.setUint16( 22, this.numberOfChannels, true ); // channel count\n  view.setUint32( 24, this.sampleRate, true ); // sample rate\n  view.setUint32( 28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true ); // byte rate (sample rate * block align)\n  view.setUint16( 32, this.bytesPerSample * this.numberOfChannels, true ); // block align (channel count * bytes per sample)\n  view.setUint16( 34, this.bitDepth, true ); // bits per sample\n  view.setUint32( 36, 1684108385, false); // data chunk identifier 'data'\n  view.setUint32( 40, dataLength, true ); // data chunk length\n\n  for (var i = 0; i < this.recordedBuffers.length; i++ ) {\n    wav.set( this.recordedBuffers[i], i * bufferLength + headerLength );\n  }\n\n  global['postMessage']( {message: 'page', page: wav}, [wav.buffer] );\n  global['postMessage']( {message: 'done'} );\n};\n\nmodule.exports = WavePCM\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvd2F2ZVdvcmtlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1dhdmVXb3JrZXIvLi9zcmMvd2F2ZVdvcmtlci5qcz8wNzUxIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuICBcbnZhciByZWNvcmRlcjtcblxuZ2xvYmFsWydvbm1lc3NhZ2UnXSA9IGZ1bmN0aW9uKCBlICl7XG4gIHN3aXRjaCggZVsnZGF0YSddWydjb21tYW5kJ10gKXtcblxuICAgIGNhc2UgJ2VuY29kZSc6XG4gICAgICBpZiAocmVjb3JkZXIpIHtcbiAgICAgICAgcmVjb3JkZXIucmVjb3JkKCBlWydkYXRhJ11bJ2J1ZmZlcnMnXSApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdkb25lJzpcbiAgICAgIGlmIChyZWNvcmRlcikge1xuICAgICAgICByZWNvcmRlci5yZXF1ZXN0RGF0YSgpO1xuICAgICAgICByZWNvcmRlciA9IG51bGw7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgIGdsb2JhbFsnY2xvc2UnXSgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdpbml0JzpcbiAgICAgIHJlY29yZGVyID0gbmV3IFdhdmVQQ00oIGVbJ2RhdGEnXSApO1xuICAgICAgZ2xvYmFsWydwb3N0TWVzc2FnZSddKCB7bWVzc2FnZTogJ3JlYWR5J30gKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIElnbm9yZSBhbnkgdW5rbm93biBjb21tYW5kcyBhbmQgY29udGludWUgcmVjaWV2aW5nIGNvbW1hbmRzXG4gIH1cbn07XG5cbnZhciBXYXZlUENNID0gZnVuY3Rpb24oIGNvbmZpZyApe1xuXG4gIHZhciBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICB3YXZCaXREZXB0aDogMTZcbiAgfSwgY29uZmlnKTtcblxuICBpZiAoICFjb25maWdbJ3dhdlNhbXBsZVJhdGUnXSApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ3YXZTYW1wbGVSYXRlIHZhbHVlIGlzIHJlcXVpcmVkIHRvIHJlY29yZC4gTk9URTogQXVkaW8gaXMgbm90IHJlc2FtcGxlZCFcIik7XG4gIH1cblxuICBpZiAoIFs4LCAxNiwgMjQsIDMyXS5pbmRleE9mKCBjb25maWdbJ3dhdkJpdERlcHRoJ10gKSA9PT0gLTEgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSA4LCAxNiwgMjQgYW5kIDMyIGJpdHMgcGVyIHNhbXBsZSBhcmUgc3VwcG9ydGVkXCIpO1xuICB9XG5cbiAgdGhpcy5iaXREZXB0aCA9IGNvbmZpZ1snd2F2Qml0RGVwdGgnXTtcbiAgdGhpcy5zYW1wbGVSYXRlID0gY29uZmlnWyd3YXZTYW1wbGVSYXRlJ107XG4gIHRoaXMucmVjb3JkZWRCdWZmZXJzID0gW107XG4gIHRoaXMuYnl0ZXNQZXJTYW1wbGUgPSB0aGlzLmJpdERlcHRoIC8gODtcbn07XG5cbldhdmVQQ00ucHJvdG90eXBlLnJlY29yZCA9IGZ1bmN0aW9uKCBidWZmZXJzICl7XG4gIHRoaXMubnVtYmVyT2ZDaGFubmVscyA9IHRoaXMubnVtYmVyT2ZDaGFubmVscyB8fCBidWZmZXJzLmxlbmd0aDtcbiAgdmFyIGJ1ZmZlckxlbmd0aCA9IGJ1ZmZlcnNbMF0ubGVuZ3RoO1xuICB2YXIgcmVkdWNlZERhdGEgPSBuZXcgVWludDhBcnJheSggYnVmZmVyTGVuZ3RoICogdGhpcy5udW1iZXJPZkNoYW5uZWxzICogdGhpcy5ieXRlc1BlclNhbXBsZSApO1xuXG4gIC8vIEludGVybGVhdmVcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgYnVmZmVyTGVuZ3RoOyBpKysgKSB7XG4gICAgZm9yICggdmFyIGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgdGhpcy5udW1iZXJPZkNoYW5uZWxzOyBjaGFubmVsKysgKSB7XG5cbiAgICAgIHZhciBvdXRwdXRJbmRleCA9ICggaSAqIHRoaXMubnVtYmVyT2ZDaGFubmVscyArIGNoYW5uZWwgKSAqIHRoaXMuYnl0ZXNQZXJTYW1wbGU7XG5cbiAgICAgIC8vIGNsaXAgdGhlIHNpZ25hbCBpZiBpdCBleGNlZWRzIFstMSwgMV1cbiAgICAgIHZhciBzYW1wbGUgPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgYnVmZmVyc1sgY2hhbm5lbCBdWyBpIF0pKTtcblxuICAgICAgLy8gYml0IHJlZHVjZSBhbmQgY29udmVydCB0byBpbnRlZ2VyXG4gICAgICBzd2l0Y2ggKCB0aGlzLmJ5dGVzUGVyU2FtcGxlICkge1xuICAgICAgICBjYXNlIDQ6IC8vIDMyIGJpdHMgc2lnbmVkXG4gICAgICAgICAgc2FtcGxlID0gc2FtcGxlICogMjE0NzQ4MzY0Ny41IC0gMC41O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCBdID0gc2FtcGxlO1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDEgXSA9IHNhbXBsZSA+PiA4O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDIgXSA9IHNhbXBsZSA+PiAxNjtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAzIF0gPSBzYW1wbGUgPj4gMjQ7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyAyNCBiaXRzIHNpZ25lZFxuICAgICAgICAgIHNhbXBsZSA9IHNhbXBsZSAqIDgzODg2MDcuNSAtIDAuNTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggXSA9IHNhbXBsZTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAxIF0gPSBzYW1wbGUgPj4gODtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAyIF0gPSBzYW1wbGUgPj4gMTY7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOiAvLyAxNiBiaXRzIHNpZ25lZFxuICAgICAgICAgIHNhbXBsZSA9IHNhbXBsZSAqIDMyNzY3LjUgLSAwLjU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4IF0gPSBzYW1wbGU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMSBdID0gc2FtcGxlID4+IDg7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAxOiAvLyA4IGJpdHMgdW5zaWduZWRcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggXSA9IChzYW1wbGUgKyAxKSAqIDEyNy41O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSA4LCAxNiwgMjQgYW5kIDMyIGJpdHMgcGVyIHNhbXBsZSBhcmUgc3VwcG9ydGVkXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMucmVjb3JkZWRCdWZmZXJzLnB1c2goIHJlZHVjZWREYXRhICk7XG59O1xuXG5XYXZlUENNLnByb3RvdHlwZS5yZXF1ZXN0RGF0YSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBidWZmZXJMZW5ndGggPSB0aGlzLnJlY29yZGVkQnVmZmVyc1swXS5sZW5ndGg7XG4gIHZhciBkYXRhTGVuZ3RoID0gdGhpcy5yZWNvcmRlZEJ1ZmZlcnMubGVuZ3RoICogYnVmZmVyTGVuZ3RoO1xuICB2YXIgaGVhZGVyTGVuZ3RoID0gNDQ7XG4gIHZhciB3YXYgPSBuZXcgVWludDhBcnJheSggaGVhZGVyTGVuZ3RoICsgZGF0YUxlbmd0aCApO1xuICB2YXIgdmlldyA9IG5ldyBEYXRhVmlldyggd2F2LmJ1ZmZlciApO1xuXG4gIHZpZXcuc2V0VWludDMyKCAwLCAxMzgwNTMzODMwLCBmYWxzZSApOyAvLyBSSUZGIGlkZW50aWZpZXIgJ1JJRkYnXG4gIHZpZXcuc2V0VWludDMyKCA0LCAzNiArIGRhdGFMZW5ndGgsIHRydWUgKTsgLy8gZmlsZSBsZW5ndGggbWludXMgUklGRiBpZGVudGlmaWVyIGxlbmd0aCBhbmQgZmlsZSBkZXNjcmlwdGlvbiBsZW5ndGhcbiAgdmlldy5zZXRVaW50MzIoIDgsIDE0NjM4OTk3MTcsIGZhbHNlICk7IC8vIFJJRkYgdHlwZSAnV0FWRSdcbiAgdmlldy5zZXRVaW50MzIoIDEyLCAxNzE4NDQ5MTg0LCBmYWxzZSApOyAvLyBmb3JtYXQgY2h1bmsgaWRlbnRpZmllciAnZm10ICdcbiAgdmlldy5zZXRVaW50MzIoIDE2LCAxNiwgdHJ1ZSApOyAvLyBmb3JtYXQgY2h1bmsgbGVuZ3RoXG4gIHZpZXcuc2V0VWludDE2KCAyMCwgMSwgdHJ1ZSApOyAvLyBzYW1wbGUgZm9ybWF0IChyYXcpXG4gIHZpZXcuc2V0VWludDE2KCAyMiwgdGhpcy5udW1iZXJPZkNoYW5uZWxzLCB0cnVlICk7IC8vIGNoYW5uZWwgY291bnRcbiAgdmlldy5zZXRVaW50MzIoIDI0LCB0aGlzLnNhbXBsZVJhdGUsIHRydWUgKTsgLy8gc2FtcGxlIHJhdGVcbiAgdmlldy5zZXRVaW50MzIoIDI4LCB0aGlzLnNhbXBsZVJhdGUgKiB0aGlzLmJ5dGVzUGVyU2FtcGxlICogdGhpcy5udW1iZXJPZkNoYW5uZWxzLCB0cnVlICk7IC8vIGJ5dGUgcmF0ZSAoc2FtcGxlIHJhdGUgKiBibG9jayBhbGlnbilcbiAgdmlldy5zZXRVaW50MTYoIDMyLCB0aGlzLmJ5dGVzUGVyU2FtcGxlICogdGhpcy5udW1iZXJPZkNoYW5uZWxzLCB0cnVlICk7IC8vIGJsb2NrIGFsaWduIChjaGFubmVsIGNvdW50ICogYnl0ZXMgcGVyIHNhbXBsZSlcbiAgdmlldy5zZXRVaW50MTYoIDM0LCB0aGlzLmJpdERlcHRoLCB0cnVlICk7IC8vIGJpdHMgcGVyIHNhbXBsZVxuICB2aWV3LnNldFVpbnQzMiggMzYsIDE2ODQxMDgzODUsIGZhbHNlKTsgLy8gZGF0YSBjaHVuayBpZGVudGlmaWVyICdkYXRhJ1xuICB2aWV3LnNldFVpbnQzMiggNDAsIGRhdGFMZW5ndGgsIHRydWUgKTsgLy8gZGF0YSBjaHVuayBsZW5ndGhcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVjb3JkZWRCdWZmZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIHdhdi5zZXQoIHRoaXMucmVjb3JkZWRCdWZmZXJzW2ldLCBpICogYnVmZmVyTGVuZ3RoICsgaGVhZGVyTGVuZ3RoICk7XG4gIH1cblxuICBnbG9iYWxbJ3Bvc3RNZXNzYWdlJ10oIHttZXNzYWdlOiAncGFnZScsIHBhZ2U6IHdhdn0sIFt3YXYuYnVmZmVyXSApO1xuICBnbG9iYWxbJ3Bvc3RNZXNzYWdlJ10oIHttZXNzYWdlOiAnZG9uZSd9ICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdhdmVQQ01cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/waveWorker.js\n");

/***/ })

/******/ });
});