import Config from '../config';

const apiUrl = `${Config.backendURL}/api`;

const registerLogin = (userData) => {
    const { email, password } = userData;
    return fetch(`${apiUrl}/auth/register_login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
        credentials: 'include',
    }).then((res) => res.json());
};

const getUser = () =>
    fetch(`${Config.backendURL}/api/auth/user`, {
        credentials: 'include',
    }).then((res) => res.json());

const logout = () =>
    fetch(`${apiUrl}/auth/logout`, {
        credentials: 'include',
    }).then((res) => res.json());

const getUserQuizzes = () =>
    fetch(`${apiUrl}/quiz`, {
        credentials: 'include',
    }).then((res) => res.json());

const getQuizById = (quizId) =>
    fetch(`${apiUrl}/quiz/${quizId}`, {
        credentials: 'include',
    }).then((res) => res.json());

const addQuiz = (quiz) =>
    fetch(`${apiUrl}/quiz`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
    }).then((res) => res.json());

const editQuizById = (quiz, quizId) =>
    fetch(`${apiUrl}/quiz/${quizId}`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
    });

const cloneQuizById = (quizId) =>
    fetch(`${apiUrl}/quiz/${quizId}/clone`, {
        credentials: 'include',
        method: 'POST',
    }).then((res) => res.json());

const deleteQuizById = (quizId) =>
    fetch(`${apiUrl}/quiz/${quizId}`, {
        credentials: 'include',
        method: 'DELETE',
    }).then((res) => res.json());

export {
    registerLogin,
    getUser,
    logout,
    getUserQuizzes,
    getQuizById,
    cloneQuizById,
    deleteQuizById,
    addQuiz,
    editQuizById,
};
