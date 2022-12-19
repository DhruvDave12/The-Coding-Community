const express = require('express');
const router = express.Router();
const passport = require('passport');
const {verifyAccessToken} = require('../middlewares/auth.middleware');

const {regUser, authUser, getHome, postMoreData, getMoreData, getUser, getAllUsers, logUserOut, googleOAuthHandler,getUserById} = require('../controllers/auth.controllers');

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
router.post('/logout', verifyAccessToken ,logUserOut);

// @desc Shows the profile page
// @route GET
// @path "/profile"
router.get('/profile', verifyAccessToken, getHome);

// @desc posts more data
// @route POST
// @path "/tell-us-more"
router.post('/tell-us-more', verifyAccessToken, postMoreData);

// @desc gets more data
// @route GET
// @path "/tell-us-more"
router.get('/tell-us-more', verifyAccessToken, getMoreData);

// @desc gets all users list
// @route GET
// @path "/user/all"
router.get('/user/all', verifyAccessToken, getAllUsers);

// @desc gets particular user
// @route GET
// @path "/user/normal/:id"
router.get('/user/normal/:id', verifyAccessToken, getUserById);

// @desc gets particular user
// @route GET
// @path "/user/:id"
router.get('/user/:id', verifyAccessToken, getUser);

// @desc register or login with google
// @route GET
// @path "/sessions/oauth/google"
router.get('/sessions/oauth/google', googleOAuthHandler);
module.exports = router;
