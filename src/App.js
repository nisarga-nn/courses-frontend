import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ListCourses from "./components/ListCourses";
import AddCourse from "./components/AddCourse";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import EditCourse from "./components/EditCourse";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ListCourses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add" element={<AddCourse/>}/>
            <Route path="/edit/:id" element={<EditCourse/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
