const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const { application } = require('express');
const passport = require('passport');
const User = require('../models/user');

var opts = {}
// below line extracts the token from "Bearer Token"
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'RandomSecretKey';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            // the second argument keeps the user in the session.
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

