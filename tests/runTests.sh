#!/bin/sh
JSTD_DIR=lib;
cd $JSTD_DIR || {
	echo "Can't change directory to $JSTD_DIR";
	exit $E_XC;
}
echo "Test the uncompressed full code";
java -jar JsTestDriver.jar --server http://localhost:6789 --tests all --config ../conf/objectjs-test-all.conf;
echo "Test the compressed full code";
java -jar JsTestDriver.jar --server http://localhost:6789 --tests all --config ../conf/objectjs-test-min-all.conf;
echo "Test the compressed core code";
java -jar JsTestDriver.jar --server http://localhost:6789 --tests all --config ../conf/objectjs-test-min-core.conf;