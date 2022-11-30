import React from "react";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import "./course_outlook.styles.scss";

const CourseOutlook = ({ course }) => {
  console.log(course);
  return (
    <Link to={`/course/${course._id}`}>
      <div className="course__outlook">
        <div className="thumbnail__container">
          <img
            src={course.thumbnail}
            alt="course-thumbnail"
            className="course__image"
          />
        </div>
        <div className="course__text">
          <p className="course__title__text">{course.title}</p>
          <p className="course__author__text">{course.instructor.username}</p>
        </div>
        <div className="rating__container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p className="rating__text">{course.rating}</p>
          </div>
          <Rate
            disabled
            defaultValue={course.rating}
            className="rating__cont"
          />
        </div>
        <div className="course__price__container">
          <p className="course__price__text">₹ {course.price}</p>
        </div>
        <div className="course__lessons">
          <p className="course__lessons__text">🎓 {course.videos.length} Lessons</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseOutlook;
