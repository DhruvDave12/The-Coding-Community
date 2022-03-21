const mongoose = require('mongoose');


module.exports.configDB = () => {
    // Establishing MongoConnection
    mongoose.connect('mongodb://localhost:27017/codingCommData');
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Connection Error: "));
    db.once("open", () => {
        console.log("DATABASE CONNECTED");
    });
}
