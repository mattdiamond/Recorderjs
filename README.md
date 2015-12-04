# Recorder.js

A library to encode the output of Web Audio API nodes as Opus and export in an Ogg container. Audio encoded using libopus ver 1.1.1 beta compiled with emscripten. Also included is audio resampler and Ogg Opus decoder.

### Syntax
#### Constructor
    var rec = new Recorder([config]);

Creates a recorder instance.

- **config** - An optional configuration object (see **config** section below)


---------
#### Config

- **bitRate** (*optional*) Specifies the target bitrate in bits/sec. The encoder selects an application-specific default when this is not specified.
- **bufferLength** - (*optional*) The length of the buffer that the internal JavaScriptNode uses to capture the audio. Can be tweaked if experiencing performance issues. Defaults to `4096`.
- **encoderApplication** - (*optional*) Specifies the encoder application. Supported values are `2048` - Voice, `2049` - Full Band Audio, `2051` - Restricted Low Delay. Defaults to `2049`.
- **encoderFrameSize** (*optional*) Specifies the frame size in ms used for encoding. Defaults to `20`.
- **encoderPath** - (*optional*) Path to oggopusEncoder.js worker script. Defaults to `oggopusEncoder.js`
- **encoderSampleRate** - (*optional*) Specifies the sample rate to encode at. Defaults to `48000`. Supported values are `8000`, `12000`, `16000`, `24000` or `48000`.
- **leaveStreamOpen** - (*optional*) Keep the stream around when trying to `stop` recording, so you can re-`start` without re-`initStream`. Defaults to `false`.
- **maxBuffersPerPage** - (*optional*) Specifies the maximum number of buffers to use before generating an Ogg page. This can be used to lower the streaming latency. The lower the value the more overhead the ogg stream will incur. Defaults to `40`.
- **monitorGain** - (*optional*) Sets the gain of the monitoring output. Gain is an a-weighted value between `0` and `1`. Defaults to `0`
- **numberOfChannels** - (*optional*) The number of channels to record. `1` = mono, `2` = stereo. Defaults to `1`. Maximum `2` channels are supported.
- **streamPages** - (*optional*) Library will fire `dataAvailable` event after each encoded page. Defaults to `false`.


---------
#### Instance Methods

    rec.addEventListener( type, listener[, useCapture] )

**addEventListener** will add an event listener to the event target. Available events are `duration`, `streamError`, `streamReady`, `dataAvailable`, `start`, `pause`, `resume` and `stop`.

    rec.initStream()

**initStream** will request the user for permission to access the the audio stream and raise `streamReady` or `streamError`.

    rec.pause()

**pause** will keep the stream and monitoring alive, but will not be recording the buffers. Will raise the pause event. Subsequent calls to **resume** will add to the current recording.

    rec.removeEventListener( type, listener[, useCapture] )

**removeEventListener** will remove an event listener from the event target.

    rec.resume()

**resume** will resume the recording if paused. Will raise the resume event.

    rec.setMonitorGain( gain )

**setMonitorGain** will set the volume on what will be passed to the monitor. Monitor level does not affect the recording volume. Gain is an a-weighted value between `0` and `1`.

    rec.start()

**start** will initalize the worker and begin capturing audio if the audio stream is ready. Will raise the `start` event when started.

    rec.stop()

**stop** will cease capturing audio and disable the monitoring and mic input stream. Will request the recorded data and then terminate the worker once the final data has been published. Will raise the `stop` event when stopped.

    rec.clearStream()

**clearStream** will stop and delete the stream got from `initStream`, you will only ever call this manually if you have `config.leaveStreamOpen` set to `true`.


---------
#### Static Methods

    Recorder.isRecordingSupported()

Will return a truthy value indicating if the browser supports recording.
