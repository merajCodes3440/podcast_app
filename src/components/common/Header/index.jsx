import React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);

  return (
    <div className="navbar">
      <div className="gradiant"></div>
      <div className="links">
        <Link to="/" className={currentPath == "/" ? "active" : ""}>
          Signup
        </Link>
        <Link
          to="/podcast"
          className={currentPath == "/podcast" ? "active" : ""}
        >
          Podcast
        </Link>
        <Link
          to="/start-a-podcast"
          className={currentPath == "/start-a-podcast" ? "active" : ""}
        >
          Start a podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath == "/profile" ? "active" : ""}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Header;
