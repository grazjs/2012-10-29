var http = require('http');
var path = require('path');
var serveStatic = require('./serveStatic');

var wwwRoot = path.resolve(__dirname, 'wwwRoot/');
var staticHandler = serveStatic(wwwRoot);

http.createServer(function(req, res) {

    staticHandler(req, res);

}).listen(1337);