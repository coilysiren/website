import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import Closer from "../components/closer"

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
      <section className="not-found">
        <div className="post-header">
          <h1>{notFoundTitle}</h1>
        </div>
        <div className="post-content">
          <p>{notFoundDescription}</p>
        </div>
        <Closer />
      </section>
    </Layout>
  )
}

export default NotFoundPage
