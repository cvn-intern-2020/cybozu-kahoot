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

router.post('/', ensureAuthenticated, addQuizController);

router.get('/', ensureAuthenticated, getQuizzesController);

router.get('/:quizId', ensureAuthenticated, getSingleQuizController);

router.put('/:quizId', ensureAuthenticated, updateQuizController);

router.delete('/:quizId', ensureAuthenticated, deleteQuizController);

router.post('/:quizId/clone', ensureAuthenticated, cloneQuizController);

module.exports = router;
