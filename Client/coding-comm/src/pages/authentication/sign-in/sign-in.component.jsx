import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { myContext } from '../../../context/context';
import { Link } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user} = useContext(myContext);

    const [userValue, setUserValue] = user;
    // const [dataValue, setDataValue] = data;

    let navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('https://the-coding-community.herokuapp.com/login', {
            password: password,
            email: email,
        });
        localStorage.setItem('token', response.data.token);
        setUserValue(response.data.user);
        navigate('/profile');
    } 

    return (
        <div className="sign-in">
            <form onSubmit={handleSubmit}>
                <div className="fields">
                    <label htmlFor="email" className="lab">Email</label>
                    <input type="email" id="email" onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                </div>

                <div className="fields">
                    <label htmlFor="password" className="lab">Password</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                </div>
                <p>Dont have an account? <Link to='/register'>Register</Link></p>
                <button>Login</button>
            </form>
        </div>
    )
}

export default SignIn;