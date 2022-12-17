import React, {useContext} from "react";
import {
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
  HeartFilled,
} from "@ant-design/icons";
import "./particular-post.styles.scss";
import {PostContext} from "../../context/postContext";

const ParticularPost = ({post}) => {
  const {likePost, unlikePost, getPostLikes, hasUserLikedPost} = useContext(PostContext);
  const hasLiked = hasUserLikedPost(post._id);

  console.log("POST: ", post);
  return (
    <div className="particular__post">
      {/* User section */}
      <div className="user__section">
        <div className="user__section--image">
          <img
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            alt="user"
            className="user__image"
          />
        </div>
        <div className="user__section--name">
          <p className="user__name__text">{post.owner.username}</p>
          <p className="user__date__text">2 hours ago</p>
        </div>
      </div>
      {/* Post image carousel section */}
      <div className="post__section">
        <div className="post__section__caption">
          <p className="post__section__caption__text">
            {post.caption}
          </p>
        </div>
        <div className="post__section__image">
          <img
            src={post?.images[0]?.url ? post?.images[0]?.url : "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
            alt="post"
            className="post__image"
          />
        </div>
      </div>
      {/* Like comment share section */}
      <div className="reach__section">
        <div className="reach__left__section">
            {
              !hasLiked ? 
              <HeartOutlined style={{fontSize: '150%'}} onClick={() => {
                  likePost(post._id)
              }}/>
              :
              <HeartFilled style={{fontSize: '150%', color: 'red'}} onClick={() => {
                  unlikePost(post._id)
              }}/>
            }
            <p className="likes__count">{!getPostLikes(post._id) ? 0 : getPostLikes(post._id)}</p>
            <CommentOutlined style={{fontSize: '150%'}}/>
            <p className="comments__count">{post.comments.length}</p>
        </div>

        <div className="reach__right__section">
            <ShareAltOutlined style={{fontSize: '150%'}} />
        </div>
      </div>
      {/* Footer */}
    </div>
  );
};

export default ParticularPost;
