import React from "react";
import {
    SmileOutlined
  } from "@ant-design/icons";

import "./share_something.styles.scss";
const ShareSomething = () => {
    return (
        <div className="share__something">
            <div className="share__something__text">Share Something ...</div> 
            <SmileOutlined style={{fontSize: "150%"}}/>            
        </div>
    )
}

export default ShareSomething;