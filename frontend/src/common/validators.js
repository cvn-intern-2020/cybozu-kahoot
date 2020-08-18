const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^.{6,128}$/;
const USERNAME_REGEX = /^.{1,15}$/;
const PIN_REGEX = /^\d{6}$/;
const MAX_QUIZ_TITLE_LENGTH = 90;
const MAX_QUESTION_LENGTH = 250;
const MAX_TIME = 60;
const MAX_POINT = 10000;
const MAX_ANSWER_LENGTH = 100;
const MIN_TIME = 10;
const MIN_POINT = 100;

const validateUser = (user) => {
    if (user.email === undefined || !user.email)
        return { error: 'User Email cannot be empty.' };

    if (!EMAIL_REGEX.test(user.email)) return { error: 'Invalid email.' };

    if (user.password === undefined || !user.password)
        return { error: 'Password cannot be empty.' };

    if (!PASSWORD_REGEX.test(user.password))
        return { error: 'Password must be between 6 and 128 characters.' };

    return { success: 'success' };
};

const validatePassword = (password) => {
    if (password === undefined || !password)
        return { error: 'Password cannot be empty.' };

    if (!PASSWORD_REGEX.test(password))
        return { error: 'Password must be between 6 and 128 characters.' };

    return { success: 'success' };
};

const validatePIN = (PIN) => {
    if (PIN === undefined || !PIN) return { error: 'PIN cannot be empty.' };

    if (!PIN_REGEX.test(PIN)) return { error: 'Invalid PIN.' };

    return { success: 'success' };
};

const validateUsername = (username) => {
    if (username === undefined || !username)
        return { error: 'Nickname cannot be empty.' };

    if (!USERNAME_REGEX.test(username))
        return { error: 'Nickname must be between 1 and 15 characters.' };

    return { success: 'success' };
};

const validateQuiz = (quiz) => {
    if (quiz.title === undefined || !quiz.title)
        return {
            quiz: {},
            result: 'error',
            message: 'Invalid quiz title.',
        };

    quiz.title = quiz.title.toString();

    if (quiz.title.length > MAX_QUIZ_TITLE_LENGTH)
        return {
            quiz: {},
            result: 'error',
            message: `Quiz title cannot be longer than ${MAX_QUIZ_TITLE_LENGTH} characters.`,
        };

    if (!quiz.questions || quiz.questions.length === 0)
        return {
            quiz: {},
            result: 'error',
            message: 'Quiz must have at least 1 question.',
        };

    for (const ques of quiz.questions) {
        if (ques.title === undefined || !ques.title)
            return {
                quiz: {},
                result: 'error',
                message: `Question ${ques.number} cannot be empty.`,
            };

        ques.title = ques.title.toString();

        if (ques.title > MAX_QUESTION_LENGTH)
            return {
                quiz: {},
                result: 'error',
                message: `Question ${ques.number} cannot be longer than ${MAX_QUESTION_LENGTH} characters.`,
            };

        if (ques.timeLimit < MIN_TIME)
            return {
                quiz: {},
                result: 'error',
                message: `Time limit of question ${ques.number} cannot be smaller than ${MIN_TIME}s.`,
            };

        if (ques.timeLimit > MAX_TIME)
            return {
                quiz: {},
                result: 'error',
                message: `Time limit of question ${ques.number} cannot be larger than ${MAX_TIME}s.`,
            };

        if (ques.point < MIN_POINT)
            return {
                quiz: {},
                result: 'error',
                message: `Point of question ${ques.number} cannot be smaller than ${MIN_POINT}.`,
            };

        if (ques.point > MAX_POINT)
            return {
                quiz: {},
                result: 'error',
                message: `Point of question ${ques.number} cannot be larger than ${MAX_POINT}.`,
            };

        for (const ans of ques.answers) {
            if (ans.title === undefined || !ans.title)
                return {
                    quiz: {},
                    result: 'error',
                    message: `Answer of question ${ques.number} cannot be empty.`,
                };

            ans.title = ans.title.toString();

            if (ans.title.length > MAX_ANSWER_LENGTH)
                return {
                    quiz: {},
                    result: 'error',
                    message: `Answer of question ${ques.number} cannot be longer than ${MAX_ANSWER_LENGTH} characters.`,
                };
        }

        for (const correctAnswer of ques.correctAnswers) {
            if (
                ques.answers.findIndex(
                    (answer) => answer.id === correctAnswer
                ) === -1
            )
                return {
                    quiz: {},
                    result: 'error',
                    message: `The correct answers of question ${ques.number} are invalid.`,
                };
        }

        const correctAnswerNum = ques.correctAnswers.length;

        if (correctAnswerNum === 0)
            return {
                quiz: {},
                result: 'error',
                message: `Question ${ques.number} cannot have no answer.`,
            };

        if (ques.type === 'single' && correctAnswerNum > 1)
            return {
                quiz: {},
                result: 'error',
                message: `Single type question cannot have more than one answer (question ${ques.number}).`,
            };

        if (correctAnswerNum > 4)
            return {
                quiz: {},
                result: 'error',
                message: `The correct answers of question ${ques.number} are invalid.`,
            };
    }

    return { quiz, result: 'success' };
};

export {
    validateUser,
    validateUsername,
    validatePassword,
    validateQuiz,
    validatePIN,
};
