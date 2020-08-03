const Quiz = require('../models/quiz');

const addQuiz = async (quiz) => {
  const newQuiz = new Quiz(quiz);
  newQuiz.questions = quiz.questions;
  const addedQuiz = await newQuiz.save();
  return addedQuiz;
};

const findQuizzesByUserId = (userId) => Quiz.find({ author: userId });

module.exports = {
  addQuiz,
  findQuizzesByUserId,
};
