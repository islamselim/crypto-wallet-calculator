/**
 * @author  Brett McLain
 * @summary Reads in currency balances from a JSON file (specified in argv[2]), gets the prices of those currencies, and outputs a JSON file containng the price, balance, and total position of each currency. 
 * @usage   node calculate.js 2017-08-20 
*/
global.fetch = require('../node_modules/node-fetch');
const cc = require('../node_modules/cryptocompare');
const fs = require('fs');
let wallet = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let currencyMap = JSON.parse(fs.readFileSync('./currency-map.json', 'utf8'));
let symbols = [];
let res = [];
let date = new Date().toISOString().substring(0, 10);
for (let symbol in wallet) {
    symbols.push(symbol);
}
cc.price('USD', 'BTC')
.then(btcPrice => {
    cc.priceMulti(symbols, ['USD'])
    .then(prices => {
        for (let symbol in prices) {
            wallet[symbol].position_usd = wallet[symbol].quantity * prices[symbol].USD;
            let asset = {
                date: date,
                symbol: symbol,
                name: currencyMap[symbol],
                quantity: wallet[symbol].quantity,
                price: prices[symbol].USD,
                position: wallet[symbol].quantity * prices[symbol].USD,
                btcPosition: wallet[symbol].quantity * prices[symbol].USD * btcPrice.BTC
            };
            res.push(asset);
        }
        fs.writeFileSync('../data/raw/'+date.replace(/-/g,'')+'.json', JSON.stringify(res));
    })
    .catch(console.error);
}).catch(console.error);
