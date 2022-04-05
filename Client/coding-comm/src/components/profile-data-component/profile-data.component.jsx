import React from "react";
import "./profile-data.styles.scss";

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
            <p>Start by posting more data</p>
        </div> 

      }
        
    </div>
  );
};

export default ProfileData;
