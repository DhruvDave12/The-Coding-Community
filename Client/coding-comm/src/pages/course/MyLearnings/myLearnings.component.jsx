import React from "react";
import { useEffect, useState } from "react";
import CourseCard from "../../../components/course-card/courseCard.component";
import LazyLoader from "../../../components/lazy-loader/lazy-loader.component";
import axiosInstance from "../../../services/axiosInstance";
import { Link } from "react-router-dom";
import "./myLearning.styles.scss";

const MyLearnings = () => {
    const [myLearnings, setMyLearnings] = useState();

    useEffect(() => {
        const getMyLearnings = async () => {
            const response = await axiosInstance.get('/course/learnings');
            console.log(response.data.data);
            setMyLearnings(response.data.data);
        }

        getMyLearnings();
    }, []);
    return (
        myLearnings ?
        <div className="my__learnings">
            <p className="my__learnings__title">My Learnings</p>
            <div className="my__learnings__container">
                {
                    myLearnings.length === 0 ? 
                    <p className="no__learning__text">Start learning exlore our courses</p>
                    :
                    <div>
                        {
                            myLearnings.map((learning) => {
                                return (
                                    <div className="learning__wrapper">
                                        <Link to={`/course/${learning._id}`}>
                                            <CourseCard course={learning} />
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
        : <LazyLoader />
    );
}

export default MyLearnings;