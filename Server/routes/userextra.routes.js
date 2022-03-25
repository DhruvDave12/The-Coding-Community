const express = require('express');
const router = express.Router();
const passport = require('passport');

const {getLeaderboard, getUserData, updateFoll} = require('../controllers/extraFunctions.controllers')

// @desc GET LeaderBoard
// @route GET
// @path /leaderboard
router.get('/leaderboard', getLeaderboard);

// @desc GET USER DATA
// @route GET
// @path /user/id
router.get('/users/:id', getUserData);

// @desc Update followers and following of a person
// @route POST
// @path /user/update/:otherID
router.post('/user/update/:otherID', passport.authenticate('jwt', {session: false}), updateFoll)

module.exports = router;