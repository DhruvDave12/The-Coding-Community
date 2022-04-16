import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router";
import "./particular-course.styles.scss";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext } from "../../context/context";

toast.configure();

const ParticularCourse = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { user } = useContext(myContext);
  const [userValue, setUserValue] = user;

  const [course, setCourse] = useState(null);
  const [hash, setHash] = useState();

  const notify = (msg) => toast.success(msg, { position: "top-right" });
  const notifyFalse = (msg) => toast.error(msg, { position: "top-right" });

  useEffect(() => {
    const fetchCourseWithID = async () => {
      const res = await axios.get(`https://the-coding-community.herokuapp.com/course/${params.id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setCourse(res.data.data);
    };
    fetchCourseWithID();
  }, []);

  const memoizedVal = useMemo(() => {
    if (course && userValue) {
        for(let i=0; i<userValue.hashOfCourses.length; i++){
            const arr = userValue.hashOfCourses[i].split(" ");
            if(arr[0] === course.title.replace(/ /g, "")){
                setHash(arr[0] + " " + arr[1]);
                return true;
            }
        }
        return false;
    }
  }, [userValue]);

  const handleToken = async (token, addresses) => {
    const res = await axios.post(
      "https://the-coding-community.herokuapp.com/course/purchase",
      {
        token,
        course,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.data.success) {
      const uniqueKey = res.data.data.hashKey;
      navigate(`/course/${params.id}/bought?key=${uniqueKey}`);
      notify("Payment done successfully!");
    } else {
      notifyFalse("Payment Failed!");
    }
  };
  
  return (
    <div className="particular-course">
      {course ? (
        <div className="particular">
          <img src={course.thumbnail} alt="course-tumbnail" />
          <p className="title">{course.title}</p>
          <p className="price">{course.price}</p>
          <p className="rating">{course.rating}</p>
          <Link to={`/profile/${course.instructor._id}`} className="instructor">
            {course.instructor.username}
          </Link>
          {memoizedVal ? (
            <Link to={`/course/${params.id}/bought/?key=${hash}`} state={{courseData: course}}>
              Go to Course
            </Link>
          ) : (
            <StripeCheckout
            // add this stripe key in a safe file.....
              stripeKey="pk_test_51KgQFKSHxEryhSME1xSO8yyX0Hifnpd6GVjYz7yKoKY6NUsaRO9Y4DL0cb3qJ4xCOkFEqLTWitvoaTbwlDFNRdhX00Rc6SLN8g"
              token={handleToken}
              amount={course.price * 100}
              name={course.title}
              billingAddress
              shippingAddress
            />
          )}
        </div>
      ) : (
        <div className="particular">Loading...</div>
      )}
    </div>
  );
};

export default ParticularCourse;
