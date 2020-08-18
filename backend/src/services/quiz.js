const Quiz = require('../models/quiz');
const { validateQuiz } = require('../utils/validators');

const addQuiz = async (quiz) => {
    try {
        const result = validateQuiz(quiz);

        if (result.result === 'error') return { errors: result.message };
        const newQuiz = new Quiz(result.quiz);
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
        )
            .sort({ updatedAt: 'desc' })
            .lean();

        return foundQuizzes.map((quiz) => {
            for (let i = 0; i < quiz.questions.length; i++) {
                if (quiz.questions[i].media && quiz.questions[i].media.url) {
                    quiz.thumb = quiz.questions[i].media.url;
                    break;
                }
            }
            quiz.questionsNumber = quiz.questions.length;
            delete quiz.questions;
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
