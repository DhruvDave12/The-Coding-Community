import React from "react";
import "./comment.styles.scss";
import userIcon from "../../assets/images/user.svg";

const Comment = ({comment}) => {
    return (
        <div className="comment">
            <div className="owner__section">
                <img src={comment?.owner?.picture ? comment?.owner?.picture : userIcon} alt="user-image" className="owner__image" />
                <p className="comment__owner">{comment?.owner?.username}</p>
            </div>
                <p className="comment__body">{comment?.comment_body}</p>
        </div>
    )
}

export default Comment;