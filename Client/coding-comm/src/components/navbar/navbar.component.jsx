import React, { useState } from "react";
import './navbar.styles.scss';
import { useContext } from "react";
import { myContext } from '../../context/context';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const NavBar = () => {
    const userState = useContext(myContext);
    const [user, setUser] = userState;

    var currUser;
    if(user){
        console.log(user);
        currUser = user;
    }

    let navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/');
        setUser(null);
    }
    return (
        <div className="navbar">
            <div className="logo">
                <p className="title" onClick={() => {navigate('/')}} >The Coding Community</p>
            </div>
            <div className="other-fields">
                <ul>
                    <Link className="field" to={currUser ? '/profile' : '/home'}>Home</Link>
                    <Link className="field" to={'/about'}>About</Link>
                    {
                        currUser ? 
                        <li className="field" onClick={logOut}>Logout</li>
                        :
                        <div className="auth">
                            <Link className="field" to={'/login'}>Login</Link>
                            <Link className="field" to={'/register'}>Signup</Link>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavBar;