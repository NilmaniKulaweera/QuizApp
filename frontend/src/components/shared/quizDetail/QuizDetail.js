import React from 'react';
import './QuizDetail.css';
import { Link } from 'react-router-dom';

const QuizDetail = (props) => {
    const { quizObject } = props;

    return (
        <div className="quiz-details pa2">
            <div>
                <h1>Quiz Details</h1>
            </div>
            <div className="card-content" style={{width: "100%"}}>
                <p className="fw9">Quiz Id</p>
                <p>{ quizObject.quizId }</p>
                <p className="fw9">Quiz Title</p>
                <p>{ quizObject.quizTitle }</p>
                <p className="fw9">Number of Questions</p>
                <p>{ quizObject.numberOfQuestions }</p>
                <Link to="/Home/quiz">
                        <button className='tc pa3 ba b--black bg-black white br2' style={{cursor: "pointer", width: "100%"}}>Start Quiz</button>
                </Link>
            </div>
        </div>
    );
}
    
export default QuizDetail;