import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AddCourse = () => {
  const [courseDetails, setCourseDetails] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCourseDetails({
      ...courseDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("https://courses-backend.vercel.app/courses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: courseDetails?.name,
          price: courseDetails?.price,
          duration: courseDetails?.duration,
          description: courseDetails?.description,
        }),
      });
      const json = await response.json();
      if (!json?.isSuccess) {
        throw new Error(json?.message);
      }
      alert(json?.message);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !courseDetails?.name ||
      !courseDetails?.price ||
      !courseDetails?.duration ||
      !courseDetails?.description
    ) {
      alert("Please fill all the required properties");
    } else {
      handleAdd();
    }
  };

  return (
    <PrivateRoute>
      <div className="container">
        <h1 className="heading">Add Course</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label>Enter Course Name:</label>
          <input className="input"
            type="text"
            onChange={handleChange}
            name="name"
            placeholder="eg: JavaScript Course"
          />
          <label>Price:</label>
          <input className="input"
            type="number"
            onChange={handleChange}
            name="price"
            placeholder="eg: 350"
          />
          <label>Duration:</label>
          <input className="input"
            type="text"
            onChange={handleChange}
            name="duration"
            placeholder="eg:3hr"
          />
          <label>Description:</label>
          <textarea className="input"
            name="description"
            id=""
            cols="30"
            rows="10"
            placeholder="Description.."
            onChange={handleChange}
          />
          <button className="btn">SUBMIT</button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default AddCourse;
