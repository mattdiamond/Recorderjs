# Recorder.js

## A plugin for recording/exporting the output of Web Audio API nodes

**Note:** This repository is not being actively maintained due to lack of time and interest. If you maintain or know of a good fork, please let me know so I can direct future visitors to it. In the meantime, if this library isn't working, you can find a list of popular forks here: http://forked.yannick.io/mattdiamond/recorderjs.

My sincerest apologies to the open source community for allowing this project to stagnate. I hope it was useful for some of you as a jumping-off point.

---

### Syntax
#### Constructor
    var rec = new Recorder(source [, config])

Creates a recorder instance.

- **source** - The node whose output you wish to capture
- **config** - (*optional*) A configuration object (see **config** section below)

---------
#### Config

- **workerPath** - Path to recorder.js worker script. Defaults to 'js/recorderjs/recorderWorker.js'
- **bufferLen** - The length of the buffer that the internal JavaScriptNode uses to capture the audio. Can be tweaked if experiencing performance issues. Defaults to 4096.
- **numChannels** - The number of channels in the audio. Defaults to 2.
- **callback** - A default callback to be used with `exportWAV`.
- **type** - The type of the Blob generated by `exportWAV`. Defaults to 'audio/wav'.

---------
#### Instance Methods

    rec.record()
    rec.stop()

Pretty self-explanatory... **record** will begin capturing audio and **stop** will cease capturing audio. Subsequent calls to **record** will add to the current recording.

    rec.clear()

This will clear the recording.

    rec.exportWAV([callback][, type])

This will generate a Blob object containing the recording in WAV format. The callback will be called with the Blob as its sole argument. If a callback is not specified, the default callback (as defined in the config) will be used. If no default has been set, an error will be thrown.

In addition, you may specify the type of Blob to be returned (defaults to 'audio/wav').

    rec.getBuffer([callback])

This will pass the recorded stereo buffer (as an array of two Float32Arrays, for the separate left and right channels) to the callback. It can be played back by creating a new source buffer and setting these buffers as the separate channel data:

	function getBufferCallback( buffers ) {
		var newSource = audioContext.createBufferSource();
		var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
		newBuffer.getChannelData(0).set(buffers[0]);
		newBuffer.getChannelData(1).set(buffers[1]);
		newSource.buffer = newBuffer;

		newSource.connect( audioContext.destination );
		newSource.start(0);
	}

This sample code will play back the stereo buffer.


    rec.configure(config)

This will set the configuration for Recorder by passing in a config object.

#### Utility Methods (static)

    Recorder.forceDownload(blob[, filename])

This method will force a download using the new anchor link *download* attribute. Filename defaults to 'output.wav'.

## License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
