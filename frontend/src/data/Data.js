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

// get the list of questions with answers when quiz id is given
export const questionDetails = `[
    {
        "questionId": "1-1",
        "correspondingQuizId": "1",
        "question": "What is the capital of England ?",
        "correctAnswerId": "1-1-B",
        "answers": [
            {
                "answerId": "1-1-A",
                "answer": "New York"
            },
            {
                "answerId": "1-1-B",
                "answer": "London"
            }
        ]
    },
    {
        "questionId": "1-2",
        "correspondingQuizId": "1",
        "question": "What is 5+8 ?",
        "correctAnswerId": "1-2-A",
        "answers": [
            {
                "answerId": "1-2-A",
                "answer": "13"
            },
            {
                "answerId": "1-2-B",
                "answer": "21"
            }
        ]
    },
    {
        "questionId": "1-3",
        "correspondingQuizId": "1",
        "question": "How many main OOP concepts are there ?",
        "correctAnswerId": "1-3-A",
        "answers": [
            {
                "answerId": "1-3-A",
                "answer": "4"
            },
            {
                "answerId": "1-3-B",
                "answer": "3"
            }
        ]
    }
]`;

