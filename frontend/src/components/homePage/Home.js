import React from 'react';
import './Home.css';
import { getQuizDetails } from '../../services/BackEndService';
import io from 'socket.io-client';
import QuizDetail from '../shared/quizDetail/QuizDetail';
import RoomDetail from '../shared/roomDetail/RoomDetail';
import QuizObject from '../../models/QuizObject';

let socket;
const ENDPOINT = 'localhost:3000';

class Home extends React.Component {
    pinNumber = this.getRandomInt(1,100000).toString();

    constructor() {
        super();
        this.state = {
            quizObject: new QuizObject(),
            usernames: []
        }
    }
    
    componentDidMount() {
        this.setState({quizObject: getQuizDetails()[0]});
        this.setSocketConnection();
        this.addSocketListeners();
    }

    componentWillUnmount() {
        socket.emit('disconnectPeer', {username: this.state.username, room: this.state.pinNumber});
        socket.off();
        console.log("leave from room", this.state.pinNumber);
    }

    setSocketConnection() {
        socket = io(ENDPOINT);
        socket.emit('create', this.pinNumber);
    }

    addSocketListeners = () => {
        socket.on('roomcreated', (room) => {
            console.log("room created", room);
        });

        socket.on('newuser', (username) => {
            this.state.usernames.push(username);
            this.setState({usernames: this.state.usernames});
        });

        socket.on('disconnectPeer', (username) => {
            var index = this.state.usernames.indexOf(username);
            if (index > -1) {
                this.state.usernames.splice(index, 1);
            }
            this.setState({usernames: this.state.usernames});
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        return (
            <div className='home-page-container'>
                <QuizDetail quizObject={this.state.quizObject}></QuizDetail>
                <RoomDetail roomId={this.pinNumber} usernames={this.state.usernames}></RoomDetail>
            </div>        
        )
    }
}

export default Home;