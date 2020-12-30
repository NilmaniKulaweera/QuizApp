import React from 'react';
import QuestionObject from '../../models/QuestionObject';
import { nextQuestion, endQuiz, emitSendAnswer } from '../../services/SocketIoService';
import { Redirect } from 'react-router-dom';
import { Fragment } from 'react';

let nextquestionSubscribed;
let endQuizSubscription;

class Play extends React.Component {
    questions = [];

    constructor() {
        super();
        this.state = {
            questionObject: new QuestionObject(),
            questionNumber: 0,
            end: false,
        }
    }
    componentDidMount() {
        this.subscribetoSocketServices();
    }

    componentWillUnmount() {
        this.unsubscribeSocketServices();
    }

    subscribetoSocketServices() {
        nextquestionSubscribed = nextQuestion.subscribe((question) => {
            //this.state.questionObject = question;
            this.setState({ questionObject: question })
        });

        endQuizSubscription = endQuiz.subscribe((data) => {
            if (data && data.roomId === this.state.questionObject.roomId) {
                this.setState({end: true});
                console.log("quiz ended");
            }
        });
    }

    unsubscribeSocketServices() {
        nextquestionSubscribed.unsubscribe();
        endQuizSubscription.unsubscribe();
    }

    submitAnswer = (event) => {
        var ele = document.getElementsByName('answers'); 
        var answerId;
        
        for(var i = 0; i < ele.length; i++) { 
            if (ele[i].checked) {
                answerId = ele[i].value;
            } 
        } 

        emitSendAnswer({answerId: answerId, roomId: this.state.questionObject.roomId})
    }

    render() {
        if (this.state.end === true) {
            return <Redirect to="/Result" />
        }
        const questionObj = this.state.questionObject;
        console.log(questionObj);
        let questionDiv;
        let answersList;
        
        if (this.state.questionObject) {
            if (this.state.questionObject.answers) {
                // answersList = <ul>
                //     {this.state.questionObject.answers.map((value, index) => {
                //         return <li key={index}>{value.answer}</li>
                //     })}
                // </ul>
                answersList = <Fragment>
                    {this.state.questionObject.answers.map((value, index) => {
                        console.log("value",value);
                        return <Fragment key={value.answerId}><input value={value.answerId} type="radio" name="answers" />{value.answer}<br/><br/></Fragment>;
                    })}
                </Fragment>
            }
            questionDiv = <div className="card-content" style={{ width: "100%" }}>
                <h3>question number {this.state.questionNumber + 1} </h3>
                <p className="fw9">Question Id</p>
                <p>{this.state.questionObject.questionId}</p>
                <p className="fw9">Question</p>
                <p>{this.state.questionObject.question}</p>
                <p>
                    {answersList}
                </p>
                <button 
                        className='tc pa3 ba b--black bg-black white br2' 
                        style={{cursor: "pointer"}}
                        onClick={this.submitAnswer}
                    >Submit Answer</button>
            </div>;
        }
        else {
            questionDiv = <div>Waiting for question....!</div>;
        }

        return (
            <div className="quiz-details pa2">
                <div>
                    <h1>Questions</h1>
                </div>

                {questionDiv}
            </div>
        );
    }
}

export default Play;