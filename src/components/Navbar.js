import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const context = useContext(AuthContext);

  return (
    context?.isUserLoggedIn && (
      <div>
        <nav className="nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <span className="nav-right">
            <Link className="nav-link" to="/add">
              Add
            </Link>
            <Link className="nav-link" onClick={context?.handleLogout}>
              Logout
            </Link>
          </span>
        </nav>
      </div>
    )
  );
};

export default Navbar;
