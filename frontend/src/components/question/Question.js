import React, { useState, useEffect, useContext } from 'react';
import { getQuestionDetails } from '../../services/BackEndService';
import QuestionObject from '../../models/QuizObject';
import './Question.css';
import { emitSendQuestion, emitEndQuiz, socketInstantiatedObservable, receiveAnswer } from '../../services/SocketIoService';
import { Redirect } from 'react-router-dom';
import {RoomNumberContext} from '../../App';

let socketInstantiatedSubscription;
let receiveAnswerSubscription;

function Question(props) {
    const roomNumberContext = useContext(RoomNumberContext);
  
    let started = props.location.started;
    
    const [questionObject, setQuestionObject] = useState(new QuestionObject());
    const [questionNumber, setQuestionNumber] = useState(0);
    const [end, setEnd] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if(started === true) {
            setQuestions(getQuestionDetails());   
        } 
        // to handle page refresh
        else {
            props.history.push("/Home");
        }
        subscribeToObservables();

        return (() => {
            if(socketInstantiatedSubscription){
                socketInstantiatedSubscription.unsubscribe();
            }
            unsubscribeFromObservables();
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const subscribeToObservables = () => {
        receiveAnswerSubscription = receiveAnswer.subscribe((data)=>{
            console.log("answer received: ", data);
        });
    }

    const unsubscribeFromObservables = () => {
        receiveAnswerSubscription.unsubscribe();
    }

    useEffect(() =>{
        console.log(questions);
        if (questions.length !== 0) {
            setQuestionObject(questions[questionNumber]);
            socketInstantiatedSubscription = socketInstantiatedObservable.subscribe((value) => {
                if (value === 1) {
                    emitSendQuestion({
                        roomId: roomNumberContext.roomNumberState,
                        questionId: questions[0].questionId,
                        correspondingQuizId: questions[0].correspondingQuizId,
                        question: questions[0].question, 
                        answers: questions[0].answers
                    });
                }
            });   
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions]);

    const nextbuttonClicked = () => {
        console.log(questions[questionNumber + 1]);
        emitSendQuestion({
            roomId: roomNumberContext.roomNumberState,
            questionId: questions[questionNumber + 1].questionId, 
            correspondingQuizId: questions[questionNumber + 1].correspondingQuizId, 
            question: questions[questionNumber + 1].question, 
            answers: questions[questionNumber + 1].answers
        });
        setQuestionObject(questions[questionNumber + 1]);
        setQuestionNumber(queNum => queNum + 1);
    }

    const endbuttonClicked = () => {
        emitEndQuiz({
            roomId: roomNumberContext.roomNumberState,
            quizId: questions[0].correspondingQuizId
        })
        setEnd(true);
    }

    const renderButton = () => {
        if ((questionNumber + 1) !== questions.length) {
            return (
                <button 
                    className='tc pa3 ba b--black bg-black white br2' 
                    style={{cursor: "pointer"}}
                    placeholder='Pin Number'
                    onClick={nextbuttonClicked}
                >Next Question</button>
            );
        } else {
            return (
                <button 
                    className='tc pa3 ba b--black bg-black white br2' 
                    style={{cursor: "pointer"}}
                    placeholder='Pin Number'
                    onClick={endbuttonClicked}
                >End</button>           
            );
        }
    }
 
    if (end === true) {
        return <Redirect to="/" />
    }

    if (questions.length === 0) {
        return (
            <div className="card-content" style={{width: "100%"}}>No questions</div>
        );
    } else {
        return (
            <div className="quiz-details pa2">
                <div>
                    <h1>Questions</h1>
                </div>
                <div className="card-content" style={{width: "100%"}}>
                    <h3>question number {questionNumber + 1} out of {questions.length}</h3>
                    <p className="fw9">Question Id</p>
                    <p>{questionObject.questionId}</p>
                    <p className="fw9">Question</p>
                    <p>{questionObject.question}</p>
                    {renderButton()}
                </div>
            </div>
        );
    }
    
        
}

    
export default Question;