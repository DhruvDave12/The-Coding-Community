const express = require('express');
const router = express.Router();
const passport = require('passport');

const multer = require('multer');
const {storage} = require('../cloudinary/index.js');
const upload = multer({storage});

const { postPost, postComments, getPosts, getComments, getPostOfUser} = require('../controllers/posts.controllers')

// @desc POST a new post on website
// @route POST
// @path /new/post
router.post('/new/post', passport.authenticate('jwt', {session: false}), upload.array('image'), postPost)

// @desc POST a new comment on existing post
// @route POST
// @path /new/comment/:postID
router.post('/new/comment/:postID',passport.authenticate('jwt', {session: false}), postComments)

// @desc GET all posts
// @route GET
// @path /post/all
router.get('/post/all', passport.authenticate('jwt', {session: false}), getPosts);

// @desc GET particular post comments
// @route GET
// @path /post/all
router.get('/post/comments/:id', passport.authenticate('jwt', {session: false}), getComments)

// @desc GET Particular user posts
// @route GET
// @path /post/:id
router.get('/post/:id', passport.authenticate('jwt', {session: false}), getPostOfUser);

module.exports = router;

