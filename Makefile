INPUT_DIR=./src
OUTPUT_DIR=./dist
EMCC_OPTS=-O3 --llvm-lto 1 --memory-init-file 0 -s NO_DYNAMIC_EXECUTION=1 -s NO_FILESYSTEM=1
DEFAULT_EXPORTS:='_free','_malloc'

LIBOPUS_ENCODER_SRC=$(INPUT_DIR)/encoderWorker.js
LIBOPUS_DECODER_SRC=$(INPUT_DIR)/decoderWorker.js
LIBOPUS_ENCODER=$(OUTPUT_DIR)/encoderWorker.min.js
LIBOPUS_DECODER=$(OUTPUT_DIR)/decoderWorker.min.js
LIBOPUS_STABLE=tags/v1.1.4
LIBOPUS_DIR=./opus
LIBOPUS_OBJ=$(LIBOPUS_DIR)/.libs/libopus.a
LIBOPUS_ENCODER_EXPORTS:='_opus_encoder_create','_opus_encode_float','_opus_encoder_ctl'
LIBOPUS_DECODER_EXPORTS:='_opus_decoder_create','_opus_decode_float','_opus_decoder_destroy'

LIBSPEEXDSP_STABLE=tags/SpeexDSP-1.2rc3
LIBSPEEXDSP_DIR=./speexdsp
LIBSPEEXDSP_OBJ=$(LIBSPEEXDSP_DIR)/libspeexdsp/.libs/libspeexdsp.a
LIBSPEEXDSP_EXPORTS:='_speex_resampler_init','_speex_resampler_process_interleaved_float','_speex_resampler_destroy'

RECORDER=$(OUTPUT_DIR)/recorder.min.js
RECORDER_SRC=$(INPUT_DIR)/recorder.js

WAVE_WORKER=$(OUTPUT_DIR)/waveWorker.min.js
WAVE_WORKER_SRC=$(INPUT_DIR)/waveWorker.js


default: $(LIBOPUS_ENCODER) $(LIBOPUS_DECODER) $(RECORDER) $(WAVE_WORKER) test

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
	cd $(LIBOPUS_DIR); emconfigure ./configure --disable-extra-programs --disable-doc --disable-intrinsics --disable-rtcd
	cd $(LIBOPUS_DIR); emmake make

$(LIBSPEEXDSP_OBJ): $(LIBSPEEXDSP_DIR)
	cd $(LIBSPEEXDSP_DIR); ./autogen.sh
	cd $(LIBSPEEXDSP_DIR); emconfigure ./configure --disable-examples
	cd $(LIBSPEEXDSP_DIR); emmake make

$(LIBOPUS_ENCODER): $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)
	emcc -o $@ $(EMCC_OPTS) -s EXPORTED_FUNCTIONS="[$(DEFAULT_EXPORTS),$(LIBOPUS_ENCODER_EXPORTS),$(LIBSPEEXDSP_EXPORTS)]" --post-js $(LIBOPUS_ENCODER_SRC) $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)

$(LIBOPUS_DECODER): $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)
	emcc -o $@ $(EMCC_OPTS) -s EXPORTED_FUNCTIONS="[$(DEFAULT_EXPORTS),$(LIBOPUS_DECODER_EXPORTS),$(LIBSPEEXDSP_EXPORTS)]" --post-js $(LIBOPUS_DECODER_SRC) $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)

$(RECORDER):
	npm run uglify -- $(RECORDER_SRC) -c -m -o $@

$(WAVE_WORKER):
	npm run uglify -- $(WAVE_WORKER_SRC) -c -m -o $@
