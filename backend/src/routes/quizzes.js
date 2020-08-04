const express = require('express');

const { postQuiz, getQuizzes } = require('../controllers/quiz');
const { ensureAuthenticated } = require('../utils/auth');

const router = express.Router();

router.post('/', ensureAuthenticated, postQuiz);

router.get('/', ensureAuthenticated, getQuizzes);

module.exports = router;
