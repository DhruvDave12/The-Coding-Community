import React, { useContext, useState, useEffect } from "react";
import { myContext } from "../../context/auth.context";
import axios from "axios";
import "./profile.styles.scss";

import Github from "../../assets/images/github.svg";
import Linkedin from "../../assets/images/linkedin.svg";
import Location from "../../assets/images/location.svg";
import SkillCard from "../../components/skill-card/skill-card.component";
import CustomNewButton from "../../components/button/newCustomButton.component";
import ProfileSection from "../../components/profile-sections/profile-section.component";
import ProfileRightSection from "../../components/profile-right-section/profile-right-section.component";
import PostCard from "../../components/postcard/postcard.component";
import PostModal from "../../components/post-modal/post-modal.component";
import { Modal, Input } from "antd";
import LazyLoader from "../../components/lazy-loader/lazy-loader.component";
import GithubStargazer from "../../components/github_stargazer/github_stargazer.component";
import { useNavigate } from "react-router";
import axiosInstance from "../../services/axiosInstance";
import UserIcon from "../../assets/images/user.svg";
import { ProfileContext } from "../../context/profile.context";
const { TextArea } = Input;

const Profile = () => {
  const {
    loading,
    user,
    userData,
    userPosts,
    userRepos,
    diffLoading,
    getUserDetails,
    getUserExtraData,
    getUserPosts,
    getUserRepos,
    handleFollow,
    handleUnfollow,
    isFollowing,
    getUserCodeForcesData,
    codeforcesData} = useContext(ProfileContext);

  const navigate = useNavigate();
  const id = window.location.pathname.split("/")[2];

  const [postModal, setPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // extra details states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [education, setEducation] = useState("");
  const [country, setCountry] = useState("");
  const [codeChefRating, setCodeChef] = useState("");
  const [codeforcesUsername, setCodeforcesUsername] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [skillSt, setSkillSt] = useState("");
  const [bio, setBio] = useState("");

    console.log(localStorage.getItem('@firstLogin'));
  useEffect(() => {
    const bootstrap = async () => {
      await getUserDetails(id);
      await getUserExtraData(id);
      await getUserPosts(id);
      if(localStorage.getItem('@firstLogin') === 'false'){
        console.log("WE CAME IN");
        await getUserRepos(id);
        await getUserCodeForcesData(id);
      }
    }

    bootstrap();
  }, [id, diffLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const skills = skillSt.split(", ");
    await axiosInstance.post("/tell-us-more", {
      firstName: firstName,
      lastName: lastName,
      education,
      country,
      codeChefRating,
      codeforcesUsername: codeforcesUsername,
      github,
      linkedInUrl: linkedIn,
      bio: bio,
      skills: skills,
    });
    navigate(`/profile/${user._id}`);
    window.location.reload(false);
  };

  const handlePostClick = (postE) => {
    setSelectedPost(postE);
    console.log(postE);
    setPostModal(true);
  };

  console.log("CODEFORCES DATA: ", codeforcesData);
  return (
    !loading && !diffLoading? 
    <div className="profile">
      {user && !user.moreDataPosted && user._id === localStorage.getItem('userID') ? (
        <div className="profile-wrapper">
          <Modal
            title="Profile Details"
            visible={true}
            onOk={handleSubmit}
            closable={false}
          >
            <Input
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              style={{ marginBottom: 15 }}
            />
            <Input
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              style={{ marginBottom: 15 }}
            />
            <Input
              placeholder="Education"
              onChange={(e) => setEducation(e.target.value)}
              style={{ marginBottom: 15 }}
            />
            <Input
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              style={{ marginBottom: 15 }}
            />
            <Input
              placeholder="Code Chef Rating"
              onChange={(e) => setCodeChef(e.target.value)}
              style={{ marginBottom: 15 }}
            />
            <Input
              placeholder="Code Forces Username"
              onChange={(e) => setCodeforcesUsername(e.target.value)}
              style={{ marginBottom: 15 }}
            />
            <Input
              placeholder="Github Username"
              onChange={(e) => setGithub(e.target.value)}
              style={{ marginBottom: 15 }}
            />
            <Input
              placeholder="Linkedin URL"
              onChange={(e) => setLinkedIn(e.target.value)}
              style={{ marginBottom: 15 }}
            />
            <TextArea
              rows={4}
              placeholder="Tell us something about you..."
              onChange={(e) => setBio(e.target.value)}
              style={{ marginBottom: 15 }}
            />
            <TextArea
              rows={2}
              placeholder="Type your skills (Eg. Developer, Algorithms) ..."
              onChange={(e) => setSkillSt(e.target.value)}
            />
          </Modal>
        </div>
      ) : (
        <div>
          {userData && user ? (
            <div className="profile-wrapper">
              <div className="profile__upper__part">
                <div className="wave__image">
                  <div className="profile__bg"></div>
                </div>
                <div className="profile__upper__sec">
                  {user.picture ? (
                    <img className="profile__image" src={user.picture} />
                  ) : (
                    <img className="profile__image__none" src={UserIcon} />
                  )}
                  <div className="profile__upper__module2">
                    <div className="profile__name">
                      <div className="username">
                        {userData.firstName} {userData.lastName}
                      </div>
                    </div>
                    <div className="profile__location">
                      <img src={Location} alt="location" className="location" />
                      <div className="location__text">{userData.country}</div>
                    </div>
                    <div className="profile__links">
                      <div className="github__wrapper">
                        <a href={`https://github.com/${userData.github}`}>
                          <img src={Github} className="gitIcon" />
                        </a>
                      </div>
                      <div className="linkedin__wrapper">
                        <a href={userData.linkedInUrl}>
                          <img src={Linkedin} className="linkedinIcon" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="profile__upper__module3">
                    <div className="profile__followers">
                      <div className="followers__text">
                        <p className="follow__title">Followers</p>
                        <p>{userData.followers}</p>
                      </div>
                      <div className="divider" />
                      <div className="following__text">
                        <p className="follow__title">Following</p>
                        <p>{userData.following}</p>
                      </div>
                    </div>
                    <div className="follow__button">
                      <div className="follow__button__1">
                        {!(id === localStorage.getItem('userID')) ? (
                          <CustomNewButton
                            title={ isFollowing() ? "Unfollow" : "Follow"}
                            onClick={ isFollowing() ? () => handleUnfollow(id) : () => handleFollow(id)}
                          />
                        ) : (
                          <CustomNewButton
                            title={"Edit Profile"}
                            onClick={() => {
                              console.log("WILL DESIGN IT SOON :)");
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile__lower__part">
                <div className="profile__left__section">
                  <div className="left__sec__1">
                    <ProfileSection header={"Top Github Repos"}>
                      {userRepos && userRepos.length === 0 ? (
                        <p className="no-repos">
                          No Repositories to display 😥
                        </p>
                      ) : (
                        <div>
                          {userRepos && userRepos
                            .filter((repo, idx) => idx < 5)
                            .map((repo) => (
                              <GithubStargazer repo={repo} />
                            ))}
                        </div>
                      )}
                    </ProfileSection>
                  </div>
                  <div className="left__sec__2">
                    <ProfileSection header={"Skills"}>
                      <div>
                        <div>
                          {userData.skills.length === 0 ? (
                            <p className="no-repos">
                              No Skills to display 😥
                            </p>
                          ) : (
                            <div className="skill-set">
                              {userData.skills.map((skill) => (
                                <SkillCard skill={skill} />
                              ))} 
                            </div>
                          )}
                        </div>
                      </div>
                    </ProfileSection>
                  </div>
                  <div className="left__sec__3">
                    <ProfileSection header={"CP Profile"}>
                      {
                        codeforcesData ? 
                        <div>
                          <p className="cp">Max Codeforces Rating: {codeforcesData.maxRating}</p>
                          <p className="cp">Max Codeforces Rank: {codeforcesData.maxRank}</p>
    
                          <p className="cp">Current Rating: {codeforcesData.rating}</p>
                          <p className="cp">Current Rank: {codeforcesData.rank}</p>
                        </div>
                        : <p className="no-repos">No Data can be fetched 😢</p>
                      }
                    </ProfileSection>
                  </div>
                </div>
                <div className="profile__right__section__wrapper">
                  <ProfileRightSection header={"About me"}>
                    <p className="about__me__text">{userData.bio}</p>
                  </ProfileRightSection>
                  <div className="profile__right__divider" />
                  <ProfileRightSection header={"Your Posts"}>
                    {
                      user._id !== localStorage.getItem('userID') && !isFollowing() ?
                        <p className="follow__to__know__text">You need to follow this account to access posts 🔐</p>
                      :
                      <div className="post__grid">
                        {userPosts && userPosts.length > 0 ? (
                          userPosts.map((postEle) => {
                            return (
                              <PostCard
                                key={postEle._id}
                                post={postEle}
                                handleClick={() => handlePostClick(postEle)}
                              />
                            );
                          })
                        ) : (
                          <div className="no__post__wrapper">
                            <p className="no__post__text">No Posts Yet</p>
                          </div>
                        )}
                      </div>
                    }
                  </ProfileRightSection>
                </div>
              </div>
            </div>
          ) : (
            <LazyLoader />
          )}
        </div>
      )}
      {postModal && selectedPost && (
        <Modal
          title={user.username}
          onOk={() => setPostModal(false)}
          visible={postModal}
          onCancel={() => setPostModal(false)}
        >
          <PostModal post={selectedPost} />
        </Modal>
      )}
    </div>
    : <LazyLoader />
  );
};

export default Profile;
