import React from "react"
import { Link } from "gatsby"
import headshot from "../images/headshot.jpg"

function Hero() {
  return (
    <div className="hero">
      <img className="hero-photo" src={headshot} alt="Kai Siren" />
      <div className="hero-text">
        <p>
          <strong>Hi! I&apos;m Kai</strong>, a platform engineer 13 years in,
          currently most interested in what one person can build right now -
          the ceiling has shifted a lot in the last year. Queer, Black, trans,
          living in{" "}
          <a
            href="https://en.wikipedia.org/wiki/San_Lorenzo,_California"
            target="_blank"
            rel="noreferrer"
          >
            San Lorenzo
          </a>
          , in the East Bay.
        </p>
        <p>
          I build things for the joy of it:{" "}
          <a
            href="https://github.com/coilysiren/gauntlet"
            target="_blank"
            rel="noreferrer"
          >
            Gauntlet
          </a>{" "}
          (a two-agent adversarial loop for inferring correctness), a running
          herd of{" "}
          <a
            href="https://github.com/coilysiren?tab=repositories&q=eco"
            target="_blank"
            rel="noreferrer"
          >
            Eco mods
          </a>
          , a <Link to="/apps/bsky-popularity-contest/">Bluesky stats app</Link>
          , and a personal CRM in an Obsidian vault. Outside the keyboard:
          factory / strategy / tactics games, gardening, and slowly planning
          an{" "}
          <a
            href="https://en.wikipedia.org/wiki/Secondary_suite"
            target="_blank"
            rel="noreferrer"
          >
            ADU
          </a>
          .
        </p>
        <p>
          <Link to="/now">/now</Link> is the living document - what I&apos;m
          thinking about, building, and playing this week.{" "}
          <Link to="/resume">/resume</Link> is the career summary, updated
          when someone asks.
        </p>
      </div>
    </div>
  )
}

export default Hero
