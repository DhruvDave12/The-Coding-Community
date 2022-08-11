const configSocketIO = require ('../config/socket');
const server = require ('../app');
const Rooms = require ('../models/rooms.models');
const User  = require("../models/user");
const io = configSocketIO (server);

io.on(process.env.SOCKET_CONNECTION, async (socket) => {
    // todo -> SET MESSAGES IN DB
    // const messages = [];
    console.log(`User Connected: ${socket.id}`);
    // const newRoom = new Rooms({client1SocketID: socket.id});
    // socket.on("STORE_SOCKET_ID", async (data) => {
    //     const user = await User.findOne({email: data});
    //     if(!user.socketID){
    //         user.socketID = socket.id;
    //         await user.save();
    //         console.log("SOCKET ID UPDATED");
    //     }
    //     // console.log("DATA: ", data);
    // })
    const offlineUsers = await User.find({online: false});
    const onlineUsers = await User.find({online: true});
    socket.emit("USERS_LIST", {offlineUsers, onlineUsers});
    // socket.on("CREATE_ROOM", async (data) => {
    //     console.log("DATA: ", data);
    //     const chatWithUser = await User.findById(data.chatWith);
    //     const currUser = await User.findById(data.currUserID);
    //     const roomz = await Rooms.find({client1: data.currUserID, client2: null});
    //     if(!roomz){
    //         const room = new Rooms({
    //             client1: data.currUserID,
    //             // client2: data.chatWith
    //         })
    //         await room.save();
    //         // socket.broadcast.to(chatWithUser.socketID).emit("INVITE", {room});
    //     }
    //     socket.broadcast.to(chatWithUser.socketID).emit("INVITE", currUser);
    //     // console.log("ROOM CREATED WITH USER: ", chatWithUser);
    // })
    // socket.on("CREATE_ROOM", (data) => {
    //     console.log(`Create Room: `, data);
    // })

    // socket.on(process.env.SOCKET_SEND_MSG, (data) => {
    //     // todo -> NOW SAVE THIS MESSAGE EFFICIENTLY UNDER USER
    //     // console.log(data.message);
    //     // messages.push(data.message);
    //     // io.emit("RECEIVE_MESSAGE", messages);
    // })
})

