const express = require('express');

const {
  addQuizController,
  getQuizzesController,
} = require('../controllers/quiz');
const { ensureAuthenticated } = require('../utils/auth');

const router = express.Router();

router.post('/', ensureAuthenticated, addQuizController);

router.get('/', ensureAuthenticated, getQuizzesController);

module.exports = router;
