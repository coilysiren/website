import React from "react"
import { Link } from "gatsby"
import icon from "../images/icon.png"
import "../sass/nav.scss"
import Links from "./links"

function Navigation() {
  return (
    <nav>
      <Link to="/" activeClassName="activeNavButton" className="nav-logoName">
        <img
          src={icon}
          alt="My personal icon, a stylized C and Y shaped like a power button"
        />
      </Link>
      <div id="navbar-links">
        <Links />
      </div>
    </nav>
  )
}

export default Navigation
