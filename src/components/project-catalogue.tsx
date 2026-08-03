import React from "react"
import { projectGroups, type ProjectIcon } from "../data/projects"

const ProjectIcons = ({
  icons,
  projectName,
}: {
  icons: ProjectIcon[]
  projectName: string
}) => (
  <span
    className={`project-card-icons${icons.length > 1 ? " project-card-icons--stacked" : ""}`}
  >
    {icons.map((icon, index) => (
      <span className="project-card-icon" key={`${projectName}-${index}`}>
        {icon.kind === "image" ? (
          <img src={icon.src} alt={icon.alt} width="32" height="32" />
        ) : (
          <i className={icon.className} aria-hidden="true" />
        )}
      </span>
    ))}
  </span>
)

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
            <li className="project-card" key={project.name}>
              <a href={project.url}>
                <span className="project-card-topline">
                  <span className="project-card-name">{project.name}</span>
                  {project.icons && (
                    <ProjectIcons
                      icons={project.icons}
                      projectName={project.name}
                    />
                  )}
                </span>
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
                <small>{project.linkLabel ?? "Source ↗"}</small>
              </a>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
)

export default ProjectCatalogue
