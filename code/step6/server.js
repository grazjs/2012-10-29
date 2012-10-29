var http = require('http');
var path = require('path');
var serveStatic = require('./serveStatic');

var eventSourceHandler = require('./eventSource')();
var wwwRoot = path.resolve(__dirname, 'wwwRoot/');
var staticHandler = serveStatic(wwwRoot);

http.createServer(function(req, res) {

    if (req.url === '/eventsource') {
        return eventSourceHandler.handle(req, res);
    }

    staticHandler(req, res);

}).listen(1337);

setInterval(function() {
    eventSourceHandler.send(new Date().toJSON());
}, 1000);