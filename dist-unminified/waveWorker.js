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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1dhdmVXb3JrZXIvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzP2NkMDAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsIGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaCAoZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/webpack/buildin/global.js\n");

/***/ }),

/***/ "./src/waveWorker.js":
/*!***************************!*\
  !*** ./src/waveWorker.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n  \nvar recorder;\n\nglobal['onmessage'] = function( e ){\n  switch( e['data']['command'] ){\n\n    case 'encode':\n      if (recorder) {\n        recorder.record( e['data']['buffers'] );\n      }\n      break;\n\n    case 'done':\n      if (recorder) {\n        recorder.requestData();\n      }\n      break;\n\n    case 'init':\n      recorder = new WavePCM( e['data'] );\n      break;\n\n    default:\n      // Ignore any unknown commands and continue recieving commands\n  }\n};\n\nvar WavePCM = function( config ){\n\n  var config = Object.assign({\n    wavBitDepth: 16\n  }, config);\n\n  if ( !config['wavSampleRate'] ) {\n    throw new Error(\"wavSampleRate value is required to record. NOTE: Audio is not resampled!\");\n  }\n\n  if ( [8, 16, 24, 32].indexOf( config['wavBitDepth'] ) === -1 ) {\n    throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n  }\n\n  this.bitDepth = config['wavBitDepth'];\n  this.sampleRate = config['wavSampleRate'];\n  this.recordedBuffers = [];\n  this.bytesPerSample = this.bitDepth / 8;\n};\n\nWavePCM.prototype.record = function( buffers ){\n  this.numberOfChannels = this.numberOfChannels || buffers.length;\n  var bufferLength = buffers[0].length;\n  var reducedData = new Uint8Array( bufferLength * this.numberOfChannels * this.bytesPerSample );\n\n  // Interleave\n  for ( var i = 0; i < bufferLength; i++ ) {\n    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {\n\n      var outputIndex = ( i * this.numberOfChannels + channel ) * this.bytesPerSample;\n\n      // clip the signal if it exceeds [-1, 1]\n      var sample = Math.max(-1, Math.min(1, buffers[ channel ][ i ]));\n\n      // bit reduce and convert to integer\n      switch ( this.bytesPerSample ) {\n        case 4: // 32 bits signed\n          sample = sample * 2147483647.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          reducedData[ outputIndex + 3 ] = sample >> 24;\n          break;\n\n        case 3: // 24 bits signed\n          sample = sample * 8388607.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          reducedData[ outputIndex + 2 ] = sample >> 16;\n          break;\n\n        case 2: // 16 bits signed\n          sample = sample * 32767.5 - 0.5;\n          reducedData[ outputIndex ] = sample;\n          reducedData[ outputIndex + 1 ] = sample >> 8;\n          break;\n\n        case 1: // 8 bits unsigned\n          reducedData[ outputIndex ] = (sample + 1) * 127.5;\n          break;\n\n        default:\n          throw new Error(\"Only 8, 16, 24 and 32 bits per sample are supported\");\n      }\n    }\n  }\n\n  this.recordedBuffers.push( reducedData );\n};\n\nWavePCM.prototype.requestData = function(){\n  var bufferLength = this.recordedBuffers[0].length;\n  var dataLength = this.recordedBuffers.length * bufferLength;\n  var headerLength = 44;\n  var wav = new Uint8Array( headerLength + dataLength );\n  var view = new DataView( wav.buffer );\n\n  view.setUint32( 0, 1380533830, false ); // RIFF identifier 'RIFF'\n  view.setUint32( 4, 36 + dataLength, true ); // file length minus RIFF identifier length and file description length\n  view.setUint32( 8, 1463899717, false ); // RIFF type 'WAVE'\n  view.setUint32( 12, 1718449184, false ); // format chunk identifier 'fmt '\n  view.setUint32( 16, 16, true ); // format chunk length\n  view.setUint16( 20, 1, true ); // sample format (raw)\n  view.setUint16( 22, this.numberOfChannels, true ); // channel count\n  view.setUint32( 24, this.sampleRate, true ); // sample rate\n  view.setUint32( 28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true ); // byte rate (sample rate * block align)\n  view.setUint16( 32, this.bytesPerSample * this.numberOfChannels, true ); // block align (channel count * bytes per sample)\n  view.setUint16( 34, this.bitDepth, true ); // bits per sample\n  view.setUint32( 36, 1684108385, false); // data chunk identifier 'data'\n  view.setUint32( 40, dataLength, true ); // data chunk length\n\n  for (var i = 0; i < this.recordedBuffers.length; i++ ) {\n    wav.set( this.recordedBuffers[i], i * bufferLength + headerLength );\n  }\n\n  global['postMessage']( wav, [wav.buffer] );\n  global['postMessage'](null);\n  global['close']();\n};\n\n\nmodule.exports = WavePCM\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvd2F2ZVdvcmtlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1dhdmVXb3JrZXIvLi9zcmMvd2F2ZVdvcmtlci5qcz8wNzUxIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuICBcbnZhciByZWNvcmRlcjtcblxuZ2xvYmFsWydvbm1lc3NhZ2UnXSA9IGZ1bmN0aW9uKCBlICl7XG4gIHN3aXRjaCggZVsnZGF0YSddWydjb21tYW5kJ10gKXtcblxuICAgIGNhc2UgJ2VuY29kZSc6XG4gICAgICBpZiAocmVjb3JkZXIpIHtcbiAgICAgICAgcmVjb3JkZXIucmVjb3JkKCBlWydkYXRhJ11bJ2J1ZmZlcnMnXSApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdkb25lJzpcbiAgICAgIGlmIChyZWNvcmRlcikge1xuICAgICAgICByZWNvcmRlci5yZXF1ZXN0RGF0YSgpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdpbml0JzpcbiAgICAgIHJlY29yZGVyID0gbmV3IFdhdmVQQ00oIGVbJ2RhdGEnXSApO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgLy8gSWdub3JlIGFueSB1bmtub3duIGNvbW1hbmRzIGFuZCBjb250aW51ZSByZWNpZXZpbmcgY29tbWFuZHNcbiAgfVxufTtcblxudmFyIFdhdmVQQ00gPSBmdW5jdGlvbiggY29uZmlnICl7XG5cbiAgdmFyIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHdhdkJpdERlcHRoOiAxNlxuICB9LCBjb25maWcpO1xuXG4gIGlmICggIWNvbmZpZ1snd2F2U2FtcGxlUmF0ZSddICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIndhdlNhbXBsZVJhdGUgdmFsdWUgaXMgcmVxdWlyZWQgdG8gcmVjb3JkLiBOT1RFOiBBdWRpbyBpcyBub3QgcmVzYW1wbGVkIVwiKTtcbiAgfVxuXG4gIGlmICggWzgsIDE2LCAyNCwgMzJdLmluZGV4T2YoIGNvbmZpZ1snd2F2Qml0RGVwdGgnXSApID09PSAtMSApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IDgsIDE2LCAyNCBhbmQgMzIgYml0cyBwZXIgc2FtcGxlIGFyZSBzdXBwb3J0ZWRcIik7XG4gIH1cblxuICB0aGlzLmJpdERlcHRoID0gY29uZmlnWyd3YXZCaXREZXB0aCddO1xuICB0aGlzLnNhbXBsZVJhdGUgPSBjb25maWdbJ3dhdlNhbXBsZVJhdGUnXTtcbiAgdGhpcy5yZWNvcmRlZEJ1ZmZlcnMgPSBbXTtcbiAgdGhpcy5ieXRlc1BlclNhbXBsZSA9IHRoaXMuYml0RGVwdGggLyA4O1xufTtcblxuV2F2ZVBDTS5wcm90b3R5cGUucmVjb3JkID0gZnVuY3Rpb24oIGJ1ZmZlcnMgKXtcbiAgdGhpcy5udW1iZXJPZkNoYW5uZWxzID0gdGhpcy5udW1iZXJPZkNoYW5uZWxzIHx8IGJ1ZmZlcnMubGVuZ3RoO1xuICB2YXIgYnVmZmVyTGVuZ3RoID0gYnVmZmVyc1swXS5sZW5ndGg7XG4gIHZhciByZWR1Y2VkRGF0YSA9IG5ldyBVaW50OEFycmF5KCBidWZmZXJMZW5ndGggKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMgKiB0aGlzLmJ5dGVzUGVyU2FtcGxlICk7XG5cbiAgLy8gSW50ZXJsZWF2ZVxuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBidWZmZXJMZW5ndGg7IGkrKyApIHtcbiAgICBmb3IgKCB2YXIgY2hhbm5lbCA9IDA7IGNoYW5uZWwgPCB0aGlzLm51bWJlck9mQ2hhbm5lbHM7IGNoYW5uZWwrKyApIHtcblxuICAgICAgdmFyIG91dHB1dEluZGV4ID0gKCBpICogdGhpcy5udW1iZXJPZkNoYW5uZWxzICsgY2hhbm5lbCApICogdGhpcy5ieXRlc1BlclNhbXBsZTtcblxuICAgICAgLy8gY2xpcCB0aGUgc2lnbmFsIGlmIGl0IGV4Y2VlZHMgWy0xLCAxXVxuICAgICAgdmFyIHNhbXBsZSA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBidWZmZXJzWyBjaGFubmVsIF1bIGkgXSkpO1xuXG4gICAgICAvLyBiaXQgcmVkdWNlIGFuZCBjb252ZXJ0IHRvIGludGVnZXJcbiAgICAgIHN3aXRjaCAoIHRoaXMuYnl0ZXNQZXJTYW1wbGUgKSB7XG4gICAgICAgIGNhc2UgNDogLy8gMzIgYml0cyBzaWduZWRcbiAgICAgICAgICBzYW1wbGUgPSBzYW1wbGUgKiAyMTQ3NDgzNjQ3LjUgLSAwLjU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4IF0gPSBzYW1wbGU7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMSBdID0gc2FtcGxlID4+IDg7XG4gICAgICAgICAgcmVkdWNlZERhdGFbIG91dHB1dEluZGV4ICsgMiBdID0gc2FtcGxlID4+IDE2O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDMgXSA9IHNhbXBsZSA+PiAyNDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6IC8vIDI0IGJpdHMgc2lnbmVkXG4gICAgICAgICAgc2FtcGxlID0gc2FtcGxlICogODM4ODYwNy41IC0gMC41O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCBdID0gc2FtcGxlO1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDEgXSA9IHNhbXBsZSA+PiA4O1xuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCArIDIgXSA9IHNhbXBsZSA+PiAxNjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6IC8vIDE2IGJpdHMgc2lnbmVkXG4gICAgICAgICAgc2FtcGxlID0gc2FtcGxlICogMzI3NjcuNSAtIDAuNTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggXSA9IHNhbXBsZTtcbiAgICAgICAgICByZWR1Y2VkRGF0YVsgb3V0cHV0SW5kZXggKyAxIF0gPSBzYW1wbGUgPj4gODtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDE6IC8vIDggYml0cyB1bnNpZ25lZFxuICAgICAgICAgIHJlZHVjZWREYXRhWyBvdXRwdXRJbmRleCBdID0gKHNhbXBsZSArIDEpICogMTI3LjU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IDgsIDE2LCAyNCBhbmQgMzIgYml0cyBwZXIgc2FtcGxlIGFyZSBzdXBwb3J0ZWRcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5yZWNvcmRlZEJ1ZmZlcnMucHVzaCggcmVkdWNlZERhdGEgKTtcbn07XG5cbldhdmVQQ00ucHJvdG90eXBlLnJlcXVlc3REYXRhID0gZnVuY3Rpb24oKXtcbiAgdmFyIGJ1ZmZlckxlbmd0aCA9IHRoaXMucmVjb3JkZWRCdWZmZXJzWzBdLmxlbmd0aDtcbiAgdmFyIGRhdGFMZW5ndGggPSB0aGlzLnJlY29yZGVkQnVmZmVycy5sZW5ndGggKiBidWZmZXJMZW5ndGg7XG4gIHZhciBoZWFkZXJMZW5ndGggPSA0NDtcbiAgdmFyIHdhdiA9IG5ldyBVaW50OEFycmF5KCBoZWFkZXJMZW5ndGggKyBkYXRhTGVuZ3RoICk7XG4gIHZhciB2aWV3ID0gbmV3IERhdGFWaWV3KCB3YXYuYnVmZmVyICk7XG5cbiAgdmlldy5zZXRVaW50MzIoIDAsIDEzODA1MzM4MzAsIGZhbHNlICk7IC8vIFJJRkYgaWRlbnRpZmllciAnUklGRidcbiAgdmlldy5zZXRVaW50MzIoIDQsIDM2ICsgZGF0YUxlbmd0aCwgdHJ1ZSApOyAvLyBmaWxlIGxlbmd0aCBtaW51cyBSSUZGIGlkZW50aWZpZXIgbGVuZ3RoIGFuZCBmaWxlIGRlc2NyaXB0aW9uIGxlbmd0aFxuICB2aWV3LnNldFVpbnQzMiggOCwgMTQ2Mzg5OTcxNywgZmFsc2UgKTsgLy8gUklGRiB0eXBlICdXQVZFJ1xuICB2aWV3LnNldFVpbnQzMiggMTIsIDE3MTg0NDkxODQsIGZhbHNlICk7IC8vIGZvcm1hdCBjaHVuayBpZGVudGlmaWVyICdmbXQgJ1xuICB2aWV3LnNldFVpbnQzMiggMTYsIDE2LCB0cnVlICk7IC8vIGZvcm1hdCBjaHVuayBsZW5ndGhcbiAgdmlldy5zZXRVaW50MTYoIDIwLCAxLCB0cnVlICk7IC8vIHNhbXBsZSBmb3JtYXQgKHJhdylcbiAgdmlldy5zZXRVaW50MTYoIDIyLCB0aGlzLm51bWJlck9mQ2hhbm5lbHMsIHRydWUgKTsgLy8gY2hhbm5lbCBjb3VudFxuICB2aWV3LnNldFVpbnQzMiggMjQsIHRoaXMuc2FtcGxlUmF0ZSwgdHJ1ZSApOyAvLyBzYW1wbGUgcmF0ZVxuICB2aWV3LnNldFVpbnQzMiggMjgsIHRoaXMuc2FtcGxlUmF0ZSAqIHRoaXMuYnl0ZXNQZXJTYW1wbGUgKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMsIHRydWUgKTsgLy8gYnl0ZSByYXRlIChzYW1wbGUgcmF0ZSAqIGJsb2NrIGFsaWduKVxuICB2aWV3LnNldFVpbnQxNiggMzIsIHRoaXMuYnl0ZXNQZXJTYW1wbGUgKiB0aGlzLm51bWJlck9mQ2hhbm5lbHMsIHRydWUgKTsgLy8gYmxvY2sgYWxpZ24gKGNoYW5uZWwgY291bnQgKiBieXRlcyBwZXIgc2FtcGxlKVxuICB2aWV3LnNldFVpbnQxNiggMzQsIHRoaXMuYml0RGVwdGgsIHRydWUgKTsgLy8gYml0cyBwZXIgc2FtcGxlXG4gIHZpZXcuc2V0VWludDMyKCAzNiwgMTY4NDEwODM4NSwgZmFsc2UpOyAvLyBkYXRhIGNodW5rIGlkZW50aWZpZXIgJ2RhdGEnXG4gIHZpZXcuc2V0VWludDMyKCA0MCwgZGF0YUxlbmd0aCwgdHJ1ZSApOyAvLyBkYXRhIGNodW5rIGxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yZWNvcmRlZEJ1ZmZlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgd2F2LnNldCggdGhpcy5yZWNvcmRlZEJ1ZmZlcnNbaV0sIGkgKiBidWZmZXJMZW5ndGggKyBoZWFkZXJMZW5ndGggKTtcbiAgfVxuXG4gIGdsb2JhbFsncG9zdE1lc3NhZ2UnXSggd2F2LCBbd2F2LmJ1ZmZlcl0gKTtcbiAgZ2xvYmFsWydwb3N0TWVzc2FnZSddKG51bGwpO1xuICBnbG9iYWxbJ2Nsb3NlJ10oKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBXYXZlUENNXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/waveWorker.js\n");

/***/ })

/******/ });
});