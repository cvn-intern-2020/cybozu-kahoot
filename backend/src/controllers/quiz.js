const {
    addQuiz,
    findQuizzesByUserId,
    findQuizById,
    findQuizAndUpdate,
    findQuizAndDelete,
} = require('../services/quiz');

const addQuizController = async (req, res) => {
    const quiz = req.body;
    quiz.author = req.user.id;
    const addedQuiz = await addQuiz(quiz);
    if (!addedQuiz.errors) return res.status(201).json({ id: addedQuiz.id });
    return res.status(500).json({ errors: addedQuiz.errors });
};

const getQuizzesController = async (req, res) => {
    const userId = req.user.id;
    const foundQuizzes = await findQuizzesByUserId(userId);
    if (!foundQuizzes.errors) return res.status(200).json(foundQuizzes);
    return res.status(500).json({ errors: foundQuizzes.errors });
};

const getSingleQuizController = async (req, res) => {
    const { quizId } = req.params;
    const userId = req.user.id;
    const foundQuiz = await findQuizById(quizId, userId);
    if (!foundQuiz.errors) return res.status(200).json(foundQuiz);
    return res.status(500).json({ errors: foundQuiz.errors });
};

const updateQuizController = async (req, res) => {
    const { quizId } = req.params;
    const userId = req.user.id;
    const quiz = req.body;
    const updatedQuiz = await findQuizAndUpdate(quizId, userId, quiz);
    if (!updatedQuiz.errors) return res.status(200).json(updatedQuiz);
    return res.status(500).json({ errors: updatedQuiz.errors });
};

const deleteQuizController = async (req, res) => {
    const { quizId } = req.params;
    const userId = req.user.id;
    const deletedResult = await findQuizAndDelete(quizId, userId);
    if (!deletedResult.errors) return res.status(200).json(deletedResult);
    return res.status(500).json({ errors: deletedResult.errors });
};

const cloneQuizController = async (req, res) => {
    const { quizId } = req.params;
    const userId = req.user.id;
    let quiz = await findQuizById(quizId, userId);
    quiz = quiz.toObject({
        transform: (doc, ret) => {
            delete ret._id;
            ret.createdAt = Date.now();
            ret.updatedAt = Date.now();
            return ret;
        },
    });
    const clonedQuiz = await addQuiz(quiz);
    if (!clonedQuiz.errors) return res.status(200).json(clonedQuiz);
    return res.status(500).json({ errors: clonedQuiz.errors });
};

module.exports = {
    addQuizController,
    getQuizzesController,
    getSingleQuizController,
    updateQuizController,
    deleteQuizController,
    cloneQuizController,
};
