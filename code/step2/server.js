var fs = require('fs');
var http = require('http');
var mime = require('mime');

http.createServer(function(req, res) {
    if (req.method !== 'GET') {
        res.writeHead(405, {'content-type': 'text/plain'});
        return res.end('method not supported');
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