const express = require('express');
const router = express.Router();
const passport = require('passport');
const {verifyAccessToken} = require('../middlewares/auth.middleware');
const {getReposSorted} = require('../controllers/project.controllers');

router.get('/project/repos', verifyAccessToken, getReposSorted);


module.exports = router;