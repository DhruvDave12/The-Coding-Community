import React, { useEffect, useState } from "react";
import axios from "axios";
import "./feed.styles.scss";
import ParticularPost from "../../components/particularPost/particular-post.component";
import ShareSomething from "../../components/share-something/share_something.component";
import { Modal } from "antd";
import NewPostModal from "../../components/newPostModal/newPostModal.component";
import LazyLoader from "../../components/lazy-loader/lazy-loader.component";
import axiosInstance from "../../services/axiosInstance";

const Feed = () => {
  const [post, setPost] = useState([]);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newPostLoading, setNewPostLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const handleSubmit = async () => {
    setConfirmLoading(true);
    setNewPostLoading(true);
    const formData = new FormData();
    console.log("FILE: ", file);
    console.log("CAPTION: ",caption);

    formData.append("image", file);
    formData.append("captions", caption);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    };

    await axiosInstance.post('/new/post',formData,{
      headers: {
        "content-type": "multipart/form-data"
      }
    })
    // await axios.post(
    //   "http://localhost:8080/new/post",
    //   formData,
    //   config
    // );
    setNewPostLoading(false);
    setVisible(false);
    setConfirmLoading(false);
  };

  useEffect(() => {
    const getPosts = async () => {
      const posts = await axiosInstance.get('/post/all');
      // const posts = await axios.get(
      //   "http://localhost:8080/post/all",
      //   {
      //     headers: {
      //       Authorization: localStorage.getItem("token"),
      //     },
      //   }
      // );
      setPost(posts.data.data);
    };
    getPosts();
  }, [newPostLoading]);

  console.log(file);
  return (
    !newPostLoading ? 
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
          <ShareSomething handleOpen={showModal} />
        </div>
        {post.length === 0 ? (
          <h1>Start a new post :)</h1>
        ) : (
          <div className="feed__component__wrapper">
            {post.map((item) => (
              // todo -> render data dynamically now
              <div className="feed__component">
                <ParticularPost post={item}/>
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
    </div>
    :
      <LazyLoader />
  );
};

export default Feed;
