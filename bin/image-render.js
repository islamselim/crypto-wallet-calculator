/**
 * @author  Brett McLain
 * @summary Navigates to each HTML chart in the project and passes meta data in via the URL to render charts that have relevant dates/meta info. Uses phantomjs to render and image capture each chart in order to save and preserve it.
 * @usage   
*/
var fs = require('fs');

var weeks = {
    "2017-09-24": 6,
    "2017-10-01": 7,
    "2017-10-08": 8,
    "2017-10-15": 9,
    "2017-10-22": 10,
    "2017-10-29": 11,
    "2017-11-05": 12,
    "2017-11-12": 13,
    "2017-11-19": 14,
    "2017-11-26": 16,
    "2017-12-03": 17,
    "2017-12-10": 18,
    "2017-12-17": 19,
    "2017-12-24": 20,
    "2017-12-31": 21
};
var baseUrl = 'http://blog.mclain.ca:8080';
var curDate = new Date();
curDate.setDate(curDate.getDate() - curDate.getDay());
var fromDate = new Date();
fromDate.setDate(curDate.getDate() - 7);
fromDate = fromDate.toISOString().substring(0, 10);
curDate = curDate.toISOString().substring(0, 10);
var week = weeks[curDate];
var imageDestinationPath = 'data/images/week' + week + '/';
fs.makeDirectory(imageDestinationPath);
console.log("Week: " + week + ". Current Date: " + curDate + ". Previous week: " + fromDate);
var metaInfo = [
    { url: baseUrl + '/html/balance-line.html?date=' + curDate + '&weekNum=' + week,
      filename: 'week' + week + '_balance.png',
      jobName: "Balance Chart"
    },
    { url: baseUrl + '/html/barchart.html?date=' + curDate + '&weekNum=' + week,
      filename: 'week' + week + '_positions.png',
      jobName: "Positions Chart"
    },
    { url: baseUrl + '/html/currency-lines.html?date=' + curDate + '&weekNum=' + week,
      filename: 'week' + week + '_multiline.png',
      jobName: "Multiline Chart"
    },
    { url: baseUrl + '/html/diverge.html?fromDate=' + fromDate + '&toDate=' + curDate + '&weekNum=' + week + '&type=u',
      filename: 'week' + week + '_usd.png',
      jobName: "Diverging USD"
    },
    { url: baseUrl + '/html/diverge.html?fromDate=' + fromDate + '&toDate=' + curDate + '&weekNum=' + week + '&type=up',
      filename: 'week' + week + '_usd_percent.png',
      jobName: "Diverging USD Percent"
    },
    { url: baseUrl + '/html/diverge.html?fromDate=' + fromDate + '&toDate=' + curDate + '&weekNum=' + week + '&type=b',
      filename: 'week' + week + '_btc.png',
      jobName: "Diverging BTC"
    },
    { url: baseUrl + '/html/diverge.html?fromDate=' + fromDate + '&toDate=' + curDate + '&weekNum=' + week + '&type=bp',
      filename: 'week' + week + '_btc_percent.png',
      jobName: "Diverging BTC Percent"
    }
];
var queue = [];
for (var i = 0; i < metaInfo.length; i++) {
    queue.push({});
    openPage(metaInfo[i]);
}
function openPage(info) {
    var page = require('webpage').create(); 
    page.onCallback = function(data) {
        console.log(info.jobName + " page rendered.");
        page.render(imageDestinationPath + info.filename); 
        queue.pop();
    };
    page.open(info.url);
}
//Wait until all jobs are done.
setInterval(function() {
    if (queue.length == 0) {
        phantom.exit();
    }
}, 500);
