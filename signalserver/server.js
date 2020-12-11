var app = require('express')();
var http = require('http').createServer(app);
// var io = require('socket.io')(http);

var io = require('socket.io')(http, {
    cors: {
       origin: "http://localhost:3001",
    }
});

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
        io.to(socket.id).emit('joinsuccess','done');
        socket.to(data.room).emit('newuser',data.username);
    });
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });

    //added
    socket.on('disconnectPeer',function(data){
        console.log('peer disconnected');
        socket.to(data.room).emit('disconnectPeer',data.username);
    });
    socket.on('sendQuestion',function(question){
        console.log('question received: ');
        console.log(question.questionId + " : " + question.question);
        console.log('answer 1: ', question.answers[0].answer);
        console.log('answer 2: ', question.answers[1].answer);
    });
});

http.listen(3000,()=>{
    console.log('listening on *:3000');
});


