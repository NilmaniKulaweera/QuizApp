import { quizDetails, questionDetails } from '../data/Data';
import QuizObject from '../models/QuizObject';
import QuestionObject from '../models/QuestionObject';

// get the list of quizzes for the user
export const getQuizDetails = () => {
        var quizObjectsArray = JSON.parse(quizDetails).map((quiz) => {
            return new QuizObject(quiz.quizId, quiz.quizTitle, quiz.numberOfQuestions);
        });
        return quizObjectsArray;
    }

export const getQuestionDetails = () => {
        var questionObjectArray = JSON.parse(questionDetails).map((question) => {
            return new QuestionObject(question.questionId, question.correspondingQuizId, question.question, question.correctAnswerId);
        });
        return questionObjectArray;
    }
