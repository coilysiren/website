import React from "react"
import Hero from "../components/hero"
import Layout from "../components/layout"
import DefaultHead from "../components/default-head"
import "../sass/index.scss"
import { Link } from "gatsby"
import PlatformDiagram from "../components/platform-diagram"
import ProjectCatalogue from "../components/project-catalogue"
import { featuredProjects } from "../data/projects"

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
          className="portfolio-section portfolio-section--featured"
        >
          <div className="section-heading">
            <p className="section-label">Featured system</p>
            <h2>One platform, three proof routes.</h2>
          </div>
          <PlatformDiagram compact />
          <div className="featured-project-grid">
            {featuredProjects.map((project) => (
              <article
                className={`featured-project featured-project--${project.tone}`}
                key={project.slug}
              >
                <div className="featured-project__topline">
                  <span>{project.stage}</span>
                  <span>{project.name}</span>
                </div>
                <h3>{project.title}</h3>
                <a href={project.sourceUrl}>View source ↗</a>
              </article>
            ))}
          </div>
        </section>
        <section className="portfolio-section portfolio-section--catalogue">
          <div className="section-heading">
            <h2>Active portfolio</h2>
          </div>
          <ProjectCatalogue condensed />
        </section>
        <section className="portfolio-section portfolio-section--split">
          <div>
            <p className="section-label">Writing</p>
            <h2>Notes from the work.</h2>
            <Link className="text-link" to="/writing/">
              Browse the writing →
            </Link>
          </div>
          <div className="portfolio-cta">
            <p className="section-label">Working together</p>
            <h2>The compact version.</h2>
            <div className="button-row">
              <Link className="button button--primary" to="/resume/">
                Read the resume
              </Link>
              <Link className="button button--quiet" to="/hiring/">
                Hiring notes
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage
