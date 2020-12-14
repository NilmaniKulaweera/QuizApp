import React from 'react';
import QuestionObject from '../../models/QuestionObject';
import { nextQuestion, endQuiz } from '../../services/SocketIoService';
import { Redirect } from 'react-router-dom';

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
                answersList = <ul>
                    {this.state.questionObject.answers.map((value, index) => {
                        return <li key={index}>{value.answer}</li>
                    })}
                </ul>
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