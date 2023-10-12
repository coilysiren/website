import React from "react"
import { Link } from "gatsby"

function Links() {
  return (
    <ul className="nav-links">
      <li>
        <Link className="nav-btn" to="/">
          <i className="fa-solid fa-house"></i> Home
        </Link>
      </li>
      <li>
        <Link className="nav-btn" to="/about">
          <i className="fa-solid fa-face-laugh"></i> About
        </Link>
      </li>
      <li>
        <Link className="nav-btn" to="/contact">
          <i className="fa-solid fa-envelope"></i> Contact
        </Link>
      </li>
    </ul>
  )
}

export default Links
