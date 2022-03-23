const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userLevelSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    level: {
        type: Number,
        default: 0
    },
    badge: {
        type: String,
        default: "Rookie"
    },
    worldRanking: {
        type: String,
    }
})

module.exports = mongoose.model('Level', userLevelSchema);
