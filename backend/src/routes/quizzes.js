const express = require('express');

const {
  addQuizController,
  getQuizzesController,
  getSingleQuizController,
  updateQuizController,
} = require('../controllers/quiz');
const { ensureAuthenticated } = require('../utils/auth');

const router = express.Router();

router.post('/', ensureAuthenticated, addQuizController);

router.get('/', ensureAuthenticated, getQuizzesController);

router.get('/:quizId', ensureAuthenticated, getSingleQuizController);

router.put('/:quizId', ensureAuthenticated, updateQuizController);

module.exports = router;
