const express = require('express');
const router = express.Router();

const {getUserGitData} = require('../controllers/project.controllers');

// @desc USER PROJECTS DATA
// @route GET
// @path /user/id/git
router.get('/user/:id/git', getUserGitData);

module.exports = router;