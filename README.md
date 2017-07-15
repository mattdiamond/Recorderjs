# Opus Recorder

A javascript library to encode the output of Web Audio API nodes in Ogg Opus format. Audio encoded and decoded using libopus v1.2.1. Audio resampling is performed by speexDSP 1.2RC3. 
Encoded and muxed audio will be returned as typedArray in `dataAvailable` event.

### Usage


---------
#### Constructor

The `Recorder` object is available in the global namespace and supports importing from module exports and AMD.

```js
var rec = new Recorder([config]);
```
Creates a recorder instance.

- **config** - An optional configuration object (see **config** section below)


---------
#### Config

- **bitRate** (*optional*) Specifies the target bitrate in bits/sec. The encoder selects an application-specific default when this is not specified.
- **bufferLength** - (*optional*) The length of the buffer that the internal JavaScriptNode uses to capture the audio. Can be tweaked if experiencing performance issues. Defaults to `4096`.
- **encoderApplication** - (*optional*) Specifies the encoder application. Supported values are `2048` - Voice, `2049` - Full Band Audio, `2051` - Restricted Low Delay. Defaults to `2049`.
- **encoderComplexity** - (*optional*) Value between 0 and 10 which determines latency and processing for encoding. `0` is fastest with lowest complexity. `10` is slowest with highest complexity. The encoder selects a default when this is not specified.
- **encoderFrameSize** (*optional*) Specifies the frame size in ms used for encoding. Defaults to `20`.
- **encoderPath** - (*optional*) Path to encoderWorker.min.js worker script. Defaults to `encoderWorker.min.js`
- **encoderSampleRate** - (*optional*) Specifies the sample rate to encode at. Defaults to `48000`. Supported values are `8000`, `12000`, `16000`, `24000` or `48000`.
- **leaveStreamOpen** - (*optional*) Keep the stream around when trying to `stop` recording, so you can re-`start` without re-`initStream`. Defaults to `false`.
- **maxBuffersPerPage** - (*optional*) Specifies the maximum number of buffers to use before generating an Ogg page. This can be used to lower the streaming latency. The lower the value the more overhead the ogg stream will incur. Defaults to `40`.
- **monitorGain** - (*optional*) Sets the gain of the monitoring output. Gain is an a-weighted value between `0` and `1`. Defaults to `0`
- **numberOfChannels** - (*optional*) The number of channels to record. `1` = mono, `2` = stereo. Defaults to `1`. Maximum `2` channels are supported.
- **originalSampleRateOverride** - (*optional*) Override the ogg opus 'input sample rate' field. Google Speech API requires this field to be `16000`.
- **resampleQuality** - (*optional*) Value between 0 and 10 which determines latency and processing for resampling. `0` is fastest with lowest quality. `10` is slowest with highest quality. Defaults to `3`.
- **streamPages** - (*optional*) `dataAvailable` event will fire after each encoded page. Defaults to `false`.


---------
#### Instance Methods

```js
rec.addEventListener( type, listener[, useCapture] )
```

**addEventListener** will add an event listener to the event target. Available events are `streamError`, `streamReady`, `dataAvailable`, `start`, `pause`, `resume` and `stop`.

```js
rec.initStream()
```

**initStream** will request the user for permission to access the the audio stream and raise `streamReady` or `streamError`.
Returns a Promise which resolves the audio stream when it is ready.

```js
rec.pause()
```

**pause** will keep the stream and monitoring alive, but will not be recording the buffers. Will raise the pause event. Subsequent calls to **resume** will add to the current recording.

```js
rec.removeEventListener( type, listener[, useCapture] )
```

**removeEventListener** will remove an event listener from the event target.

```js
rec.resume()
```

**resume** will resume the recording if paused. Will raise the resume event.

```js
rec.setMonitorGain( gain )
```

**setMonitorGain** will set the volume on what will be passed to the monitor. Monitor level does not affect the recording volume. Gain is an a-weighted value between `0` and `1`.

```js
rec.start()
```

**start** will initalize the worker and begin capturing audio if the audio stream is ready. Will raise the `start` event when started.

```js
rec.stop()
```

**stop** will cease capturing audio and disable the monitoring and mic input stream. Will request the recorded data and then terminate the worker once the final data has been published. Will raise the `stop` event when stopped.

```js
rec.clearStream()
```

**clearStream** will stop and delete the stream got from `initStream`, you will only ever call this manually if you have `config.leaveStreamOpen` set to `true`.


---------
#### Static Methods

```js
Recorder.isRecordingSupported()
```

Will return a truthy value indicating if the browser supports recording.


---------
### Browser Support

Supported:
- Chrome v58
- Firefox v53
- Microsoft Edge
- Opera v44

Unsupported:
- MacOS Safari
- iOS
- IE 11 and below


---------
### Known Issues

- Firefox does not support sample rates above 48000Hz: https://bugzilla.mozilla.org/show_bug.cgi?id=1124981
- Microsoft Edge does not natively support opus playback


---------
### Building from sources

Prebuilt sources are included in the dist folder. However below are instructions if you want to build them yourself. Opus and speex are compiled without SIMD optimizations. Performace is significantly worse with SIMD optimizations enabled.

[Install EMScripten](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)

Install autoconf, automake, libtool and pckconfig.
On Mac you can do this using [MacPorts](https://www.macports.org/install.php)
`sudo port install automake autoconf libtool pkgconfig`

Install npm dependencies:
`npm install`

checkout, compile and create the dist from sources:

`npm run make`

Running the unit tests:

`npm test`

Clean the dist folder and git submodules:

`make clean`


---------
### Required Files

The required files to record audio to ogg/opus are `dist/recorder.min.js` and `dist/encoderWorker.min.js`. Optionally `dist/decoderWorker.min.js` will help decode ogg/opus files and `dist/waveWorker.min.js` is a helper to transform floating point PCM data into wave/pcm. The source files `src/encoderWorker.js` and `src/decoderWorker.js` do not work without building process; it will produce an error `ReferenceError: _malloc is not defined`. You need to either use compiled file in `dist/` folder or build by yourself.
