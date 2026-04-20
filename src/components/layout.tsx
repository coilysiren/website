import React, { ReactNode } from "react"
import Footer from "./footer"
import Nav from "./nav"
import useSiteMetadata from "./site-metadata"
import "../sass/layout.scss"
import "../sass/post.scss"

const TemplateWrapper = ({ children }: { children: ReactNode }) => {
  const siteMetadata = useSiteMetadata()
  return (
    <div className="layoutWrapper">
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
