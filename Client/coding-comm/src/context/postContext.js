import React, {useContext} from "react";
import axiosInstance from "../services/axiosInstance";
import myContext from "./context";

export const PostContext = React.createContext();

const PostProvider = ({children}) => {
    // create a map of post likes that will be stores in local storage
    const [postLikes, setPostLikes] = React.useState({});
    const [userLiked, setUserLiked] = React.useState({});
    
    const likePost = (postId) => {
        const postLikes = JSON.parse(localStorage.getItem("postLikes")) || {};
        if(postLikes[postId]){
            const likes = postLikes[postId];
            postLikes[postId] = likes + 1;
        } else {
            postLikes[postId] = 1;
        }
        localStorage.setItem("postLikes", JSON.stringify(postLikes));
        setPostLikes(postLikes);

        const userLiked = JSON.parse(localStorage.getItem("userLiked")) || {};
        userLiked[postId] = true;
        localStorage.setItem("userLiked", JSON.stringify(userLiked));
        setUserLiked(userLiked);
    }

    const unlikePost = (postId) => {
        const postLikes = JSON.parse(localStorage.getItem("postLikes")) || {};
        if(postLikes[postId]){
            const likes = postLikes[postId];
            if(likes === 1){
                delete postLikes[postId];
            } else {
                postLikes[postId] = likes - 1;
            }
        }
        localStorage.setItem("postLikes", JSON.stringify(postLikes));
        setPostLikes(postLikes);

        const userLiked = JSON.parse(localStorage.getItem("userLiked")) || {};
        delete userLiked[postId];
        localStorage.setItem("userLiked", JSON.stringify(userLiked));
        setUserLiked(userLiked);
    }

    // has user liked the post
    const hasUserLikedPost = (postId) => {
        const userLiked = JSON.parse(localStorage.getItem("userLiked")) || {};
        return userLiked[postId];
    }

    const getPostLikes = (postId) =>{
        const postLikess = JSON.parse(localStorage.getItem("postLikes")) || {};
        console.log("POST LIKES: ", postLikess);
        return postLikess[postId];
    }

    const getComments = async (post) => {
        try {
            // console.log("POST ID: ", postId);
            const res = await axiosInstance.get(`/post/comments/${post._id}`);
            console.log("RES: ", res.data.data);
            return res.data.data;
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }
    return (
        <PostContext.Provider value={{likePost, unlikePost, getPostLikes,hasUserLikedPost, getComments}}>
            {children}
        </PostContext.Provider>
    )
}

export default PostProvider;