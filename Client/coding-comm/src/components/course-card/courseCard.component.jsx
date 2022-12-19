import React from "react";
import { Rate } from "antd";
import "./courseCard.styles.scss";

const CourseCard = ({ course }) => {

  return (
    <div className="course__card">
      <div className="course__image__wrapper">
        <img src={course.thumbnail} alt="course-image" className="course__image"/>
      </div>
      <div className="right__wrapper">
        <div className="course__text">
            <p className="course__title__text">{course.title}</p>
            <p className="course__author__text">By {course.instructor.username}</p>
        </div>
        <div className="rating__container">
            <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            {/* <p className="rating__text">{course.rating}</p> */}
            </div>
            <Rate disabled defaultValue={course.rating} className="rating__cont" />
        </div>
        <div className="course__lessons">
            <p className="course__lessons__text">
            🎓 {course.videos.length} Lessons
            </p>
        </div>
        <div className="course__price__container">
            <p className="course__price__text">₹ {course.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;