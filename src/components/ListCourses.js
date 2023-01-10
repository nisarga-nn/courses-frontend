import React, { useEffect, useState } from "react";
import PrivateRoute from "./PrivateRoute";
import { Link } from "react-router-dom";

const ListCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://courses-backend.vercel.app/courses/all", {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        setCourses(json.courses);
      } catch (err) {
        throw new Error(`New Error Occured - ${err}`);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://courses-backend.vercel.app/courses/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const json = response.json();
      const filteredData = courses?.filter((item) => item._id !== id);

      setCourses(filteredData);
    } catch (err) {
      alert(err);
      throw err;
    }
  };

  return (
    <PrivateRoute>
      <h1>ListCourses</h1>
      <div>
        {courses?.map((item, index) => (
          <div key={index}>
            <Link to={`/`}>
              <h1>{item.name}</h1>
              <h3>{item.description}</h3>
              <p>Price - {item.price}</p>
              <p>{item.duration}</p>
            </Link>
            <Link to={`/edit/${item?._id}`}><button>EDIT</button></Link>
            <button onClick={() => handleDelete(item?._id)}>DELETE</button>
          </div>
        ))}
      </div>
    </PrivateRoute>
  );
};

export default ListCourses;
