#!/usr/bin/env bash

./src/scripts/clean.sh

./node_modules/.bin/concurrently \
"./node_modules/.bin/watch './src/scripts/bundle.sh' src/client/js" \
"./node_modules/.bin/watch './src/scripts/sass.sh' src/client/sass" \
"./node_modules/.bin/nodemon \
    -i src/client/js \
    -i src/client/sass \
    -e js,css,json,html \
    -x bash -c 'npm start'"
