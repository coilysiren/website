import { Link } from "gatsby"
import React from "react"
import { featuredProjects } from "../data/projects"

const PlatformDiagram = ({ compact = false }: { compact?: boolean }) => (
  <ol
    className={`platform-diagram${compact ? " platform-diagram--compact" : ""}`}
    aria-label="The agent platform from context composition through guarded delivery"
  >
    {featuredProjects.map((project) => (
      <li
        key={project.slug}
        className={`platform-diagram__step platform-diagram__step--${project.tone}`}
      >
        <span className="platform-diagram__stage">{project.stage}</span>
        <Link to={project.caseStudyUrl}>{project.name}</Link>
        {!compact && <p>{project.summary}</p>}
      </li>
    ))}
  </ol>
)

export default PlatformDiagram
