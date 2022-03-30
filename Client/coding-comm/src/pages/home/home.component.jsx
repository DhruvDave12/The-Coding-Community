import React from "react";
import { Link } from "react-router-dom";
import './home.styles.scss';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Coding Community</h1>
            <Link to={'/register'}>Get Started</Link>
        </div>
    )
}

export default Home;