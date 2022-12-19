const express = require('express');
const router = express.Router();
const passport = require('passport');
const {verifyAccessToken} = require('../middlewares/auth.middleware');
const { postQuestion, postAnswerToQuestion, getQuestions, getQuestionsAnswer} = require('../controllers/askQuestion.controllers');

// @desc Ask a question on our website
// @route POST
// @path /ask-ques
router.post('/ask-ques', verifyAccessToken, postQuestion);

// @desc Answer to a question
// @route POST
// @path /ans-ques
router.post('/ans-ques/:questionID', verifyAccessToken, postAnswerToQuestion);

// @desc Get all questions
// @route GET
// @path /get-ques
router.get('/get-ques', verifyAccessToken, getQuestions);

// @desc Get answers to particular question
// @route GET
// @path /get-ans/:questionID
router.get('/get-ans/:questionID', verifyAccessToken, getQuestionsAnswer);
module.exports = router;