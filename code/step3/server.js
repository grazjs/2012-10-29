var fs = require('fs');
var http = require('http');
var mime = require('mime');
var path = require('path');

var wwwRoot = path.resolve(__dirname, 'wwwRoot');

http.createServer(function(req, res) {
    if (req.method !== 'GET') {
        res.writeHead(405, {'content-type': 'text/plain'});
        return res.end('method not supported');
    }

    var reqPath = path.resolve('.' + req.url);
    if (reqPath.indexOf(wwwRoot) !== 0) {
        res.writeHead(403, {'conent-type': 'text/plain'});
        res.end('forbidden');
    }

    var stream = fs.createReadStream('.' + req.url);
    stream.on('error', function() {
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('errord');
    });
    var contentType = mime.lookup(req.url);
    res.writeHead(200, {'content-type': contentType});
    stream.pipe(res);
}).listen(1337);