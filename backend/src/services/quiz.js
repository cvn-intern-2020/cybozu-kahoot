const Quiz = require('../models/quiz');

const addQuiz = async (quiz) => {
  const newQuiz = new Quiz(quiz);
  const addedQuiz = await newQuiz.save();
  return addedQuiz;
};

const findQuizzesByUserId = (userId) => Quiz.find({ author: userId });

const findQuizById = (id) => Quiz.findById(id);

const findQuizAndUpdate = (quizId, quiz) =>
  Quiz.findByIdAndUpdate(quizId, quiz, { new: true });

const findQuizAndDelete = (quizId) => Quiz.findByIdAndDelete(quizId);

module.exports = {
  addQuiz,
  findQuizzesByUserId,
  findQuizById,
  findQuizAndUpdate,
  findQuizAndDelete,
};
