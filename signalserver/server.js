var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('create',function(room){
        socket.join(room);
        socket.emit('roomcreated',room);
        // console.log(io.sockets.adapter.rooms);
        // if(io.sockets.adapter.rooms[room]){
        //     socket.emit('roomexists','Room : ' + room + ' exists');
        // }
        // else{
        //     socket.join(room);
        //     socket.emit('roomcreated','created room: ' + room);
        // }
    });
    socket.on('join',function(data){
        console.log(data);
        socket.join(data.room);
        socket.to(data.room).emit('newuser',data.username);
    });
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
});

http.listen(3000,()=>{
    console.log('listening on *:3000');
});

