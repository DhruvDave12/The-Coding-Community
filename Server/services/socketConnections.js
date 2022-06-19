const configSocketIO = require('../config/socket');
const server = require('../app');

const io = configSocketIO(server);

io.on(process.env.SOCKET_CONNECTION, (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on(process.env.SOCKET_SEND_MSG, (data) => {
        // todo -> FIX BROADCASTING IN HERE
        console.log(data);
    })
})