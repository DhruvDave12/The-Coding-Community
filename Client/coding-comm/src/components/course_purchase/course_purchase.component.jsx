import React from "react";
import "./course_purchase.styles.scss";
import CustomCourseButton from "../button/customCourseButton.component";

const PurchaseCourse = ({course, children}) => {
    return (
        <div className="purchase__course">
            <div className="course__thumbnail">
                <img src={course.thumbnail} alt="course-thumbnail" className="course__image"/>
            </div>
            <div className="content">
                <div className="course__price">
                    <p className="course__price__text">₹ {course.price}</p>
                    <p className="course__guarantee__text">100% Money Back Guarantee</p>
                    <p className="course__guarantee__text">Full Lifetime Access</p>
                </div>
                <div className="buy__now">
                    {/* <CustomCourseButton onClick={handleBuyNow} title={'Buy Now'} /> */}
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PurchaseCourse;