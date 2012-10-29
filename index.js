var http = require('http');
var mime = require('mime');
var fs = require('fs');
var path = require('path');

var wwwRoot = path.resolve(__dirname, 'wwwRoot');
var port = process.argv[2] || 8000;
var address = process.argv[3] || '127.0.0.1'

http.createServer(function (req, res) {

    if (req.url === '/') {
        req.url = 'index.html';
    }

    var reqPath = path.resolve(wwwRoot, '.' + req.url);

    if (reqPath.indexOf(wwwRoot) !== 0) {
        res.writeHead(403, {'content-type': 'text/plain'});
        res.end('nice try');
    }

    var contentType = mime.lookup(req.url);

    var stream = fs.createReadStream('./wwwRoot/' + req.url);
    stream.on('error', function() {
        res.writeHead(404, {'content-type': 'text/plain'});
        res.end('nope');
    });

    res.writeHead(200, {'content-type': contentType});
    stream.pipe(res);

}).listen(port, address);

console.log('server listening at http://' + address + ':' + port + '/');