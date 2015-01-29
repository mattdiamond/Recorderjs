# Recorder.js

A library for recording/exporting the output of Web Audio API nodes.

This is a experimental version which encodes the audio using libopus ver 1.1 compiled with emscripten. Please see known issues below.

### Syntax
#### Constructor
    var rec = new Recorder([config]);

Creates a recorder instance. Instantiating an instance will prompt the user for permission to access the audio input stream.

- **config** - An optional configuration object (see **config** section below)

---------
#### Config

- **enableMonitoring** - (*optional*) If you want the hear the recorder input live. Defaults to false
- **workerPath** - (*optional*) Path to recorder.js worker script. Defaults to 'recorderWorker.js'
- **bufferLength** - (*optional*) The length of the buffer that the internal JavaScriptNode uses to capture the audio. Can be tweaked if experiencing performance issues. Defaults to 4096.
- **numberOfChannels** - (*optional*) The number of channels to record. 1 = mono, 2 = stereo. Defaults to 1. More than two channels are supported if your audio device allows, but has not been tested.


---------
#### Instance Methods

    rec.startRecording()

**startRecording** will begin capturing audio.

    rec.pauseRecording()

**pauseRecording** will keep the stream and monitoring alive, but will not be recording the buffers. Subsequent calls to **startRecording** will add to the current recording.

    rec.stopRecording()

**stopRecording** will cease capturing audio and disable the monitoring and mic input stream. Subsequent calls to **startRecording** will require authorization to access the input stream again before adding to the current recording.

    rec.clear()

This will clear the data buffers of any recorded data.

    rec.enableMonitoring()
    rec.disableMonitoring()

This will enable and disable the live monitoring of your mic input. Headphones are recommended if enabling monitoring to avoid feedback noise.

    rec.getWav( callback[, mimeType] )

This will generate a Blob object containing the recording in WAV format. The callback will be called with the Blob as its sole argument.

In addition, you may specify the mime type of Blob to be returned (defaults to "audio/wav").

    rec.getOgg( callback[, mimeType] )

This will generate a Blob object containing the opus encoded recording in an Ogg container. The callback will be called with the Blob as its sole argument.

In addition, you may specify the mime type of Blob to be returned (defaults to "audio/ogg").

    rec.get( callback )

This will return the recorded audio as an array of Uint8Arrays packets of encoded audio data to the callback.

    rec.getInterleaved( callback )

This will return the recorded audio decoded into one Uint16Array with channels interleaved to the callbacl. 

---------
#### Static Methods

    Recorder.isRecordingSupported()

Will return a boolean value indicating if the browser supports recording.

---------
#### Known Issues

Ogg tags are not supported.

Stereo encoding is not working.


## License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.