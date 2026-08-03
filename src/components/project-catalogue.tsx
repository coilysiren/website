import React from "react"
import { projectGroups } from "../data/projects"

const ProjectCatalogue = ({ condensed = false }: { condensed?: boolean }) => (
  <div
    className={`project-catalogue${condensed ? " project-catalogue--condensed" : ""}`}
  >
    {projectGroups.map((group) => (
      <section className="project-group" key={group.title}>
        <header>
          <h3>{group.title}</h3>
          {!condensed && <p>{group.description}</p>}
        </header>
        <ul>
          {group.projects.map((project) => (
            <li key={project.name}>
              <a href={project.url}>
                <span>{project.name}</span>
                <p>{project.description}</p>
                {project.tags.length > 0 && (
                  <span
                    className="project-repo-tags"
                    aria-label={`${project.name} repository tags`}
                  >
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                )}
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
