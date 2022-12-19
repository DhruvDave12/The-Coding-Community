import React, {useState, useEffect} from "react";
import CourseCard from "../../../components/course-card/courseCard.component";
import GenericSearch from "../../../components/generic-search/genericSearch.component";
import "./exploreCourse.styles.scss";
import axiosInstance from "../../../services/axiosInstance";
import exploreCourse from "../../../assets/images/exploreCourse.svg";
import { Link } from "react-router-dom";

const ExploreCourses = () => {
  const [courses, setCourses] = useState();
  const [displayCourses, setDisplayCourses] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axiosInstance.get("/courses/all");
      setCourses(response.data.data);
      setDisplayCourses(response.data.data);
    };
    fetchCourses();
  }, []);

  const onSearch = (value) => {
    const filteredCourses = courses.filter((course) => {
      return course.title.toLowerCase().includes(value.toLowerCase());
    });
    setDisplayCourses(filteredCourses);
  };

  return (
    <div className="explore__courses">

      <div className="explore__courses__header">
        <div className="left__section">
          <p className="explore__courses__title">Explore Courses</p>
          <div className="explore__courses__desc">
            Explore the variety of courses from the best tutors around the world.
          </div>
        </div>
        <div className="right__section">
            <img src={exploreCourse} alt="exploreCourse" className="explore__courses__image"/>
        </div>
      </div>


      <div className="search__wrapper">
        <div className="search__courses">
          <GenericSearch 
            placeholder="Search for courses"
            onSearch={onSearch}
          />
        </div>
      </div>

      {
        !displayCourses || displayCourses.length === 0 ? 
          <div className="courses__section">
            <p className="courses__not__found">No courses found 😥</p>
          </div>
          :
        <div className="courses__section">
          {
            displayCourses.map((course) => {
              return (
                  <div className="course__card__wrapper">
                    <Link to={`/course/${course._id}`}>
                      <CourseCard course={course} />
                    </Link>
                  </div>
              );
            })
          }
        </div>

      }
    </div>
  );
};

export default ExploreCourses;
