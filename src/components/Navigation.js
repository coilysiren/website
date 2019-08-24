import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  return (
    <nav>
      <NavLink to="/" activeClassName="activeNavButton" className="logoName">
        <img
          src="images/cool-logo.svg"
          alt="An abstract shape with lines and circles Tech by Wenjie Jiang from the Noun Project"
        />
        <h2>Lynn's Blog</h2>
      </NavLink>
      <ul className="links" id="links">
        <li>
          {/* <a href="#home">Home</a> */}
          <NavLink to="/" activeClassName="activeNavButton">
            Home
          </NavLink>
        </li>
        <li>
          {/* <a href="#about">About</a> */}
          <NavLink to="/about" activeClassName="activeNavButton">
            About
          </NavLink>
        </li>
        <li>
          {/* <a href="#contact">Contact</a> */}
          <NavLink to="/contact" activeClassName="activeNavButton">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
