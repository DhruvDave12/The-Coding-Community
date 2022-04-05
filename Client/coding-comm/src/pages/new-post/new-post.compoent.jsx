import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import './new-post.styles.scss';

const NewPost = () => {
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('image', file);
        formData.append('captions', caption);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': localStorage.getItem('token')
            }
        };
        
        await axios.post('http://localhost:8080/new/post', formData, config)
        navigate('/feed');
        window.location.reload(false);
    }

    const onSelection = (e) => {
        setFile(e.target.files[0]);
    }

    return (    
        <div className="new-post">
            <h1 className="title">New Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="fields">
                    <label htmlFor="caption">Caption</label>
                    <input type="text" onChange={e => setCaption(e.target.value)} placeholder="Caption"/>
                </div>
                
                <div className="fields">
                    <label htmlFor="img">Select Image(s)</label>
                    <input type="file" name="image" onChange= {onSelection}/>
                </div>

                <button type="submit">POST</button>
            </form>
        </div>
    )
}

export default NewPost;