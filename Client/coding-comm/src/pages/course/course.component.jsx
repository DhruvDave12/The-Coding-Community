import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import BuyCourse from "./buyCourse/buyCourse.component";
import learningImage from "../../assets/images/learning.svg";
import "./course.styles.scss";
import CustomCourseButton from "../../components/button/customCourseButton.component";
import CourseOutlook from "../../components/course_outlook/course_outlook.component";
import { Input, Space } from 'antd';
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
const { Search } = Input;


const Course = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState();
  const [myLearnings, setMyLearnings] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axiosInstance.get('/courses/all');
      setCourses(response.data.data);
    };

    const fetchMyLearnings = async () => {
      const response = await axiosInstance.get('/course/learnings');
      setMyLearnings(response.data.data);
    }

    fetchCourses();
    fetchMyLearnings();
  }, []);

  return (
    <div className="course__page">
      <div className="course__upper__container">
        <div className="course__upper__container__left">
          <div>
            <p className="course__landing__title">Best Learning Platform From The Best Tutors.</p>
          </div>
          <div className="course__tagline">
            Experience the whole new coding community courses platform. Here you will get the best quality courses at the most reasonable price from the best tutors around the world.
          </div>
          <div className="button__cover">
            <div className="course__button__container">
              <Link to='/course/explore'>
                <CustomCourseButton title={'Explore Courses'}/>
              </Link>
            </div>
            <div className="course__button__container">
              <Link to ='/course/sell'>
                <CustomCourseButton title={'Sell Courses'}/>
              </Link>
            </div>
          </div>
        </div>
        <div className="course__upper__container__right">
          <img src={learningImage} alt="learning-image" className="landing__image"/>
        </div>
      </div>
      <div className="my__learning__section">
        <div className="my__learning__upper">
            <p className="title__left">Let's Start Learning, Dhruv</p>
            <a className="title__right" href="/course/learnings">My Learnings</a>
        </div>
        <div className="my__learning__lower">
          {
            myLearnings && myLearnings.filter((item,index) => index<4).map(course => (
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
            courses && courses.filter((item,index) => index<4).map(course => (
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
            courses && courses.filter((item,index) => index<4).map(course => (
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
