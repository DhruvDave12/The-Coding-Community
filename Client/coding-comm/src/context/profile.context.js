import React from "react";
import axiosInstance from "../services/axiosInstance";

export const ProfileContext = React.createContext({});

const ProfileProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [userData, setUserData] = React.useState(null);
    const [userPosts, setUserPosts] = React.useState(null);
    const [userRepos, setUserRepos] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [diffLoading, setDiffLoading] = React.useState(false);
    const [codeforcesData, setCodeForcesData] = React.useState(null);

    const getUserDetails = async (id) => {
        try{
            setLoading(true);
            const res = await axiosInstance.get(`/user/normal/${id}`);
            setUser(res.data.data);
            setLoading(false);
        } catch (err) {
            console.log("GET USER DETAILS: ", err);
        }
    }

    const getUserExtraData = async (id) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/user/${id}`);
            setUserData(res.data.data[0]);
            setLoading(false);
        } catch (err) {
            console.log("GET USER EXTRA DATA: ", err);
        }
    }

    const getUserPosts = async (id) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/post/${id}`);
            setUserPosts(res.data.data);
            setLoading(false);
        } catch (err) {
            console.log("GET USER POSTS: ", err);
        }
    }

    const getUserRepos = async (id) => {
        try { 
            // setLoading(true);
            // const res = await axiosInstance.get(`/project/repos/${id}`);
            // setUserRepos(res.data.data);
            // setLoading(false);
        } catch (err){
            setLoading(false);
            console.log("GET USER REPOS: ", err);
        }
    }

    const getUserCodeForcesData = async (id) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/user/codeforces/${id}`);
            setCodeForcesData(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log("GET USER CODEFORCES DATA: ", err);
        }
    }

    const handleFollow = async (id) => {
        try{
            setDiffLoading(true);
            await axiosInstance.get(`/user/update/${id}`);
            setDiffLoading(false);
        } catch (err) {
            console.log("HANDLE FOLLOW: ", err);
        }
    }
    
    const handleUnfollow = async (id) => {
        try {
            setDiffLoading(true);
            await axiosInstance.get(`/user/unfollow/${id}`);
            setDiffLoading(false);
        } catch (err) {
            console.log("HANDLE UNFOLLOW: ", err);
        }
    }
    
    const isFollowing = () => {
        if(userData){
            const allFollowers = userData.allFollowers;
            const currID = localStorage.getItem('userID');
            const isFollowing = allFollowers.some(e => e._id === currID);
            return isFollowing;
        }
    }
    return (
        <ProfileContext.Provider value={{
            loading,
            user,
            userData,
            userPosts,
            userRepos,
            getUserDetails,
            getUserExtraData,
            getUserPosts,
            getUserRepos,
            handleFollow,
            handleUnfollow,
            isFollowing,
            diffLoading,
            getUserCodeForcesData,
            codeforcesData
        }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;