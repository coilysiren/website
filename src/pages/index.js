import React from "react"
import { Link } from "gatsby"
import Navigation from "../components/nav"
import SEO from "../components/seo"
import Homepage from "../components/homepage"

const IndexPage = () => (
  <div>
    <Navigation />
    <Homepage />
    <SEO title="Home" />
  </div>
)

export default IndexPage
