const {verifyJWT} = require('../utils/jwt.utils');
const User = require('../models/user');

module.exports.verifyAccessToken = (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        console.log("FROM HEADERS");
        token = req.headers.authorization.split(' ')[1];
    } else if(req.cookies && req.cookies.accessToken){
        console.log("GOT FROM ACCESS");
        token = req.cookies.accessToken;
    }
    console.log("TOKEN: ", token);
    if(!token){
        return res.status(403).send("Access token is missing");
    }
    const {payload, expired} = verifyJWT(token);
    console.log("PAYLOAD: ", payload);
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
       return res.status(403).send("Error getting user");
    })
}
