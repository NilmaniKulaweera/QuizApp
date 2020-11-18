import React from 'react';
import './Home.css';
import { getQuizDetails } from '../../services/BackEndService';
import QuizObject from '../../models/QuizObject';

class Home extends React.Component {
    componentDidMount() {
        var quizObject = new QuizObject();
        quizObject = getQuizDetails()[0];
        console.log(quizObject.quizId);
        console.log(quizObject.quizTitle);
        console.log(quizObject.numberOfQuestions); 
    }


    render() {
        return (
            <div className='home-page-container'>
                Home Page
            </div>        
        )
    }
}

export default Home;