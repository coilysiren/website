import React from "react"
import { Link } from "gatsby"
import icon from "../images/icon.png"
import useSiteMetadata from "./site-metadata"
import "../sass/nav.scss"

function Navigation() {
  const siteMetadata = useSiteMetadata()
  return (
    <nav>
      <Link to="/" activeClassName="activeNavButton" className="nav-logoName">
        <img
          src={icon}
          alt="My personal icon, a stylized C and Y shaped like a power button"
        />
      </Link>
      <ul className="nav-links" id="links">
        <li>
          <Link to="/" activeClassName="activeNavButton">
            Home
          </Link>
        </li>
        <li>
          <a href={"mailto:" + siteMetadata.email}>Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
