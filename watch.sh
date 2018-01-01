#!/usr/bin/env bash

./node_modules/.bin/nodemon \
    -i src/client/dist \
    -e js,scss,json,html \
    -x bash -c "./build.sh && npm start"