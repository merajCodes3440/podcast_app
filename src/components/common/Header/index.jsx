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
          to="/podcasts"
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
        
        {/* <Link to="/podcast/Whl1a39IGv3KsSgsZ0Bn/create-episode" className={currentPath === "/podcast/Whl1a39IGv3KsSgsZ0Bn/create-episode" ? "active" : ""}>
          Create Episode
        </Link> */}

      </div>
    </div>
  );
}

export default Header;
