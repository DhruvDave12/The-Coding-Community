const express = require('express');
const router = express.Router();
const passport = require('passport');

const {getReposSorted} = require('../controllers/project.controllers');

router.get('/project/repos', passport.authenticate('jwt', {session: false}), getReposSorted);


module.exports = router;