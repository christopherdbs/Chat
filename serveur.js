var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs');



app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});



io.sockets.on('connection', function(socket, pseudo){

	socket.emit('connect', '');
	socket.on('new_client', function(pseudo){
		socket.broadcast.emit('new_client',pseudo+' joined the Chatroom');
		socket.pseudo=pseudo;
	});

	socket.on('message', function(message){
		socket.broadcast.emit('message',{pseudo : socket.pseudo, message: message});
	});

	socket.on('disconnect', function(){
	io.emit('disconnect', socket.pseudo);

	});

});


server.listen(8080);