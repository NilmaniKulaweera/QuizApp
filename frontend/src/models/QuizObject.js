export default class QuizObject{
    quizId;
    quizTitle;
    numberOfQuestions;

    constructor(quizId, quizTitle, numberOfQuestions) {
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.numberOfQuestions = numberOfQuestions;
    }
}
