import React from "react";
import "./customCourseButton.styles.scss";
const CustomCourseButton = ({title, onClick}) => {
    return (
        <div className="new__course__button" onClick={onClick}>
            <div className="course__button">{title}</div>
        </div>
    )
}

export default CustomCourseButton;