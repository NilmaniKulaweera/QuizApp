import React from 'react';
import { getQuestionDetails } from '../../services/BackEndService';
import QuestionObject from '../../models/QuizObject';
import './Question.css';
import { emitSendQuestion, socketInstantiatedObservable } from '../../services/SocketIoService';

let socketInstantiatedSubscription;

class Question extends React.Component {
    questions = [];

    constructor() {
        super();
        this.state = {
            questionObject: new QuestionObject(),
            questionNumber: 0,
        }
    }
    componentDidMount() {
        this.getQuestions();
    }

    componentWillUnmount() {
        socketInstantiatedSubscription.unsubscribe();
    }

    getQuestions() {
        this.questions = getQuestionDetails();
        this.setState({questionObject: this.questions[this.state.questionNumber]});
        socketInstantiatedSubscription = socketInstantiatedObservable.subscribe((value) => {
            if (value === 1) {
                emitSendQuestion(this.questions[0].question);
            }
        });        
    }

    buttonClicked = () => {
        emitSendQuestion(this.questions[this.state.questionNumber + 1].question);
        this.setState({questionObject: this.questions[this.state.questionNumber + 1]});
        this.setState({questionNumber: this.state.questionNumber+1});
    }

    render() {
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
                    <button 
                            className='tc pa3 ba b--black bg-black white br2' 
                            style={{cursor: "pointer"}}
                            placeholder='Pin Number'
                            onClick={this.buttonClicked}
                        >Next Question</button>
                </div>
                
            </div>
        );
    }
}
    
export default Question;