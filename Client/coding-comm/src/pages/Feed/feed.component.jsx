import React, { useEffect, useState, useContext} from "react";
import "./feed.styles.scss";
import ParticularPost from "../../components/particularPost/particular-post.component";
import ShareSomething from "../../components/share-something/share_something.component";
import { Modal } from "antd";
import NewPostModal from "../../components/newPostModal/newPostModal.component";
import LazyLoader from "../../components/lazy-loader/lazy-loader.component";
import axiosInstance from "../../services/axiosInstance";
import CommentModal from "../../components/comment-modal/commentModal.component";
import { PostContext } from "../../context/postContext";
import {myContext} from "../../context/auth.context";
import userIcon from "../../assets/images/user.svg";
const Feed = () => {
  const {getComments} = useContext(PostContext);
  const {user} = useContext(myContext);
  let currUser;
  if(user){
    currUser = user[0];
  }
  console.log("USER: ", user);

  const [post, setPost] = useState([]);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newPostLoading, setNewPostLoading] = useState(false);
  const [commentVis, setCommentVis] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [selectedComment, setSelectedComment] = useState();
  const [comment, setComment] = useState('');
  const [currPost, setCurrPost] = useState();
  
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    setConfirmLoading(true);
    setNewPostLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("captions", caption);

    await axiosInstance.post('/new/post',formData,{
      headers: {
        "content-type": "multipart/form-data"
      }
    })
    setNewPostLoading(false);
    setVisible(false);
    setConfirmLoading(false);
  };

  useEffect(() => {
    const getPosts = async () => {
      const posts = await axiosInstance.get('/post/all');
      setPost(posts.data.data);
    };
    getPosts();
  }, [newPostLoading, commentLoading]);


  const showCommentModal = async (post) => {
    setCommentVis(true);
    setCurrPost(post);
    const res = await getComments(post);
    setSelectedComment(res);
  }

  const handleCancelComment = () => {
    setCommentVis(false);
  }

  const handleAddComment = async () => {
    setCommentLoading(true);
    await axiosInstance.post(`/new/comment/${currPost._id}`,{
      comment_body: comment
    })
    setCommentLoading(false);
    setCommentVis(false);
  }

  return (
    !newPostLoading && currUser ? 
    <div className="feed">
      <div className="final-feed">
        <div className="share__something__tab">
          <div className="profile__image">
            <img
              src={currUser?.picture ? currUser.picture : userIcon}
              alt="user"
              className="user__image"
            />
          </div>
          <ShareSomething handleOpen={showModal} />
        </div>
        {post.length === 0 ? (
          <h1>Start a new post :)</h1>
        ) : (
          <div className="feed__component__wrapper">
            {post.map((item) => (
              // todo -> render data dynamically now
              <div className="feed__component">
                <ParticularPost post={item} showComments={showCommentModal}/>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        title="New Post"
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <NewPostModal setCaption={setCaption} handleSubmit={handleSubmit} setFile={setFile}/>
      </Modal>

      <Modal
        title="Comments"
        visible={commentVis}
        onOk={() => setCommentVis(false)}
        onCancel={handleCancelComment}
      >
        <CommentModal comments={selectedComment} setComment={setComment} handleAddComment={handleAddComment}/>
      </Modal>
    </div>
    :
      <LazyLoader />
  );
};

export default Feed;
