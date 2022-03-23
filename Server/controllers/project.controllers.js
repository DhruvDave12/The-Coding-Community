const moreData = require('../models/moreUserData.models')
const axios = require('axios');

module.exports.getUserGitData = async (req,res) => {
    // const data = await axios.get('https://api.github.com/users/DhruvDave12')
    const {id} = req.params;
    const userData = await moreData.find({owner: id});

    // this is for users privateRepos
    const token = `Token ${process.env.GIT_PERSONAL_ACCESS_TOKEN}`
    axios.get(`https://api.github.com/users/DhruvDave12`,{
        headers: {
            "Authorization": token
        }
    }
    )
    .then(resp => {
        res.status(200).send({
            success: true,
            data: JSON.parse(JSON.stringify(resp.data))
        })
    })
    .catch(err => {
        res.status(404).send({
            success: false,
            data: err
        })
    })
}   