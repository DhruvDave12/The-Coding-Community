import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import './sellCourse.styles.scss';

const SellCourse = () => {
    const [price,setPrice] = useState(0);
    const [file, setFile] = useState({});
    const [title, setTitle] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for(let i=0; i<file.length; i++){
            formData.append('image', file[i]);
        }
        // formData.append('image', file);
        formData.append('price', price);
        formData.append('title', title);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': localStorage.getItem('token')
            }
        };
        await axios.post('https://the-coding-community.herokuapp.com/course/new', formData, config)
        navigate('/course');
        window.location.reload(false);
    }

    const onSelection = (e) => {
        setFile(e.target.files);
    }

    return (
        <div className="buy-course">
            <h1>Buy the top rated courses</h1>

            <form onSubmit={handleSubmit}>
            <div className="field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={e => setTitle(e.target.value)} placeholder="Title" />
                </div>
                <div className="field">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" onChange={e => setPrice(e.target.value)} placeholder="Price" />
                </div>
                <div className="fields">
                    <p>*PLEASE SELECT FIRST FILE AS AN IMAGE FOR THUMBNAIL*</p>
                    <label htmlFor="img">Select Video(s)</label>
                    <input type="file" name="image" onChange= {onSelection} multiple/>
                </div>
                <button type="submit">Sell</button>

            </form>
        </div>
    )
}

export default SellCourse;