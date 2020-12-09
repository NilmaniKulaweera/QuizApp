import React from 'react';
import './QuizDetailContainer.css';
import QuizDetail from '../../components/shared/quizDetail/QuizDetail';
import RoomDetail from '../../components/shared/roomDetail/RoomDetail';

const QuizDetailContainer = (props) => {
    const { quizObject, roomId, usernames } = props;

    return (
        <div className='quiz-details-container'>
            <QuizDetail quizObject={quizObject}></QuizDetail>
            <RoomDetail roomId={roomId} usernames={usernames}></RoomDetail>
        </div>
    );
}
    
export default QuizDetailContainer;