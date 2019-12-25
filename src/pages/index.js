import React from "react"
import BlogList from "./../components/blog-list"
import Layout from "./../components/layout"
import useSiteMetadata from "./../components/site-metadata"

const IndexPage = () => {
  const siteMetadata = useSiteMetadata()

  return (
    <Layout>
      <div className="header">
        <h2>{siteMetadata.title}</h2>
        <h4>{siteMetadata.description}</h4>
      </div>
      <div className="homepage-container">
        <div className="homepage-list">
          <BlogList />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
