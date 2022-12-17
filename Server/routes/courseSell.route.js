const express = require('express');
const router = express.Router();

const passport = require('passport');

const multer = require('multer');
const {storage} = require('../cloudinary/index.js');
const upload = multer({storage});

const {verifyAccessToken} = require('../middlewares/auth.middleware');
const CourseRoutes= require('../controllers/courseSell.controllers');

// @desc POST a new course
// @route POST
// @path /course/new
router.post('/course/new', upload.array('image') ,verifyAccessToken, CourseRoutes.postVideo )

// @desc Rate a course
// @route POST
// @path /course/rate/:id
router.post('/course/rate/:id', verifyAccessToken, CourseRoutes.rateCourse);

// @desc GET all courses
// @route GET
// @path /courses/all
router.get('/courses/all', CourseRoutes.getAllCourses);

// @desc GET a particular course
// @route GET
// @path /course/:id
router.post('/course/purchase',verifyAccessToken,CourseRoutes.purchaseCourse )


// @desc securely check if the user has the course
router.post('/course/check', verifyAccessToken, CourseRoutes.checkCourse);

router.get('/course/:id',verifyAccessToken,CourseRoutes.getCourse )

module.exports = router;