import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!context?.isUserLoggedIn && !location.pathname.includes("login")) {
      navigate("/login");
    }
  }, [context?.isUserLoggedIn]);

  if (!context?.isUserLoggedIn) {
    return <h1>Loading</h1>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
