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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
  
var recorder;

global['onmessage'] = function( e ){
  switch( e['data']['command'] ){

    case 'encode':
      if (recorder) {
        recorder.record( e['data']['buffers'] );
      }
      break;

    case 'done':
      if (recorder) {
        recorder.requestData();
      }
      break;

    case 'init':
      recorder = new WavePCM( e['data'] );
      break;

    default:
      // Ignore any unknown commands and continue recieving commands
  }
};

var WavePCM = function( config ){

  var config = Object.assign({
    wavBitDepth: 16
  }, config);

  if ( !config['wavSampleRate'] ) {
    throw new Error("wavSampleRate value is required to record. NOTE: Audio is not resampled!");
  }

  if ( [8, 16, 24, 32].indexOf( config['wavBitDepth'] ) === -1 ) {
    throw new Error("Only 8, 16, 24 and 32 bits per sample are supported");
  }

  this.bitDepth = config['wavBitDepth'];
  this.sampleRate = config['wavSampleRate'];
  this.recordedBuffers = [];
  this.bytesPerSample = this.bitDepth / 8;
};

WavePCM.prototype.record = function( buffers ){
  this.numberOfChannels = this.numberOfChannels || buffers.length;
  var bufferLength = buffers[0].length;
  var reducedData = new Uint8Array( bufferLength * this.numberOfChannels * this.bytesPerSample );

  // Interleave
  for ( var i = 0; i < bufferLength; i++ ) {
    for ( var channel = 0; channel < this.numberOfChannels; channel++ ) {

      var outputIndex = ( i * this.numberOfChannels + channel ) * this.bytesPerSample;
      var sample = buffers[ channel ][ i ];

      // Check for clipping
      if ( sample > 1 ) {
        sample = 1;
      }

      else if ( sample < -1 ) {
        sample = -1;
      }

      // bit reduce and convert to uInt
      switch ( this.bytesPerSample ) {
        case 4:
          sample = sample * 2147483648;
          reducedData[ outputIndex ] = sample;
          reducedData[ outputIndex + 1 ] = sample >> 8;
          reducedData[ outputIndex + 2 ] = sample >> 16;
          reducedData[ outputIndex + 3 ] = sample >> 24;
          break;

        case 3:
          sample = sample * 8388608;
          reducedData[ outputIndex ] = sample;
          reducedData[ outputIndex + 1 ] = sample >> 8;
          reducedData[ outputIndex + 2 ] = sample >> 16;
          break;

        case 2:
          sample = sample * 32768;
          reducedData[ outputIndex ] = sample;
          reducedData[ outputIndex + 1 ] = sample >> 8;
          break;

        case 1:
          reducedData[ outputIndex ] = ( sample + 1 ) * 128; // 8 bit is signed integer.
          break;

        default:
          throw new Error("Only 8, 16, 24 and 32 bits per sample are supported");
      }
    }
  }

  this.recordedBuffers.push( reducedData );
};

WavePCM.prototype.requestData = function(){
  var bufferLength = this.recordedBuffers[0].length;
  var dataLength = this.recordedBuffers.length * bufferLength;
  var headerLength = 44;
  var wav = new Uint8Array( headerLength + dataLength );
  var view = new DataView( wav.buffer );

  view.setUint32( 0, 1380533830, false ); // RIFF identifier 'RIFF'
  view.setUint32( 4, 36 + dataLength, true ); // file length minus RIFF identifier length and file description length
  view.setUint32( 8, 1463899717, false ); // RIFF type 'WAVE'
  view.setUint32( 12, 1718449184, false ); // format chunk identifier 'fmt '
  view.setUint32( 16, 16, true ); // format chunk length
  view.setUint16( 20, 1, true ); // sample format (raw)
  view.setUint16( 22, this.numberOfChannels, true ); // channel count
  view.setUint32( 24, this.sampleRate, true ); // sample rate
  view.setUint32( 28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true ); // byte rate (sample rate * block align)
  view.setUint16( 32, this.bytesPerSample * this.numberOfChannels, true ); // block align (channel count * bytes per sample)
  view.setUint16( 34, this.bitDepth, true ); // bits per sample
  view.setUint32( 36, 1684108385, false); // data chunk identifier 'data'
  view.setUint32( 40, dataLength, true ); // data chunk length

  for (var i = 0; i < this.recordedBuffers.length; i++ ) {
    wav.set( this.recordedBuffers[i], i * bufferLength + headerLength );
  }

  global['postMessage']( wav, [wav.buffer] );
  global['postMessage'](null);
  global['close']();
};


module.exports = WavePCM

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});