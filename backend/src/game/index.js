const { Game, Player } = require('./model');

const WAITING_TIME = 5000;

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

        socket.on('nextQuestion', () => {
            const game = Game.findGameByHostId(socket.id);
            game.setCurrentQuestion(Date.now() + WAITING_TIME);
            socket.broadcast
                .to(game.id)
                .emit('nextQuestion', game.currentQuestion);
        });
    });
};
