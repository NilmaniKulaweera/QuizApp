import React from 'react';
import './QuizDetailContainer.css';
import QuizDetail from '../../components/shared/quizDetail/QuizDetail';
import RoomDetail from '../../components/shared/roomDetail/RoomDetail';
import {useLocation} from "react-router-dom";

const QuizDetailContainer = (props) => {

    let location = useLocation();
    console.log(location.state);
   
    return (
        <div className='quiz-details-container'>
            <QuizDetail quizObject={location.state.quizObject}></QuizDetail>
            <RoomDetail roomId={location.state.pinNumber} usernames={location.state.usernames}></RoomDetail>
        </div>
    );
    
}
    
export default QuizDetailContainer;