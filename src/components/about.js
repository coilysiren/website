import React from "react"
import { Link } from "gatsby"
import "../sass/post.scss"
import Arrow from "../images/arrow-left.svg"
import Self from "../images/self.jpg"
import useSiteMetadata from "./site-metadata"

function About() {
  const siteMetadata = useSiteMetadata()
  return (
    <div className="about-container">
      <div className="about-top">
        <Link className="home-btn">
          <img src={Arrow} alt="arrow pointing left" />
          <h4 to="/">Home</h4>
        </Link>
        <h3>{siteMetadata.title}</h3>
      </div>
      <div className="about-bottom">
        <p>{siteMetadata.longDescription}</p>
        <img src={Self} alt="an image of me" />
      </div>
    </div>
  )
}

export default About
