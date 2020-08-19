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
    const { errors } = addedQuiz;
    if (!errors) return res.status(201).json({ id: addedQuiz.id });

    return res.status(500).json({ errors });
};

const getQuizzesController = async (req, res) => {
    const userId = req.user.id;

    const foundQuizzes = await findQuizzesByUserId(userId);
    const { errors } = foundQuizzes;
    if (!errors) return res.status(200).json(foundQuizzes);

    return res.status(500).json({ errors });
};

const getSingleQuizController = async (req, res) => {
    const { quizId } = req.params;

    const foundQuiz = await findQuizById(quizId);
    const { errors } = foundQuiz;
    if (!errors) return res.status(200).json(foundQuiz);

    return res.status(500).json({ errors });
};

const updateQuizController = async (req, res) => {
    const { quizId } = req.params;
    const userId = req.user.id;
    const quiz = req.body;

    const updatedQuiz = await findQuizAndUpdate(quizId, userId, quiz);
    const { errors } = updatedQuiz;
    if (!errors) return res.status(200).json(updatedQuiz);

    return res.status(500).json({ errors });
};

const deleteQuizController = async (req, res) => {
    const { quizId } = req.params;
    const userId = req.user.id;

    const deletedResult = await findQuizAndDelete(quizId, userId);
    const { errors } = deletedResult;
    if (!errors) return res.status(200).json(deletedResult);

    return res.status(500).json({ errors });
};

const cloneQuizController = async (req, res) => {
    const { quizId } = req.params;
    const userId = req.user.id;

    let quiz = await findQuizById(quizId, userId);
    quiz = quiz.toObject({
        transform: (doc, ret) => {
            delete ret._id;
            if (ret.questions) ret.title = `Copy of ${doc.title}`;
            ret.createdAt = Date.now();
            ret.updatedAt = Date.now();
            return ret;
        },
    });
    const clonedQuiz = await addQuiz(quiz);
    const { errors } = clonedQuiz;
    if (!errors) return res.status(200).json(clonedQuiz);

    return res.status(500).json({ errors });
};

module.exports = {
    addQuizController,
    getQuizzesController,
    getSingleQuizController,
    updateQuizController,
    deleteQuizController,
    cloneQuizController,
};
