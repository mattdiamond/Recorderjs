# Recorder.js

## A plugin for recording/exporting the output of Web Audio API nodes

### Dependencies

This plugin requires Jussi Kalliokoski's terrific PCMData.js library, which you can find in original or minified form [here](https://github.com/jussi-kalliokoski/pcmdata.js/tree/master/lib).

### Syntax
#### Constructor
    var rec = new Recorder(source [, bufferLen])

Creates a recorder instance.

- **source** - The node whose output you wish to capture
- **bufferLen** - (*optional*) The length of the buffer that the internal JavaScriptNode uses to capture the audio. Can be tweaked if experiencing performance issues. Defaults to 4096.

---------
#### Methods

    rec.record()
    rec.stop()

Pretty self-explanatory... **record** will begin capturing audio and **stop** will cease capturing audio. Subsequent calls to **record** will add to the current recording.

    rec.clear()

This will clear the recording.

    rec.exportWAV([callback])

This will generate a data URI containing the recording in WAV format. The callback will be called with the data URI as its sole argument. If a callback is not specified, the default callback (as defined via `configure`) will be used. If no default has been set, an error will be thrown.

    rec.configure(config)

This will set the configuration for Recorder. As of now, the only parameter is `callback`, which may be used to set a default callback for `exportWAV`.