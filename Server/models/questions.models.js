const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    keywords: {
        type: Array,
        default: [],
        required: true,
    },
    answer: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ]
})


module.exports = mongoose.model('Question', questionSchema);