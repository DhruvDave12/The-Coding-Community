const Course = require('../models/courseVideo.models');
const Level = require('../models/userLevel.model');
const User = require('../models/user');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { v4: uuidv4 } = require('uuid');

module.exports.postVideo = async (req,res) => {
    if(!req.user){
        res.status(403).send({
            success: false,
            msg: "Please log in"
        })
    }

    const { price, title, overview, description, language} = req.body;
    const date = new Date();
    
    const newCourse = new Course({
        upload: date.toLocaleString(),
        price,
        title,
        overview,
        description,
        language
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
  const course = await Course.findById(id).populate('instructor customersWhoBought');

  res.status(200).send({
    success: true,
    data: course
  })
}

module.exports.purchaseCourse = async (req,res) => {
  const {course, token} = req.body;
  // console.log(course,token);
  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id
  })
  const key = uuidv4();
  
  const charge = await stripe.paymentIntents.create({
    amount: course.price * 100,
    currency: "usd",
    customer: customer.id,
    receipt_email: token.email,
    description: `Purchased the ${course.title}`,
    shipping: {
      name: token.card.name,
      address: {
        line1: token.card.address_line1,
        city: token.card.address_city,
        country: token.card.address_country,
        postal_code: token.card.address_zip,
      }
    }
  },{
    idempotencyKey: key,
  })

  let uniqueKey = uuidv4();
  var editedTitle = course.title.replace(/ /g, "");

  let finalKey = editedTitle + " " + uniqueKey;
  const user = await User.findById(req.user._id);
  user.hashOfCourses.push(finalKey);
  await user.save();

  const courseToEdit = await Course.findById(course._id);
  courseToEdit.customersWhoBought.push(user._id);
  
  await courseToEdit.save();

  // we need to map this unique key to a user so that we know that user has bought this course.
  res.status(200).send({
    success: true,
    data: {
      courseData: courseToEdit,
      hashKey: finalKey
    }
  })
}

module.exports.checkCourse = async (req,res) => {
  const { key } = req.body;
  const user = await User.findById(req.user._id);
  let isThere = false;

  // can use binary search here
  for(let i=0; i<user.hashOfCourses.length; i++){
    if(user.hashOfCourses[i] === key){
        isThere = true;
        break;
    }
  }

  res.status(200).send({
    success: true,
    data: isThere
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