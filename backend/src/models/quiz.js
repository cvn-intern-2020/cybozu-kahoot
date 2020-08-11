const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MAX_QUIZ_TITLE_LENGTH = 95;
const MAX_QUESTION_TITLE_LENGTH = 120;
const MAX_QUESTION_TIME_LIMIT = 60;
const MIN_QUESTION_TIME_LIMIT = 5;
const MAX_QUESTION_POINT = 2000;
const MIN_QUESTION_POINT = 0;

const AnswerSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
});

const MediaSchema = new mongoose.Schema({
    url: String,
    type: String,
});

const QuestionSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: MAX_QUESTION_TITLE_LENGTH,
    },
    type: {
        type: String,
        required: true,
        enum: ['single', 'multi'],
        default: 'single',
    },
    media: MediaSchema,
    timeLimit: {
        type: Number,
        required: true,
        max: MAX_QUESTION_TIME_LIMIT,
        min: MIN_QUESTION_TIME_LIMIT,
    },
    point: {
        type: Number,
        required: true,
        max: MAX_QUESTION_POINT,
        min: MIN_QUESTION_POINT,
    },
    answers: { type: [AnswerSchema], required: true },
    correctAnswers: { type: [Number], required: true },
});

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: MAX_QUIZ_TITLE_LENGTH,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    questions: { type: [QuestionSchema], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('quizzes', QuizSchema);
