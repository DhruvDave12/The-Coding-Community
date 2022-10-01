import React from "react";
import "./postcard.styles.scss";

const PostCard = ({post, handleClick}) => {
    return (
        <div className="post__card" onClick={handleClick}>
            <img src={post?.images[0]?.url} alt="post" className="post__card"/>
        </div>
    )
}

export default PostCard;