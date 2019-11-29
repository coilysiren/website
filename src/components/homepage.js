import React from "react"
import BlogList from "./blog-list"
import useSiteMetadata from "./site-metadata"
import "../sass/homepage.scss"

function Homepage() {
  const siteMetadata = useSiteMetadata()
  return (
    <div>
      <div className="header">
        <h2>{siteMetadata.title}</h2>
        <h4>{siteMetadata.description}</h4>
      </div>
      <div className="homepage-container">
        <div className="homepage-list">
          <BlogList />
        </div>
      </div>
    </div>
  )
}

export default Homepage
