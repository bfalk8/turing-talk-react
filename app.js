var path = require('path');
var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);
io.on('connection', (socket) => {
  console.log('SocketIO: user connected :)');
  socket.emit('init', 'Welcome to Turing Talk');

  socket.on('disconnect', () => {
    console.log('SocketIO: user disconnected :(');
  });

  socket.on('chat message', (msg) => {
    // console.log('SocketIO: message received');
    if(msg.length < 1) return;
    io.emit('chat message', msg);
  });
});

app.use('/', express.static(path.join(__dirname, 'public')));

server.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000');
});
