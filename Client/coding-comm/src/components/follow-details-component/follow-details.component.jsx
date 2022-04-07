import React, { useEffect, useState } from "react";
import "./follow-details.styles.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { myContext } from "../../context/context";

const FollowDetails = ({ currData, toKeep }) => {
  const { data } = useContext(myContext);
  const [isFoll, setIsFoll] = useState(false);
  const [dataValue, setDataValue] = data;

  useEffect(() => {
      if(dataValue){
        for (let i = 0; i < dataValue.allFollowing.length; i++) {
            if (dataValue.allFollowing[i].username === currData.owner.username) {
              setIsFoll(true);
              break;
            }
          }
      }
    
  }, [dataValue]);

  const handleFollow = async (id) => {
    await axios.get(
      `https://the-coding-community.herokuapp.com/user/update/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    window.location.reload(false);
  };

  const handleUnfollow = async (id) => {
        await axios.get(`https://the-coding-community.herokuapp.com/user/unfollow/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })

        window.location.reload(false);
  }

  return (
    <div className="wrapper">
      {dataValue ? (
        <div className="follow-details">
          <div className="follow-data">
            <div className="posts">
              <p className="quantity">X</p>
              <p className="title">POSTS</p>
            </div>
            <div className="followers">
              {currData ? (
                <Link
                  to={"/social/followers"}
                  state={{ currFollows: currData.allFollowers }}
                >
                  {currData.followers}
                </Link>
              ) : (
                <div className="quantity">X</div>
              )}
              <p className="title">FOLLOWERS</p>
            </div>
            <div className="following">
              {currData ? (
                <Link
                  to={"/social/following"}
                  state={{ currFollows: currData.allFollowing }}
                >
                  {" "}
                  {currData.following}
                </Link>
              ) : (
                <p className="quantity">X</p>
              )}
              <p className="title">FOLLOWING</p>
            </div>
          </div>

          <div className="buttons">
            {toKeep ? (
              <div className="follow-wrapper">
                {!isFoll ? (
                  <div
                    className="follow"
                    onClick={() => {
                      handleFollow(currData.owner._id);
                    }}
                  >
                    FOLLOW
                  </div>
                ) : (
                  <div className="un-follow" onClick={() => {
                    handleUnfollow(currData.owner._id);
                  }}>Unfollow</div>
                )}
              </div>
            ) : (
              <a href="/edit" className="edit">
                EDIT
              </a>
            )}
          </div>
          {currData ? (
            <p className="bio">{currData.bio}</p>
          ) : (
            <p className="bio">
              <Link to={"/tell-us-more"}>Start by posting more data</Link>
            </p>
          )}
        </div>
      ) : (
        <div className="wrapper">
          <p>Loading</p>
        </div>
      )}
    </div>
  );
};

export default FollowDetails;
