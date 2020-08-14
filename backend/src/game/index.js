const { Game, Player } = require('./model');

const WAITING_TIME = 500;

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('hostJoin', async ({ quizId }) => {
            console.log('host join');
            let game = new Game(socket.id, quizId);
            await game.fetchQuizData();
            socket.join(game.id);
            socket.emit('roomCreated', { id: game.id, quiz: game.quiz });
        });

        socket.on('playerJoin', ({ roomId }) => {
            console.log('player join');
            const game = Game.findGameById(roomId);
            socket.join(roomId);
            new Player(socket.id, roomId);
            io.to(game.hostId).emit('playerJoin');
        });

        socket.on('registerNickname', ({ nickname }) => {
            const player = Player.findUserById(socket.id);
            player.setNickname(nickname);
            const roomPlayers = Player.findPlayersByRoomId(player.room);
            let playerNameList = [];
            roomPlayers.forEach((p) => playerNameList.push(p.nickname));
            const game = Game.findGameById(player.room);
            io.to(game.id).emit('playerList', playerNameList);
        });

        const sendMidResult = (game) => {
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
            io.to(game.id).emit('midResult', { correctAnswers, leaderboard });
        };

        socket.on('nextQuestion', () => {
            const game = Game.findGameByHostId(socket.id);
            game.setCurrentQuestion(Date.now() + WAITING_TIME);
            socket.broadcast
                .to(game.id)
                .emit('nextQuestion', game.currentQuestion);
            setTimeout(
                sendMidResult,
                WAITING_TIME + game.currentQuestion.question.timeLimit * 1000,
                game
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
    });
};
