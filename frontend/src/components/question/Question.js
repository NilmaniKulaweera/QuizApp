import React from 'react';
import { getQuestionDetails } from '../../services/BackEndService';
import QuestionObject from '../../models/QuizObject';

class Question extends React.Component {
    questions;

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

    getQuestions() {
        this.questions = getQuestionDetails();
        this.setState({questionObject: this.questions[this.state.questionNumber]});
    }

    buttonClicked = () => {
        this.setState({questionObject: this.questions[this.state.questionNumber + 1]});
        this.setState({questionNumber: this.state.questionNumber+1});
    }

    render() {
        console.log("render");
        return (
            <div>
                <h1>{this.state.questionObject.question}</h1>
                <h1>{this.state.questionObject.questionId}</h1>
                <button 
                        className='tc pa3 ba b--black bg-black white br2' 
                        style={{cursor: "pointer"}}
                        placeholder='Pin Number'
                        onClick={this.buttonClicked}
                    >Next Question</button>
            </div>
        );
    }
   
    
}
    
export default Question;