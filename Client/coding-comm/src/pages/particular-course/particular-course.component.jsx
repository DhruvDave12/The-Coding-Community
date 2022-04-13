import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import './particular-course.styles.scss';
import { Link } from "react-router-dom";

const ParticularCourse = () => {
    const params = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourseWithID = async () => {
            const res = await axios.get(`https://the-coding-community.herokuapp.com/course/${params.id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            setCourse(res.data.data);

        }
        fetchCourseWithID();
    }, [])

    return (
        <div className="particular-course">
            {
                course ? 
                <div className="particular">
                    <img src={course.thumbnail} alt="course-tumbnail" />
                    <p className="title">{course.title}</p>
                    <p className="price">{course.price}</p>
                    <p className="rating">{course.rating}</p>
                    <Link to={`/profile/${course.instructor._id}`} className="instructor">{course.instructor.username}</Link>
                    <button>Buy Course</button>
                </div>
                :
                <div className="particular">Loading...</div>
            }
            
        </div>
    )
}

export default ParticularCourse;