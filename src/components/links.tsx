import React from "react"
import { Link } from "gatsby"

function Links() {
  return (
    <div>
      <ul className="nav-links">
        <li>
          <Link className="nav-btn" to="/">
            ./home<i className="fa-solid fa-house"></i>{" "}
          </Link>
        </li>
        <li>
          <Link className="nav-btn" to="/about">
            ./about<i className="fa-solid fa-face-laugh"></i>{" "}
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
            linkedin<i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
            <i className="fa-brands fa-linkedin"></i>{" "}
          </a>
        </li>
        <li>
          <a
            className="nav-btn"
            href="https://github.com/coilysiren"
            target="_blank"
            rel="me noreferrer"
          >
            github<i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
            <i className="fa-brands fa-square-github"></i>{" "}
          </a>
        </li>
        <li>
          <a
            className="nav-btn"
            href="http://bsky.app/profile/coilysiren.me/"
            target="_blank"
            rel="me noreferrer"
          >
            bluesky<i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
            <i className="fa-brands fa-bluesky"></i>{" "}
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Links
