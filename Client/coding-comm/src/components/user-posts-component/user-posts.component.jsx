import React from "react";
import './user-posts.styles.scss';
import { Link } from "react-router-dom";

const YourPosts = ({ post }) => {
    
    return (
        <div className="your-posts">
            {
                post ? 
                post.map(item => (
                    <div className="particular-post">
                        <div className="images">
                            {
                                item.images.map(imgg => (
                                    <img src={imgg.url} alt="" />
                                ))
                            }
                        </div>
                        <div className="caption">{item.caption}</div>
                        <Link to={`/comments/${item._id}`} className="comments">Comments</Link>
                    </div>
                ))
                :
                <h1>LOADING...</h1>
            }
        </div>
    )
}

export default YourPosts;