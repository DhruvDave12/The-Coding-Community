const User = require ('../models/user');
const MoreData = require ('../models/moreUserData.models');
const UserLevel = require ('../models/userLevel.model');

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
  if (!req.user) {
    res.status (403).send ({
      success: false,
      msg: 'Please login to follow',
    });
  }

  const {otherID} = req.params;

  // remember that user 1 is the current active user
  const user1 = await MoreData.findOne ({owner: req.user._id});
  const user2 = await MoreData.findOne ({owner: otherID});
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
};

module.exports.unfollowMech = async (req, res) => {
  const {otherID} = req.params;

  const otherUserData = await MoreData.findOne ({owner: otherID}).populate (
    'allFollowers allFollowing owner'
  );
  const currUserData = await MoreData.findOne ({owner: req.user._id}).populate (
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
