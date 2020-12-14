import React from 'react';
import { getQuestionDetails } from '../../services/BackEndService';
import QuestionObject from '../../models/QuizObject';
import './Question.css';
import { emitSendQuestion, emitEndQuiz, socketInstantiatedObservable } from '../../services/SocketIoService';
import { Redirect } from 'react-router-dom';

let socketInstantiatedSubscription;

class Question extends React.Component {
    questions = [];
    roomId;
    started;
    
    constructor() {
        super();
        this.state = {
            questionObject: new QuestionObject(),
            questionNumber: 0,
            end: false,
        }
    }
    componentDidMount() {
        console.log(this.props.history);
        this.started = this.props.location.started;
        this.roomId = this.props.location.roomId;
        if(this.started === true) {
            this.getQuestions();
        }
    }

    componentDidUpdate() {
        if (this.started !== true) {
            this.props.history.push("/Home");
        }
    }

    componentWillUnmount() {
        if(socketInstantiatedSubscription){
            socketInstantiatedSubscription.unsubscribe();
        }
    }

    getQuestions() {
        this.questions = getQuestionDetails();
        console.log(this.questions);
        this.setState({questionObject: this.questions[this.state.questionNumber]});
        socketInstantiatedSubscription = socketInstantiatedObservable.subscribe((value) => {
            if (value === 1) {
                emitSendQuestion({
                    roomId: this.roomId,
                    questionId: this.questions[0].questionId,
                    correspondingQuizId: this.questions[0].correspondingQuizId,
                    question: this.questions[0].question, 
                    answers: this.questions[0].answers
                });
            }
        });        
    }

    nextbuttonClicked = () => {
        emitSendQuestion({
            roomId: this.roomId,
            questionId: this.questions[this.state.questionNumber + 1].questionId, 
            correspondingQuizId: this.questions[this.state.questionNumber + 1].correspondingQuizId, 
            question: this.questions[this.state.questionNumber + 1].question, 
            answers: this.questions[this.state.questionNumber + 1].answers
        });
        this.setState({questionObject: this.questions[this.state.questionNumber + 1]});
        this.setState({questionNumber: this.state.questionNumber+1});
    }

    endbuttonClicked = () => {
        emitEndQuiz({
            roomId: this.roomId,
            quizId: this.questions[0].correspondingQuizId
        })
        this.setState({end: true});
    }

    renderButton() {
        if ((this.state.questionNumber + 1) !== this.questions.length) {
            return (
                <button 
                            className='tc pa3 ba b--black bg-black white br2' 
                            style={{cursor: "pointer"}}
                            placeholder='Pin Number'
                            onClick={this.nextbuttonClicked}
                        >Next Question</button>
            );
        } else {
            return (
                <button 
                    className='tc pa3 ba b--black bg-black white br2' 
                    style={{cursor: "pointer"}}
                    placeholder='Pin Number'
                    onClick={this.endbuttonClicked}
                >End</button>           
            );
        }
    }
   
    render() {
        if (this.state.end === true) {
            return <Redirect to="/" />
        }
        return (
            <div className="quiz-details pa2">
                <div>
                    <h1>Questions</h1>
                </div>
                <div className="card-content" style={{width: "100%"}}>
                    <h3>question number {this.state.questionNumber + 1} out of {this.questions.length}</h3>
                    <p className="fw9">Question Id</p>
                    <p>{this.state.questionObject.questionId}</p>
                    <p className="fw9">Question</p>
                    <p>{this.state.questionObject.question}</p>
                    {this.renderButton()}
                </div>
            </div>
        );
    }
        
}

    
export default Question;