import React from 'react';
// import QuizDetail from '../../components/shared/quizDetail/QuizDetail';
import Play from './Play';
import './Quiz.css';


class Quiz extends React.Component {
    username = this.props.location.state.username;


    componentDidMount() {
    }

    componentWillUnmount() {

    }

    subscribeToObservables = () => {

    }

    render() {
        return (
            <div className='quiz-details-container'>
                {/* <QuizDetail quizObject={this.state.quizObject} roomId={this.state.pinNumber}></QuizDetail> */}
                <Play username={this.username}></Play>
            </div>
        )
    }
}

export default Quiz;