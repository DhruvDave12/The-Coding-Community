const User = require('../models/user')
const MoreData = require('../models/moreUserData.models')
const UserLevel = require('../models/userLevel.model');

module.exports.getLeaderboard = async (req,res) => {
    const users = await User.find({});
    const userLevel = await UserLevel.find({}).sort({level: -1})

    let allUsers = []
    for(let level in userLevel){
        for(let u in users){
            if(u._id === level._id){
                allUsers.push(u)
                break;
            }
        }
    }

    res.status(200).send({
        success: true,
        data: allUsers
    })
    
}

module.exports.getUserData = async (req,res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user){
        res.status(404).send({
            success: false,
            msg: "No User Found :("
        })
    }

    res.status(200).send({
        success: true,
        user
    })
}

module.exports.updateFoll = async (req,res) => {
    if(!req.user){
        res.status(403).send({
            success: false,
            msg: 'Please login to follow'
        })
    }

    const { otherID } = req.params;

    // remember that user 1 is the current active user
    const user1 = await MoreData.findOne({owner: req.user._id});
    const user2 = await MoreData.findOne({owner: otherID});
    // console.log(user1)
    // console.log(user2)
    user1.following ++;
    user2.followers ++;

    await user1.save();
    await user2.save();

    // returning the current user as user1
    res.status(200).send({
        success: true,
        user1
    });
}