const { findQuizById } = require('../services/quiz');

let games = [];
let users = [];

class User {
    constructor(id, roomId) {
        this._id = id;
        this._room = roomId;
        this._nickname = 'No name';
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
    setNickname(nickname) {
        this._nickname = nickname;
    }
    get nickname() {
        return this._nickname;
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
    setCurrentQuestion(startTime) {
        this._currentQuestion = this._quiz.questions.shift();
        this._currentQuestionStartTime = startTime;
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
}

module.exports = {
    Host,
    Player,
    Game,
};
