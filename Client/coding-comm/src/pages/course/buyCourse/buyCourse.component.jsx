import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./buyCourse.styles.scss";
import { useNavigate } from "react-router";

const BuyCourse = () => {
  const navigate = useNavigate();
  const [allCourses, setallCourses] = useState([]);
  const [searchRes, setSearchRes] = useState("");
  const [searchResArr, setSearchResArr] = useState([]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      const res = await axios.get(
        "https://the-coding-community.herokuapp.com/courses/all",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setallCourses(res.data.data);
    };
    fetchAllCourses();
  }, []);

  useEffect(() => {
    const dataOfCourses = [];
    if (searchRes.length === 0) {
      setSearchResArr([]);
      return;
    }
    const searchResults = () => {
      for (let courses in allCourses) {
        let course1 = allCourses[courses].title.toLowerCase();
        let courseToSearch = searchRes.toLowerCase();
        if (course1.includes(courseToSearch)) {
          if (!searchResArr.includes(allCourses[courses])) {
            dataOfCourses.push(allCourses[courses]);
          }
        }
      }
      setSearchResArr(dataOfCourses);
    };
    searchResults();
  }, [searchRes]);

  const handleMore = (id) => {
    navigate(`/course/${id}`);
    window.location.reload(false);
  };

  return (
    <div className="buy-course">
      <label htmlFor="search">Search a course</label>
      <input
        type="text"
        id="search"
        onChange={(e) => setSearchRes(e.target.value)}
        placeholder="Search a course"
      />
      <Link to={"/search/results"}>Search</Link>
      {searchResArr.length === 0 ? null : (
        <div className="searchRes">
          {searchResArr.map((res) => (
            <div className="particular-course">
              <Link to={`/course/${res._id}`}>{res.title}</Link>
            </div>
          ))}
        </div>
      )}

      {allCourses.length !== 0 ? (
        <div className="course__available">
          <h1>All available Courses</h1>
          {
            // Make a component for it later.
            allCourses.map((course) => (
              <div className="particular-course">
                <img src={course.thumbnail} alt="course-thumbnail" />
                <p className="title">{course.title}</p>
                <p className="price">${course.price}</p>
                <p className="rating">{course.rating}</p>
                <p className="instructor">{course.instructor.username}</p>
                <h2
                  onClick={() => {
                    handleMore(course._id);
                  }}
                >
                  More Details
                </h2>
              </div>
            ))
          }
        </div>
      ) : (
        <div className="course__available">
          <h1>No Courses Available</h1>
        </div>
      )}
    </div>
  );
};

export default BuyCourse;
