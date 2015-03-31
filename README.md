# Recorder.js

A library for recording/exporting the output of Web Audio API nodes. This is a version which supports encoding the audio using libopus ver 1.1.1 beta compiled with emscripten.

### Syntax
#### Constructor
    var rec = new Recorder([config]);

Creates a recorder instance. Instantiating an instance will prompt the user for permission to access the audio input stream.

- **config** - An optional configuration object (see **config** section below)


---------
#### Config

- **enableMonitoring** - (*optional*) If you want the hear the recorder input live. Defaults to false
- **bitDepth** - (*optional*) Specifies the bitdepth to record at. Defaults to 16. Supported values are 8, 16, 24, 32. If recordOpus is true, this value will be forced to 16.
- **bufferLength** - (*optional*) The length of the buffer that the internal JavaScriptNode uses to capture the audio. Can be tweaked if experiencing performance issues. Defaults to 4096.
- **numberOfChannels** - (*optional*) The number of channels to record. 1 = mono, 2 = stereo. Defaults to 1. More than two channels has not been tested.
- **recordOpus** - (*optional*) Specifies if recorder should record using the opus encoder. Defaults to true.
- **sampleRate** - (*optional*) Specifies the sample rate to record at. Defaults to device sample rate. If different than native rate, the audio will be resampled using a linear interpolation algorithm. If recordOpus is true, this value will default to 48000.
The Opus encoder will not work if the value is not 8000, 12000, 16000, 24000 or 48000.
- **workerPath** - (*optional*) Path to recorder.js worker script. Defaults to 'recorderWorker.js'


---------
#### Instance Methods

    rec.addEventListener( type, listener[, useCapture] )

**addEventListener** will add an event listener to the event target. Custom events are "recordingProgress", "dataAvailable", "start", "pause", "resume" and "stop". Any errors from getUserMedia will be published as event "recordingError".

    rec.disableMonitoring()

**disableMonitoring** will disable the live monitoring of your mic input.

    rec.enableMonitoring()

**enableMonitoring** will pass the input stream to the destination node. Headphones are recommended if enabling monitoring to avoid feedback noise.

    rec.pause()

**pause** will keep the stream and monitoring alive, but will not be recording the buffers. Will raise the pause event. Subsequent calls to **resume** will add to the current recording.

    rec.removeEventListener( type, listener[, useCapture] )

**removeEventListener** will remove an event listener from the event target.

    rec.requestData()

**requestData** will request the recorded data if not recording. If successful, the event "dataAvailable" will be published with a blob containing the appropriate data as an ogg or wav file depending on config.

    rec.resume()

**resume** will resume the recording if paused. Will raise the resume event

    rec.start()

**start** will initalize the worker and the audio stream and begin capturing audio when ready. Will raise the start event when started.

    rec.stop()

**stop** will cease capturing audio and disable the monitoring and mic input stream. Will request the recorded data and then terminate the worker once the final data has been published. Will raise the stop event when stopped.


---------
#### Static Methods

    Recorder.isRecordingSupported()

Will return a boolean value indicating if the browser supports recording.



## Recorder.js License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Opus License (BSD)

Copyright 2001-2011 Xiph.Org, Skype Limited, Octasic,
                    Jean-Marc Valin, Timothy B. Terriberry,
                    CSIRO, Gregory Maxwell, Mark Borgerding,
                    Erik de Castro Lopo

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

- Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.

- Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

- Neither the name of Internet Society, IETF or IETF Trust, nor the
names of specific contributors, may be used to endorse or promote
products derived from this software without specific prior written
permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER
OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Opus is subject to the royalty-free patent licenses which are
specified at:

Xiph.Org Foundation:
https://datatracker.ietf.org/ipr/1524/

Microsoft Corporation:
https://datatracker.ietf.org/ipr/1914/

Broadcom Corporation:
https://datatracker.ietf.org/ipr/1526/