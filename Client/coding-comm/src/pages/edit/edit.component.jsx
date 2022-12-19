import React from "react";
import './edit.styles.scss';

import { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from '../../context/auth.context';

const Edit = () => {
    const {user, data} = useContext(myContext);

    const [userValue, setUserValue] = user;
    const [dataValue, setDataValue] = data;

    var currUser, userData;
    if (userValue) {
        currUser = userValue;
    }
    if(dataValue){
        userData = dataValue;
    }

    return (
        <div className="home">
            {
                !currUser ? <h1>LOADING</h1>
                    :
                    <h1>Welcome, {currUser.username}</h1>
            }
            {
                currUser ?
                    <div>
                        {
                            currUser.moreDataPosted === false ?
                                <Link className="tell-more" to={'/tell-us-more'}>Tell us more</Link>
                                :
                                <div className="user-data-tab">
                                    {
                                        userData !== undefined ?
                                            <ul>
                                                <li>{userData.firstName}</li>
                                                <li>{userData.lastName}</li>
                                                <li>{userData.education}</li>
                                                <li>{userData.country}</li>
                                                <li>{userData.github}</li>
                                                <li>{userData.codeChefRating}</li>
                                                <li>{userData?.codeforcesUsername ? userData.codeforcesUsername : "Dhruv"}</li>
                                                <li>{userData.linkedInUrl}</li>
                                                <li>{userData.bio}</li>
                                            </ul>
                                            :
                                            <p>Loading....</p>
                                    }
                                    {
                                        userData !== undefined ? 
                                        <button>Edit Details</button>
                                        :
                                        null
                                    }
                                </div>
                        }
                    </div>
                    :
                    <h2>Loading...</h2>
            }
        </div>
    )
}

export default Edit;