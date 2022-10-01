import React, { useContext, useState, useEffect } from "react";
import { myContext } from "../../context/context";
import axios from "axios";
import "./profile.styles.scss";

import Waves from "../../assets/images/wave.svg";
import Github from "../../assets/images/github.svg";
import Linkedin from "../../assets/images/linkedin.svg";
import Location from "../../assets/images/location.svg";
import Edit from "../../assets/images/edit.svg";

import ProfileData from "../../components/profile-data-component/profile-data.component";
import FollowDetails from "../../components/follow-details-component/follow-details.component";
import TechStack from "../../components/tech-stacks-component/tech-stack.component";
import YourPosts from "../../components/user-posts-component/user-posts.component";
import CustomNewButton from "../../components/button/newCustomButton.component";
import ProfileSection from "../../components/profile-sections/profile-section.component";
import ProfileRightSection from "../../components/profile-right-section/profile-right-section.component";
import PostCard from "../../components/postcard/postcard.component";
import PostModal from "../../components/post-modal/post-modal.component";
import { Modal } from "antd";
// TODO -> Integration of the profile page with the backend

const Profile = () => {
  const { user, data } = useContext(myContext);

  const [userValue, setUserValue] = user;
  const [dataValue, setDataValue] = data;

  const [post, setPost] = useState();
  const [postModal, setPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  var currUser, currData;
  if (userValue) {
    currUser = userValue;
  }
  if (dataValue) {
    currData = dataValue;
  }

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(
        `https://the-coding-community.herokuapp.com/post/${userValue._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setPost(res.data.data);
    };
    getPosts();
  }, [userValue]);

  //TODO -> Handle the post modal
  const handlePostClick = (postE) => {
    setSelectedPost(postE);
    console.log(postE);
    setPostModal(true);
  }
  return (
    // <div className="profile">
    //   {currUser !== undefined &&
    //   (currUser.moreDataPosted == false ||
    //     (currUser.moreDataPosted == true && currData)) ? (
    //     <div className="profile-container">
    //       <div className="section">
    //         <ProfileData currData={currData} currUser={currUser} />
    //         <FollowDetails currData={currData} toKeep={false} />
    //       </div>
          
    //       <TechStack />
    //       <YourPosts post={post} />

    //     </div>
    //   ) : (
    //     <div className="profile-container">
    //       {/* Create loading Spinner Icon Component for here */}
    //       <p>Loading...</p>
    //     </div>
    //   )}
    // </div>
    <div className="profile">
      <div className="profile__upper__part">
        <div className="wave__image">
          {/* <img src={Waves} alt="waves" /> */}
          <div className="profile__bg"></div>
        </div>
        <div className="profile__upper__sec">
        <div className="profile__image"></div>
          <div className="profile__upper__module2">
            <div className="profile__name">
              <p className="username">Jenny Wilson</p>
              <p className="position">Product Designer @ Google</p>  
            </div>  
            <div className="profile__location">
              <img src={Location} alt="location" className="location"/>
              <div className="location__text">
                London, United Kingdom
              </div>
            </div>
            <div className="profile__links">
              <div className="github__wrapper">
                <img src={Github} className="gitIcon"/>
              </div>
              <div className="linkedin__wrapper">
                <img src={Linkedin} className="linkedinIcon"/>
              </div>
            </div>
          </div>
          <div className="profile__upper__module3">
            <div className="profile__followers">
              <div className="followers__text">
                <p className="follow__title">Followers</p>
                <p>10</p>
              </div>
              <div className="divider"/>
              <div className="following__text">
                <p className="follow__title">Following</p>
                <p>15</p>
              </div>
              <div className="divider"/>
              <div className="following__text">
                <p className="follow__title">Level</p>
                <p>69</p>
              </div>
            </div>
            <div className="follow__button">
              <div className="follow__button__1">
                <CustomNewButton title={"Follow"} onClick={() => {}}/>
              </div>
            </div>            
          </div>
          {/* <div className="profile__upper__module4">
              <div className="edit__wrapper">
                <img src={Edit} alt="edit" className="edit" />
            </div>
          </div> */}
        </div>
      </div>
      <div className="profile__lower__part">
        <div className="profile__left__section">
          <div className="left__sec__1">
            <ProfileSection header={"Github Repos"}>
              <h1>hehe</h1>
            </ProfileSection>
          </div>
          <div className="left__sec__2">
            <ProfileSection header={"Skills"} >
              <h1>hehe</h1>
            </ProfileSection>
          </div>
          <div className="left__sec__3">
            <ProfileSection header={"CP Profile"}>
              <h1>hehe</h1>
            </ProfileSection>
          </div>
          <div className="left__sec__4">
            <ProfileSection header={"Social Links"}>
              <h1>hehe</h1>
            </ProfileSection>
          </div>
        </div>
        <div className="profile__right__section__wrapper">
          <ProfileRightSection header={"About me"}>
            <p className="about__me__text">I have a very good command in Photoshop, Illustrator and Web Design. I have,
              in the past, worked with many clients and have delivered projects on time. I am a very hard working person
              and I am very passionate about my work. I am a very good team player and I am always ready to learn new things.
            </p>
          </ProfileRightSection>
          <div className="profile__right__divider"/>
          <ProfileRightSection header={"Your Posts"}>
            <div className="post__grid">
              {
                post && post.length > 0 ? 
                post.map((postEle) => {
                  return (
                    <PostCard
                      key={postEle._id}
                      post={postEle}
                      handleClick={() => handlePostClick(postEle)}
                    />
                  );
                }) :
                  <div className="no__post__wrapper">
                    <p className="no__post__text">No Posts Yet</p>
                  </div>
              }
            </div>
          </ProfileRightSection>
        </div>
      </div>
        {
          postModal && (
            <Modal 
              title={"Post"}
              onOk={() => setPostModal(false)}
              visible={postModal}
              onCancel={() => setPostModal(false)}
            >
              <PostModal post={selectedPost} />
            </Modal>
          ) 
        }
    </div>
  );
};

export default Profile;
