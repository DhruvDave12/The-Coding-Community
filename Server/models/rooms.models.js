const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
    date: {
        type: Date,
    },
    msg: {
        type: String,
    }
})
const RoomSchema = new Schema({
    client1:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    client2: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    client1Messages: [chatMessageSchema],
    client2Messages: [chatMessageSchema],
})


module.exports = mongoose.model('Room', RoomSchema);