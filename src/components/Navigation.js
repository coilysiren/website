import React, { useState } from "react"
import { Link } from "gatsby"
import "../sass/navigation.scss"

function Navigation(props) {
  return (
    <nav>
      <Link to="/" activeClassName="activeNavButton" className="logoName">
        <img
          src="images/cool-logo.svg"
          alt="An abstract shape with lines and circles Tech by Wenjie Jiang from the Noun Project"
        />
        <h2>Lynn's Blog</h2>
      </Link>
      <ul className="links" id="links">
        <li>
          <Link to="/" activeClassName="activeNavButton">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" activeClassName="activeNavButton">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" activeClassName="activeNavButton">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
