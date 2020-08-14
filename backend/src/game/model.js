const { findQuizById } = require('../services/quiz');

let games = [];
let users = [];

class User {
    constructor(id, roomId) {
        this._id = id;
        this._room = roomId;
        users.push(this);
    }
    get id() {
        return this._id;
    }
    get room() {
        return this._room;
    }
    static findUserById(userId) {
        return users.find((u) => u.id === userId);
    }
}

class Host extends User {}

class Player extends User {
    constructor(id, roomId) {
        super(id, roomId);
        this._score = 0;
        this._nickname = 'No name';
        const game = Game.findGameById(roomId);
        this._number = game.userNumberIncrement;
    }
    setNickname(nickname) {
        this._nickname = nickname;
    }
    addCorrectScore(answerTime, currentQuestion) {
        const { point } = currentQuestion.question;
        const timeLimit = currentQuestion.question.timeLimit * 1000;
        const timeLeft = currentQuestion.startTime + timeLimit - answerTime;
        const score = Math.floor((point * timeLeft) / timeLimit);
        this._score += score;
        return score;
    }
    get nickname() {
        return this._nickname;
    }
    get score() {
        return this._score;
    }
    get number() {
        return this._number;
    }
    static findPlayersByRoomId(roomId) {
        return users.filter((u) => u.room === roomId);
    }
}

class Game {
    constructor(hostId, quizId) {
        let randomNumber;
        do {
            randomNumber = (Math.floor(Math.random() * 999999) + 1)
                .toString()
                .padStart(6, '0');
        } while (Game.isDuplicatedId(randomNumber));
        this._id = randomNumber;
        this._host = hostId;
        this._quizId = quizId;
        this._currentQuestion = null;
        this._userNumberIncrement = 0;
        games.push(this);
    }
    get id() {
        return this._id;
    }
    get hostId() {
        return this._host;
    }
    get quizId() {
        return this._quizId;
    }
    get quiz() {
        return this._quiz;
    }
    get currentQuestion() {
        return {
            question: this._currentQuestion,
            startTime: this._currentQuestionStartTime,
        };
    }
    get currentQuestionStartTime() {
        return this._currentQuestionStartTime;
    }
    get currentAnswered() {
        return this._currentAnswered;
    }
    get userNumberIncrement() {
        return this._userNumberIncrement++;
    }
    get questionLeft() {
        return this._quiz.questions.length;
    }
    isAnswerCorrect(answerId) {
        return this._currentQuestion.correctAnswers.findIndex(
            (a) => a === answerId
        ) !== -1
            ? true
            : false;
    }
    hasPlayerAnswered(playerId) {
        return this._currentAnswered.findIndex(
            (a) => a.player.id === playerId
        ) !== -1
            ? true
            : false;
    }
    addAnswer(player, answer, time) {
        this._currentAnswered.push({ player, answer, time });
    }
    setCurrentQuestion(startTime) {
        this._currentQuestion = this._quiz.questions.shift();
        this._currentQuestionStartTime = startTime;
        this._currentAnswered = [];
    }
    async fetchQuizData() {
        this._quiz = await findQuizById(this.quizId);
    }
    static findGameById(gameId) {
        return games.find((g) => g.id === gameId);
    }
    static findGameByHostId(hostId) {
        return games.find((g) => g.hostId === hostId);
    }
    static isDuplicatedId(gameId) {
        return games.findIndex((g) => g.id === gameId) !== -1;
    }
    static deleteGameById(gameId) {
        const index = games.findIndex((g) => g.id === gameId);
        return games.splice(index, 1);
    }
}

module.exports = {
    Host,
    Player,
    Game,
};
