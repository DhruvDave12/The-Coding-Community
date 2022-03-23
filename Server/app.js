const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const passport = require('passport');

const {configDB} = require('./config/database');
const app = express();
const PORT = process.env.PORT || 8080;

const authRoutes = require('./routes/auth.routes');
const extraRoutes = require('./routes/userextra.routes');
configDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(passport.initialize());
require('./config/passport')


// using routes
app.use('/', authRoutes);
app.use('/', extraRoutes);

app.get('/', (req,res) => {
    res.send("Connected to backend");
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


