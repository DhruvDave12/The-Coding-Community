const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const gitSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    followers: {
        type: Number,
        required: true,
    },
    following: {
        type: Number,
        required: true,
    },
    totalPublicRepos: {
        type: Number,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('GitData', gitSchema);