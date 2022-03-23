const express = require('express');
const router = express.Router();
const passport = require('passport');

const {getLeaderboard, getUserData} = require('../controllers/extraFunctions.controllers')

// @desc GET LeaderBoard
// @route GET
// @path /leaderboard
router.get('/leaderboard', getLeaderboard)

// @desc GET USER DATA
// @route GET
// @path /user/id

router.get('/users/:id', getUserData);

module.exports = router;