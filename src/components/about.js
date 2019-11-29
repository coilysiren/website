import React from "react"
import { Link } from "gatsby"
import "../sass/post.scss"
import Arrow from "../images/arrow-left.svg"
import Lynn from "../images/lynn.jpg"

function About() {
  return (
    <div className="about-container">
      <div className="about-top">
        <Link className="home-btn">
          <img src={Arrow} alt="arrow pointing left" />
          <h4 to="/">Home</h4>
        </Link>
        <h3>Lynn Cyrin</h3>
      </div>
      <div className="about-bottom">
        <p>
          lynncyrin@gmail.com \\ QTPoC \\ infrastructure engineer @textio
          organizer @WSCseattle \\ prev @callisto @bundlerio @NASA
        </p>
        <img
          src={Lynn}
          alt="Image of a Lynn's head and shoulders  with LGBTQA+ flag on the background"
        />
      </div>
    </div>
  )
}

export default About
