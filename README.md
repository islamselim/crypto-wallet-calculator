# CryptoWalletCalc

This script reads from a JSON file that must contain crypto currency symbols (BTC, ETH, LTC, etc.) and their corresponding quantities. The output will be the date, symbol, quantity, price per unit (USD), and position (quantity * price per unit) in USD.

## Folder Structure:

* /bin contains the node script for pulling prices.
* /data contains data already pulled.
* /html contains html files that generate visualizations based on the json output from /bin/calculate.js

## Example input JSON:

    {
        "BTC": {
            "quantity": 10,
        }
    }

## Example output JSON:

    {
        "date":"2017-08-23",
        "symbol":"BTC",
        "name":"Bitcoin",
        "quantity":0.00248323,
        "price":4182.83,
        "position":10.386928940899999
    }

## Nightly & Weekly Scripts

Add the nightly.sh and weekly.sh scripts to your systems cron to grab data on a daily basis and generate charts and graphs on a weekly basis.

## Getting Started

Run the following in the project root:

    npm install

This will install all necessary dependencies.

## Generate Chart Images

The chart images are generated via PhantomJS. The phantomjs-server.js file is actually a node script that spins up a tiny web server to serve the html files and then fires off a phantomjs child process that runs bin/image-render.js. The image-render.js script captures an image of each chart. You can run this process with the following command:

    node phantomjs-server.js

## Viewing Charts

Run the following:

    nohup node server.js &
    
Open a browser and go to one of the following addresses to view that specific chart:

http://127.0.0.1:8080/html/barchart.html?date=2017-09-24&weekNum=6

http://127.0.0.1:8080/html/currency-lines.html?date=2017-09-24&weekNum=7

http://127.0.0.1:8080/html/balance-line.html?date=2017-09-24&weekNum=6

http://127.0.0.1:8080/html/diverge.html?fromDate=2017-09-17&toDate=2017-09-24&weekNum=6

