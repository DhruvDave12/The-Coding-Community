import React, {useContext} from "react";
import "./post-modal.styles.scss";
import {
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

import "./post-modal.styles.scss";
import LazyLoader from "../lazy-loader/lazy-loader.component";
import {PostContext} from "../../context/postContext";
import Comment from "../comment/comment.component";

const PostModal = ({ post }) => {
  const {getPostLikes} = useContext(PostContext);
  return (
    post ? 
    <div className="post__modal">
      <div className="wrapper">
        <img src={post.images[0].url} className="post__image" alt="post-image" />
        <div className="post__modal__content">
          <p className="post__caption">{post.caption}</p>
        </div>
        <div className="reach__section">
          <div className="reach__left__section">
            <HeartOutlined style={{ fontSize: "150%" }} />
            <p className="likes__count">{!getPostLikes(post._id) ? 0 : getPostLikes(post._id)}</p>
            <CommentOutlined style={{ fontSize: "150%" }} />
            <p className="comments__count">{post.comments.length}</p>
          </div>

          <div className="reach__right__section">
            <ShareAltOutlined style={{ fontSize: "150%" }} />
          </div>
        </div>

        <p className="comments__text">Comments</p>
      </div>
      <div className="post__comments">
        {
          post.comments && post.comments.length > 0 ? 
          <div className="comment__wrapper">
            {
              post.comments.map(comment => (
                <div style={{marginBottom: 10}}>
                  <Comment comment={comment} />
                  <div className="divider" />
                </div>
              ))
            }
          </div>
          : null
        }
      </div>
    </div>
    : <LazyLoader />
  );
};

export default PostModal;
