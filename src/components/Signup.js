import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [userDetails, setUserDetails] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://courses-backend.vercel.app/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userDetails?.name,
          email: userDetails?.email,
          password: userDetails?.password,
        }),
      });
      const json = await response.json();
      if (!json?.isSuccess) {
        throw new Error(json?.message);
      }
      alert(json?.message);
      navigate("/login");
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userDetails?.password !== userDetails?.confirmpassword) {
      alert("Passwords do not match");
    } else if (
      !userDetails?.name ||
      !userDetails?.email ||
      !userDetails?.password ||
      !userDetails?.confirmpassword
    ) {
      alert("Please fill all the details");
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="heading">SignUp Form</h1>
        <label>Name:</label>
        <input className="input" type="name" name="name" onChange={handleChange} />
        <label>Email:</label>
        <input className="input" type="email" name="email" onChange={handleChange} />
        <label>Password:</label>
        <input className="input" type="password" name="password" onChange={handleChange} />
        <label>Confirm Password:</label>
        <input className="input" type="password" name="confirmpassword" onChange={handleChange} />
        <button className="btn">SIGNUP</button>
      </form>
      <p className="end-txt2">
        If already a user <Link className="link" to="/login">click here</Link> to Login
      </p>
    </div>
  );
};

export default Signup;
