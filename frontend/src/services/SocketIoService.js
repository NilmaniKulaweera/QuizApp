import { BehaviorSubject } from 'rxjs';
import io from 'socket.io-client';

let socket;
const ENDPOINT = 'localhost:3000';

export const socketInstantiatedObservable = new BehaviorSubject();
export const roomcreatedObservable = new BehaviorSubject();
export const newUserJoinedObservable = new BehaviorSubject();
export const disconnectPeerObservable = new BehaviorSubject();
export const joinSuccessfull = new BehaviorSubject();
export const nextQuestion = new BehaviorSubject();

export function setSocketConnection() {
    socket = io(ENDPOINT);
    socketInstantiatedObservable.next(1);
}

export function disconnectSocketConnection() {
    socket.off();
    console.log("socket disconnected")
}

export function addSocketListeners() {
    
    socket.on('roomcreated', (room) => {
        console.log(socket.id);
        roomcreatedObservable.next(room);
    });

    socket.on('newuser', (username) => {
        newUserJoinedObservable.next(username);
    });

    socket.on('disconnectPeer', (username) => {
        disconnectPeerObservable.next(username);
    });
    socket.on('joinsuccess',(data)=>{
        console.log('join fired',data);
        joinSuccessfull.next(data);
    });
    socket.on('nextquestion',(data)=>{
        nextQuestion.next(data);
    });
    console.log("socket listeners added");
}

export function emitCreateRoom(room) {
    socket.emit('create', room);
}

export function emitJoinRoom(data) {
    socket.emit('join', data);
}

export function emitDisconnectPeer(data) {
    socket.emit('disconnectPeer', data);
}

export function emitSendQuestion(questionData) {
    console.log("emitted question to peers: ", questionData);
    socket.emit('sendQuestion', questionData);
}

export function emitEndQuiz(data) {
    console.log("emitted end quiz to peers: ", data);
    socket.emit('endQuiz', data);
}

export function isSocketConnected() {
    //console.log ("socket connected", socket.connected);
    if(socket){
        return socket.connected;
    }else {
        return false;
    }
    
}

