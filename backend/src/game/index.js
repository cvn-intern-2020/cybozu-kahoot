const { Game, Player, User, Host } = require('./model');

const WAITING_TIME = 5000;

module.exports = (io) => {
    io.on('connection', (socket) => {
        const sendPlayerList = (roomId) => {
            const roomPlayers = Player.findPlayersByRoomId(roomId);
            let playerNameList = [];
            roomPlayers.forEach((p) => {
                if (!p.connected) return;
                playerNameList.push({
                    number: p.number,
                    nickname: p.nickname,
                });
            });
            const game = Game.findGameById(roomId);
            io.to(game.id).emit('playerList', playerNameList);
        };

        const sendResult = (game, questionId) => {
            const currentQuestion = game.currentQuestion;
            if (currentQuestion.question._id !== questionId) return;
            let roomPlayers = Player.findPlayersByRoomId(game.id);
            roomPlayers.sort((a, b) => b.score - a.score);
            const correctAnswers = currentQuestion.question.correctAnswers.map(
                (id) => {
                    return currentQuestion.question.answers.find(
                        (a) => id === a.id
                    );
                }
            );
            const leaderboard = [];
            for (let i = 0; i < roomPlayers.length; i++) {
                leaderboard.push({
                    rank: i + 1,
                    number: roomPlayers[i].number,
                    nickname: roomPlayers[i].nickname,
                    score: roomPlayers[i].score,
                });
            }
            io.to(game.id).emit('result', {
                isEnd: game.questionLeft === 0,
                correctAnswers,
                leaderboard,
            });
        };

        socket.on('hostJoin', async ({ quizId }) => {
            console.log('host join');
            let game = new Game(socket.id, quizId);
            await game.fetchQuizData();
            socket.join(game.id);
            new Host(socket.id, game.id);
            socket.emit('roomCreated', { id: game.id, quiz: game.quiz });
        });

        socket.on('playerJoin', ({ roomId }) => {
            console.log('player join');
            const game = Game.findGameById(roomId);
            if (!game) return socket.emit('roomNotFound');
            socket.join(roomId);
            game._totalPlayersNum += 1;
            const newPlayer = new Player(socket.id, roomId);
            socket.emit('playerNum', { number: newPlayer.number });
        });

        socket.on('registerNickname', ({ nickname }) => {
            const player = Player.findUserById(socket.id);
            if (!player) return;
            player.setNickname(nickname);
            sendPlayerList(player.room);
        });

        socket.on('nextQuestion', () => {
            const game = Game.findGameByHostId(socket.id);
            game.setCurrentQuestion(Date.now() + WAITING_TIME);
            const { correctAnswers } = game.currentQuestion.question;
            const { question } = game.currentQuestion;
            const sendingQuesion = {
                number: question.number,
                title: question.title,
                timeLimit: question.timeLimit,
                point: question.point,
                media: question.media,
                answers: question.answers,
            };
            io.in(game.id).emit('nextQuestion', {
                question: sendingQuesion,
                startTime: game.currentQuestion.startTime,
            });
            io.to(game.host).emit('currentCorrectAnswers', correctAnswers);
            setTimeout(
                sendResult,
                WAITING_TIME + game.currentQuestion.question.timeLimit * 1000,
                game,
                game.currentQuestion.question._id
            );
        });

        socket.on('submitAnswer', ({ id }) => {
            const now = new Date();
            const player = Player.findUserById(socket.id);
            const game = Game.findGameById(player.room);
            const currentQuestion = game.currentQuestion;
            if (
                now >= game.currentQuestion.startTime &&
                now <=
                    game.currentQuestion.question.timeLimit * 1000 +
                        game.currentQuestion.startTime
            ) {
                if (!game.hasPlayerAnswered(player.id)) {
                    game.addAnswer(player, id, now);
                    if (game.isAnswerCorrect(id)) {
                        console.log('correct');
                        player.addCorrectScore(now, currentQuestion);
                    } else {
                        console.log('incorrect');
                    }
                    if (game.totalPlayersNum <= game.currentOnlineAnswersNum)
                        sendResult(game, currentQuestion.question._id);
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('disconnect');
            const user = User.findUserById(socket.id);
            if (!user) return;
            if (user.constructor.name === 'Host') {
                io.to(user.room).emit('hostDisconnected');
                User.deleteUsersByRoomId(user.room);
                Game.deleteGameById(user.room);
            } else {
                user._connected = false;
                const game = Game.findGameById(user.room);
                sendPlayerList(user.room);
                game._totalPlayersNum--;
                if (game.totalPlayersNum <= game.currentOnlineAnswersNum) {
                    const currentQuestion = game.currentQuestion;
                    if (!currentQuestion.question) return;
                    sendResult(game, currentQuestion.question.id);
                }
            }
        });
    });
};
