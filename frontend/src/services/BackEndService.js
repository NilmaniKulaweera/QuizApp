import { quizDetails } from '../data/Data';
import QuizObject from '../models/QuizObject';

// get the list of quizzes for the user
export const getQuizDetails = () => {
        var quizObjectsArray = JSON.parse(quizDetails).map((quiz) => {
            return new QuizObject(quiz.quizId, quiz.quizTitle, quiz.numberOfQuestions);
        });
        return quizObjectsArray;
    }
