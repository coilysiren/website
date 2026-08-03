import React from "react"
import { Link } from "gatsby"
import headshot from "../images/headshot.jpg"

function Hero() {
  return (
    <header className="portfolio-hero">
      <div className="portfolio-hero__copy">
        <p className="eyebrow">Platform engineer · East Bay, CA</p>
        <h1>I build the platform for safer agentic systems.</h1>
        <p className="portfolio-hero__lede">
          Context, execution, tools, and infrastructure, designed as one
          governed system.
        </p>
        <div className="button-row">
          <a className="button button--primary" href="#featured-work">
            Explore the work
          </a>
          <Link className="button button--quiet" to="/resume/">
            Resume
          </Link>
        </div>
      </div>
      <aside className="portfolio-hero__portrait">
        <div className="portrait-frame">
          <img src={headshot} alt="Kai Siren" />
        </div>
        <p>
          ⚙⚒ lights out, platform&apos;s green, agents are working the line ⚒⚙
        </p>
      </aside>
    </header>
  )
}

export default Hero
