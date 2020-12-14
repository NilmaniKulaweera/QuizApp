import React from 'react';
import QuestionObject from '../../models/QuestionObject';
import { nextQuestion } from '../../services/SocketIoService';


let nextquestionSubscribed;
class Play extends React.Component {
    questions = [];

    constructor() {
        super();
        this.state = {
            questionObject: new QuestionObject(),
            questionNumber: 0,
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
    }

    unsubscribeSocketServices() {
        nextquestionSubscribed.unsubscribe();
    }

    render() {
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