import React from "react"
import BlogList from "../components/blog-list"
import Hero from "../components/hero"
import Layout from "../components/layout"
import "../sass/index.scss"
import Closer from "../components/closer"

const IndexPage = () => {
  return (
    <Layout>
      <section>
        <Hero />
        <BlogList />
        <Closer />
      </section>
    </Layout>
  )
}

export default IndexPage
