import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../css/style.css'

const Login = () => {
  const[userDetails, setUserDetails] = useState("");
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        context?.handleLogin();
        navigate("/");
      }
    } catch (err) {
      throw err;
    }
  }, []);

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://courses-backend.vercel.app/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDetails?.email,
          password: userDetails?.password,
        }),
      });
      const json = await response.json();
      //Error handling
      if (!json?.isSuccess) {
        throw new Error(json?.message);
      }
      alert(json?.message);
      localStorage.setItem("token", json?.token);
      context?.handleLogin();
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userDetails?.email || !userDetails?.password) {
      alert("Please fill all the required details");
    } else {
      handleLogin();
    }
  };

  return (
    <div className="logincontainer">
      <h1 className="heading">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form">
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
        <button className="btn">Log In</button>
        </div>
      </form>
      <p>
        Don't have an account? <Link className="link" to="/signup"><b>Sign Up</b></Link>
      </p>
    </div>
  );
};

export default Login;
