import React from "react"
import { Link } from "gatsby"

import "../sass/nav.scss"
import Links from "./links"

function Navigation() {
  return (
    <nav className="nav">
      <Link className="nav-brand" to="/">
        <span>Kai Siren</span>
        <small>platform engineer</small>
      </Link>
      <div id="navbar-links">
        <Links />
      </div>
    </nav>
  )
}

export default Navigation
