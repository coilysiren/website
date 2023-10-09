import React from "react"
import { Helmet } from "react-helmet"
import Footer from "./footer"
import Nav from "./nav"
import favicon from "../images/favicon.ico"
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
        <link rel="icon" href={favicon} type="image/x-icon" />
        <meta name="description" content={siteMetadata.description} />
        <meta name="robots" content="follow, index" />
      </Helmet>
      <Nav />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
