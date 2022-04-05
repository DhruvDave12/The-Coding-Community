import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import ProfileData from "../../components/profile-data-component/profile-data.component";
import TechStack from "../../components/tech-stacks-component/tech-stack.component";
import FollowDetails from "../../components/follow-details-component/follow-details.component";
import YourPosts from '../../components/user-posts-component/user-posts.component';

import './others-profile.styles.scss';

const OtherProfile = () => {
    const params = useParams();
    const [post, setPost] = useState();

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`http://localhost:8080/user/${params.id}`,{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            console.log(res);
        }
        getUser();
    }, [])

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://the-coding-community.herokuapp.com/post/${params.id}`,{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            
            setPost(res.data.data);
        }
        getData();
    }, [])


    return(
        <div className="other-profile">
            <div className="other-profile-container">
                <div className="section">
                    {/* <ProfileData /> */}
                    {/* <FollowDetails /> */}
                </div>
                <TechStack />
            </div>
            {
                post ? 
                post.map(item => (
                    <div className="h1">WE GOT ITEMS</div>
                ))
                :
                <h1>Loading</h1>
            }
        </div>
    )
}

export default OtherProfile;