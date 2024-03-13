import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-headline">MENU</div>
      <ul>
        <li className="navbar-item">item 1</li>
        <li className="navbar-item">item 2</li>
        <li className="navbar-item">item 3</li>
      </ul>
    </div>
  );
};

export default NavBar;
