# Recorder.js

## A plugin for recording/exporting the output of Web Audio API nodes

### Dependencies

This plugin requires Jussi Kalliokoski's terrific PCMData.js library, which you can find in original or minified form [here](https://github.com/jussi-kalliokoski/pcmdata.js/tree/master/lib).

### Syntax

    var rec = new Recorder(source [, bufferLen])

Creates a recorder instance.

- **source** - The node whose output you wish to capture
- **bufferLen** - (*optional*) The length of the buffer that the internal JavaScriptNode uses to capture the audio. Can be tweaked if experiencing performance issues. Defaults to 4096.

    rec.record()
    rec.stop()

Pretty self-explanatory... **record** will begin capturing audio and **stop** will cease capturing audio. Subsequent calls to **record** will add to the current recording.

    rec.clear()

This will clear the recording.

    rec.exportWAV()

This will open a new window with a data URI of the recording in WAV format, which the user can then save from the browser.