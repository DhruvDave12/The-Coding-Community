import React from "react";
import "./github_stargazer.styles.scss";

const GithubStargazer = ({repo}) => {
    return (
        <div className="github-stargazer">
            <img src={repo.avatar} alt="github-avatar" className="github_avatar"/>
            <a className="github_name" href={repo.url}>{repo.name}</a>
        </div>
    )   
}

export default GithubStargazer;