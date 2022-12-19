const axios = require('axios');
const MoreData = require('../models/moreUserData.models');

module.exports.getReposSorted = async (req,res) => {
    try {
        const {id} = req.params;
        if(!req.user){
            return res.status(403).send({
                success: false,
                data: {
                    isLoggedIn: false,
                    user: null
                }
            })
        }
        
        const data = await MoreData.findOne({owner: id}).populate('allFollowers allFollowing');
        if(!data){
            res.status(403).send({
                success: false,
                msg: "No data found"
            })
        }
    
        const githubUserName = data.github;
    
        const githubData = await axios.get(`https://api.github.com/users/${githubUserName}/repos`);
        const githubRepos = githubData.data;
    
        const sortedRepos = githubRepos.sort((a,b) => {
            return b.stargazers_count - a.stargazers_count;
        })
    
        const reqData = sortedRepos.map((repo) => (
            {
                name: repo.name,
                url: repo.html_url,
                avatar: repo.owner.avatar_url
            }
        ) )
    
        res.status(200).send({
            success: true,
            data: reqData
        })
    } catch(err){
        console.log("GITHUB ERROR: ", err);
    }
}


