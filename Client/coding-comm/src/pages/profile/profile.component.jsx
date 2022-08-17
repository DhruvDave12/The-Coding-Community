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

const Profile = () => {
  const { user, data } = useContext(myContext);

  const [userValue, setUserValue] = user;
  const [dataValue, setDataValue] = data;

  const [post, setPost] = useState();

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

          </div>
          <div className="left__sec__2">

          </div>
          <div className="left__sec__3">

          </div>
          <div className="left__sec__4">

          </div>
        </div>
        <div className="profile__right__section">

        </div>
      </div>
    </div>
  );
};

export default Profile;
