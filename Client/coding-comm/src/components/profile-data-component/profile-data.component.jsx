import React from "react";
import "./profile-data.styles.scss";

import { Link } from "react-router-dom";

const ProfileData = ({ currUser, currData }) => {
  return (
    <div className="profile-data">
      <div className="profile-pic"></div>
      <p className="username">{currUser.username}</p>
      {
          currData ?
          <div className="logos">
          <a href={`https://github.com/${currData.github}`} className="git">
            Github
          </a>
          <a href={currData.linkedInUrl} className="linkedIn">
            LinkedIn
          </a>
        </div>
        :
        <div className="logos">
            <Link to={'/tell-us-more'}>Start by posting more data</Link>
        </div> 

      }
        
    </div>
  );
};

export default ProfileData;
