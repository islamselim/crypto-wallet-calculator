/**
 * @author  Brett McLain
 * @summary Used to traverse each day's currency positions JSON file and calculate the balance for each day. 
 * @usage   node balance-line.js 2017-08-20 
*/
global.fetch = require('../node_modules/node-fetch');
const cc = require('../node_modules/cryptocompare');
const fs = require('fs');
let data = [];
let epochDate = new Date(process.argv[2] + ' 12:00');
let counter = 0;
while (1) {
    epochDate.setDate(epochDate.getDate() + 1);
    let positions;
    try {
        let filepath = '../data/raw/' + epochDate.toISOString().substring(0, 10).replace(/-/g, '')+'.json';
        positions = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } catch (err) {
        break;
    }
    let totalValue = 0;
    let btcValue = 0;
    for (var symbol in positions) {
        totalValue += parseFloat(positions[symbol].position);
        if (positions[symbol].symbol === 'BTC') {
            btcValue = parseInt(positions[symbol].price) * 0.07214178; 
        }
    }
    data.push({
        date: epochDate.toISOString().substring(0, 10),
        id: "31 Cryptocurrencies",
        balance: totalValue
    });
    data.push({
        date: epochDate.toISOString().substring(0, 10),
        id: "Bitcoin",
        balance: btcValue
    });
    counter++;
}
fs.writeFileSync('../data/balances/'+(new Date().toISOString().substring(0, 10).replace(/-/g,''))+'-balance-vs-btc.json', JSON.stringify(data));
