import React from "react"
import BlogList from "../components/blog-list"
import Hero from "../components/hero"
import Layout from "../components/layout"
import DefaultHead from "../components/default-head"
import "../sass/index.scss"
import Closer from "../components/closer"

export const Head = () => <DefaultHead />

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
