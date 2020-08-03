const express = require('express');

const { postQuiz } = require('../controllers/quiz');
const { ensureAuthenticated } = require('../utils/auth');

const router = express.Router();

router.post('/', ensureAuthenticated, postQuiz);

module.exports = router;
