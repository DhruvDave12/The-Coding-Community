const Course = require('../models/courseVideo.models');

module.exports.postVideo = async (req,res) => {
    if(!req.user){
        res.status(403).send({
            success: false,
            msg: "Please log in"
        })
    }

    const { price } = req.body;

    const newCourse = new Course({
        upload: "28-03-2022",
        price,
    })
    newCourse.instructor = req.user._id;
    newCourse.videos = req.files.map(f => ({ url: f.path, fileName: f.filename }));

    await newCourse.save();
    res.status(200).send({
        success: true,
        data: newCourse
    })
}

module.exports.rateCourse = async (req,res) => {
  if(!req.user){
    res.status(403).send({
      success: false,
      msg: "Please log in to rate the course"
    })
  }
  const { id } = req.params;
  const courseToRate = await Course.findById(id);

  const { rating } = req.body;
  const currUser = req.user;

  courseToRate.listOfUsersRated.push(currUser._id);

  let totalRating = (parseFloat(courseToRate.allTotalRating) + parseFloat(rating)) / parseFloat(courseToRate.listOfUsersRated.length);

  courseToRate.rating = parseFloat(totalRating);
  courseToRate.allTotalRating = parseFloat(courseToRate.allTotalRating) + parseFloat(rating);
  await courseToRate.save();


  res.status(200).send({
    success: true,
    data: courseToRate
  })
}

module.exports.getAllCourses = async(req,res) => {
    const allCourses = await Course.find({});

    res.status(200).send({
      success: true,
      data: allCourses
    })
}

module.exports.getCourse = async(req,res) => {
  if(!req.user){
    res.status(403).send({
      success: false,
      msg: "Please log in to check out the course"
    })
  }

  const { id } = req.params;

  const course =  await Course.findById(id);

  res.status(200).send({
    success: true,
    data: course
  })
}