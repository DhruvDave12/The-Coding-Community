require('dotenv').config()

const express = require('express');
const cors = require('cors');
const passport = require('passport');

const {configDB} = require('./config/database');
const app = express();
const PORT = process.env.PORT || 8080;

const authRoutes = require('./routes/auth.routes');
const extraRoutes = require('./routes/userextra.routes');
const projectRoutes = require('./routes/project.routes');
const postRoutes = require('./routes/post.routes');
const quesansRoutes = require('./routes/askQuestion.routes');
const courseRoutes = require('./routes/courseSell.route');

const MoreData = require('./models/moreUserData.models');
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
app.use('/', courseRoutes);

app.get('/', (req,res) => {
    res.send("Connected to backend");
})

// app.use(async (req,res,next) => {

//     if(!req.user){
//         next()
//     }
//     const data = await MoreData.findOne({owner: req.user._id});
//     if(data.followers >= 1000) {
//         data.level = data.level + 100;
//         await data.save();
//     } else if(data.followers >= 500){
//         data.level = data.level + 50;
//         await data.save();
//     } else if(data.followers >= 100){
//         data.level = data.level + 10;
//         await data.save();
//     } else if(data.followers >= 50){
//         data.level = data.level + 5;
//         await data.save();
//     } else if(data.followers >= 10){
//         data.level = data.level + 1;
//         await data.save();
//     }

//     next();
// })



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


