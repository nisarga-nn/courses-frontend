import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const context = useContext(AuthContext);

  return (
    context?.isUserLoggedIn && (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link onClick={context?.handleLogout}>
            <button>Logout</button>
          </Link>
          <Link to="/add">
            <button>ADD</button>
          </Link>
        </nav>
      </div>
    )
  );
};

export default Navbar;
