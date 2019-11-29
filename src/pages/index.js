import React from "react"
import SEO from "../components/seo"
import Homepage from "../components/homepage"
import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <div>
      <SEO title="Home" />
      <Homepage />
    </div>
  </Layout>
)

export default IndexPage
