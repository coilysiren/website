import React from "react"
import { projectGroups } from "../data/projects"

const ProjectCatalogue = () => (
  <div className="project-catalogue">
    {projectGroups.map((group) => (
      <section className="project-group" key={group.title}>
        <header>
          <h3>{group.title}</h3>
          <p>{group.description}</p>
        </header>
        <ul>
          {group.projects.map((project) => (
            <li key={project.name}>
              <a href={project.url}>
                <span>{project.name}</span>
                <p>{project.description}</p>
                <small>Source ↗</small>
              </a>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
)

export default ProjectCatalogue
