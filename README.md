# Recorder.js

## A plugin for recording/exporting the output of Web Audio API nodes

### Dependencies

This plugin requires Jussi Kalliokoski's terrific PCMData.js library, which you can find in original or minified form [here](https://github.com/jussi-kalliokoski/pcmdata.js/tree/master/lib).

### Syntax
#### Constructor
    var rec = new Recorder(source [, config])

Creates a recorder instance.

- **source** - The node whose output you wish to capture
- **config** - (*optional*) A configuration object (see **config** section below)

---------
#### Config

- **bufferLen** - The length of the buffer that the internal JavaScriptNode uses to capture the audio. Can be tweaked if experiencing performance issues. Defaults to 4096.
- **callback** - A default callback to be used with `exportWAV`.

---------
#### Methods

    rec.record()
    rec.stop()

Pretty self-explanatory... **record** will begin capturing audio and **stop** will cease capturing audio. Subsequent calls to **record** will add to the current recording.

    rec.clear()

This will clear the recording.

    rec.exportWAV([callback])

This will generate a data URI containing the recording in WAV format. The callback will be called with the data URI as its sole argument. If a callback is not specified, the default callback (as defined in the config) will be used. If no default has been set, an error will be thrown.

    rec.configure(config)

This will set the configuration for Recorder by passing in a config object.