const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://the-coding-community.herokuapp.com/google/callback",
  passReqToCallback: true,
},
function(profile, cb, done) {
  return done(err, profile);
}
));

passport.serializeUser((user, done) => {
  return done(null, user);
})

passport.deserializeUser((user, done) => {
  return done(null, user);
})