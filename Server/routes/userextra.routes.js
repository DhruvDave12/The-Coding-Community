const express = require('express');
const router = express.Router();
const passport = require('passport');

const {getLeaderboard, updateFoll, getMoreData} = require('../controllers/extraFunctions.controllers')

// @desc GET LeaderBoard
// @route GET
// @path /leaderboard
router.get('/leaderboard', getLeaderboard);

// @desc Update followers and following of a person
// @route POST
// @path /user/update/:otherID
router.post('/user/update/:otherID', passport.authenticate('jwt', {session: false}), updateFoll)



module.exports = router;