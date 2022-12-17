const express = require('express');
const router = express.Router();
const passport = require('passport');

const multer = require('multer');
const {storage} = require('../cloudinary/index.js');
const upload = multer({storage});
const {verifyAccessToken} = require('../middlewares/auth.middleware');

const { postPost, postComments, getPosts, getComments, getPostOfUser} = require('../controllers/posts.controllers')

// @desc POST a new post on website
// @route POST
// @path /new/post
router.post('/new/post', verifyAccessToken, upload.array('image'), postPost)

// @desc POST a new comment on existing post
// @route POST
// @path /new/comment/:postID
router.post('/new/comment/:postID',verifyAccessToken, postComments)

// @desc GET all posts
// @route GET
// @path /post/all
router.get('/post/all', verifyAccessToken, getPosts);

// @desc GET particular post comments
// @route GET
// @path /post/all
router.get('/post/comments/:id', verifyAccessToken, getComments)

// @desc GET Particular user posts
// @route GET
// @path /post/:id
router.get('/post/:id', verifyAccessToken, getPostOfUser);

module.exports = router;

