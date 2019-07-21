import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>🚧 Under Construction 🚧</h1>
    <p>this website is currently getting re-done</p>
    <p>
      <a href="https://web.archive.org/web/20190531001448/https://lynncyrin.me/" target="_blank">the old website</a>
    </p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
