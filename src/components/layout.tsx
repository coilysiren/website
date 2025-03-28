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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
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
