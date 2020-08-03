const { addQuiz } = require('../services/quiz');

const postQuiz = async (req, res) => {
  const quiz = req.body;
  quiz.author = req.user.id;
  try {
    const addedQuiz = await addQuiz(quiz);
    return res.status(201).json({ id: addedQuiz.id });
  } catch (err) {
    return res.status(500);
  }
};

module.exports = {
  postQuiz,
};
