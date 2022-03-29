const User = require('../models/user');
const MoreData = require('../models/moreUserData.models');
const userLevel = require('../models/userLevel.model');

const jwt = require('jsonwebtoken');
const { hashSync, compareSync } = require('bcrypt');


module.exports.regUser = async (req,res) => {
    const user = new User({
        username: req.body.username,
        password: hashSync(req.body.password, 10),
        email: req.body.email,
        contactNumber: req.body.contactNumber
    })
    user.save()
    .then(user => {
        res.send({
            success: true,
            msg: "User created successfully",
            user
        })
    }) .catch(err => {
        res.send({
            success: false,
            msg: 'Something went wrong',
            error: err
        })
    })

    var userLength = await User.find({});
    userLength = userLength.length;
    const userLevelInst = new userLevel({
        owner: user._id,
        level: 0,
        badge: "Rookie",
        worldRanking: userLength
    })
    await userLevelInst.save();
}

module.exports.authUser = async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    // console.log(user)
    if (!user) {
        return res.status(401).send({
            success: false,
            msg: 'Could not find the user'
        })
    }
 
    // else we have the user
     if(!compareSync(req.body.password, user.password)){
         return res.status(401).send({
             success: false,
             msg: 'Invalid username/password'
         })
     }
 
     // Now if we get here then auth success we send a jwt token
     const payload = {
         username: user.username,
         id: user._id
     }
     
     const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d"});
     return res.status(200).send({
         success: true,
         msg: 'Logged In Successfully',
         token: "Bearer " + token
     })
 
}

module.exports.getHome = (req,res) => {
    if(!req.user){
        res.status(403).send({
            success: false,
            data: {
                isLoggedIn: false,
                user: null
            }
        })
    }
    res.status(200).send({
        success: true,
        data: {
            isLoggedIn: true,
            user: req.user
        }
    })
}

module.exports.postMoreData = async (req,res) => {
    const { firstName, lastName, education, country, codeChefRating, codeforcesRating, github, linkedInUrl, bio } = req.body;

    const moreData = new MoreData({
        firstName,
        lastName,
        education,
        country,
        codeChefRating,
        codeforcesRating,
        github,
        linkedInUrl,
        bio
    })

    moreData.owner = req.user._id;
    await moreData.save();
    
    res.status(200).send({
        success: true,
        msg: "More data posted"
    })
}

module.exports.getMoreData = async (req,res) => {
    const data = await MoreData.findOne({owner: req.user._id});
   
     res.status(200).send({
        success: true,
        data: data
    })
}
