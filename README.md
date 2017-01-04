# Recorderjs

A library to encode the output of Web Audio API nodes as Opus and export in an Ogg container. Audio encoded and decoded using libopus v1.1.2. Audio resampling is performed by speexdsp 1.2RC3.
Encoded and muxed audio will be returned as typedArray in `dataAvailable` event.

### Syntax


---------
#### Constructor

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
- **encoderFrameSize** (*optional*) Specifies the frame size in ms used for encoding. Defaults to `20`.
- **encoderPath** - (*optional*) Path to encoderWorker.min.js worker script. Defaults to `encoderWorker.min.js`
- **encoderSampleRate** - (*optional*) Specifies the sample rate to encode at. Defaults to `48000`. Supported values are `8000`, `12000`, `16000`, `24000` or `48000`.
- **leaveStreamOpen** - (*optional*) Keep the stream around when trying to `stop` recording, so you can re-`start` without re-`initStream`. Defaults to `false`.
- **maxBuffersPerPage** - (*optional*) Specifies the maximum number of buffers to use before generating an Ogg page. This can be used to lower the streaming latency. The lower the value the more overhead the ogg stream will incur. Defaults to `40`.
- **monitorGain** - (*optional*) Sets the gain of the monitoring output. Gain is an a-weighted value between `0` and `1`. Defaults to `0`
- **numberOfChannels** - (*optional*) The number of channels to record. `1` = mono, `2` = stereo. Defaults to `1`. Maximum `2` channels are supported.
- **resampleQuality** - (*optional*) Value between 0 and 10 which determines latency and processing for resampling. `0` is fastest with lowest quality. `10` is slowest with highest quality. Defaults to `3`.
- **streamPages** - (*optional*) Library will fire `dataAvailable` event after each encoded page. Defaults to `false`.


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
### Building from sources 

Prebuilt binaries are included in the build folder. However below are instructions if you want to build them yourself.

[Install EMScripten](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)

Install autoconf, automake, libtool and pckconfig.
On Mac you can do this using [MacPorts](https://www.macports.org/install.php)
`sudo port install automake autoconf libtool pkgconfig`

Make the dependencies using command `make`!

---------
### Running the unit tests 

`make test`

---------
### Required Files

The required files to record audio to ogg/opus are `build/recorder.min.js` and `build/encoderWorker.min.js`. Optionally `build/decoderWorker.min.js` will help decode ogg/opus files and `build/waveWorker.min.js` is a helper to transform floating point PCM data into wave/pcm. The source files in `src/` folder do not work without building process; it produces  `ReferenceError: _malloc is not defined`). You need to either use compiled file in `build/` folder or build by yourself.
