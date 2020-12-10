export default class QuestionObject{
    questionId;
    correspondingQuizId;
    question;
    correctAnswerId;

    constructor(questionId, correspondingQuizId, question, correctAnswerId) {
        this.questionId = questionId;
        this.correspondingQuizId = correspondingQuizId;
        this.question = question;
        this.correctAnswerId = correctAnswerId;
    }
}
