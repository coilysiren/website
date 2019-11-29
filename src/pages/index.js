import React from "react"
import SEO from "../components/seo"
import Homepage from "../components/homepage"
import layout from "../components/layout"

const IndexPage = () => (
  <layout>
    <div>
      <Homepage />
      <SEO title="Home" />
    </div>
  </layout>
)

export default IndexPage
