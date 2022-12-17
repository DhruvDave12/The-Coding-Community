const express = require('express');
const router = express.Router();
const passport = require('passport');
const {verifyAccessToken} = require('../middlewares/auth.middleware');
const {getLeaderboard, updateFoll, unfollowMech, getOtherData} = require('../controllers/extraFunctions.controllers')

// @desc GET LeaderBoard
// @route GET
// @path /leaderboard
router.get('/leaderboard', getLeaderboard);

// @desc Update followers and following of a person
// @route GET
// @path /user/update/:otherID
router.get('/user/update/:otherID', verifyAccessToken, updateFoll)

// @desc Unfollow a user
// @route GET
// @path /user/unfollow/:otherID
router.get('/user/unfollow/:otherID', verifyAccessToken, unfollowMech)

router.get('/user/data/:id', verifyAccessToken, getOtherData)

module.exports = router;