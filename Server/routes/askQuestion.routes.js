const express = require('express');
const router = express.Router();
const passport = require('passport');
const {verifyAccessToken} = require('../middlewares/auth.middleware');
const { postQuestion, postAnswerToQuestion } = require('../controllers/askQuestion.controllers');

// @desc Ask a question on our website
// @route POST
// @path /ask-ques
router.post('/ask-ques', verifyAccessToken, postQuestion);

// @desc Answer to a question
// @route POST
// @path /ans-ques
router.post('/ans-ques/:questionID', verifyAccessToken, postAnswerToQuestion);

module.exports = router;