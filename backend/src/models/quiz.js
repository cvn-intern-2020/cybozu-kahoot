const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new mongoose.Schema({
  id: Number,
  title: String,
});

const MediaSchema = new mongoose.Schema({
  url: String,
  type: String,
});

const QuestionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  type: String,
  media: MediaSchema,
  timeLimit: Number,
  point: Number,
  answers: [AnswerSchema],
  correctAnswers: [Number],
});

const QuizSchema = new mongoose.Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = Quiz = mongoose.model('quizzes', QuizSchema);
