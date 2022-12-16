import React, { useContext, useState, useEffect } from "react";
import { myContext } from "../../context/context";
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
const { TextArea } = Input;

const Profile = () => {
  const { user, data } = useContext(myContext);
  const navigate = useNavigate();
  const id = window.location.pathname.split("/")[2];


  const [userValue, setUserValue] = user;
  const [dataValue, setDataValue] = data;

  const [post, setPost] = useState();
  const [postModal, setPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [repos, setRepos] = useState([]);

  // extra details states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [education, setEducation] = useState("");
  const [country, setCountry] = useState("");
  const [codeChefRating, setCodeChef] = useState("");
  const [codeForcesRating, setCodeForcesRating] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [skillSt, setSkillSt] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [otherData, setOtherData] = useState();

  var currUser, currData;
  if (userValue) {
    currUser = userValue;
  }
  if (dataValue) {
    currData = dataValue;
  }

  useEffect(() => { 
    if(currUser){
      if(currUser._id !== id){
        const getOtherData = async () => {
          const res = await axios.get(`http://localhost:8080/user/data/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          });

          // console.log("res: ", res);
          setOtherData(res.data.data);
        }

        getOtherData();
      }
    }
  }, [id, userValue])

  useEffect(() => {
    if (currUser && currUser.moreDataPosted) {
      const getPosts = async () => {
        const res = await axios.get(
          `http://localhost:8080/post/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setPost(res.data.data);
      };
      // todo -> change it to fetch repos from an ID
      const getRepos = async () => {
        const res = await axios.get(`http://localhost:8080/project/repos`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setRepos(res.data.data);
      };

      getPosts();
      // getRepos();
    }
  }, [userValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const skills = skillSt.split(", ");
    await axios.post(
      "http://localhost:8080/tell-us-more",
      {
        firstName: firstName,
        lastName: lastName,
        education,
        country,
        codeChefRating,
        codeforcesRating: codeForcesRating,
        github,
        linkedInUrl: linkedIn,
        bio: bio,
        skills: skills,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    navigate("/profile");
    window.location.reload(false);
  };

  const handlePostClick = (postE) => {
    setSelectedPost(postE);
    console.log(postE);
    setPostModal(true);
  };

  const handleFollowUser = async () => {
    console.log("HELLO");
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/user/update/${currUser._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  console.log("data: ", otherData);
  return (
    <div className="profile">
      {currUser && currUser.moreDataPosted == false ? (
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
              placeholder="Code Forces Rating"
              onChange={(e) => setCodeForcesRating(e.target.value)}
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
          {currData && currUser ? (
            <div className="profile-wrapper">
              <div className="profile__upper__part">
                <div className="wave__image">
                  {/* <img src={Waves} alt="waves" /> */}
                  <div className="profile__bg"></div>
                </div>
                <div className="profile__upper__sec">
                  <div className="profile__image"></div>
                  <div className="profile__upper__module2">
                    <div className="profile__name">
                      {
                        !otherData ? 
                        <p className="username">
                          {currData.firstName} {currData.lastName}
                        </p> :
                        
                        <p className="username">
                          {otherData.firstName} {otherData.lastName}
                        </p>
                      }
                      <p className="position">Product Designer @ Google</p>
                    </div>
                    <div className="profile__location">
                      <img src={Location} alt="location" className="location" />
                      {
                        !otherData ? 
                        <div className="location__text">{currData.country}</div>
                        : 
                        <div className="location__text">{otherData.country}</div>
                      }
                    </div>
                    <div className="profile__links">
                      <div className="github__wrapper">
                        {
                          !otherData ? 
                          <a href={`https://github.com/${currData.github}`}>
                            <img src={Github} className="gitIcon" />
                          </a> : 
                          <a href={`https://github.com/${otherData.github}`}>
                          <img src={Github} className="gitIcon" />
                        </a>
                        }
                      </div>
                      <div className="linkedin__wrapper">
                        {
                          !otherData ? 
                            <a href={currData.linkedInUrl}>
                              <img src={Linkedin} className="linkedinIcon" />
                            </a> :
                            <a href={otherData.linkedInUrl}>
                            <img src={Linkedin} className="linkedinIcon" />
                          </a>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="profile__upper__module3">
                    <div className="profile__followers">
                      <div className="followers__text">
                        <p className="follow__title">Followers</p>
                        {
                          !otherData ? 
                          <p>{currData.followers}</p>
                          : 
                          <p>{otherData.followers}</p>
                        }
                      </div>
                      <div className="divider" />
                      <div className="following__text">
                        <p className="follow__title">Following</p>
                        {
                          !otherData ? 
                          <p>{currData.following}</p>
                          : 
                          <p>{otherData.following}</p>
                        }
                      </div>
                      {/* <div className="divider" /> */}
                      {/* <div className="following__text">
                        <p className="follow__title">Level</p>
                        <p>69</p>
                      </div> */}
                    </div>
                    <div className="follow__button">
                      <div className="follow__button__1">
                        {
                          !(id === currUser._id) ? 
                          <CustomNewButton
                            title={"Follow"}
                            onClick={handleFollowUser}
                          /> : <CustomNewButton title={"Edit Profile"} onClick={() => {}}/>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile__lower__part">
                <div className="profile__left__section">
                  <div className="left__sec__1">
                    <ProfileSection header={"Github Repos"}>
                      {repos.length === 0 ? (
                        <p className="no-repos">
                          No Repositories to display 😥
                        </p>
                      ) : (
                        <div>
                          {repos
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
                          {
                            !otherData ? 
                            <div>
                              {currData.skills.length === 0 ? (
                        <p className="no-repos">No Skills to display 😥</p>
                      ) : (
                            <div className="skill-set">
                              {currData.skills.map((skill) => (
                                <SkillCard skill={skill} />
                              ))}
                            </div>
                      )}
                            </div> 
                            :
                            <div>
                            {otherData.skills.length === 0 ? (
                      <p className="no-repos">No Skills to display 😥</p>
                    ) : (
                          <div className="skill-set">
                            {otherData.skills.map((skill) => (
                              <SkillCard skill={skill} />
                            ))}
                          </div>
                    )}
                          </div> 

                          }

                      </div>
                      
                    </ProfileSection>
                  </div>
                  <div className="left__sec__3">
                    <ProfileSection header={"CP Profile"}>
                      <p className="no-repos">Yet to design 😥</p>
                    </ProfileSection>
                  </div>
                </div>
                <div className="profile__right__section__wrapper">
                  <ProfileRightSection header={"About me"}>
                    {
                      !otherData ? 
                      <p className="about__me__text">{currData.bio}</p>
                      :
                      <p className="about__me__text">{otherData.bio}</p>
                    }
                  </ProfileRightSection>
                  <div className="profile__right__divider" />
                  <ProfileRightSection header={"Your Posts"}>
                    <div className="post__grid">
                      {post && post.length > 0 ? (
                        post.map((postEle) => {
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
          title={currUser.username}
          onOk={() => setPostModal(false)}
          visible={postModal}
          onCancel={() => setPostModal(false)}
        >
          <PostModal post={selectedPost} />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
