var app = require('express')();
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});



var WebSocket = require('faye-websocket'),
    path = require('path'),
    http = require('http');

var server = http.createServer(app);

server.on('upgrade', function (request, socket, body) {
    if (WebSocket.isWebSocket(request)) {
        var ws = new WebSocket(request, socket, body);

        ws.on('open', function (event) {
            console.log('open');
            ws.send('connect success');
        });

        ws.on('message', function (event) {
            console.log(event.data);
            ws.send(event.data);
        });

        ws.on('close', function (event) {
            console.log('close', event.code, event.reason);
            ws = null;
        });
    }
});

server.listen(10000);