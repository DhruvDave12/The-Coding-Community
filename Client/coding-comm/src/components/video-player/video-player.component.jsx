import React from "react";
import ReactPlayer from 'react-player/lazy'
import "./video-player.styles.scss";

const VideoPlayer = ({videoURL}) => {
    return (
        <div className="video__player">
            <ReactPlayer
                url={videoURL}
                controls
                width="100%"
                height="100%"
            />
        </div>
    )
}

export default VideoPlayer;