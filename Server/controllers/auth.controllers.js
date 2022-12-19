const User = require('../models/user');
const MoreData = require('../models/moreUserData.models');
const userLevel = require('../models/userLevel.model');
const jwt = require('jsonwebtoken');
const { hashSync, compareSync } = require('bcrypt');
const {getGoogleOAuthTokens, getGoogleUser, findOrCreateUser} = require('../services/google.services');
const {signJWT, verifyJWT} = require('../utils/jwt.utils');

const accessTokenCookieOptions = {
  maxAge: 86400000, 
  domain: "the-coding-community-production.up.railway.app",
  path: "/",
  sameSite: "none",
  secure: true,
};
  
const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

module.exports.regUser = async (req,res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).send({
            success: false,
            msg: "Please enter all the fields"
        })
    }
    const user = new User({
        username: username,
        password: hashSync(password, 10),
        email: email,
    })
    user.save()
    .then(user => {
        return res.send({
            success: true,
            msg: "User created successfully",
            user
        })
    }) .catch(err => {
        return res.send({
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
    try{
        const user = await User.findOne({email: req.body.email})
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
     
         const payload = {
             username: user.username,
             id: user._id
         }
         const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "24h"});
         res.cookie("accessToken", token, accessTokenCookieOptions);
         return res.status(200).send({
             success: true,
             msg: 'Logged In Successfully',
             token: "Bearer " + token,
             user: user
         })
    } catch(err){
        return res.status(500).send({
            success: false,
            msg: 'Something went wrong',
            error: err
        })
    } 
}

module.exports.getHome = (req,res) => {
    if(!req.user){
        return res.status(403).send({
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
    try  {
        if(!req.user){
            return res.status(403).send({
                success: false,
                data: {
                    isLoggedIn: false,
                    user: null
                }
            })
        }
        const { firstName, lastName, education, country, codeChefRating, codeforcesUsername, github, linkedInUrl, bio, skills} = req.body;
    
        const moreData = new MoreData({
            firstName,
            lastName,
            education,
            country,
            codeChefRating,
            codeforcesUsername,
            github,
            linkedInUrl,
            bio,
            skills
        })
    
        moreData.owner = req.user._id;
        await moreData.save();
        
        const user = await User.findById(req.user._id);
        user.moreDataPosted = true;
        await user.save();
        
        res.status(200).send({
            success: true,
            msg: "More data posted"
        })
    } catch(err){
        res.status(500).send({
            success: false,
            msg: "Something went wrong",
            error: err
        })
    }
}

module.exports.getMoreData = async (req,res) => {
    try {
        if(!req.user){
            return res.status(403).send({
                success: false,
                data: {
                    isLoggedIn: false,
                    user: null
                }
            })
        }
        const data = await MoreData.findOne({owner: req.user._id}).populate('allFollowers allFollowing');
         res.status(200).send({
            success: true,
            data: data
        })
    } catch (Err) {
        res.status(500).send({
            success: false,
            msg: "Something went wrong",
            error: Err
        })
    }
}

module.exports.getUserById = async (req,res) => {
    if(!req.user){
        return res.status(403).send({
            success: false,
            data: {
                isLoggedIn: false,
                user: null
            }
        })
    }
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send({
        success: true,
        data: user
    })
}

module.exports.getUser = async (req,res) => {
    if(!req.user){
        return res.status(403).send({
            success: false,
            data: {
                isLoggedIn: false,
                user: null
            }
        })
    }

    const { id } = req.params;
    const user = await MoreData.find({owner: id}).populate('owner allFollowers allFollowing');

    res.status(200).send({
        success: true,
        data: user
    })

}

module.exports.getAllUsers = async(req,res) =>{
    if(!req.user){
        return res.status(403).send({
            success: false,
            data: {
                isLoggedIn: false,
                user: null
            }
        })
    }
    const users = await User.find({});
    res.status(200).send({
        success: true,
        data: users
    })
}

module.exports.logUserOut = async(req,res) => {
    console.log("IN LOGOUT: ", req.user);
    if(!req.user){
        return res.status(403).send({
            success: false,
            data: {
                isLoggedIn: false,
                user: null
            }
        })
    }
    const user = await User.findById(req.user._id);
    // delete the accessToken and refreshToken from the users cookie
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    console.log("HEHE");
    user.online = false;
    await user.save();
    res.status(200).send({
        success: true,
        msg: "User Logged Out"
    })
}

// GOOGLE AUTH
module.exports.googleOAuthHandler = async (req, res) => {
    const { code } = req.query;
    const {id_token, access_token} = await getGoogleOAuthTokens(code);
    const googleUser = await getGoogleUser(id_token, access_token);
    // upsert the user
    const user = await findOrCreateUser(googleUser);
    // console.log("HEHE THE END");
    if(!user) return res.status(403).send("Something went wrong while creating a user");
    // // // create a session
    // // const session = await createSession(user);
    // create access and refresh tokens
    const payload = {
        username: user.username,
        id: user._id
    }
    const accessToken = signJWT(payload, {expiresIn: '1d'});
    const refreshToken = signJWT(payload, {expiresIn: '1y'});
    // set cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    // redirect back to the client
    res.redirect(`https://the-coding-community.netlify.app/profile/${user._id}`); 
}