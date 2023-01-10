import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="item" to="/">
        Home
      </Link>

      <Link className="item" to="/favorite">Favorite</Link>
    </div>
  );
};

export default Navbar;
