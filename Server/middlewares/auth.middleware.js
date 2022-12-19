const {verifyJWT} = require('../utils/jwt.utils');
const User = require('../models/user');

module.exports.verifyAccessToken = (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        token = req.headers.authorization.split(' ')[1];
    } else if(req.cookies && req.cookies.accessToken){
        token = req.cookies.accessToken;
    }
    if(!token){
        return res.status(403).send("Access token is missing");
    }
    const {payload, expired} = verifyJWT(token);
    if(!payload){
        return res.status(403).send("Invalid access token");
    }
    if(expired){
        return res.status(403).send("Access token expired");
    }

    User.findById(payload.id).then((user) => {
        req.user = user;
        next();
    }).catch((err) => {
       res.status(403).send("Error getting user");
    })
}
