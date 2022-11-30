import React from "react";
import './navbar.styles.scss';
import { useContext } from "react";
import { myContext } from '../../context/context';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import SearchBar from "../search/search.component";
import axios from 'axios';
import Logo from "../../assets/images/logo.svg";

const NavBar = () => {
    const {user} = useContext(myContext);

    const [userValue, setUserValue] = user;

    var currUser;
    if(userValue){
        currUser = userValue;
    }

    let navigate = useNavigate();

    const logOut = async () => {
        const res = await axios.post('http://localhost:8080/logout', {
            userID: currUser._id
        })
        localStorage.removeItem('token');
        setUserValue(null);
        console.log("USER", res.data);
        navigate('/login');
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
                        <p className="title" onClick={() => {navigate('/')}} > The Coding Community</p>
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
                    <Link className="field" to={currUser ? '/profile' : '/home'}>Home</Link>
                    <Link className="field" to={'/feed'}>Feed</Link>
                    <Link className="field" to={'/course'}>Courses</Link>
                    <Link className="field" to={'/about'}>About</Link>
                    {
                        currUser ? 
                        <li className="field" onClick={logOut}>Logout</li>
                        :
                        <div className="auth">
                            <Link className="field" to={'/login'}>Login</Link> /
                            <Link className="field" to={'/register'}>Signup</Link>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavBar;