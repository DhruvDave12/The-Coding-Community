import React from "react";
import './follow-details.styles.scss';

const FollowDetails = ({currData, toKeep}) => {
    return (
        <div className="follow-details">
            <div className="follow-data">
                <div className="posts">
                    <p className="quantity">X</p>
                    <p className="title">POSTS</p>
                </div>
                <div className="followers">
                    {
                        currData ? 
                        <p className="quantity">{currData.followers}</p>
                        :
                        <div className="quantity">X</div>
                    }
                    <p className="title">FOLLOWERS</p>
                </div>
                <div className="following">
                    {
                        currData ? 
                        <p className="quantity">{currData.following}</p>
                        :
                        <p className="quantity">X</p>
                    }
                    <p className="title">FOLLOWING</p>
                </div>
            </div>

            <div className="buttons">
                {
                    toKeep ? 
                    <a href="/follow" className="follow">FOLLOW</a>
                    :
                    <a href="/edit" className="edit">EDIT</a>
                }               
            </div>
            {
                currData ? 
                <p className="bio">{currData.bio}</p>
                :
                <p className="bio">Start by posting more data....</p>
            }
        </div>
    )
}

export default FollowDetails;