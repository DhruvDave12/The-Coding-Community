const Course = require('../models/courseVideo.models');
const Level = require('../models/userLevel.model');

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports.postVideo = async (req,res) => {
    if(!req.user){
        res.status(403).send({
            success: false,
            msg: "Please log in"
        })
    }

    const { price, title } = req.body;
    const date = new Date();
    
    const newCourse = new Course({
        upload: date.toLocaleString(),
        price,
        title
    })
    newCourse.instructor = req.user._id;
    newCourse.videos = req.files.map(f => ({ url: f.path, fileName: f.filename }));
    
    for(let i=0; i<req.files.length; i++){
      if(req.files[i].path.includes('video') === false){
        newCourse.thumbnail = req.files[i].path;
        break;
      }
    }
    await newCourse.save();

    // // User level increment logic
    // // if user is selling a course then he/she would get extra 100 points

    // const userLevel = Level.find({owner: req.user._id});
    // userLevel.level  = parseInt(userLevel.level) + parseInt(100);
    // await userLevel.save();

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
    const allCourses = await Course.find({}).populate('instructor');

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

  const course =  await Course.findById(id).populate('instructor');

  res.status(200).send({
    success: true,
    data: course
  })
}

// module.exports.sendKey = async (req,res) => {
//   if(!req.user) {
//     res.status(403).send({
//       sucess: false,
//       msg: "Please log in to make payments"
//     })
//   }

//   res.status(200).send({
//     success: true,
//     data: process.env.STRIPE_PUBLISHABLE_KEY
//   })
// }

// module.exports.buyCourse = async(req,res) => {
//   if(!req.user){
//     res.status(403).send({
//       success: false,
//       msg: "Please log in to buy course"
//     })
//   }

//   const { id } = req.params;
//   const courseToBuy = await Course.findById(id);

  
//   stripe.customers.create({
//     email: req.body.stripeEmail,
//     source: req.body.stripeToken,
//   })
//   .then((customer) => {
//     return stripe.charges.create({
//       amount: courseToBuy.price * 100,
//       description: courseToBuy.title,
//       currency: 'USD',
//       customer: customer.id
//     })
//   })
//   .then((charge) => {
//     console.log(charge);
//     res.send('Success');
//   })
//   .catch(err => console.log(err));

// }