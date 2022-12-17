const jwt = require('jsonwebtoken');

module.exports.signJWT = (payload, expireIn) => {
    const {expiresIn} = expireIn;
    console.log(payload);

    return jwt.sign(payload, process.env.SECRET, {expiresIn});
}

module.exports.verifyJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET, {algorithm: "RS256"});
        return {payload: decoded, expired: false};
    } catch (err) {
        return {payload: null, expired: true};
    }
}