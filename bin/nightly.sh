#!/bin/bash
cd "$(dirname "$0")"
node calculate.js wallet.json
node balance-line.js 2017-08-20
node btc-line.js 2017-08-20
node currency-lines.js 2017-08-20
