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
        {/* https://cdnjs.com/libraries/font-awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Helmet>
      <Nav />
      <div>
        <div className="header">
          <h2>{siteMetadata.title}</h2>
          <h4>{siteMetadata.description}</h4>
        </div>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
