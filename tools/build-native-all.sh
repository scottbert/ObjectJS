#!/bin/bash
# requires node to be installed
node r.js -o requirejs-build-native-all.js;
gzip ../compiled/objectjs-all.min.js;
node r.js -o requirejs-build-native-all.js;