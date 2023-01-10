import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const EditCourse = () => {
  const [tutorials, setTutorials] = useState(null);
  const navigate = useNavigate();
  const param = useParams();

  const handleChange = (event) => {
    setTutorials({ ...tutorials, [event.target.name]: event.target.value });
    console.log(tutorials);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://courses-backend.vercel.app/courses/get/${param?.id}`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        const courseData = await res.json();

        if (!courseData?.isSuccess) {
          throw new Error(courseData?.message);
        }
        setTutorials({
          name: courseData?.courseExists?.name,
          price: courseData?.courseExists?.price,
          duration: courseData?.courseExists?.duration,
          description: courseData?.courseExists?.description,
        });
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  const handlEditTutorial = async () => {
    try {
      const savedCourse = await fetch(
        `https://courses-backend.vercel.app/courses/edit/${param?.id}`,
        {
          method: "PUT",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: tutorials?.name,
            price: tutorials?.price,
            duration: tutorials?.duration,
            description: tutorials?.description,
          }),
        }
      );

      const formatResponse = await savedCourse.json();
      if (!formatResponse?.isSuccess) {
        throw new Error(formatResponse?.message);
      }
      alert(formatResponse?.message);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <PrivateRoute>
      <div className="container">
        <h1 className="heading">Edit Course</h1>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();

            if (
              !tutorials?.name ||
              !tutorials?.price ||
              !tutorials?.duration ||
              !tutorials?.description
            ) {
              alert("Please fill all the details");
            } else {
              handlEditTutorial();
            }
          }}
        >
          <label>Course Name:</label>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Course Name"
            onChange={handleChange}
            value={tutorials?.name}
          />
          <label>Price:</label>
          <input
            className="input"
            type="text"
            name="price"
            placeholder="Course Price"
            onChange={handleChange}
            value={tutorials?.price}
          />
          <label>Duration:</label>
          <input
            className="input"
            type="text"
            name="duration"
            placeholder="Course Duration"
            onChange={handleChange}
            value={tutorials?.duration}
          />
          <label>Description:</label>
          <textarea
            className="input"
            value={tutorials?.description}
            onChange={handleChange}
            name="description"
            id=""
            cols="30"
            rows="8"
            placeholder="Course Description"
          />
          <button className="btn">Edit Course</button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default EditCourse;
