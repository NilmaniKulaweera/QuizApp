import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import { getQuizDetails } from '../../services/BackEndService';
import { emitCreateRoom, socketInstantiatedObservable, roomcreatedObservable, newUserJoinedObservable, disconnectPeerObservable } from '../../services/SocketIoService';
import Question from '../question/Question';
import { Switch, Route } from 'react-router-dom';
import QuizDetail from '../../components/shared/quizDetail/QuizDetail';
import RoomDetail from '../../components/shared/roomDetail/RoomDetail';
import {RoomNumberContext} from '../../App';

let socketInstantiatedSubscription;
let roomcreatedSubscription;
let newUserJoinedSubscription;
let disconnectPeerSubscription;

function Home() {
    const roomNumberContext = useContext(RoomNumberContext);

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [quizObject, setQuizObject] = useState(getQuizDetails()[0]);
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        console.log("home mounted");
        roomNumberContext.roomNumberDispatch({type:'setRoomNumber', value: getRandomInt(1,100000).toString()});
        
        subscribeToObservables();
        return () => {
            unsubscribeFromObservables();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socketInstantiatedSubscription = socketInstantiatedObservable.subscribe((value) => {
            if (value === 1) {
                if(roomNumberContext.roomNumberState !== null) {
                    emitCreateRoom(roomNumberContext.roomNumberState);
                }
            }
        });
        return () => {
            socketInstantiatedSubscription.unsubscribe();
        }
    }, [roomNumberContext.roomNumberState]);

    const subscribeToObservables = () => {
        roomcreatedSubscription = roomcreatedObservable.subscribe((room) => {
            if (room != null) {
                console.log("room created", room);
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
        roomcreatedSubscription.unsubscribe();
        newUserJoinedSubscription.unsubscribe();
        disconnectPeerSubscription.unsubscribe();
    }

    return (
        <div className='quiz-details-container'>
            <QuizDetail quizObject={quizObject}></QuizDetail>
            <RoomDetail usernames={usernames}></RoomDetail>
            <Switch>
                <Route exact path="/Home/AdminQuiz" handler={Question} component={Question} />
            </Switch>
        </div>       
    )
}

export default Home;