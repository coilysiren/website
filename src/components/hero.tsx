import React from "react"
import headshot from "../images/headshot.jpg"

function Hero() {
  return (
    <header className="portfolio-hero">
      <div className="portfolio-hero__copy">
        <h1>I build agentic engineering platforms</h1>
        <p className="portfolio-hero__lede portfolio-hero__tagline">
          <span>
            <span aria-hidden="true">🌑</span> lights out,
          </span>
          <span>
            <span aria-hidden="true">🟢</span> flight deck green,
          </span>
          <span>
            <span aria-hidden="true">🛡️</span> agents warded for an 8h+ run
          </span>
        </p>
      </div>
      <aside className="portfolio-hero__portrait">
        <div className="portrait-frame">
          <img src={headshot} alt="Kai Siren" />
        </div>
      </aside>
    </header>
  )
}

export default Hero
