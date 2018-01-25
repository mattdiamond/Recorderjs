INPUT_DIR=./src
OUTPUT_DIR=./dist
OUTPUT_DIR_UNMINIFIED=./dist-unminified
EMCC_OPTS=-O3 --llvm-lto 1 -s NO_DYNAMIC_EXECUTION=1 -s NO_FILESYSTEM=1 -s WASM=1
DEFAULT_EXPORTS:='_malloc','_free'

LIBOPUS_ENCODER_SRC=$(INPUT_DIR)/encoderWorker.js
LIBOPUS_DECODER_SRC=$(INPUT_DIR)/decoderWorker.js
LIBOPUS_ENCODER_MIN=$(OUTPUT_DIR)/encoderWorker.min.js
LIBOPUS_ENCODER=$(OUTPUT_DIR_UNMINIFIED)/encoderWorker.js
LIBOPUS_DECODER_MIN=$(OUTPUT_DIR)/decoderWorker.min.js
LIBOPUS_DECODER=$(OUTPUT_DIR_UNMINIFIED)/decoderWorker.js
LIBOPUS_DIR=./opus
LIBOPUS_OBJ=$(LIBOPUS_DIR)/.libs/libopus.a
LIBOPUS_ENCODER_EXPORTS:='_opus_encoder_create','_opus_encode_float','_opus_encoder_ctl'
LIBOPUS_DECODER_EXPORTS:='_opus_decoder_create','_opus_decode_float','_opus_decoder_destroy'

LIBSPEEXDSP_DIR=./speexdsp
LIBSPEEXDSP_OBJ=$(LIBSPEEXDSP_DIR)/libspeexdsp/.libs/libspeexdsp.a
LIBSPEEXDSP_EXPORTS:='_speex_resampler_init','_speex_resampler_process_interleaved_float','_speex_resampler_destroy'

RECORDER_MIN=$(OUTPUT_DIR)/recorder.min.js
RECORDER=$(OUTPUT_DIR_UNMINIFIED)/recorder.js
RECORDER_SRC=$(INPUT_DIR)/recorder.js

WAVE_WORKER_MIN=$(OUTPUT_DIR)/waveWorker.min.js
WAVE_WORKER=$(OUTPUT_DIR_UNMINIFIED)/waveWorker.js
WAVE_WORKER_SRC=$(INPUT_DIR)/waveWorker.js


default: $(LIBOPUS_ENCODER) $(LIBOPUS_ENCODER_MIN) $(LIBOPUS_DECODER) $(LIBOPUS_DECODER_MIN) $(RECORDER) $(RECORDER_MIN) $(WAVE_WORKER) $(WAVE_WORKER_MIN) test

clean:
	rm -rf $(OUTPUT_DIR) $(OUTPUT_DIR_UNMINIFIED) $(LIBOPUS_DIR) $(LIBSPEEXDSP_DIR)
	mkdir $(OUTPUT_DIR)
	mkdir $(OUTPUT_DIR_UNMINIFIED)

test:
	# Tests need to run relative to `dist` folder for wasm file import
	cd $(OUTPUT_DIR); node --expose-wasm ../test.js

.PHONY: test

$(LIBOPUS_DIR)/autogen.sh $(LIBSPEEXDSP_DIR)/autogen.sh:
	git submodule update --init

$(LIBOPUS_OBJ): $(LIBOPUS_DIR)/autogen.sh
	cd $(LIBOPUS_DIR); ./autogen.sh
	cd $(LIBOPUS_DIR); emconfigure ./configure --disable-extra-programs --disable-doc --disable-intrinsics --disable-rtcd
	cd $(LIBOPUS_DIR); emmake make

$(LIBSPEEXDSP_OBJ): $(LIBSPEEXDSP_DIR)/autogen.sh
	cd $(LIBSPEEXDSP_DIR); ./autogen.sh
	cd $(LIBSPEEXDSP_DIR); emconfigure ./configure --disable-examples
	cd $(LIBSPEEXDSP_DIR); emmake make

$(LIBOPUS_ENCODER): $(LIBOPUS_ENCODER_SRC) $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)
	npm run webpack -- --output-library EncoderWorker --output-library-target umd $(LIBOPUS_ENCODER_SRC) $@
	emcc -o $@ $(EMCC_OPTS) -g3 -s EXPORTED_FUNCTIONS="[$(DEFAULT_EXPORTS),$(LIBOPUS_ENCODER_EXPORTS),$(LIBSPEEXDSP_EXPORTS)]" --pre-js $@ $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)

$(LIBOPUS_ENCODER_MIN): $(LIBOPUS_ENCODER_SRC) $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)
	npm run webpack -- --output-library EncoderWorker --output-library-target umd --optimize-minimize $(LIBOPUS_ENCODER_SRC) $@
	emcc -o $@ $(EMCC_OPTS) -s EXPORTED_FUNCTIONS="[$(DEFAULT_EXPORTS),$(LIBOPUS_ENCODER_EXPORTS),$(LIBSPEEXDSP_EXPORTS)]" --pre-js $@ $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)

$(LIBOPUS_DECODER): $(LIBOPUS_DECODER_SRC) $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)
	npm run webpack -- --output-library DecoderWorker --output-library-target umd $(LIBOPUS_DECODER_SRC) $@
	emcc -o $@ $(EMCC_OPTS) -g3 -s EXPORTED_FUNCTIONS="[$(DEFAULT_EXPORTS),$(LIBOPUS_DECODER_EXPORTS),$(LIBSPEEXDSP_EXPORTS)]" --pre-js $@ $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)

$(LIBOPUS_DECODER_MIN): $(LIBOPUS_DECODER_SRC) $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)
	npm run webpack -- --output-library DecoderWorker --output-library-target umd --optimize-minimize $(LIBOPUS_DECODER_SRC) $@
	emcc -o $@ $(EMCC_OPTS) -s EXPORTED_FUNCTIONS="[$(DEFAULT_EXPORTS),$(LIBOPUS_DECODER_EXPORTS),$(LIBSPEEXDSP_EXPORTS)]" --pre-js $@ $(LIBOPUS_OBJ) $(LIBSPEEXDSP_OBJ)

$(RECORDER): $(RECORDER_SRC)
	npm run webpack -- --output-library Recorder --output-library-target umd $(RECORDER_SRC) $@

$(RECORDER_MIN): $(RECORDER_SRC)
	npm run webpack -- --output-library Recorder --output-library-target umd --optimize-minimize $(RECORDER_SRC) $@

$(WAVE_WORKER): $(WAVE_WORKER_SRC)
	npm run webpack -- --output-library WaveWorker --output-library-target umd $(WAVE_WORKER_SRC) $@

$(WAVE_WORKER_MIN): $(WAVE_WORKER_SRC)
	npm run webpack -- --output-library WaveWorker --output-library-target umd --optimize-minimize $(WAVE_WORKER_SRC) $@
