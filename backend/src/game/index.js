module.exports = (io) => {
    io.on('connection', (socket) => {
        let hostId = '';

        socket.on('hostJoin', ({ roomId }) => {
            console.log('host join');
            socket.join(roomId);
            hostId = socket.id;
        });

        socket.on('playerJoin', ({ roomId }) => {
            console.log('host join');
            socket.join(roomId);
            io.to(hostId).emit('playerJoin');
        });
    });
};
