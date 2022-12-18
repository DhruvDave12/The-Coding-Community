const User = require ('../models/user');
const MoreData = require ('../models/moreUserData.models');
const UserLevel = require ('../models/userLevel.model');
const mongoose = require('mongoose');

module.exports.getLeaderboard = async (req, res) => {
  const users = await User.find ({});
  const userLevel = await UserLevel.find ({}).sort ({level: -1});

  let allUsers = [];
  for (let level in userLevel) {
    for (let u in users) {
      if (u._id === level._id) {
        allUsers.push (u);
        break;
      }
    }
  }

  res.status (200).send ({
    success: true,
    data: allUsers,
  });
};

module.exports.updateFoll = async (req, res) => {
  try {

      if (!req.user) {
        res.status (403).send ({
          success: false,
          msg: 'Please login to follow',
        });
      }
    
      const {otherID} = req.params;
      
      var validID = mongoose.Types.ObjectId(otherID);
      // remember that user 1 is the current active user
      const user1 = await MoreData.findOne ({owner: mongoose.Types.ObjectId(req.user._id)});
      const user2 = await MoreData.findOne ({owner: validID});
      // check if user1 is already following user2 or not
      if (user1.allFollowing.includes (otherID)) {
        console.log("HEHE WE CAUGHT YA");
        return res.status (403).send ({
          success: false,
          msg: 'Already following',
        });
      }
      user1.following++;
      user2.followers++;
    
      user1.allFollowing.push (otherID);
      user2.allFollowers.push (req.user._id);
    
      await user1.save ();
      await user2.save ();
    
      console.log (user1, user2);
      // returning the current user as user1
      res.status (200).send ({
        success: true,
        data: [user1, user2],
      });
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

module.exports.unfollowMech = async (req, res) => {
  try {
      // console.log("REQ.USER: ",req.user);
      if(!req.user){
        res.status(403).send({
          success: false,
          msg: 'Please login to unfollow'
        })
      }
      const {otherID} = req.params;
      // find the data where owner is otherID
      const validID = mongoose.Types.ObjectId(otherID);
    
      const otherUserData = await MoreData.findOne ({owner: validID}).populate (
        'allFollowers allFollowing owner'
      );

      const currUserData = await MoreData.findOne ({owner: mongoose.Types.ObjectId(req.user._id)}).populate (
        'allFollowers allFollowing owner'
      );
    
    
      currUserData.following--;
      otherUserData.followers--;
    
      for (let i = 0; i < otherUserData.allFollowers.length; i++) {
        if (
          otherUserData.allFollowers[i].username === currUserData.owner.username
        ) {
          otherUserData.allFollowers.splice (i, 1);
          break;
        }
      }
    
      for (let i = 0; i < currUserData.allFollowing.length; i++) {
        if (
          currUserData.allFollowing[i].username === otherUserData.owner.username
        ) {
          currUserData.allFollowing.splice (i, 1);
          break;
        }
      }
    
      await otherUserData.save ();
      await currUserData.save ();
    
      res.status (200).send ({
        success: true,
        data: [currUserData, otherUserData],
      });
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

module.exports.getOtherData = async (req, res) => {
  try {
    const {id} = req.params;
    const otherData = await MoreData.findOne ({owner: id}).populate ('owner allFollowers allFollowing');

    res.status (200).send ({
      success: true,
      data: otherData,
    });
  } catch (error) {
    res.status (500).send ({
      success: false,
      msg: 'Server Error',
    });
  }
};
