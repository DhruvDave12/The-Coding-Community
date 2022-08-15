import React from "react";
import {
    SmileOutlined
  } from "@ant-design/icons";
import "./share_something.styles.scss";
const ShareSomething = ({handleOpen}) => {
    return (
        <div className="share__something" onClick={handleOpen}>
            <div className="share__something__text">Share Something ...</div> 
            <SmileOutlined style={{fontSize: "150%"}}/>            
        </div>
    )
}

export default ShareSomething;