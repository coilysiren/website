import React from "react"
import { Helmet } from "react-helmet"
import Footer from "./footer"
import Nav from "./nav"
import usesitemetadata from "./sitemetadata"
import "../sass/post.scss"

const TemplateWrapper = ({ children }) => {
  const { title, description } = usesitemetadata()
  return (
    <div className="layoutWrapper">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Nav />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
