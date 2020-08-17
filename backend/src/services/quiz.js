const Quiz = require('../models/quiz');

const addQuiz = async (quiz) => {
    try {
        const newQuiz = new Quiz(quiz);

        const addedQuiz = await newQuiz.save();

        return addedQuiz;
    } catch (err) {
        return { errors: err.message };
    }
};

const findQuizzesByUserId = async (userId) => {
    try {
        const foundQuizzes = await Quiz.find(
            { author: userId },
            'title media questions createdAt updatedAt'
        ).lean();

        return foundQuizzes.map((quiz) => {
            for (let i = 0; i < quiz.questions.length; i++) {
                if (quiz.questions[i].media) {
                    quiz.thumb = quiz.questions[i].media.url;
                    break;
                }
            }
            quiz.questions = quiz.questions.length;
            return quiz;
        });
    } catch (err) {
        return { errors: err.message };
    }
};

const findQuizById = async (id) => {
    try {
        const foundQuiz = await Quiz.findById(id);

        if (!foundQuiz) return { errors: 'Quiz not found' };
        return foundQuiz;
    } catch (err) {
        return { errors: err.message };
    }
};

const findQuizAndUpdate = async (id, userId, quiz) => {
    try {
        quiz.updatedAt = Date.now();
        const updatedQuiz = await Quiz.findOneAndUpdate(
            { _id: id, author: userId },
            quiz,
            { new: true }
        );

        return updatedQuiz;
    } catch (err) {
        return { errors: err.message };
    }
};

const findQuizAndDelete = async (id, userId) => {
    try {
        await Quiz.findOneAndDelete({ _id: id, author: userId });

        return {
            result: 'success',
        };
    } catch (err) {
        return { errors: err.message };
    }
};

module.exports = {
    addQuiz,
    findQuizzesByUserId,
    findQuizById,
    findQuizAndUpdate,
    findQuizAndDelete,
};
