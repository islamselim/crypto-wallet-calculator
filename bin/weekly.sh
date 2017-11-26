#!/bin/bash
cd "$(dirname "$0")"
cd ..
node phantomjs-server.js >> weekly.log
