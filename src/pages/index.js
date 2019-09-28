import React from "react"
import { Link } from "gatsby"
import Navigation from "../components/nav"
import SEO from "../components/seo"
import Homepage from "../components/homepage"
import Post from "../components/post"

const IndexPage = () => (
  <div>
    <Navigation />
    {/* Outcommented in order to work on individual blog posts now */}
    {/* <Homepage /> */}
    <Post />
    <SEO title="Home" />
  </div>
)

export default IndexPage
