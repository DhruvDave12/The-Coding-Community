import React from "react";
import { Link } from 'react-router-dom';
import BuyCourse from "./buyCourse/buyCourse.component";

import './course.styles.scss';

const Course = () => {
    return (
        <div className="course">
            <h1>Welcome to the course section</h1> 
            <Link to={'/course/sell'}>Sell Course</Link>

            <BuyCourse />
        </div>
    )
}

export default Course;