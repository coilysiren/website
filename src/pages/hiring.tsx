import { Link } from "gatsby"
import React from "react"
import DefaultHead from "../components/default-head"
import Layout from "../components/layout"

export const Head = () => (
  <DefaultHead
    title="Hiring | Kai Siren"
    description="A reference for recruiters on Kai Siren's preferred platform-engineering work, practical fit, interview boundaries, and tenure."
    canonical="/hiring/"
  />
)

const HiringPage = () => (
  <Layout>
    <article className="hiring-page">
      <header className="hiring-header">
        <p className="section-label">Hiring</p>
        <p>
          If you are recruiting me, start here. This is a long-running
          reference, not a status update. It covers where I do my best work, the
          practical shape of a role I can accept, and the interviews I am open
          to.
        </p>
      </header>

      <section className="hiring-section hiring-section--reference">
        <div className="hiring-reference-block">
          <h1>Where I do my best work</h1>
          <p className="hiring-lede">
            I am a senior platform engineer, more than ten years in. Platform
            engineer is the clearest-signal title. DevOps is the honest
            fallback. Actual authority and scope matter more than title
            prestige.
          </p>
          <ul className="hiring-facts">
            <li>
              <strong>Systems integration</strong>
              <span>Across cloud, observability, and developer tooling.</span>
            </li>
            <li>
              <strong>Developer experience</strong>
              <span>
                Internal platforms and developer tooling as the actual product
                of the role.
              </span>
            </li>
            <li>
              <strong>Agent-first infrastructure</strong>
              <span>
                MCP and tool interfaces, orchestration, evaluation,
                observability, safety, and debugging for agent consumers.
              </span>
            </li>
            <li>
              <strong>Production platforms</strong>
              <span>
                Reliability, incident response, rollout boundaries, and
                long-term operability.
              </span>
            </li>
            <li>
              <strong>Platform-team interfaces</strong>
              <span>
                Cross-organization work that makes ownership and handoffs
                explicit.
              </span>
            </li>
            <li>
              <strong>Bounded delivery</strong>
              <span>
                Contract-shaped and embedded missions with real customer
                problems, explicit handoffs, and periodic resets.
              </span>
            </li>
            <li>
              <strong>Meaningful ownership</strong>
              <span>
                Broad platform territory, especially early-company scope or a
                first-platform-hire charter.
              </span>
            </li>
          </ul>
        </div>

        <div className="hiring-reference-block">
          <h2>Role shape</h2>
          <p>
            Senior is a good fit. Staff or Lead can also fit when the charter
            supports real authority across a platform or developer-tooling
            surface.
          </p>
          <ul className="hiring-bullets">
            <li>
              A strong platform charter with some SRE or product responsibility
              can fit well.
            </li>
            <li>
              Primarily SRE, operations, or infrastructure maintenance is less
              aligned.
            </li>
            <li>Backend-product work as the actual role is a hard no.</li>
            <li>
              Generic AI branding does not add much unless agentic developer
              leverage is part of the work.
            </li>
          </ul>
        </div>

        <div className="hiring-reference-block">
          <h2>Practical fit</h2>
          <ul className="hiring-facts">
            <li>
              <strong>Location and arrangement</strong>
              <span>
                I am based in the East Bay. I prefer a remote-compatible role
                with a real Bay Area office, or a comfortable Bay Area hybrid
                arrangement. No Bay Area office is a hard stop.
              </span>
            </li>
            <li>
              <strong>Employment</strong>
              <span>
                Full-time is the default. Direct independent contracting through
                my own business, consultancy work, and embedded delivery can
                fit. Staffing-agency W-2 contracts, contract-to-hire, and
                agency-mediated C2C are not a fit.
              </span>
            </li>
            <li>
              <strong>Compensation</strong>
              <span>
                My base-compensation floor is $170K, with $220K to $250K the
                strongest range. Compensation is not load-bearing above the
                floor.
              </span>
            </li>
            <li>
              <strong>Working environment</strong>
              <span>
                Manager quality, autonomy, team composition, inclusion,
                communication style, on-call expectations, overtime, and room to
                work without masking all matter.
              </span>
            </li>
            <li>
              <strong>Values</strong>
              <span>
                A technically strong role can still be the wrong fit when the
                product direction conflicts with my values.
              </span>
            </li>
          </ul>
        </div>

        <div className="hiring-reference-block">
          <h2>Useful context before a first conversation</h2>
          <p>A useful first message includes:</p>
          <ul className="hiring-checklist">
            <li>Office location and expected cadence</li>
            <li>Base-compensation band</li>
            <li>The actual role charter and ownership boundaries</li>
            <li>Manager and team shape</li>
            <li>On-call and overtime expectations</li>
            <li>Technical environment, product, and customer</li>
            <li>Company stage and interview format</li>
            <li>Why my experience is specifically relevant</li>
          </ul>
        </div>
      </section>

      <section className="hiring-section hiring-section--tenure">
        <p className="section-label">On tenure</p>
        <h2>I want the next chapter to meet or exceed my best fit.</h2>
        <p>
          My resume reads short and I want to frame it up front, since it always
          comes up. The first several years of my career were structural. Small
          companies, nonprofits, and contracts ended for financial reasons
          rather than personal ones.
        </p>
        <p>
          The voluntary moves since cluster around three forces: high-stress
          events I did not recover from in time, values conflicts that emerged
          mid-tenure, and one role-fit miscall I would replay differently. My
          longest stint is my staying-power benchmark. I am increasingly
          selective because I want the next chapter to meet or exceed that fit,
          not because I am trying to talk past the pattern. I am happy to walk
          through any specific transition once we are in conversation.
        </p>
      </section>

      <section className="hiring-section hiring-section--interview">
        <div className="hiring-interview-copy">
          <p className="section-label">Interview format</p>
          <h2>Use the work the role actually requires.</h2>
          <p>
            Senior platform work is systems integration, reliability, cost, and
            organizational interface work. There is plenty of technical depth
            available in formats that test those skills directly.
          </p>

          <h3>Good ways to evaluate me</h3>
          <ul>
            <li>System design</li>
            <li>Architecture deep-dives</li>
            <li>A take-home with a real-codebase prompt</li>
            <li>Paired debugging on actual code</li>
          </ul>

          <h3>Hard pass</h3>
          <p>
            I do not do async-proctored puzzle coding. That means a webcam or
            screen share, an automated proctor, a hard time limit, and no human
            interviewer present. This is a hard stop regardless of where the
            test sits in the loop.
          </p>

          <h3>Softer no</h3>
          <p>
            Live puzzle coding with a human interviewer present is a softer no.
            I will sometimes do it when the rest of the loop is strong, but it
            is not where I show my best work.
          </p>
        </div>

        <footer className="hiring-contact">
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
        </footer>
      </section>
    </article>
  </Layout>
)

export default HiringPage
