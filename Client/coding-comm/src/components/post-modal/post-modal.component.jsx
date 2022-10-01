import React from "react";
import "./post-modal.styles.scss";

const PostModal = ({post, isModalOpen,handleOk, handleCancel}) => {
    console.log(post);
    return (
        <div className="post__modal">
            <p>{post._id}</p>
        </div>
    )
}

export default PostModal;