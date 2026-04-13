import React from "react"

import "../sass/nav.scss"
import Links from "./links"

function Navigation() {
  return (
    <nav className="nav">
      <div id="navbar-links">
        <Links />
      </div>
    </nav>
  )
}

export default Navigation
