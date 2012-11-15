#!/bin/bash
# REQUIRES NODEJS TO BE INSTALLED TO BUILD.
TOOLS_DIR=tools;
COMPILE_DIR=compiled;

cd $COMPILE_DIR || {
	echo "Can't change to $COMPILE_DIR";
	exit $E_XC;
}
rm -rf *;
cd ..
cd $TOOLS_DIR || {
	echo "Can't change to $TOOLS_DIR";
	exit $E_XC;
}
./build-native-all.sh;
./build-native-core.sh;
./build-jquery-all.sh;
./build-jquery-core.sh;
cd ../$COMPILE_DIR || {
	echo "Can't change to $COMPILE_DIR";
	exit $E_XC;
}
cp -av * ../
exit 0;