import React from "react";
import './follow-details.styles.scss';

const FollowDetails = ({currData}) => {
    return (
        <div className="follow-details">
            <div className="follow-data">
                <div className="posts">
                    <p className="quantity">X</p>
                    <p className="title">POSTS</p>
                </div>
                <div className="followers">
                    <p className="quantity">{currData.followers}</p>
                    <p className="title">FOLLOWERS</p>
                </div>
                <div className="following">
                    <p className="quantity">{currData.following}</p>
                    <p className="title">FOLLOWING</p>
                </div>
            </div>

            <div className="buttons">
                <a href="/edit" className="edit">EDIT</a>
            </div>
            <p className="bio">{currData.bio}</p>
        </div>
    )
}

export default FollowDetails;