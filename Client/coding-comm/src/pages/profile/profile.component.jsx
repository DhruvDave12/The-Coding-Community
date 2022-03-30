import React from "react";
import './profile.styles.scss';

import { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from '../../context/context';

const Profile = () => {
    
    const userState = useContext(myContext);
    const [ user, setUser ] = userState;
    var currUser;
    if(user){
        currUser = user;
    }
    return (
        <div className="home">
            {
                !user ? <h1>LOADING</h1>
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
                        <h2>Here is your data</h2>
                    }
                </div>
                :
                <h2>Loading...</h2>
            }           
        </div>
    )
}

export default Profile;