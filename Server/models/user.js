const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,
    },
    moreDataPosted: {
        type: Boolean,
        required: true,
        default: false
    },
    hashOfCourses: [
        {
            type: String,
        }
    ],
})


module.exports = mongoose.model('User', userSchema);