const { Game, Player, User, Host } = require('./model');

const WAITING_TIME = 500;

module.exports = (io) => {
    io.on('connection', (socket) => {
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
            if (!Game.isExist(roomId)) return socket.emit('roomNotFound');
            socket.join(roomId);
            const newPlayer = new Player(socket.id, roomId);
            socket.emit('playerNum', { number: newPlayer.number });
        });

        socket.on('registerNickname', ({ nickname }) => {
            const player = Player.findUserById(socket.id);
            if (!player) return;
            player.setNickname(nickname);
            const roomPlayers = Player.findPlayersByRoomId(player.room);
            let playerNameList = [];
            roomPlayers.forEach((p) =>
                playerNameList.push({ number: p.number, nickname: p.nickname })
            );
            const game = Game.findGameById(player.room);
            io.to(game.id).emit('playerList', playerNameList);
        });

        const sendResult = (game, isEnd) => {
            const currentQuestion = game.currentQuestion;
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
                isEnd,
                correctAnswers,
                leaderboard,
            });
        };

        socket.on('nextQuestion', () => {
            const game = Game.findGameByHostId(socket.id);
            game.setCurrentQuestion(Date.now() + WAITING_TIME);
            io.to(game.id).emit('nextQuestion', game.currentQuestion);
            setTimeout(
                sendResult,
                WAITING_TIME + game.currentQuestion.question.timeLimit * 1000,
                game,
                game.questionLeft === 0
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
                    console.log(player.score);
                }
            }
            console.log(currentQuestion.startTime);
        });

        socket.on('disconnect', () => {
            console.log('disconnect');
            const user = User.findUserById(socket.id);
            if (!user) return;
            if (user.constructor.name === 'Host') {
                io.to(user.room).emit('hostDisconnected');
                Game.deleteGameById(user.room);
            }
        });
    });
};
