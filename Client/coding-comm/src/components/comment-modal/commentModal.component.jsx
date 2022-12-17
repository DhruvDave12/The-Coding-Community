import React from "react";
import LazyLoader from "../lazy-loader/lazy-loader.component";
import "./commentModal.styles.scss";
import Comment from "../comment/comment.component";
import TextInput from "../text-input/text-input.component";
import CustomLandingButton from "../button/customLandingButton.component";


const CommentModal = ({comments, setComment, handleAddComment}) => {
    return (
        comments ? 
        <div>
            {
                comments.length > 0 ? 
                <div className="comments__wrapper">
                    {
                        comments.map(comment => (
                            <div style={{marginBottom: 10}}>
                                <Comment comment={comment}/>
                                <div className="divider"/>
                            </div>
                        ))
                    }
                </div>
                : <p className="no__comments">No Comments 🤐</p>
            }
            
            <div className="add__comment__section">
                <div className="input__wrapper">
                    <TextInput placeholder={"Add Comment..."} setChange={setComment} type={"text"}/>
                </div>
                <div className="button__wrapper">
                    <CustomLandingButton onClick={handleAddComment} title={"Add"}/>
                </div>
            </div>
        </div>
        :
        <LazyLoader />
    )
}

export default CommentModal;