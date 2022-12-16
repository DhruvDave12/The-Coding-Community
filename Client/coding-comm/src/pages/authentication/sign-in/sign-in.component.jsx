import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { myContext } from "../../../context/context";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./sign-in.styles.scss";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(myContext);

  const [userValue, setUserValue] = user;
  // const [dataValue, setDataValue] = data;

  let navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.post(
      "http://localhost:8080/login",
      {
        password: password,
        email: email,
      }
      );
      localStorage.setItem("token", response.data.token);
      setUserValue(response.data.user);
      setLoading(false);
      navigate(`/profile/${response.data.user._id}`);
  };

  return (
    <div className="sign-in">
      <div className="sign__in__form">
      <div className="start__text">
            <p className="welcome__text">Sign In</p>
          </div>
        <div className="fields">
          <label htmlFor="email" className="field__label">
            Email
          </label>
          {/* <input type="email" id="email" onChange={e => setEmail(e.target.value)} placeholder="Email"/> */}
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type={"email"}
          />
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="already__text">
          Dont have an account? <Link to="/register">Register</Link>
        </p>
        <Button type="primary" loading={loading} onClick={handleSubmit}>
         Login
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
