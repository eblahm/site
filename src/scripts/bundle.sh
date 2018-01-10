#!/usr/bin/env bash

mkdir -p src/client/dist/js

./node_modules/.bin/browserify \
    -t babelify \
    -d \
    -o src/client/dist/index.js \
    src/client/js/index.js