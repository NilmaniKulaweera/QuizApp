import { BehaviorSubject } from 'rxjs';
import io from 'socket.io-client';

let socket;
const ENDPOINT = 'localhost:3000';

export const socketInstantiatedObservable = new BehaviorSubject();
export const roomcreatedObservable = new BehaviorSubject();
export const newUserJoinedObservable = new BehaviorSubject();
export const disconnectPeerObservable = new BehaviorSubject();

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
    console.log ("socket connected", socket.connected);
    return socket.connected;
}

