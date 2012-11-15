#!/bin/sh
JSTD_DIR=lib;
cd $JSTD_DIR || {
	echo "Can't change directory to $JSTD_DIR";
	exit $E_XC;
}
java -jar JsTestDriver.jar --port 6789 &
sleep 2;
echo Now visit http://localhost:6789 in some browsers to capture at least one.
