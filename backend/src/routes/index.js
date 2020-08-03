const express = require('express');

const auth = require('./auth');
const quiz = require('./quizzes');

const router = express.Router();

router.use('/auth', auth);
router.use('/quizzes', quiz);

module.exports = router;
