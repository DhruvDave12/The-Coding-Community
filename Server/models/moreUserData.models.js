const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moreDataSchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    codeChefRating: {
        type: String,
        required: true,
    },
    codeforcesRating: {
        type: String,
        required: true,
    },
    github: {
        type: String,
    },
    linkedInUrl: {
        type: String,
    }
})


module.exports = mongoose.model('MoreData', moreDataSchema);