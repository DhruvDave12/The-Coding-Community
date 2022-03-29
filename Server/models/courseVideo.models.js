const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    url: String,
    fileName: String,
})

const courseSchema = new Schema({
    videos: [videoSchema],
    upload: {
        type: String,
        required: true,
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: true,
    },
    allTotalRating: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    listOfUsersRated: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

module.exports = mongoose.model('Course', courseSchema);