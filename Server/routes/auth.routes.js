const express = require('express');
const router = express.Router();
const passport = require('passport');

const {regUser, authUser, getHome, postMoreData, getMoreData} = require('../controllers/auth.controllers');

// @desc Registers the user
// @route POST
// @path "/register"
router.post('/register', regUser);

// @desc Logins the user
// @route POST
// @path "/login"
router.post('/login', authUser);

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


module.exports = router;
