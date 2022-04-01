import React, { useContext } from "react";
import { myContext } from '../../context/context';

import './profile.styles.scss';

const Profile = () => {
    const { user, data } = useContext(myContext);

    const [userValue, setUserValue] = user;
    const [dataValue, setDataValue] = data;

    var currUser, currData;
    if (userValue) {
        currUser = userValue;
    }
    if (dataValue) {
        currData = dataValue;
    }

    return (
        <div className="your-feed">
            {
                currData !== undefined && currUser !== undefined ?
                    <div className="containerr">
                        <div className="section">
                            <div className="left-container">
                                <div className="profile-pic"></div>
                                <p className="username">{currUser.username}</p>
                                <div className="logos">
                                    <a href={`https://github.com/${currData.github}`} className="git">Github</a>
                                    <a href={currData.linkedInUrl} className="linkedIn">LinkedIn</a>
                                </div>
                            </div>
                            <div className="right-container">
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
                        </div>
                        <div className="floating-stacks">
                            <div className="stack1"></div>
                            <div className="stack2"></div>
                            <div className="stack3"></div>
                        </div>
                        <div className="my-posts"></div>
                    </div>
                    :
                    <div className="containerr">
                        <p>Loading...</p>
                    </div>

            }

        </div>
    )
}

export default Profile;