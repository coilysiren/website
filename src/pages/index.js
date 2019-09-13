import React from "react"
import { Link } from "gatsby"
import Navigation from "../components/nav"
import SEO from "../components/seo"
import Homepage from "../components/homepage"

const IndexPage = () => (
  <div>
    <Navigation />
    <Homepage />
    <SEO title="Home" />
    <h1>🚧 Under Constructionm, hi lynn!!! 🚧</h1>
    <p>this website is currently getting re-done</p>
    <p>
      <a
        href="https://web.archive.org/web/20190531001448/https://lynncyrin.me/"
        target="_blank"
        rel="noopener noreferrer"
      >
        the old website
      </a>
    </p>
  </div>
)

export default IndexPage
