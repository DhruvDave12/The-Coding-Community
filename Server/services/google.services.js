const axios = require('axios');
const qs = require('querystring');
const User = require('../models/user');
// const User = require('../models/user.model');
// import qs from "qs";

module.exports.getGoogleOAuthTokens = async (code) => {
    const url = 'https://oauth2.googleapis.com/token';

    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: "authorization_code",
    }

    try {
        const res = await axios.post(url, qs.stringify(values),{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return res.data;
    } catch (err) {
        console.log("ERROR WHILE MAKING REQUEST TO GOOGLE: ", err);
    }
}

module.exports.getGoogleUser = async (id_token, access_token) => {
    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        });

        return res.data;
    } catch (err) {
        console.log("ERROR WHILE GETTING GOOGLE USER: ", err);
        throw new Error(err.message);
    }
}

module.exports.findOrCreateUser = async (googleUser) => {
    const {email, name, picture} = googleUser;
    if(!googleUser.verified_email){
        return res.status(403).send("Google Account not verified");
    }
    try {
        const user = await User.findOne({email});
        if(user) return user;
        const newUser = await User.create({email, username: name, picture});
        return newUser;
    } catch (err) {
        console.log("ERROR WHILE FINDING OR CREATING USER: ", err);
        throw new Error(err.message);
    }
}