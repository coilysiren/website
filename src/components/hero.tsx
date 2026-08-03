import React from "react"
import { Link } from "gatsby"
import headshot from "../images/headshot.jpg"

function Hero() {
  return (
    <header className="portfolio-hero">
      <div className="portfolio-hero__copy">
        <p className="eyebrow">Staff platform engineering · East Bay, CA</p>
        <h1>
          I build the platform layer that lets engineering teams develop, ship,
          and operate agentic systems safely.
        </h1>
        <p className="portfolio-hero__lede">
          The work spans context composition, governed execution, MCP delivery,
          model routing, observability, and the Kubernetes systems underneath.
        </p>
        <div className="button-row">
          <a className="button button--primary" href="#featured-work">
            Explore the system
          </a>
          <Link className="button button--quiet" to="/resume/">
            Resume
          </Link>
          <Link className="button button--text" to="/hiring/">
            Hiring notes →
          </Link>
        </div>
        <ul className="portfolio-hero__facts" aria-label="Career highlights">
          <li>10+ years in platform engineering</li>
          <li>Python · Go · TypeScript</li>
          <li>Kubernetes · Terraform · MCP</li>
        </ul>
      </div>
      <aside className="portfolio-hero__portrait">
        <div className="portrait-frame">
          <img src={headshot} alt="Kai Siren" />
        </div>
        <p>⚙⚒ lights out, platform&apos;s green, agents are working the line ⚒⚙</p>
      </aside>
    </header>
  )
}

export default Hero
