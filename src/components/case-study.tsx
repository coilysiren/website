import { Link } from "gatsby"
import React from "react"
import type { FeaturedProject } from "../data/projects"
import DefaultHead from "./default-head"
import Layout from "./layout"
import PlatformDiagram from "./platform-diagram"

export const CaseStudyHead = ({ project }: { project: FeaturedProject }) => (
  <DefaultHead
    title={`${project.name} case study | Kai Siren`}
    description={project.summary}
    image={`/og/work/${project.slug}.png`}
    canonical={project.caseStudyUrl}
  />
)

const CaseStudy = ({ project }: { project: FeaturedProject }) => (
  <Layout>
    <article className={`case-study case-study--${project.tone}`}>
      <header className="case-study__hero">
        <div className="case-study__eyebrow">
          <Link to="/work/">Work</Link>
          <span>/</span>
          <span>{project.stage}</span>
        </div>
        <h1>{project.name}</h1>
        <p className="case-study__lede">{project.title}</p>
        <p className="case-study__summary">{project.summary}</p>
        <div className="button-row">
          <a className="button button--primary" href={project.sourceUrl}>
            Read the source
          </a>
          <Link className="button button--quiet" to="/hiring/">
            Hiring notes
          </Link>
        </div>
      </header>

      <section className="case-study__section case-study__problem">
        <p className="section-label">The problem</p>
        <h2>Trust cannot depend on replaying every step.</h2>
        <p>{project.problem}</p>
      </section>

      <section className="case-study__section">
        <p className="section-label">System shape</p>
        <h2>One visible path through the boundary.</h2>
        <ol className="case-study__flow">
          {project.flow.map((step, index) => (
            <li key={step.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.label}</h3>
                <p>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {project.request && (
        <section className="case-study__section case-study__request">
          <p className="section-label">Representative request</p>
          <h2>The interface stays ordinary. The boundary does not.</h2>
          <pre>
            <code>{project.request.input}</code>
          </pre>
          <p>{project.request.result}</p>
        </section>
      )}

      <section className="case-study__section case-study__judgment">
        <p className="section-label">Hard design judgment</p>
        <h2>{project.judgment.title}</h2>
        <p>{project.judgment.detail}</p>
      </section>

      <section className="case-study__section">
        <p className="section-label">Evidence in the current system</p>
        <h2>The proof is in shipped interfaces.</h2>
        <ul className="evidence-list">
          {project.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <aside className="case-study__limit">
        <p className="section-label">Current limit</p>
        <p>{project.limitation}</p>
      </aside>

      <section className="case-study__section case-study__system">
        <p className="section-label">The larger system</p>
        <h2>Compose the context. Govern the run. Expose the narrow tool.</h2>
        <PlatformDiagram compact />
      </section>
    </article>
  </Layout>
)

export default CaseStudy
