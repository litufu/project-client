#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.anyanggewu.shuidi/host.exp.exponent.MainActivity
