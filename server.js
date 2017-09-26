var connect = require('connect');
var serveStatic = require('serve-static');
var spawn = require('child_process').spawn;
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080');
    var phantom = spawn('phantomjs', [ 'bin/image-render.js' ]);
    phantom.on('close', function(code) {
        console.log('PhantomJS script is complete with code ' + code);
        process.exit();
    });
});
