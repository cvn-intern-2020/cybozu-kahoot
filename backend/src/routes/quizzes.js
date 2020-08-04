const express = require('express');

const {
  addQuizController,
  getQuizzesController,
  getSingleQuizController,
} = require('../controllers/quiz');
const { ensureAuthenticated } = require('../utils/auth');

const router = express.Router();

router.post('/', ensureAuthenticated, addQuizController);

router.get('/', ensureAuthenticated, getQuizzesController);

router.get('/:quizId', ensureAuthenticated, getSingleQuizController);

module.exports = router;
