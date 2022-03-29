const moreData = require('../models/moreUserData.models')
const GitData = require('../models/userGithubData.models');

const axios = require('axios');

module.exports.getUserGitData = async (req,res) => {
    const {id} = req.params;
    const userData = await moreData.find({owner: id});

    axios.get(`https://api.github.com/users/${userData.github}`)
    .then(async (resp) => {
        const data = new GitData({
            username: resp.data.login,
            followers: resp.data.followers,
            following: resp.data.following,
            totalPublicRepos: resp.data.public_repos,
            profilePic: resp.data.avatar_url,
        })

        await data.save();
        res.status(200).send({
            success: true,
            data: data
        })
    })
    .catch(err => {
        res.status(404).send({
            success: false,
            data: err
        })
    })
}   

