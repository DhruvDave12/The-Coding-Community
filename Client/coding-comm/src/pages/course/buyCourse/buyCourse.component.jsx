import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './buyCourse.styles.scss';

const BuyCourse = () => {
    const [allCourses, setallCourses] = useState([]);

    useEffect(() => {
        const fetchAllCourses = async () => {
            const res = await axios.get('https://the-coding-community.herokuapp.com/courses/all', {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            console.log(res.data.data);
            setallCourses(res.data.data);
        }
        fetchAllCourses();
    }, [])
    
    const handleCourseSearch = (event) => {
        event.preventDefault();
        console.log("Hello");
    }
    return (
        <div className="buy-course">
            <form onSubmit = {handleCourseSearch}>
                <div className="field">
                    <label htmlFor="search">Search a course</label>
                    <input type="text" id="search" placeholder="Search a course"/>
                </div>
                <button type="submit">Search</button>
            </form>

            <h1>All available Courses</h1>
            {
                // Make a component for it later.
                allCourses.map(course => (
                    <div className="particular-course">
                        <img src={course.thumbnail} alt="course-thumbnail" />
                        <p className="title">{course.title}</p>
                        <p className="price">${course.price}</p>
                        <p className="rating">{course.rating}</p>
                        <p className="instructor">{course.instructor.username}</p>
                        <Link to={`/course/${course._id}`}>Buy</Link>
                    </div>
                ))
            }
        </div>
    )
}

export default BuyCourse;
