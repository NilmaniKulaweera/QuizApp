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
    pinNumber = this.getRandomInt(1,100000);

    constructor() {
        super();
        this.state = {
            quizObject: QuizObject
        }
    }
    
    componentDidMount() {
        this.setState({quizObject: getQuizDetails()[0]});
        this.setSocketConnection();
        this.addSocketListeners();
    }

    setSocketConnection() {
        socket = io(ENDPOINT);
        socket.emit('create', this.pinNumber);
    }

    addSocketListeners() {
        socket.on('roomcreated', function(room){
            console.log("room created", room);
        })
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
                <RoomDetail roomId={this.pinNumber}></RoomDetail>
            </div>        
        )
    }
}

export default Home;