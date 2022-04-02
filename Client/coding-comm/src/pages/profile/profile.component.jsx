import React, { useContext } from "react";
import { myContext } from '../../context/context';

import './profile.styles.scss';

import ProfileData from "../../components/profile-data-component/profile-data.component";
import FollowDetails from "../../components/follow-details-component/follow-details.component";
import TechStack from "../../components/tech-stacks-component/tech-stack.component";
import YourPosts from "../../components/user-posts-component/user-posts.component";

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
        <div className="profile">
            {
                currData !== undefined && currUser !== undefined ?
                    <div className="profile-container">
                        <div className="section">
                            <ProfileData currData={currData} currUser={currUser}/>
                            <FollowDetails currData={currData} toKeep={false}/>
                        </div>
                        <TechStack />
                        <YourPosts />
                    </div>
                    :
                    <div className="profile-container">
                        {/* Create loading Spinner Icon Component for here */}
                        <p>Loading...</p>
                    </div>

            }

        </div>
    )
}

export default Profile;