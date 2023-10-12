import React from "react"
import BlogList from "./../components/blog-list"
import Layout from "./../components/layout"
import useSiteMetadata from "./../components/site-metadata"
import "../sass/index.scss"

const IndexPage = () => {
  const siteMetadata = useSiteMetadata()

  return (
    <Layout>
      <div className="header">
        <h2>{siteMetadata.title}</h2>
        <h4>{siteMetadata.description}</h4>
      </div>
      <section>
        <BlogList />
      </section>
    </Layout>
  )
}

export default IndexPage
