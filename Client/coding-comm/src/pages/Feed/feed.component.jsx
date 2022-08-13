import React, { useEffect, useState } from "react";
import axios from "axios";

import "./feed.styles.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import ParticularPost from "../../components/particularPost/particular-post.component";
import ShareSomething from "../../components/share-something/share_something.component";
const Feed = () => {
  const [post, setPost] = useState([]);

  const navigate = useNavigate();

  const handleClick = async (id) => {
    navigate(`/profile/${id}`);
    window.location.reload(false);
  };

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

  console.log(post);
  return (
    <div className="feed">
      <div className="final-feed">
        <div className="share__something__tab">
          <div className="profile__image">
            <img
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              alt="user"
              className="user__image"
            />
          </div>
          <ShareSomething />
        </div>
        {post.length === 0 ? (
            <h1>Start a new post :)</h1>
        ) : (
          <div className="feed__component__wrapper">
            {post.map((item) => (
              // todo -> render data dynamically now
              <div className="feed__component">
                <ParticularPost />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
