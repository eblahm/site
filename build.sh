#!/usr/bin/env bash

rm -rf src/client/dist

./node_modules/.bin/node-sass \
    -o src/client/dist/css/ \
    src/client/sass/main.scss

./node_modules/.bin/browserify \
    -t babelify \
    -o src/client/dist/index.js \
    src/client/index.js
