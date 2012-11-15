#!/bin/bash
# requires node to be installed
node r.js -o requirejs-build-jquery-all.js;
gzip ../compiled/objectjs-jquery-all.min.js;
node r.js -o requirejs-build-jquery-all.js;