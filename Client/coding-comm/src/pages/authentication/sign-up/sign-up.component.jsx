import React, { useState } from 'react';
import './sign-up.styles.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = () => {
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('https://the-coding-community.herokuapp.com/register', {
            username: username,
            password: password,
            email: email,
            contactNumber: contactNumber
        });
        navigate('/login');
    } 

    return (
        <div className="sign-up">
            <form onSubmit={handleSubmit}>
                <div className="fields">
                    <label htmlFor="name" className="lab">Name</label>
                    <input type="text" id="name" onChange={e => setUsername(e.target.value)} placeholder="Name"/>
                </div>

                <div className="fields">
                    <label htmlFor="email" className="lab">Email</label>
                    <input type="email" id="email" onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                </div>

                <div className="fields">
                    <label htmlFor="contact" className="lab">Contact Number</label>
                    <input type="text" id="contact" onChange={e => setContactNumber(e.target.value)} placeholder="Contact Number"/>
                </div>

                <div className="fields">
                    <label htmlFor="password" className="lab">Password</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                </div>
                <p>Already have an account? <Link to='/login'>Sign In</Link></p>
                <button>Register</button>
            </form>
        </div>
    )
}

export default SignUp;