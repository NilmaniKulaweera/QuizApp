import React, { useState, useEffect } from 'react';
import './Home.css';
import { getQuizDetails } from '../../services/BackEndService';
import { emitCreateRoom, isSocketConnected, socketInstantiatedObservable, roomcreatedObservable, newUserJoinedObservable, disconnectPeerObservable } from '../../services/SocketIoService';
import Question from '../question/Question';
import { Switch, Route } from 'react-router-dom';
import QuizDetail from '../../components/shared/quizDetail/QuizDetail';
import RoomDetail from '../../components/shared/roomDetail/RoomDetail';

let socketInstantiatedSubscription;
let roomcreatedSubscription;
let newUserJoinedSubscription;
let disconnectPeerSubscription;

function Home() {
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const [pinNumber, setPinNumber] = useState(getRandomInt(1,100000).toString());
    const [quizObject, setQuizObject] = useState(getQuizDetails()[0]);
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        subscribeToObservables();
        return () => {
            unsubscribeFromObservables();
        }
    }, []);

    const subscribeToObservables = () => {
        socketInstantiatedSubscription = socketInstantiatedObservable.subscribe((value) => {
            if (value === 1) {
                emitCreateRoom(pinNumber);
            }
        });

        roomcreatedSubscription = roomcreatedObservable.subscribe((room) => {
            if (room != null) {
                console.log("room created", room);
                isSocketConnected();
                setPinNumber(room);
            }
        });
        
        newUserJoinedSubscription = newUserJoinedObservable.subscribe((username) => {
            if (username != null) {
                setUsernames((usernamesList) => [...usernamesList, username]);   
                console.log("new peer joined", username);
            }
        });

        disconnectPeerSubscription = disconnectPeerObservable.subscribe((username) => {
                if (username != null) {
                setUsernames((usernamesList) => [usernamesList.filter(name => name !== username)]);
                console.log("peer left", username);
            }
        });
    }

    const unsubscribeFromObservables = () => {
        socketInstantiatedSubscription.unsubscribe();
        roomcreatedSubscription.unsubscribe();
        newUserJoinedSubscription.unsubscribe();
        disconnectPeerSubscription.unsubscribe();
    }

    return (
        <div className='quiz-details-container'>
            <QuizDetail quizObject={quizObject} roomId={pinNumber}></QuizDetail>
            <RoomDetail roomId={pinNumber} usernames={usernames}></RoomDetail>
            <Switch>
                <Route exact path="/Home/AdminQuiz" handler={Question} component={Question} />
            </Switch>
        </div>       
    )
}

export default Home;