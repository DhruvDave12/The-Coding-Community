const {Server} = require('socket.io');

module.exports = configSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.SOCKET_FRONTEND_URL,
            methods: ["GET", "POST"],
        }
    })

    return io;
}