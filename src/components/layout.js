import React from "react"
import { Helmet } from "react-helmet"
import Footer from "./footer"
import Nav from "./nav"
import useSiteMetadata from "./site-metadata"
import "../sass/layout.scss"
import "../sass/post.scss"

const TemplateWrapper = ({ children }) => {
  const siteMetadata = useSiteMetadata()
  return (
    <div className="layoutWrapper">
      <Helmet>
        <html lang="en" />
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
      </Helmet>
      <Nav />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
