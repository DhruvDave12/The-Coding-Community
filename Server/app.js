require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const passport = require('passport');

const {configDB} = require('./config/database');
const app = express();
const PORT = process.env.PORT || 8080;

const authRoutes = require('./routes/auth.routes');
const extraRoutes = require('./routes/userextra.routes');
const projectRoutes = require('./routes/project.routes');
const postRoutes = require('./routes/post.routes');
const quesansRoutes = require('./routes/askQuestion.routes');

configDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(passport.initialize());
require('./config/passport')


// using routes
app.use('/', authRoutes);
app.use('/', extraRoutes);
app.use('/',projectRoutes);
app.use('/',postRoutes);
app.use('/', quesansRoutes);

app.get('/', (req,res) => {
    res.send("Connected to backend");
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


