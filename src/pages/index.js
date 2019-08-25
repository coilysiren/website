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
      <Link to="/page-2/">New Website Frontend (post)</Link>
    </p>
    <p>
      <a href="https://web.archive.org/web/20190531001448/https://lynncyrin.me/" target="_blank" rel="noopener noreferrer">the old website</a>
    </p>
  </Layout>
)

export default IndexPage
