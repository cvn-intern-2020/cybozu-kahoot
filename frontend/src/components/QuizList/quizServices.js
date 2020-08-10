import {
    getUserQuizzes,
    cloneQuizById,
    deleteQuizById,
} from '../../common/api';

const getQuizzes = () => getUserQuizzes();
const cloneQuiz = (quizId) => cloneQuizById(quizId);
const deleteQuiz = (quizId) => deleteQuizById(quizId);

export { getQuizzes, cloneQuiz, deleteQuiz };
