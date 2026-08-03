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
            <h2>Three proof routes, one platform story.</h2>
            <p>
              Context decides what the agent knows. Ward governs how the work
              moves. Ward MCP exposes only the tools policy grants.
            </p>
          </div>
          <PlatformDiagram />
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
                <p>{project.summary}</p>
                <Link to={project.caseStudyUrl}>Read the case study →</Link>
              </article>
            ))}
          </div>
        </section>
        <section className="portfolio-section portfolio-section--catalogue">
          <div className="section-heading">
            <p className="section-label">Active portfolio</p>
            <h2>Grouped by kind, not buried in a feed.</h2>
            <p>
              These are independently useful projects that compose into the
              larger platform, plus the systems where the work meets real use.
            </p>
          </div>
          <ProjectCatalogue />
          <Link className="text-link" to="/work/">
            See the full work index →
          </Link>
        </section>
        <section className="portfolio-section portfolio-section--split">
          <div>
            <p className="section-label">Writing</p>
            <h2>The reasoning stays inspectable too.</h2>
            <p>
              Notes on platform boundaries, cloud systems, developer tooling,
              and methods for working with agents.
            </p>
            <Link className="text-link" to="/writing/">
              Browse the writing →
            </Link>
          </div>
          <div className="portfolio-cta">
            <p className="section-label">Working together</p>
            <h2>Start with the evidence, then the conversation.</h2>
            <p>
              The resume is the compact career record. Hiring notes cover role
              shape, logistics, and interview fit.
            </p>
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
