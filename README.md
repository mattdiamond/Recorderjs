# Recorder.js

## A plugin for recording/exporting the output of Web Audio API nodes

### Syntax
#### Constructor
    var rec = new Recorder([config])

Creates a recorder instance.

- **config** - An optional configuration object (see **config** section below)

---------
#### Config

- **enableMonitoring** - (*optional*) If you want the hear the recorder input live. Defaults to false
- **workerPath** - (*optional*) Path to recorder.js worker script. Defaults to 'recorderWorker.js'
- **bufferLength** - (*optional*) The length of the buffer that the internal JavaScriptNode uses to capture the audio. Can be tweaked if experiencing performance issues. Defaults to 4096.
- **numberOfChannels** - (*optional*) The number of channels to record. 1 = mono, 2 = stereo. Defaults to 2
- **sampleRate** - (*optional*) The sample rate to record at. Defaults to audio device native sample rate. If different than the audio device rate, the audio will be resampled using a linear interpolation algorithm.
- **bitDepth** - (*optional*) The bit depth to record at. Defaults to 16. Supported values are 8, 16, 24, 32. No dither is added when reducing bit rate.

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

    rec.getWav( callback[, mimeType])

This will generate a Blob object containing the recording in WAV format. The callback will be called with the Blob as its sole argument.

In addition, you may specify the mime type of Blob to be returned (defaults to "audio/wav").

    rec.get( callback )

This will pass the recorded audio as an array of Uint8Arrays for each channel to the callback.

    rec.getInterleaved( callback )

This will pass the recorded audio as one Uint8Array with channels interleaved to the callback.

---------
#### Static Methods

    Recorder.isRecordingSupported()

Will return a boolean value indicating if the browser supports recording.

## License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.