import React, { useState } from "react";
import "./sign-up.styles.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const SignUp = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.post(
      "https://the-coding-community.herokuapp.com/register",
      {
        username: username,
        password: password,
        email: email,
        contactNumber: contactNumber,
      }
    );
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="sign-up">
      <div className="sign__up__form">

          <div className="start__text">
            <p className="welcome__text">Welcome to <br /> The Coding Community 🎉</p>
            <p className="bottom__text">Let's start</p>
          </div>
        <div className="fields">
          <label htmlFor="name" className="field__label">
            Name
          </label>
          {/* <input type="text" id="name" onChange={e => setUsername(e.target.value)} placeholder="Name"/> */}
          <Input placeholder="Name" onChange={e => setUsername(e.target.value)} className={"particular__field"}/>
        </div>

        <div className="fields">
          <label htmlFor="email" className="field__label">
            Email
          </label>
          {/* <input type="email" id="email" onChange={e => setEmail(e.target.value)} placeholder="Email"/> */}
          <Input placeholder="Email" onChange={e => setEmail(e.target.value)} type={"email"}/>
        </div>

        <div className="fields">
          <label htmlFor="contact" className="field__label">
            Contact Number
          </label>
          {/* <input type="text" id="contact" onChange={e => setContactNumber(e.target.value)} placeholder="Contact Number"/> */}
          <Input placeholder="Contact" onChange={e => setContactNumber(e.target.value)}/>
        </div>

        <div className="fields">
          <label htmlFor="password" className="field__label">
            Password
          </label>
          {/* <input type="password" id="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/> */}
          <Input.Password
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <p className="already__text">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        {/* <button>Register</button> */}
        <Button type="primary" loading={loading} onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
