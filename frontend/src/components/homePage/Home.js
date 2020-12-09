import React from 'react';
import './Home.css';
import { getQuizDetails } from '../../services/BackEndService';
import QuizDetail from '../shared/quizDetail/QuizDetail';
import RoomDetail from '../shared/roomDetail/RoomDetail';
import QuizObject from '../../models/QuizObject';
import { emitCreateRoom, isSocketConnected, socketInstantiatedObservable, roomcreatedObservable, newUserJoinedObservable, disconnectPeerObservable } from '../../services/SocketIoService';

let socketInstantiatedSubscription;
let roomcreatedSubscription;
let newUserJoinedSubscription;
let disconnectPeerSubscription;

class Home extends React.Component {
    pinNumber = this.getRandomInt(1,100000).toString();
    
    constructor() {
        super();
        this.state = {
            pinNumber: null,
            quizObject: new QuizObject(),
            usernames: [],
        }
    }
    
    componentDidMount() {
        this.subscribeToObservables();
        this.setState({quizObject: getQuizDetails()[0], usernames: []});
    }

    componentWillUnmount() {
        this.unsubscribeFromObservables();
    }

    subscribeToObservables = () => {
        socketInstantiatedSubscription = socketInstantiatedObservable.subscribe((value) => {
            isSocketConnected();
            if (value === 1) {
                emitCreateRoom(this.pinNumber);
            }
        });

        roomcreatedSubscription = roomcreatedObservable.subscribe((room) => {
            if (room != null) {
                console.log("room created", room);
                this.setState({pinNumber: room});
            }
        });

        newUserJoinedSubscription = newUserJoinedObservable.subscribe((username) => {
            if (username != null) {
                this.state.usernames.push(username);
                this.setState({usernames: this.state.usernames});
                console.log("new peer joined", username);
            }
        });

        disconnectPeerSubscription = disconnectPeerObservable.subscribe((username) => {
                if (username != null) {
                var index = this.state.usernames.indexOf(username);
                if (index > -1) {
                    this.state.usernames.splice(index, 1);
                }
                this.setState({usernames: this.state.usernames});
                console.log("peer left", username);
            }
        });
    }

    unsubscribeFromObservables() {
        socketInstantiatedSubscription.unsubscribe();
        roomcreatedSubscription.unsubscribe();
        newUserJoinedSubscription.unsubscribe();
        disconnectPeerSubscription.unsubscribe();
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
                <RoomDetail roomId={this.state.pinNumber} usernames={this.state.usernames}></RoomDetail>
            </div>        
        )
    }
}

export default Home;