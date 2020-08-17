const express = require('express');

const auth = require('./auth');
const quiz = require('./quizzes');
const game = require('./game');

const router = express.Router();

router.use('/auth', auth);
router.use('/quiz', quiz);
router.use('/game', game);

module.exports = router;
