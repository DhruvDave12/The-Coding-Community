import React from "react";
import { Link } from 'react-router-dom';

import './course.styles.scss';

const Course = () => {
    return (
        <div className="course">
            <h1>Welcome to the course section</h1> 

            <Link to={'/course/buy'}>Buy Course</Link>
            <Link to={'/course/sell'}>Sell Course</Link>
        </div>
    )
}

export default Course;