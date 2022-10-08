require('dotenv').config()

const express = require('express');
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const {configDB} = require('./config/database');
const app = express();
module.exports = server = http.createServer(app);
const PORT = process.env.PORT || 8080;

const authRoutes = require('./routes/auth.routes');
const extraRoutes = require('./routes/userextra.routes');
const projectRoutes = require('./routes/project.routes');
const postRoutes = require('./routes/post.routes');
const quesansRoutes = require('./routes/askQuestion.routes');
const courseRoutes = require('./routes/courseSell.route');
const session = require('express-session')

configDB();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')

// using routes
app.use('/', authRoutes);
app.use('/', extraRoutes);
app.use('/',projectRoutes);
app.use('/',postRoutes);
app.use('/', quesansRoutes);
app.use('/', courseRoutes);

app.get('/', (req,res) => {
    res.send("Welcome to The Coding Community Backend :)");
})


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
