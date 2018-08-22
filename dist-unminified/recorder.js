(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Recorder"] = factory();
	else
		root["Recorder"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/recorder.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1JlY29yZGVyLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcz9jZDAwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/webpack/buildin/global.js\n");

/***/ }),

/***/ "./src/recorder.js":
/*!*************************!*\
  !*** ./src/recorder.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n\nvar AudioContext = global.AudioContext || global.webkitAudioContext;\n\n\n// Constructor\nvar Recorder = function( config ){\n\n  if ( !Recorder.isRecordingSupported() ) {\n    throw new Error(\"Recording is not supported in this browser\");\n  }\n\n  this.state = \"inactive\";\n  this.config = Object.assign({\n    bufferLength: 4096,\n    encoderApplication: 2049,\n    encoderFrameSize: 20,\n    encoderPath: 'encoderWorker.min.js',\n    encoderSampleRate: 48000,\n    maxBuffersPerPage: 40,\n    mediaTrackConstraints: true,\n    monitorGain: 0,\n    numberOfChannels: 1,\n    recordingGain: 1,\n    resampleQuality: 3,\n    streamPages: false,\n    wavBitDepth: 16,\n  }, config );\n};\n\n\n// Static Methods\nRecorder.isRecordingSupported = function(){\n  return AudioContext && global.navigator && global.navigator.mediaDevices && global.navigator.mediaDevices.getUserMedia && global.WebAssembly;\n};\n\n\n// Instance Methods\nRecorder.prototype.clearStream = function(){\n  if ( this.stream ){\n\n    if ( this.stream.getTracks ) {\n      this.stream.getTracks().forEach( function( track ){\n        track.stop();\n      });\n    }\n\n    else {\n      this.stream.stop();\n    }\n\n    delete this.stream;\n  }\n\n  if ( this.audioContext && this.closeAudioContext ){\n    this.audioContext.close();\n    delete this.audioContext;\n  }\n};\n\nRecorder.prototype.encodeBuffers = function( inputBuffer ){\n  if ( this.state === \"recording\" ) {\n    var buffers = [];\n    for ( var i = 0; i < inputBuffer.numberOfChannels; i++ ) {\n      buffers[i] = inputBuffer.getChannelData(i);\n    }\n\n    this.encoder.postMessage({\n      command: \"encode\",\n      buffers: buffers\n    });\n  }\n};\n\nRecorder.prototype.initAudioContext = function( sourceNode ){\n  if (sourceNode && sourceNode.context) {\n    this.audioContext = sourceNode.context;\n    this.closeAudioContext = false;\n  }\n\n  else {\n    this.audioContext = new AudioContext();\n    this.closeAudioContext = true;\n  }\n\n  return this.audioContext;\n};\n\nRecorder.prototype.initAudioGraph = function(){\n  var self = this;\n\n  // First buffer can contain old data. Don't encode it.\n  this.encodeBuffers = function(){\n    delete this.encodeBuffers;\n  };\n\n  this.scriptProcessorNode = this.audioContext.createScriptProcessor( this.config.bufferLength, this.config.numberOfChannels, this.config.numberOfChannels );\n  this.scriptProcessorNode.connect( this.audioContext.destination );\n  this.scriptProcessorNode.onaudioprocess = function( e ) {\n    self.encodeBuffers( e.inputBuffer );\n  };\n\n  this.monitorGainNode = this.audioContext.createGain();\n  this.setMonitorGain( this.config.monitorGain );\n  this.monitorGainNode.connect( this.audioContext.destination );\n\n  this.recordingGainNode = this.audioContext.createGain();\n  this.setRecordingGain( this.config.recordingGain );\n  this.recordingGainNode.connect( this.scriptProcessorNode );\n};\n\nRecorder.prototype.initSourceNode = function( sourceNode ){\n  var self = this;\n\n  if ( sourceNode && sourceNode.context ) {\n    return global.Promise.resolve( sourceNode );\n  }\n\n  return global.navigator.mediaDevices.getUserMedia({ audio : this.config.mediaTrackConstraints }).then( function( stream ){\n    self.stream = stream;\n    return self.audioContext.createMediaStreamSource( stream );\n  });\n};\n\nRecorder.prototype.initWorker = function(){\n  var self = this;\n  var streamPage = function( e ) { self.streamPage( e.data ); };\n  var storePage = function( e ) { self.storePage( e.data ); };\n\n  this.recordedPages = [];\n  this.totalLength = 0;\n  this.encoder = new global.Worker( this.config.encoderPath );\n  this.encoder.addEventListener( \"message\", this.config.streamPages ? streamPage : storePage );\n};\n\nRecorder.prototype.pause = function(){\n  if ( this.state === \"recording\" ){\n    this.state = \"paused\";\n    this.onpause();\n  }\n};\n\nRecorder.prototype.resume = function() {\n  if ( this.state === \"paused\" ) {\n    this.state = \"recording\";\n    this.onresume();\n  }\n};\n\nRecorder.prototype.setRecordingGain = function( gain ){\n  this.config.recordingGain = gain;\n\n  if ( this.recordingGainNode && this.audioContext ) {\n    this.recordingGainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);\n  }\n};\n\nRecorder.prototype.setMonitorGain = function( gain ){\n  this.config.monitorGain = gain;\n\n  if ( this.monitorGainNode && this.audioContext ) {\n    this.monitorGainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);\n  }\n};\n\nRecorder.prototype.start = function( sourceNode ){\n  if ( this.state === \"inactive\" ) {\n    var self = this;\n    this.initWorker();\n    this.initAudioContext( sourceNode );\n    this.initAudioGraph();\n\n    return this.initSourceNode( sourceNode ).then( function( sourceNode ){\n      self.state = \"recording\";\n      self.encoder.postMessage( Object.assign({\n        command: 'init',\n        originalSampleRate: self.audioContext.sampleRate,\n        wavSampleRate: self.audioContext.sampleRate\n      }, self.config));\n      self.sourceNode = sourceNode;\n      self.sourceNode.connect( self.monitorGainNode );\n      self.sourceNode.connect( self.recordingGainNode );\n      self.onstart();\n    });\n  }\n};\n\nRecorder.prototype.stop = function(){\n  if ( this.state !== \"inactive\" ) {\n    this.state = \"inactive\";\n    this.monitorGainNode.disconnect();\n    this.scriptProcessorNode.disconnect();\n    this.recordingGainNode.disconnect();\n    this.sourceNode.disconnect();\n    this.clearStream();\n    this.encoder.postMessage({ command: \"done\" });\n  }\n};\n\nRecorder.prototype.storePage = function( page ) {\n  if ( page === null ) {\n    var outputData = new Uint8Array( this.totalLength );\n    this.recordedPages.reduce( function( offset, page ){\n      outputData.set( page, offset );\n      return offset + page.length;\n    }, 0);\n\n    this.ondataavailable( outputData );\n    this.onstop();\n  }\n\n  else {\n    this.recordedPages.push( page );\n    this.totalLength += page.length;\n  }\n};\n\nRecorder.prototype.streamPage = function( page ) {\n  if ( page === null ) {\n    this.onstop();\n  }\n\n  else {\n    this.ondataavailable( page );\n  }\n};\n\n\n// Callback Handlers\nRecorder.prototype.ondataavailable = function(){};\nRecorder.prototype.onpause = function(){};\nRecorder.prototype.onresume = function(){};\nRecorder.prototype.onstart = function(){};\nRecorder.prototype.onstop = function(){};\n\n\nmodule.exports = Recorder;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVjb3JkZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9SZWNvcmRlci8uL3NyYy9yZWNvcmRlci5qcz8wNTZmIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgQXVkaW9Db250ZXh0ID0gZ2xvYmFsLkF1ZGlvQ29udGV4dCB8fCBnbG9iYWwud2Via2l0QXVkaW9Db250ZXh0O1xuXG5cbi8vIENvbnN0cnVjdG9yXG52YXIgUmVjb3JkZXIgPSBmdW5jdGlvbiggY29uZmlnICl7XG5cbiAgaWYgKCAhUmVjb3JkZXIuaXNSZWNvcmRpbmdTdXBwb3J0ZWQoKSApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWNvcmRpbmcgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG4gIH1cblxuICB0aGlzLnN0YXRlID0gXCJpbmFjdGl2ZVwiO1xuICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGJ1ZmZlckxlbmd0aDogNDA5NixcbiAgICBlbmNvZGVyQXBwbGljYXRpb246IDIwNDksXG4gICAgZW5jb2RlckZyYW1lU2l6ZTogMjAsXG4gICAgZW5jb2RlclBhdGg6ICdlbmNvZGVyV29ya2VyLm1pbi5qcycsXG4gICAgZW5jb2RlclNhbXBsZVJhdGU6IDQ4MDAwLFxuICAgIG1heEJ1ZmZlcnNQZXJQYWdlOiA0MCxcbiAgICBtZWRpYVRyYWNrQ29uc3RyYWludHM6IHRydWUsXG4gICAgbW9uaXRvckdhaW46IDAsXG4gICAgbnVtYmVyT2ZDaGFubmVsczogMSxcbiAgICByZWNvcmRpbmdHYWluOiAxLFxuICAgIHJlc2FtcGxlUXVhbGl0eTogMyxcbiAgICBzdHJlYW1QYWdlczogZmFsc2UsXG4gICAgd2F2Qml0RGVwdGg6IDE2LFxuICB9LCBjb25maWcgKTtcbn07XG5cblxuLy8gU3RhdGljIE1ldGhvZHNcblJlY29yZGVyLmlzUmVjb3JkaW5nU3VwcG9ydGVkID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIEF1ZGlvQ29udGV4dCAmJiBnbG9iYWwubmF2aWdhdG9yICYmIGdsb2JhbC5uYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmIGdsb2JhbC5uYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSAmJiBnbG9iYWwuV2ViQXNzZW1ibHk7XG59O1xuXG5cbi8vIEluc3RhbmNlIE1ldGhvZHNcblJlY29yZGVyLnByb3RvdHlwZS5jbGVhclN0cmVhbSA9IGZ1bmN0aW9uKCl7XG4gIGlmICggdGhpcy5zdHJlYW0gKXtcblxuICAgIGlmICggdGhpcy5zdHJlYW0uZ2V0VHJhY2tzICkge1xuICAgICAgdGhpcy5zdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCggZnVuY3Rpb24oIHRyYWNrICl7XG4gICAgICAgIHRyYWNrLnN0b3AoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zdHJlYW0uc3RvcCgpO1xuICAgIH1cblxuICAgIGRlbGV0ZSB0aGlzLnN0cmVhbTtcbiAgfVxuXG4gIGlmICggdGhpcy5hdWRpb0NvbnRleHQgJiYgdGhpcy5jbG9zZUF1ZGlvQ29udGV4dCApe1xuICAgIHRoaXMuYXVkaW9Db250ZXh0LmNsb3NlKCk7XG4gICAgZGVsZXRlIHRoaXMuYXVkaW9Db250ZXh0O1xuICB9XG59O1xuXG5SZWNvcmRlci5wcm90b3R5cGUuZW5jb2RlQnVmZmVycyA9IGZ1bmN0aW9uKCBpbnB1dEJ1ZmZlciApe1xuICBpZiAoIHRoaXMuc3RhdGUgPT09IFwicmVjb3JkaW5nXCIgKSB7XG4gICAgdmFyIGJ1ZmZlcnMgPSBbXTtcbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBpbnB1dEJ1ZmZlci5udW1iZXJPZkNoYW5uZWxzOyBpKysgKSB7XG4gICAgICBidWZmZXJzW2ldID0gaW5wdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoaSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbmNvZGVyLnBvc3RNZXNzYWdlKHtcbiAgICAgIGNvbW1hbmQ6IFwiZW5jb2RlXCIsXG4gICAgICBidWZmZXJzOiBidWZmZXJzXG4gICAgfSk7XG4gIH1cbn07XG5cblJlY29yZGVyLnByb3RvdHlwZS5pbml0QXVkaW9Db250ZXh0ID0gZnVuY3Rpb24oIHNvdXJjZU5vZGUgKXtcbiAgaWYgKHNvdXJjZU5vZGUgJiYgc291cmNlTm9kZS5jb250ZXh0KSB7XG4gICAgdGhpcy5hdWRpb0NvbnRleHQgPSBzb3VyY2VOb2RlLmNvbnRleHQ7XG4gICAgdGhpcy5jbG9zZUF1ZGlvQ29udGV4dCA9IGZhbHNlO1xuICB9XG5cbiAgZWxzZSB7XG4gICAgdGhpcy5hdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgdGhpcy5jbG9zZUF1ZGlvQ29udGV4dCA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gdGhpcy5hdWRpb0NvbnRleHQ7XG59O1xuXG5SZWNvcmRlci5wcm90b3R5cGUuaW5pdEF1ZGlvR3JhcGggPSBmdW5jdGlvbigpe1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gRmlyc3QgYnVmZmVyIGNhbiBjb250YWluIG9sZCBkYXRhLiBEb24ndCBlbmNvZGUgaXQuXG4gIHRoaXMuZW5jb2RlQnVmZmVycyA9IGZ1bmN0aW9uKCl7XG4gICAgZGVsZXRlIHRoaXMuZW5jb2RlQnVmZmVycztcbiAgfTtcblxuICB0aGlzLnNjcmlwdFByb2Nlc3Nvck5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoIHRoaXMuY29uZmlnLmJ1ZmZlckxlbmd0aCwgdGhpcy5jb25maWcubnVtYmVyT2ZDaGFubmVscywgdGhpcy5jb25maWcubnVtYmVyT2ZDaGFubmVscyApO1xuICB0aGlzLnNjcmlwdFByb2Nlc3Nvck5vZGUuY29ubmVjdCggdGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24gKTtcbiAgdGhpcy5zY3JpcHRQcm9jZXNzb3JOb2RlLm9uYXVkaW9wcm9jZXNzID0gZnVuY3Rpb24oIGUgKSB7XG4gICAgc2VsZi5lbmNvZGVCdWZmZXJzKCBlLmlucHV0QnVmZmVyICk7XG4gIH07XG5cbiAgdGhpcy5tb25pdG9yR2Fpbk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gIHRoaXMuc2V0TW9uaXRvckdhaW4oIHRoaXMuY29uZmlnLm1vbml0b3JHYWluICk7XG4gIHRoaXMubW9uaXRvckdhaW5Ob2RlLmNvbm5lY3QoIHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uICk7XG5cbiAgdGhpcy5yZWNvcmRpbmdHYWluTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgdGhpcy5zZXRSZWNvcmRpbmdHYWluKCB0aGlzLmNvbmZpZy5yZWNvcmRpbmdHYWluICk7XG4gIHRoaXMucmVjb3JkaW5nR2Fpbk5vZGUuY29ubmVjdCggdGhpcy5zY3JpcHRQcm9jZXNzb3JOb2RlICk7XG59O1xuXG5SZWNvcmRlci5wcm90b3R5cGUuaW5pdFNvdXJjZU5vZGUgPSBmdW5jdGlvbiggc291cmNlTm9kZSApe1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCBzb3VyY2VOb2RlICYmIHNvdXJjZU5vZGUuY29udGV4dCApIHtcbiAgICByZXR1cm4gZ2xvYmFsLlByb21pc2UucmVzb2x2ZSggc291cmNlTm9kZSApO1xuICB9XG5cbiAgcmV0dXJuIGdsb2JhbC5uYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IGF1ZGlvIDogdGhpcy5jb25maWcubWVkaWFUcmFja0NvbnN0cmFpbnRzIH0pLnRoZW4oIGZ1bmN0aW9uKCBzdHJlYW0gKXtcbiAgICBzZWxmLnN0cmVhbSA9IHN0cmVhbTtcbiAgICByZXR1cm4gc2VsZi5hdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2UoIHN0cmVhbSApO1xuICB9KTtcbn07XG5cblJlY29yZGVyLnByb3RvdHlwZS5pbml0V29ya2VyID0gZnVuY3Rpb24oKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc3RyZWFtUGFnZSA9IGZ1bmN0aW9uKCBlICkgeyBzZWxmLnN0cmVhbVBhZ2UoIGUuZGF0YSApOyB9O1xuICB2YXIgc3RvcmVQYWdlID0gZnVuY3Rpb24oIGUgKSB7IHNlbGYuc3RvcmVQYWdlKCBlLmRhdGEgKTsgfTtcblxuICB0aGlzLnJlY29yZGVkUGFnZXMgPSBbXTtcbiAgdGhpcy50b3RhbExlbmd0aCA9IDA7XG4gIHRoaXMuZW5jb2RlciA9IG5ldyBnbG9iYWwuV29ya2VyKCB0aGlzLmNvbmZpZy5lbmNvZGVyUGF0aCApO1xuICB0aGlzLmVuY29kZXIuYWRkRXZlbnRMaXN0ZW5lciggXCJtZXNzYWdlXCIsIHRoaXMuY29uZmlnLnN0cmVhbVBhZ2VzID8gc3RyZWFtUGFnZSA6IHN0b3JlUGFnZSApO1xufTtcblxuUmVjb3JkZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKXtcbiAgaWYgKCB0aGlzLnN0YXRlID09PSBcInJlY29yZGluZ1wiICl7XG4gICAgdGhpcy5zdGF0ZSA9IFwicGF1c2VkXCI7XG4gICAgdGhpcy5vbnBhdXNlKCk7XG4gIH1cbn07XG5cblJlY29yZGVyLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLnN0YXRlID09PSBcInBhdXNlZFwiICkge1xuICAgIHRoaXMuc3RhdGUgPSBcInJlY29yZGluZ1wiO1xuICAgIHRoaXMub25yZXN1bWUoKTtcbiAgfVxufTtcblxuUmVjb3JkZXIucHJvdG90eXBlLnNldFJlY29yZGluZ0dhaW4gPSBmdW5jdGlvbiggZ2FpbiApe1xuICB0aGlzLmNvbmZpZy5yZWNvcmRpbmdHYWluID0gZ2FpbjtcblxuICBpZiAoIHRoaXMucmVjb3JkaW5nR2Fpbk5vZGUgJiYgdGhpcy5hdWRpb0NvbnRleHQgKSB7XG4gICAgdGhpcy5yZWNvcmRpbmdHYWluTm9kZS5nYWluLnNldFRhcmdldEF0VGltZShnYWluLCB0aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSwgMC4wMSk7XG4gIH1cbn07XG5cblJlY29yZGVyLnByb3RvdHlwZS5zZXRNb25pdG9yR2FpbiA9IGZ1bmN0aW9uKCBnYWluICl7XG4gIHRoaXMuY29uZmlnLm1vbml0b3JHYWluID0gZ2FpbjtcblxuICBpZiAoIHRoaXMubW9uaXRvckdhaW5Ob2RlICYmIHRoaXMuYXVkaW9Db250ZXh0ICkge1xuICAgIHRoaXMubW9uaXRvckdhaW5Ob2RlLmdhaW4uc2V0VGFyZ2V0QXRUaW1lKGdhaW4sIHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lLCAwLjAxKTtcbiAgfVxufTtcblxuUmVjb3JkZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oIHNvdXJjZU5vZGUgKXtcbiAgaWYgKCB0aGlzLnN0YXRlID09PSBcImluYWN0aXZlXCIgKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuaW5pdFdvcmtlcigpO1xuICAgIHRoaXMuaW5pdEF1ZGlvQ29udGV4dCggc291cmNlTm9kZSApO1xuICAgIHRoaXMuaW5pdEF1ZGlvR3JhcGgoKTtcblxuICAgIHJldHVybiB0aGlzLmluaXRTb3VyY2VOb2RlKCBzb3VyY2VOb2RlICkudGhlbiggZnVuY3Rpb24oIHNvdXJjZU5vZGUgKXtcbiAgICAgIHNlbGYuc3RhdGUgPSBcInJlY29yZGluZ1wiO1xuICAgICAgc2VsZi5lbmNvZGVyLnBvc3RNZXNzYWdlKCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgY29tbWFuZDogJ2luaXQnLFxuICAgICAgICBvcmlnaW5hbFNhbXBsZVJhdGU6IHNlbGYuYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUsXG4gICAgICAgIHdhdlNhbXBsZVJhdGU6IHNlbGYuYXVkaW9Db250ZXh0LnNhbXBsZVJhdGVcbiAgICAgIH0sIHNlbGYuY29uZmlnKSk7XG4gICAgICBzZWxmLnNvdXJjZU5vZGUgPSBzb3VyY2VOb2RlO1xuICAgICAgc2VsZi5zb3VyY2VOb2RlLmNvbm5lY3QoIHNlbGYubW9uaXRvckdhaW5Ob2RlICk7XG4gICAgICBzZWxmLnNvdXJjZU5vZGUuY29ubmVjdCggc2VsZi5yZWNvcmRpbmdHYWluTm9kZSApO1xuICAgICAgc2VsZi5vbnN0YXJ0KCk7XG4gICAgfSk7XG4gIH1cbn07XG5cblJlY29yZGVyLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKXtcbiAgaWYgKCB0aGlzLnN0YXRlICE9PSBcImluYWN0aXZlXCIgKSB7XG4gICAgdGhpcy5zdGF0ZSA9IFwiaW5hY3RpdmVcIjtcbiAgICB0aGlzLm1vbml0b3JHYWluTm9kZS5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5zY3JpcHRQcm9jZXNzb3JOb2RlLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLnJlY29yZGluZ0dhaW5Ob2RlLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLnNvdXJjZU5vZGUuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMuY2xlYXJTdHJlYW0oKTtcbiAgICB0aGlzLmVuY29kZXIucG9zdE1lc3NhZ2UoeyBjb21tYW5kOiBcImRvbmVcIiB9KTtcbiAgfVxufTtcblxuUmVjb3JkZXIucHJvdG90eXBlLnN0b3JlUGFnZSA9IGZ1bmN0aW9uKCBwYWdlICkge1xuICBpZiAoIHBhZ2UgPT09IG51bGwgKSB7XG4gICAgdmFyIG91dHB1dERhdGEgPSBuZXcgVWludDhBcnJheSggdGhpcy50b3RhbExlbmd0aCApO1xuICAgIHRoaXMucmVjb3JkZWRQYWdlcy5yZWR1Y2UoIGZ1bmN0aW9uKCBvZmZzZXQsIHBhZ2UgKXtcbiAgICAgIG91dHB1dERhdGEuc2V0KCBwYWdlLCBvZmZzZXQgKTtcbiAgICAgIHJldHVybiBvZmZzZXQgKyBwYWdlLmxlbmd0aDtcbiAgICB9LCAwKTtcblxuICAgIHRoaXMub25kYXRhYXZhaWxhYmxlKCBvdXRwdXREYXRhICk7XG4gICAgdGhpcy5vbnN0b3AoKTtcbiAgfVxuXG4gIGVsc2Uge1xuICAgIHRoaXMucmVjb3JkZWRQYWdlcy5wdXNoKCBwYWdlICk7XG4gICAgdGhpcy50b3RhbExlbmd0aCArPSBwYWdlLmxlbmd0aDtcbiAgfVxufTtcblxuUmVjb3JkZXIucHJvdG90eXBlLnN0cmVhbVBhZ2UgPSBmdW5jdGlvbiggcGFnZSApIHtcbiAgaWYgKCBwYWdlID09PSBudWxsICkge1xuICAgIHRoaXMub25zdG9wKCk7XG4gIH1cblxuICBlbHNlIHtcbiAgICB0aGlzLm9uZGF0YWF2YWlsYWJsZSggcGFnZSApO1xuICB9XG59O1xuXG5cbi8vIENhbGxiYWNrIEhhbmRsZXJzXG5SZWNvcmRlci5wcm90b3R5cGUub25kYXRhYXZhaWxhYmxlID0gZnVuY3Rpb24oKXt9O1xuUmVjb3JkZXIucHJvdG90eXBlLm9ucGF1c2UgPSBmdW5jdGlvbigpe307XG5SZWNvcmRlci5wcm90b3R5cGUub25yZXN1bWUgPSBmdW5jdGlvbigpe307XG5SZWNvcmRlci5wcm90b3R5cGUub25zdGFydCA9IGZ1bmN0aW9uKCl7fTtcblJlY29yZGVyLnByb3RvdHlwZS5vbnN0b3AgPSBmdW5jdGlvbigpe307XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWNvcmRlcjtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/recorder.js\n");

/***/ })

/******/ });
});