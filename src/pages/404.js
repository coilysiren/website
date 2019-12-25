import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import "../sass/404.scss"

const NotFoundPage = () => {
  const notFoundTitle = "404: Not found"
  const notFoundDescription =
    "You just hit a route that doesnt exist... oh, the sadness."

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <title>{notFoundTitle}</title>
        <meta name="description" content={notFoundDescription} />
      </Helmet>
      <div className="nonexistent-header"></div>
      <div className="not-found">
        <div className="nonexistent-container">
          <div className="nonexistent-content">
            <h1>{notFoundTitle}</h1>
            <h4>{notFoundDescription}</h4>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
