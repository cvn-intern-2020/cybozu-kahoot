import fetchAPI from '../../common/api';

const defaultQuiz = {
    title: '',
    questions: [
        {
            number: 1,
            title: '',
            timeLimit: 15,
            point: 2000,
            answers: [
                {
                    id: 1,
                    title: '',
                    correct: true,
                },
                {
                    id: 2,
                    title: '',
                    correct: false,
                },
                {
                    id: 3,
                    title: '',
                    correct: false,
                },
                {
                    id: 4,
                    title: '',
                    correct: false,
                },
            ],
            media: {
                type: 'image',
                url: '',
            },
        },
    ],
};

const defaultQuestion = (number) => {
    return {
        number,
        title: '',
        timeLimit: 15,
        point: 2000,
        answers: [
            {
                id: 1,
                title: '',
            },
            {
                id: 2,
                title: '',
            },
            {
                id: 3,
                title: '',
            },
            {
                id: 4,
                title: '',
            },
        ],
        media: {
            type: 'image',
            url: '',
        },
        correctAnswers: [1],
    };
};

const getQuizzes = () => fetchAPI('quiz');

const cloneQuiz = (quizId) => fetchAPI(`quiz/${quizId}/clone`, 'POST');

const deleteQuiz = (quizId) => fetchAPI(`quiz/${quizId}`, 'DELETE');

const getQuiz = (quizId) => fetchAPI(`quiz/${quizId}`);

const postQuiz = (quiz) => fetchAPI(`quiz`, 'POST', quiz);

const editQuiz = (quiz, quizId) => fetchAPI(`quiz/${quizId}`, 'PUT', quiz);

const responseDataToFormData = (data) => {
    for (let i = 0; i < data.questions.length; i++) {
        for (let j = 0; j < data.questions[i].answers.length; j++) {
            if (
                data.questions[i].correctAnswers.findIndex(
                    (a) => a === data.questions[i].answers[j].id
                ) !== -1
            )
                data.questions[i].answers[j].correct = true;
            else data.questions[i].answers[j].correct = false;
        }
    }
    return data;
};

const formDataToRequestData = (data) => {
    if (!data.questions) return data;
    for (let i = 0; i < data.questions.length; i++) {
        data.questions[i].number = i + 1;
        data.questions[i].correctAnswers = [];
        for (let j = 0; j < data.questions[i].answers.length; j++) {
            data.questions[i].answers[j].id = j + 1;
            if (data.questions[i].answers[j].correct)
                data.questions[i].correctAnswers.push(j + 1);
        }
    }
    return data;
};

export {
    getQuizzes,
    cloneQuiz,
    deleteQuiz,
    getQuiz,
    postQuiz,
    editQuiz,
    responseDataToFormData,
    formDataToRequestData,
    defaultQuiz,
    defaultQuestion,
};
