import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import ProfileData from "../../components/profile-data-component/profile-data.component";
import TechStack from "../../components/tech-stacks-component/tech-stack.component";
import FollowDetails from "../../components/follow-details-component/follow-details.component";
import YourPosts from "../../components/user-posts-component/user-posts.component";

import "./others-profile.styles.scss";

const OtherProfile = () => {
  const params = useParams();
  const [post, setPost] = useState();
  const [currUserData, setCurrUserData] = useState();
  const [currUser, setCurrUser] = useState();
  const [isData, setIsData] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `https://the-coding-community.herokuapp.com/user/${params.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.data[0]) {
        setCurrUserData(res.data.data[0]);
        setCurrUser(res.data.data[0].owner);
        setIsData(true);
      } else {
        setIsData(false);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://the-coding-community.herokuapp.com/post/${params.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setPost(res.data.data);
    };
    getData();
  }, []);

  return (
    <div className="other-profile-wrapper">
      {!isData ? (
        <div className="other-profile">User profile is empty</div>
      ) : (
        <div className="other-profile">
          {currUser &&
          (currUser.moreDataPosted === false ||
            (currUser.moreDataPosted === true && currUserData)) ? (
            <div className="other-profile-container">
              <div className="section">
                <ProfileData
                  currUser={currUserData.owner}
                  currData={currUserData}
                />
                <FollowDetails currData={currUserData} toKeep={true} />
              </div>
              <TechStack />
              <YourPosts post={post} />
            </div>
          ) : (
            <p>Loading....</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OtherProfile;
