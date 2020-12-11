export default class QuestionObject{
    questionId;
    correspondingQuizId;
    question;
    correctAnswerId;
    answers;

    constructor(questionId, correspondingQuizId, question, correctAnswerId, answers) {
        this.questionId = questionId;
        this.correspondingQuizId = correspondingQuizId;
        this.question = question;
        this.correctAnswerId = correctAnswerId;
        this.answers = answers;
    }
}
