const Posts = require('../models/posts.models');
const Comments = require('../models/comments.models');


// Like system of post will be stored in database   
module.exports.postPost = async (req,res) => {
    if(!req.user){
        res.status(403).send({
            success: false,
            msg: "Please Login/Signup"
        })
    }

    const { captions } = req.body;
    
    const newPost = new Posts({
        caption: captions,
        owner: req.user._id
    })

    newPost.images = req.files.map(f => ({ url: f.path, fileName: f.filename }))
    await newPost.save();

    res.status(200).send({
        success: true,
        data: newPost
    })
}

// Make comments API
module.exports.postComments = async(req,res) => {

    if(!req.user){
        res.status(403).send({
            success: false,
            msg: "Please login or signup"
        })
    }
    const {comment_body} = req.body;
    const newComment = new Comments({
        comment_body
    });

    // now we will add the ID of owner to this comment
    newComment.owner = req.user._id;
    await newComment.save();

    // Now we have the comment now we are supposed to add this comment to the required post.
    const { postID } = req.params;
    const post = await Posts.findById(postID);

    post.comments.push(newComment);
    await post.save();

    res.status(200).send({
        success: true,
        data: post
    })
}

module.exports.getPosts = async (req,res) => {
    if(!req.user){
        res.status(403).send({
            success: false,
            msg: "Please login or signup"
        })
    }

    const posts = await Posts.find({}).populate('owner');
    res.status(200).send({
        success: true,
        data: posts
    })
}

module.exports.getComments = async(req,res) => {
    if(!req.user){
        res.status(403).send({ 
            success: false,
            msg: "Please login or signup"
        })
    }

    try {
        const { id } = req.params;
        const post = await Posts.findById(id).populate({
            path: 'comments',
            populate: 'owner'
        });
        await post.save();
    
        res.status(200).send({
            success: true,
            data: post.comments
        })
    } catch (err) {
        console.log("ERROR: ", err);
    }
}

module.exports.getPostOfUser = async (req,res) => {
    if(!req.user){
        res.status(403).send({
            success: false,
            msg: "Please login or signup"
        })
    }

    const { id } = req.params;

    const post = await Posts.find({owner: id}).populate({
        path: 'comments',
        populate: 'owner'
    });

    res.status(200).send({
        success: true,
        data: post
    })
}