const User = require('../models/user')
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