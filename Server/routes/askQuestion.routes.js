const express = require('express');
const router = express.Router();
const passport = require('passport');

const { postQuestion, postAnswerToQuestion } = require('../controllers/askQuestion.controllers');

// @desc Ask a question on our website
// @route POST
// @path /ask-ques
router.post('/ask-ques', passport.authenticate('jwt', {session: false}), postQuestion);

// @desc Answer to a question
// @route POST
// @path /ans-ques
router.post('/ans-ques/:questionID', passport.authenticate('jwt', {session: false}), postAnswerToQuestion);

module.exports = router;