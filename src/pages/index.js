import React from "react"
import BlogList from "./../components/blog-list"
import Layout from "./../components/layout"
import "../sass/index.scss"

const IndexPage = () => {
  return (
    <Layout>
      <section>
        <BlogList />
      </section>
    </Layout>
  )
}

export default IndexPage
