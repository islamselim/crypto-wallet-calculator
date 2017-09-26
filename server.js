var connect = require('connect');
var serveStatic = require('serve-static');
var spawn = require('child_process').spawn;
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log(new Date().toISOString().substring(0, 19) + ' Server running on 8080.');
    var phantom = spawn('phantomjs', [ 'bin/image-render.js' ]);
    phantom.stdout.on('data', function(data) {
        process.stdout.write(new Date().toISOString().substring(0, 19) + ' ' + data.toString());
    });
    phantom.on('close', function(code) {
        console.log(new Date().toISOString().substring(0, 19) + ' PhantomJS script is complete with code ' + code);
        process.exit();
    });
});
