import React from "react"
import SEO from "../components/seo"
import Nav from "../components/nav"
import Footer from "../components/footer"
import "../sass/404.scss"
import "../sass/post.scss"

const NotFoundPage = () => (
  <div>
    <Nav />
    <SEO title="404: Not found" />
    <div className="post-purple-block"></div>
    <div className="not-found">
      <div className="post-body">
        <div className="post-content">
          <h1>404: NOT FOUND</h1>
          <p>You just hit a route that doesnt exist... oh, the sadness.</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default NotFoundPage
