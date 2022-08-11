const express = require('express');
const router = express.Router();
const passport = require('passport');

const {regUser, authUser, getHome, postMoreData, getMoreData, getUser, getAllUsers, logUserOut} = require('../controllers/auth.controllers');

// @desc Registers the user
// @route POST
// @path "/register"
router.post('/register', regUser);

// @desc Logins the user
// @route POST
// @path "/login"
router.post('/login', authUser);

// @desc Logs the user out
// @route POST
// @path "/logout"
router.post('/logout', logUserOut);

// @desc Shows the profile page
// @route GET
// @path "/profile"
router.get('/profile', passport.authenticate('jwt', {session: false}), getHome);

// @desc posts more data
// @route POST
// @path "/tell-us-more"
router.post('/tell-us-more', passport.authenticate('jwt', {session: false}), postMoreData);

// @desc gets more data
// @route GET
// @path "/tell-us-more"
router.get('/tell-us-more', passport.authenticate('jwt', {session: false}), getMoreData);

// @desc gets all users list
// @route GET
// @path "/user/all"
router.get('/user/all', passport.authenticate('jwt', {session: false}), getAllUsers);

// @desc gets particular user
// @route GET
// @path "/user/:id"
router.get('/user/:id', passport.authenticate('jwt', {session: false}), getUser);

// router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'https://www.reddit.com/' }), (req,res) => {
//     res.redirect('https://www.youtube.com/')
// })

// router.get('/get/user/google', passport.authenticate('google', { failureRedirect: 'https://www.reddit.com/' }), (req,res) => {
//     res.send(req.user);
// })
module.exports = router;
