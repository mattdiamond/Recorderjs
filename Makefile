INPUT_DIR=./src
OUTPUT_DIR=./build
EMCC_OPTS=-O3 --llvm-lto 1 --memory-init-file 0 --closure 1 -s NO_FILESYSTEM=1 -s NO_BROWSER=1
DEFAULT_EXPORTS:='_free','_malloc'

LIBOPUS_ENCODER_WORKER=$(INPUT_DIR)/encoderWorker.js
LIBOPUS_DECODER_WORKER=$(INPUT_DIR)/decoderWorker.js
LIBOPUS_ENCODER=$(OUTPUT_DIR)/encoderWorker.min.js
LIBOPUS_DECODER=$(OUTPUT_DIR)/decoderWorker.min.js
LIBOPUS_STABLE=tags/v1.1.2
LIBOPUS_DIR=./opus
LIBOPUS_OBJ=$(LIBOPUS_DIR)/.libs/libopus.a
LIBOPUS_ENCODER_EXPORTS:='_opus_encoder_create','_opus_encode_float','_opus_encoder_ctl'
LIBOPUS_DECODER_EXPORTS:='_opus_decoder_create','_opus_decode_float','_opus_decoder_destroy'

LIBSPEEXDSP_STABLE=tags/SpeexDSP-1.2rc3
LIBSPEEXDSP_DIR=./speexdsp
LIBSPEEXDSP_OBJ=$(LIBSPEEXDSP_DIR)/libspeexdsp/.libs/libspeexdsp.a
LIBSPEEXDSP_EXPORTS:='_speex_resampler_init','_speex_resampler_process_interleaved_float','_speex_resampler_destroy'

UGLIFY_PATH=./node_modules/uglify-js/bin/uglifyjs
RECORDER_PATH=$(INPUT_DIR)/recorder.js
RECORDER_OUTPUT_PATH=$(OUTPUT_DIR)/recorder.min.js
WAVE_WORKER_PATH=$(INPUT_DIR)/waveWorker.js
WAVE_WORKER_OUTPUT_PATH=$(OUTPUT_DIR)/waveWorker.min.js

default: $(LIBOPUS_ENCODER) $(LIBOPUS_DECODER) uglify
clean:
	rm -rf $(OUTPUT_DIR) $(LIBOPUS_DIR) $(LIBSPEEXDSP_DIR)
	mkdir $(OUTPUT_DIR)

test:
	mocha

.PHONY: test

$(LIBOPUS_DIR):
	git submodule update --init --recursive
	cd $(LIBOPUS_DIR); git checkout ${LIBOPUS_STABLE}

$(LIBSPEEXDSP_DIR):
	git submodule update --init --recursive
	cd $(LIBSPEEXDSP_DIR); git checkout ${LIBSPEEXDSP_STABLE}

$(LIBOPUS_OBJ): $(LIBOPUS_DIR)
	cd $(LIBOPUS_DIR); ./autogen.sh
	cd $(LIBOPUS_DIR); emconfigure ./configure --disable-extra-programs --disable-doc
	cd $(LIBOPUS_DIR); emmake make

$(LIBSPEEXDSP_OBJ): $(LIBSPEEXDSP_DIR)
	cd $(LIBSPEEXDSP_DIR); ./autogen.sh
	cd $(LIBSPEEXDSP_DIR); emconfigure ./configure --disable-examples 
	cd $(LIBSPEEXDSP_DIR); emmake make

$(LIBOPUS_ENCODER): $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)
	emcc -o $@ $(EMCC_OPTS) -s EXPORTED_FUNCTIONS="[$(DEFAULT_EXPORTS),$(LIBOPUS_ENCODER_EXPORTS),$(LIBSPEEXDSP_EXPORTS)]" --post-js $(LIBOPUS_ENCODER_WORKER) $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)

$(LIBOPUS_DECODER): $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)
	emcc -o $@ $(EMCC_OPTS) -s EXPORTED_FUNCTIONS="[$(DEFAULT_EXPORTS),$(LIBOPUS_DECODER_EXPORTS),$(LIBSPEEXDSP_EXPORTS)]" --post-js $(LIBOPUS_DECODER_WORKER) $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)

uglify:
	$(UGLIFY_PATH) $(RECORDER_PATH) -c -m -o $(RECORDER_OUTPUT_PATH)
	$(UGLIFY_PATH) $(WAVE_WORKER_PATH) -c -m -o $(WAVE_WORKER_OUTPUT_PATH)
