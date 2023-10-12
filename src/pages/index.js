import React from "react"
import BlogList from "./../components/blog-list"
import Layout from "./../components/layout"
import "../sass/index.scss"
import Closer from "../components/closer"

const IndexPage = () => {
  return (
    <Layout>
      <section>
        <BlogList />
        <Closer />
      </section>
    </Layout>
  )
}

export default IndexPage
