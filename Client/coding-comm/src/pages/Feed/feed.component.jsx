import React, { useEffect, useState } from "react";
import axios from "axios";

import "./feed.styles.scss";
import { Link } from "react-router-dom";

const Feed = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await axios.get(
        "https://the-coding-community.herokuapp.com/post/all",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setPost(posts.data.data);
    };
    getPosts();
  }, []);

  return (
    <div className="feed">
      {post.length === 0 ? (
        <div className="final-feed">
          <h1>Start a new post :)</h1>
          <Link to={"/new/post"}>New Post</Link>
        </div>
      ) : (
        <div className="final-feed">
          <Link to={"/new/post"}>New Post</Link>
          {post.map((item) => (
            <div className="particular-post">
              <div className="user">
                {" "}
                <p className="username">{item.owner.username}</p>
              </div>
              <div className="post-image">
                <img
                  src={item.images[0].url}
                  alt="post"
                  className="post-image-s"
                />
              </div>
              <div className="post-footer">
                <p className="caption">{item.caption}</p>
              </div>
              <Link to={`/comments/${item._id}`} className="comments">
                Comments
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
