const mongoose = require('mongoose');

const URL = process.env.MONGO_CLOUD_URL || 'mongodb://localhost:27017/codingCommData';
module.exports.configDB = () => {
    // Establishing MongoConnection
    mongoose.connect(URL);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Connection Error: "));
    db.once("open", () => {
        console.log("DATABASE CONNECTED");
    });
}

