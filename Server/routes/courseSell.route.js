const express = require('express');
const router = express.Router();

const passport = require('passport');

const multer = require('multer');
const {storage} = require('../cloudinary/index.js');
const upload = multer({storage});


const CourseRoutes= require('../controllers/courseSell.controllers');

router.post('/course/new', upload.array('image') ,passport.authenticate('jwt', {session: false}), CourseRoutes.postVideo )

router.post('/course/rate/:id', passport.authenticate('jwt', {session: false}), CourseRoutes.rateCourse);

router.get('/courses/all', CourseRoutes.getAllCourses);

router.get('/course/:id',passport.authenticate('jwt', {session: false}),CourseRoutes.getCourse )
module.exports = router;