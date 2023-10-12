import React from "react"
import { Link } from "gatsby"
import "../sass/post.scss"

function Closer() {
  return (
    <div className="post-closer">
      <div className="about-top">
        <Link className="home-btn" to="/">
          <i className="fa-solid fa-house"></i> Home
        </Link>
      </div>
      <div className="about-bottom"></div>
    </div>
  )
}

export default Closer
