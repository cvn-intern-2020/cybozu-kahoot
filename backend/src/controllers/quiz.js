const {
  addQuiz,
  findQuizzesByUserId,
  findQuizById,
  findQuizAndUpdate,
} = require('../services/quiz');

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
    const foundQuizzes = await findQuizzesByUserId(userId);
    return res.status(200).json(foundQuizzes);
  } catch (err) {
    return res.status(500);
  }
};

const getSingleQuizController = async (req, res) => {
  const { quizId } = req.params;
  try {
    const foundQuiz = await findQuizById(quizId);
    return res.status(200).json(foundQuiz);
  } catch (err) {
    return res.status(500);
  }
};

const updateQuizController = async (req, res) => {
  const { quizId } = req.params;
  const quiz = req.body;
  try {
    const upadtedQuiz = await findQuizAndUpdate(quizId, quiz);
    return res.status(200).json(upadtedQuiz);
  } catch (err) {
    return res.status(500);
  }
};

module.exports = {
  addQuizController,
  getQuizzesController,
  getSingleQuizController,
  updateQuizController,
};
