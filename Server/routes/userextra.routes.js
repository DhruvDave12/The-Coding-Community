const express = require('express');
const router = express.Router();
const passport = require('passport');

const {getLeaderboard, updateFoll, unfollowMech, getOtherData} = require('../controllers/extraFunctions.controllers')

// @desc GET LeaderBoard
// @route GET
// @path /leaderboard
router.get('/leaderboard', getLeaderboard);

// @desc Update followers and following of a person
// @route GET
// @path /user/update/:otherID
router.get('/user/update/:otherID', passport.authenticate('jwt', {session: false}), updateFoll)

// @desc Unfollow a user
// @route GET
// @path /user/unfollow/:otherID
router.get('/user/unfollow/:otherID', passport.authenticate('jwt', {session: false}), unfollowMech)

router.get('/user/data/:id', passport.authenticate('jwt', {session: false}), getOtherData)

module.exports = router;