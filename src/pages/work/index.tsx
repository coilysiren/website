import React from "react"
import { Link } from "gatsby"
import DefaultHead from "../../components/default-head"
import Layout from "../../components/layout"
import PlatformDiagram from "../../components/platform-diagram"
import ProjectCatalogue from "../../components/project-catalogue"

export const Head = () => (
  <DefaultHead
    title="Work | Kai Siren"
    description="Governed agent systems, platform infrastructure, and applied projects by Kai Siren."
    image="/og/work/index.png"
    canonical="/work/"
  />
)

const WorkPage = () => (
  <Layout>
    <div className="portfolio-page">
      <header className="portfolio-page__hero">
        <p className="eyebrow">Selected work</p>
        <h1>
          Systems that let agents move without pretending authority is free.
        </h1>
        <p>
          The strongest story is the system: context, execution, policy, model
          transport, observability, and the infrastructure underneath. No single
          flagship has to carry all of it.
        </p>
        <Link className="text-link" to="/resume/">
          Read the career summary →
        </Link>
      </header>
      <section className="portfolio-section">
        <div className="section-heading">
          <p className="section-label">Featured system</p>
          <h2>Compose → execute → expose</h2>
        </div>
        <PlatformDiagram />
      </section>
      <section className="portfolio-section portfolio-section--catalogue">
        <div className="section-heading">
          <p className="section-label">Active portfolio</p>
          <h2>Grouped by the work each project does.</h2>
        </div>
        <ProjectCatalogue />
      </section>
    </div>
  </Layout>
)

export default WorkPage
