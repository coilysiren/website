import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import "../sass/404.scss"

const NotFoundPage = () => (
  <Layout>
    <div>
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
    </div>
  </Layout>
)

export default NotFoundPage
