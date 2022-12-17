import React from "react";
import './navbar.styles.scss';
import { useContext } from "react";
import { myContext } from '../../context/context';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import SearchBar from "../search/search.component";
import axios from 'axios';
import Logo from "../../assets/images/logo.svg";
import CustomLandingButton from "../button/customLandingButton.component.jsx";
import {toast} from "react-toastify";
import axiosInstance from "../../services/axiosInstance";

toast.configure();
const NavBar = () => {
    const {user, isLoggedIn,setIsLoggedIn} = useContext(myContext);
    const notifyFalse = (msg) => toast.error(msg, {position: toast.POSITION.TOP_RIGHT});
    const [userValue, setUserValue] = user;

    var currUser;
    if(userValue){
        currUser = userValue;
    }

    let navigate = useNavigate();

    const logOut = async () => {
        const res = await axiosInstance.post('/logout', {
            userID: currUser._id
        })
        localStorage.removeItem('token');
        setUserValue(null);
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload(false);
    }

    return (
        <div className="navbar">
            <div className="logo">
                <div className="logo-container">
                    <div className="logo--cont1">
                        <img src={Logo} className="logo-svg"/>   
                    </div>
                    <div className="logo--cont2">
                        <p className="title" onClick={() => {navigate('/')}} >Coding Community</p>
                    </div>
                </div>
                <div className="search-field">
                    {
                        currUser  ?
                        <SearchBar/>
                        : null
                    }
                </div>
            </div>
            <div className="other-fields">
                <ul>

                    <Link className="field" to={currUser && isLoggedIn ? `/profile/${currUser._id}` : '/'} onClick={() => !isLoggedIn ? notifyFalse('Please Signup / Login to continue') : {}}>Home</Link>
                    <Link className="field" to={isLoggedIn ? '/feed': '/'} onClick={() => !isLoggedIn ? notifyFalse('Please Signup / Login to continue') : {}}>Feed</Link>
                    <Link className="field" to={isLoggedIn ? '/course': '/'} onClick={() => !isLoggedIn ? notifyFalse('Please Signup / Login to continue') : {}}>Courses</Link>
                    <Link className="field" to={'/about'}>About</Link>
                    {
                        currUser ? 
                        <li className="field" onClick={logOut}>Logout</li>
                        :
                        <div className="auth">
                            <CustomLandingButton title="Get Started" onClick={() => navigate('/login')}/>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavBar;