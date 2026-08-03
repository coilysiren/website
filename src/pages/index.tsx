import React from "react"
import Hero from "../components/hero"
import Layout from "../components/layout"
import DefaultHead from "../components/default-head"
import "../sass/index.scss"
import ProjectCatalogue from "../components/project-catalogue"

export const Head = () => (
  <DefaultHead
    description="Kai Siren builds governed agent systems, developer infrastructure, and the platform layer underneath."
    image="/og/home.png"
    canonical="/"
  />
)

const IndexPage = () => {
  return (
    <Layout>
      <div className="portfolio-home">
        <Hero />
        <section
          id="featured-work"
          className="portfolio-section portfolio-section--featured portfolio-section--catalogue"
        >
          <div className="section-heading">
            <h2>Active portfolio</h2>
          </div>
          <ProjectCatalogue condensed />
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage
