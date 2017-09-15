global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const fs = require('fs');
let wallet = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let currencyMap = JSON.parse(fs.readFileSync('./currency-map.json', 'utf8'));
console.log(currencyMap["AEON"]);
for (var i = 0; i < wallet.length; i++) {
    wallet[i].name = currencyMap[wallet[i].symbol];
}
console.log(JSON.stringify(wallet));
