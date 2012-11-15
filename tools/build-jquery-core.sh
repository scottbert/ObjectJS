#!/bin/bash
# requires node to be installed
node r.js -o requirejs-build-jquery-core.js;
gzip ../compiled/objectjs-jquery.min.js;
node r.js -o requirejs-build-jquery-core.js;