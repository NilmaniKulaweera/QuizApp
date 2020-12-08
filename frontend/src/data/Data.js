// get the list of quizzes for the user
export const quizDetails = `[
    {
      "quizId": "1",
      "quizTitle": "Quiz 1",
      "numberOfQuestions": 3
    },
    {
      "quizId": "2",
      "quizTitle": "Quiz 2",
      "numberOfQuestions": 3
    }
]`;

// get the list of questions when quiz id is given
export const questionDetails = `[
    {
        "questionId": "1-1",
        "correspondingQuizId": "1",
        "question": "Question 1",
        "correctAnswerId": "1-1-B"
    },
    {
        "questionId": "1-2",
        "correspondingQuizId": "1",
        "question": "Question 2",
        "correctAnswerId": "1-2-C"
    },
    {
        "questionId": "1-3",
        "correspondingQuizId": "1",
        "question": "Question 3",
        "correctAnswerId": "1-3-A"
    }
]`;

// get the list of answers when question id is given
export const answerDetails = `[
    {
        "answerId": "1-1-A",
        "correspondingQuestionId": "1-1",
        "correspondingQuizId": "1",
        "answer": "Answer 1"
    },
    {
        "answerId": "1-1-B",
        "correspondingQuestionId": "1-1",
        "correspondingQuizId": "1",
        "answer": "Answer 2"
    },
    {
        "answerId": "1-1-C",
        "correspondingQuestionId": "1-1",
        "correspondingQuizId": "1",
        "answer": "Answer 3"
    },
    {
        "answerId": "1-1-D",
        "correspondingQuestionId": "1-1",
        "correspondingQuizId": "1",
        "answer": "Answer 4"
    }
]`;
      