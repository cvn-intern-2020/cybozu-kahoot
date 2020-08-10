const express = require('express');

const {
    addQuizController,
    getQuizzesController,
    getSingleQuizController,
    updateQuizController,
    deleteQuizController,
    cloneQuizController,
} = require('../controllers/quiz');
const { ensureAuthenticated } = require('../utils/auth');

const router = express.Router();

router.use(ensureAuthenticated);

router.route('/').get(getQuizzesController).post(addQuizController);

router
    .route('/:quizId')
    .get(getSingleQuizController)
    .put(updateQuizController)
    .delete(deleteQuizController);

router.post('/:quizId/clone', cloneQuizController);

module.exports = router;
