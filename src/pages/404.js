import React from "react"
import SEO from "../components/seo"
import Nav from "../components/nav"
import Footer from "../components/footer"
import "../sass/404.scss"

const NotFoundPage = () => (
  <div>
    <Nav />
    <SEO title="404: Not found" />
    <div className="nonexistent-header"></div>
    <div className="not-found">
      <div className="nonexistent-container">
        <div className="nonexistent-content">
          <h1>404: NOT FOUND</h1>
          <h4>You just hit a route that doesnt exist... oh, the sadness.</h4>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default NotFoundPage
