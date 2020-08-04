const { addQuiz, findQuizzesByUserId } = require('../services/quiz');

const addQuizController = async (req, res) => {
  const quiz = req.body;
  quiz.author = req.user.id;
  try {
    const addedQuiz = await addQuiz(quiz);
    return res.status(201).json({ id: addedQuiz.id });
  } catch (err) {
    return res.status(500);
  }
};

const getQuizzesController = async (req, res) => {
  const userId = req.user.id;
  try {
    const foundQuiz = await findQuizzesByUserId(userId);
    return res.status(200).json(foundQuiz);
  } catch (err) {
    return res.status(500);
  }
};

module.exports = {
  addQuizController,
  getQuizzesController,
};
