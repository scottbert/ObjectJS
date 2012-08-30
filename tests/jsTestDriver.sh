#!/bin/sh
java -jar JsTestDriver.jar --port 6789 --config objectjs-test-all.conf &
sleep 2;
echo Now visit http://localhost:6789 in some browsers to capture at least one.
