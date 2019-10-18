import React from "react"
import { Link } from "gatsby"
import Navigation from "../components/nav"
import SEO from "../components/seo"
import Homepage from "../components/homepage"
import Post from "../components/post"
import Layout from "../components/Layout"
import BlogList from "../components/BlogList"

const IndexPage = () => (
  <Layout>
    <div>
      {/* Outcommented in order to work on individual blog posts now */}
      {/* <Homepage /> */}
      {/* Outcommented to test BlogList */}
      {/* <Post /> */}
      <BlogList/>
      <SEO title="Home" />
    </div>
  </Layout>
)

export default IndexPage
