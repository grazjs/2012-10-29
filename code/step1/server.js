var http = require('http');

http.createServer(function(req, res) {

    res.writeHead(200, {'content-type'});
    res.end('hello graz.js');

}).listen(1337);