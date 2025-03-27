import React from "react"
import { Link } from "gatsby"

function Links() {
  return (
    <div>
      <ul className="nav-links">
        <li>
          <Link className="nav-btn" to="/">
            /<i className="fa-solid fa-house"></i>{" "}
            <span className="nav-text">home</span>
          </Link>
        </li>
        <li>
          <Link className="nav-btn" to="/about">
            /<i className="fa-solid fa-face-laugh"></i>{" "}
            <span className="nav-text">about</span>
          </Link>
        </li>
        <li>
          <Link className="nav-btn" to="/contact">
            /<i className="fa-solid fa-envelope"></i>{" "}
            <span className="nav-text">contact</span>
          </Link>
        </li>
      </ul>
      <ul className="nav-links">
        <li>
          <a
            className="nav-btn"
            href="https://www.linkedin.com/in/coilysiren/"
            target="_blank"
            rel="me noreferrer"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <i className="fa-brands fa-linkedin"></i>{" "}
            <span className="nav-text">/in/coilysiren</span>
          </a>
        </li>
        <li>
          <a
            className="nav-btn"
            href="https://github.com/coilysiren"
            target="_blank"
            rel="me noreferrer"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
            <i className="fa-brands fa-square-github"></i>{" "}
            <span className="nav-text">@coilysiren</span>
          </a>
        </li>
        <li>
          <a
            className="nav-btn"
            href="https://tech.lgbt/@coilysiren"
            target="_blank"
            rel="me noreferrer"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
            <i className="fa-brands fa-mastodon"></i>{" "}
            <span className="nav-text">@coilysiren</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Links
