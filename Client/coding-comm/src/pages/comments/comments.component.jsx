import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import './comments.styles.scss';

const Comments = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [comments, setComments] = useState([]);
    const [comment_body, setCommentBody] = useState('');

    useEffect(() => {
        const getComments = async () => {
            const commentALL = await axios.get(`https://the-coding-community.herokuapp.com/post/comments/${params.id}`, {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            setComments(commentALL.data.data);
        }
        getComments();
    }, [])

    const handleComment = async (event) => {
        event.preventDefault();
        const postComment = await axios.post(`https://the-coding-community.herokuapp.com/new/comment/${params.id}`,{
            comment_body,
        }, {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
        })
        navigate(`/comments/${params.id}`);
        window.location.reload(false);
    }

    return (
        <div className="comments">
            <h1>COMMENTS</h1>
            {
                comments.length === 0 ? 
                <h2 className="text">Start a new comment :)</h2>
                :
                comments.map(comment => (
                    <div className="particular-comment">
                        <p className="user">{comment.owner.username}</p>
                        <p className="body">{comment.comment_body}</p>
                    </div>
                ))
            }
            <form onSubmit={handleComment}>
                <div className="fields">
                    <input type="text" placeholder="New Comment" onChange={e => setCommentBody(e.target.value)}/>
                </div>
                <button>POST</button>
            </form>
            <Link to={'/feed'}>Go Back</Link>
        </div>
    )
}

export default Comments;