import { Link } from "gatsby"
import React from "react"
import DefaultHead from "../components/default-head"
import Layout from "../components/layout"
import PlatformDiagram from "../components/platform-diagram"
import { featuredProjects } from "../data/projects"

export const Head = () => (
  <DefaultHead
    title="Hiring | Kai Siren"
    description="Kai Siren builds the governed platform layer that lets engineering teams develop, ship, and operate agentic systems safely."
    image="/og/hiring.png"
    canonical="/hiring/"
  />
)

const HiringPage = () => (
  <Layout>
    <article className="hiring-page">
      <header className="hiring-hero">
        <div>
          <p className="eyebrow">If you are recruiting me, start here</p>
          <h1>
            I build the governed platform layer that lets engineering teams
            develop, ship, and operate agentic systems safely.
          </h1>
          <p className="hiring-hero__lede">
            I am a Staff-level platform engineer in the East Bay. My strongest
            work sits where developer infrastructure, agent orchestration,
            observability, and production operations meet.
          </p>
          <div className="button-row">
            <Link className="button button--primary" to="/resume/">
              Read the resume
            </Link>
            <a
              className="button button--quiet"
              href="mailto:coilysiren@gmail.com"
            >
              Email me
            </a>
          </div>
        </div>
        <aside className="hiring-hero__proof">
          <p className="section-label">Strongest proof</p>
          <strong>Ward</strong>
          <p>
            Governed unattended repository execution in fresh clones and
            least-access containers, with fixed workflows and durable evidence.
          </p>
          <Link to="/work/ward/">Read the case study →</Link>
        </aside>
      </header>

      <section className="hiring-section hiring-section--system">
        <div className="section-heading">
          <p className="section-label">The system behind the claim</p>
          <h2>Context, execution, and tools stay separate on purpose.</h2>
          <p>
            These projects are useful independently. Together, they show the
            platform boundary from what an agent knows to what it can do.
          </p>
        </div>
        <PlatformDiagram />
        <div className="hiring-proof-grid">
          {featuredProjects.map((project) => (
            <article key={project.slug}>
              <p className="section-label">{project.stage}</p>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div>
                <Link to={project.caseStudyUrl}>Case study →</Link>
                <a href={project.sourceUrl}>Source ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hiring-section hiring-section--fit">
        <div>
          <p className="section-label">Where I do my best work</p>
          <h2>Shared technical territory with real product ownership.</h2>
        </div>
        <ul className="hiring-facts">
          <li>
            <strong>Developer infrastructure</strong>
            <span>
              Internal platforms, agent-development systems, and tools that make
              other engineers faster.
            </span>
          </li>
          <li>
            <strong>Systems integration</strong>
            <span>
              Cloud, Kubernetes, model APIs, MCP, observability, and the
              contracts between them.
            </span>
          </li>
          <li>
            <strong>Production judgment</strong>
            <span>
              Reliability, incident response, rollout boundaries, and long-term
              operability.
            </span>
          </li>
          <li>
            <strong>Staff-level ownership</strong>
            <span>
              Cross-repository architecture, developer enablement, and a broad
              platform surface with explicit handoffs.
            </span>
          </li>
        </ul>
      </section>

      <section className="hiring-section hiring-section--details">
        <div>
          <p className="section-label">Practical fit</p>
          <h2>Useful context before a first conversation.</h2>
        </div>
        <div className="hiring-detail-grid">
          <article>
            <h3>Location and arrangement</h3>
            <p>
              I am based in the East Bay and prefer a remote-compatible role
              with a real Bay Area office, or a comfortable Bay Area hybrid
              arrangement. Full-time is the default. Direct independent
              contracting through my own business can also fit.
            </p>
          </article>
          <article>
            <h3>Level and scope</h3>
            <p>
              Senior is a good fit. Staff or Lead fits when the charter carries
              real authority across a platform or developer-tooling surface.
              Actual ownership matters more than title prestige.
            </p>
          </article>
          <article>
            <h3>Interview format</h3>
            <p>
              I do strong work in system design, architecture deep-dives,
              realistic take-homes, and paired debugging on real code. I do not
              pursue async-proctored puzzle coding.
            </p>
          </article>
          <article>
            <h3>Compensation</h3>
            <p>
              My base-compensation floor is $170K, with $220K to $250K the
              strongest range. Role shape, manager quality, autonomy, values,
              and working conditions still decide the fit.
            </p>
          </article>
        </div>
      </section>

      <section className="hiring-section hiring-section--tenure">
        <p className="section-label">On tenure</p>
        <h2>I want the next chapter to meet or exceed my best fit.</h2>
        <p>
          My early career includes small companies, nonprofits, and contracts
          that ended for structural reasons. Later moves cluster around major
          stress, values conflicts, and one role-fit decision I would handle
          differently. Textio is my staying-power benchmark. I am increasingly
          selective because I want the next chapter to reach that bar.
        </p>
      </section>

      <aside className="hiring-contact">
        <div>
          <p className="section-label">Next action</p>
          <h2>Send the role, the team shape, and the actual charter.</h2>
        </div>
        <div className="button-row">
          <a
            className="button button--primary"
            href="mailto:coilysiren@gmail.com"
          >
            coilysiren@gmail.com
          </a>
          <Link className="button button--quiet" to="/resume/">
            Resume
          </Link>
        </div>
      </aside>
    </article>
  </Layout>
)

export default HiringPage
