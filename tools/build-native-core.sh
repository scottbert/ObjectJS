#!/bin/bash
# requires node to be installed
node r.js -o requirejs-build-native-core.js;
gzip ../compiled/objectjs.min.js;
node r.js -o requirejs-build-native-core.js;