const express = require('express');
const router = express.Router();

const passport = require('passport');

const multer = require('multer');
const {storage} = require('../cloudinary/index.js');
const upload = multer({storage});


const CourseRoutes= require('../controllers/courseSell.controllers');

// @desc POST a new course
// @route POST
// @path /course/new
router.post('/course/new', upload.array('image') ,passport.authenticate('jwt', {session: false}), CourseRoutes.postVideo )

// @desc Rate a course
// @route POST
// @path /course/rate/:id
router.post('/course/rate/:id', passport.authenticate('jwt', {session: false}), CourseRoutes.rateCourse);

// @desc GET all courses
// @route GET
// @path /courses/all
router.get('/courses/all', CourseRoutes.getAllCourses);

// @desc GET a particular course
// @route GET
// @path /course/:id
router.get('/course/:id',passport.authenticate('jwt', {session: false}),CourseRoutes.getCourse )

module.exports = router;