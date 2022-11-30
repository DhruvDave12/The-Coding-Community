import React from "react";
import "./post-modal.styles.scss";
import {
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

import "./post-modal.styles.scss";
import LazyLoader from "../lazy-loader/lazy-loader.component";

const PostModal = ({ post }) => {
  return (
    post ? 
    <div className="post__modal">
      <img src={post.images[0].url} className="post__image" alt="post-image" />
      <div className="post__modal__content">
        <p className="post__caption">{post.caption}</p>
      </div>
      <div className="reach__section">
        <div className="reach__left__section">
          <HeartOutlined style={{ fontSize: "150%" }} />
          <p className="likes__count">28</p>
          <CommentOutlined style={{ fontSize: "150%" }} />
          <p className="comments__count">{post.comments.length}</p>
        </div>

        <div className="reach__right__section">
          <ShareAltOutlined style={{ fontSize: "150%" }} />
        </div>
      </div>
    </div>
    : <LazyLoader />
  );
};

export default PostModal;
