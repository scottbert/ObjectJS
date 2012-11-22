#!/bin/sh
JSTD_DIR=lib;
cd $JSTD_DIR || {
	echo "Can't change directory to $JSTD_DIR";
	exit $E_XC;
}
echo "Test the uncompressed full code in Native mode";
java -jar JsTestDriver.jar --server http://localhost:6789 --tests all --config ../conf/objectjs-test-all.conf;
echo "Test the compressed full code in Native mode";
java -jar JsTestDriver.jar --server http://localhost:6789 --tests all --config ../conf/objectjs-test-min-all.conf;
echo "Test the compressed core code in Native mode";
java -jar JsTestDriver.jar --server http://localhost:6789 --tests all --config ../conf/objectjs-test-min-core.conf;
echo "Test the compressed full code in jQuery mode";
java -jar JsTestDriver.jar --server http://localhost:6789 --tests all --config ../conf/objectjs-test-min-jquery-all.conf;
echo "Test the compressed core code in jQuery mode";
java -jar JsTestDriver.jar --server http://localhost:6789 --tests all --config ../conf/objectjs-test-min-jquery-core.conf;
echo "Test the compressed full code in Zepto mode";
java -jar JsTestDriver.jar --server http://localhost:6789 --tests all --config ../conf/objectjs-test-min-zepto-all.conf;
echo "Test the compressed core code in Zepto mode";
java -jar JsTestDriver.jar --server http://localhost:6789 --tests all --config ../conf/objectjs-test-min-zepto-core.conf;