import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router";
import "./particular-course.styles.scss";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext } from "../../context/auth.context";
import LazyLoader from "../../components/lazy-loader/lazy-loader.component";
import { Rate } from "antd";
import PurchaseCourse from "../../components/course_purchase/course_purchase.component";
import CourseOutlook from "../../components/course_outlook/course_outlook.component";
import CustomCourseButton from "../../components/button/customCourseButton.component";
import axiosInstance from "../../services/axiosInstance";

toast.configure();
const ParticularCourse = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { user } = useContext(myContext);
  const [userValue, setUserValue] = user;

  const [hasPurchased, setHasPurchased] = useState(false);
  const [course, setCourse] = useState(null);
  const [hash, setHash] = useState();

  const notify = (msg) => toast.success(msg, { position: "top-right" });
  const notifyFalse = (msg) => toast.error(msg, { position: "top-right" });

  useEffect(() => {
    const fetchCourseWithID = async () => {
      console.log("PARAM ID: ", params.id);
      // const res = await axios.get(`http://localhost:8080/course/${params.id}`, {
      //   headers: {
      //     Authorization: localStorage.getItem("token"),
      //   },
      // });

      const res = await axiosInstance.get(`/course/${params.id}`);
      setCourse(res.data.data);
    };
    if (params?.id) {
      fetchCourseWithID();
    }
  }, [params]);

  useEffect(() => {
    if (userValue && course) {
      for (let i = 0; i < userValue.hashOfCourses.length; i++) {
        const arr = userValue.hashOfCourses[i].split(" ");
        if (arr[0] === course.title.replace(/ /g, "")) {
          setHash(arr[0] + " " + arr[1]);
          return setHasPurchased(true);
        }
      }
      return setHasPurchased(false);
    }
  }, [userValue, course]);

  const handleToken = async (token, addresses) => {
    // const res = await axios.post(
    //   "http://localhost:8080/course/purchase",
    //   {
    //     token,
    //     course,
    //   },
    //   {
    //     headers: {
    //       Authorization: localStorage.getItem("token"),
    //     },
    //   }
    // );

    const res = await axiosInstance.post('/course/purchase',{
      token,
      course
    })
    
    if (res.data.success) {
      const uniqueKey = res.data.data.hashKey;
      navigate(`/course/${params.id}/bought?key=${uniqueKey}`, {
        state: course,
      });
      notify("Payment done successfully!");
    } else {
      notifyFalse("Payment Failed!");
    }
  };

  let overview = [];
  if(course){
    overview = course.overview[0].split(',');
  }
  return course ? (
    <div className="particular__course">
      <div className="upper__section">
        <div className="upper__cover">
          <div className="left__section">
            <div className="course__descripts">
              <p className="course__title">{course.title}</p>
              <p className="course__desc">{course.description}</p>
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
            <div className="created__by">
              <p className="created__by__text">
                Created By: {course.instructor.username}
              </p>
            </div>
            <div className="updated__at">
              <p className="updated__at__text">Last Updated {course.upload}</p>
              <p className="language">🌐 English</p>
            </div>
          </div>
          <div className="right__section">
            <PurchaseCourse course={course}>
              {hasPurchased ? (
                <Link
                  to={`/course/${params.id}/bought/?key=${hash}`}
                  state={course}
                >
                  <CustomCourseButton title={"Go To Course"} />
                </Link>
              ) : (
                <StripeCheckout
                  stripeKey="pk_test_51KgQFKSHxEryhSME1xSO8yyX0Hifnpd6GVjYz7yKoKY6NUsaRO9Y4DL0cb3qJ4xCOkFEqLTWitvoaTbwlDFNRdhX00Rc6SLN8g"
                  token={handleToken}
                  amount={course.price * 100}
                  name={course.title}
                  billingAddress
                  shippingAddress
                />
              )}
            </PurchaseCourse>
          </div>
        </div>
      </div>
      <div className="lower__section">
        <div className="course__overview">
          <p className="course__overview__title">Course Overview</p>
          <ul className="course__list">
            {overview.map((overview) => (
              <li>
                <p className="course__overview__list__text">{overview}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="about__instructor">
          <p className="about__instructor__title">About the Instructor</p>
          <div className="instructor__info">
            <p className="instructor__name">{course.instructor.username}</p>
            <p className="instructor__detail">
              {/* TODO -> CHANGE THE DESCRIPTION SEND IT FROM THE BACKEND*/}
              Dhruv Dave is a Full Stack Developer and a Machine Learning
              Engineer. He is a graduate from the University of Texas at Dallas
              with a degree in Computer Science. He has worked with companies
              like Amazon, Microsoft, and Google. He has also worked on projects
              with NASA and the US Army.
            </p>
          </div>
        </div>

        <div className="my__learning__section">
          <div className="my__learning__upper">
            <p className="title__left">Recommended for you</p>
          </div>
          <div className="my__learning__lower">
            {/* {
            coursesArr.map(course => (
              <div style={{height: '18rem'}}>
                <CourseOutlook key={course.id} course={course} />
              </div>
            ))
          } */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LazyLoader />
  );
};

export default ParticularCourse;
