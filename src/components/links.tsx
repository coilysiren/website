import React from "react"
import { Link } from "gatsby"

function Links() {
  return (
    <ul className="nav-links">
      <li>
        <Link className="nav-btn" to="/work/">
          ./work
        </Link>
      </li>
      <li>
        <Link className="nav-btn" to="/about/">
          ./about
        </Link>
      </li>
      <li>
        <Link className="nav-btn" to="/resume/">
          ./resume
        </Link>
      </li>
      <li className="nav-source">
        <a
          className="nav-btn"
          href="https://forgejo.coilysiren.me/coilysiren"
          target="_blank"
          rel="me noreferrer"
        >
          source ↗
        </a>
      </li>
    </ul>
  )
}

export default Links
