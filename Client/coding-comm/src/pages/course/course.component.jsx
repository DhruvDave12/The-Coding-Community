import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import BuyCourse from "./buyCourse/buyCourse.component";
import learningImage from "../../assets/images/learning.svg";
import "./course.styles.scss";
import CustomCourseButton from "../../components/button/customCourseButton.component";
import CourseOutlook from "../../components/course_outlook/course_outlook.component";
import { Input, Space } from 'antd';
import axios from "axios";

const { Search } = Input;


const Course = () => {
  // const onSearch = (value) => console.log(value);
  
  const [courses, setCourses] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(
        "http://localhost:8080/courses/all"
      );
      setCourses(response.data.data);
    };
    fetchCourses();
  }, []);

  const onSearch = (value) => {
    console.log("VALUE: ", value);
  }
  return (
    <div className="course__page">
      <div className="course__upper__container">
        <div className="course__upper__container__left">
          <div>
            <p className="course__landing__title">Best Learning Platform From The Best Tutors.</p>
          </div>
          <div className="course__tagline">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita delectus at quia eaque voluptate hic corrupti ducimus officia omnis, asperiores molestias ea exercitationem voluptatibus autem recusandae dolores, cumque voluptatum velit?
          </div>
          <div className="button__cover">
            <div className="course__button__container">
              <CustomCourseButton onClick={() => {}} title={'Explore Courses →'}/>
            </div>
            <div className="course__button__container">
              <Link to ='/course/sell'>
                <CustomCourseButton onClick={() => {}} title={'Sell Courses →'}/>
              </Link>
            </div>
          </div>
        </div>
        <div className="course__upper__container__right">
          <img src={learningImage} alt="learning-image" className="landing__image"/>
        </div>
      </div>
      <div className="search__courses">
        <div className="search__text">Search the best courses</div>
        <Search placeholder="Search courses" allowClear onSearch={onSearch} className="search__bar" />
      </div>
      <div className="my__learning__section">
        <div className="my__learning__upper">
            <p className="title__left">Let's Start Learning, Dhruv</p>
            <a className="title__right" href="#">My Learnings</a>
        </div>
        <div className="my__learning__lower">
          {
            courses && courses.map(course => (
              <div style={{height: '18rem'}}>
                <CourseOutlook key={course.id} course={course} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="my__learning__section">
        <div className="my__learning__upper">
            <p className="title__left">Top Picks For You</p>
            {/* <a className="title__right" href="#">View m</a> */}
        </div>
        <div className="my__learning__lower">
        {
            courses && courses.map(course => (
              <div style={{height: '18rem'}}>
                <CourseOutlook key={course.id} course={course} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="my__learning__section">
        <div className="my__learning__upper">
            <p className="title__left">Recommended For You</p>
            {/* <a className="title__right" href="#">My Learnings</a> */}
        </div>
        <div className="my__learning__lower">
        {
            courses && courses.map(course => (
              <div style={{height: '18rem'}}>
                <CourseOutlook key={course.id} course={course} />
              </div>
            ))
          }
        </div>
      </div>
      {/* <h1>Welcome to the course section</h1>
      <Link to={"/course/sell"}>Sell Course</Link>

      <BuyCourse /> */}
    </div>
  );
};

export default Course;
