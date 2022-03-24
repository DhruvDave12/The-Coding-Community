const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const answerSchema = new Schema({
    answer: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})


module.exports = mongoose.model('Answer', answerSchema);