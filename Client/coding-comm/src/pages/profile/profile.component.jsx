import React, { useContext, useState, useEffect } from "react";
import { myContext } from "../../context/context";
import axios from "axios";
import "./profile.styles.scss";

import ProfileData from "../../components/profile-data-component/profile-data.component";
import FollowDetails from "../../components/follow-details-component/follow-details.component";
import TechStack from "../../components/tech-stacks-component/tech-stack.component";
import YourPosts from "../../components/user-posts-component/user-posts.component";

const Profile = () => {
  const { user, data } = useContext(myContext);

  const [userValue, setUserValue] = user;
  const [dataValue, setDataValue] = data;

  const [post, setPost] = useState();

  // console.log(userValue);
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

  // console.log(post, currUser);
  return (
    <div className="profile">
      {currUser !== undefined &&
      (currUser.moreDataPosted == false ||
        (currUser.moreDataPosted == true && currData)) ? (
        <div className="profile-container">
          <div className="section">
            <ProfileData currData={currData} currUser={currUser} />

            <FollowDetails currData={currData} toKeep={false} />
          </div>
          <TechStack />
          <YourPosts post={post} />
        </div>
      ) : (
        <div className="profile-container">
          {/* Create loading Spinner Icon Component for here */}
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
