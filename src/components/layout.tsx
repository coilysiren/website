import React, { ReactNode } from "react"
import Footer from "./footer"
import Nav from "./nav"
import "../sass/layout.scss"
import "../sass/post.scss"
import "../sass/portfolio.scss"

const TemplateWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="layoutWrapper">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
