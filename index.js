var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//our route handler
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

//our connection event handler
io.on('connection',function(socket){
	console.log('a user connected');
	socket.on('disconnect',function(){
		console.log('user disconnected');
	});
	socket.on('chat message',function(msg){
		console.log('message: ' + msg);
		io.emit('chat message',msg);  //event broadcast
	});
});

http.listen(3000,function(){
	console.log('listening on whatever:3000');
});