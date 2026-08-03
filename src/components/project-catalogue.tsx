import React from "react"
import {
  projectGroups,
  type ProjectIcon,
  type ProjectLink,
} from "../data/projects"

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

const ProjectCardContents = ({ project }: { project: ProjectLink }) => (
  <>
    <span className="project-card-topline">
      <span className="project-card-name">
        {project.name}
        {project.privateRepo && (
          <span className="project-card-lock" aria-label="Private repository">
            {" "}
            🔒
          </span>
        )}
      </span>
      {project.icons && (
        <ProjectIcons icons={project.icons} projectName={project.name} />
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
    {project.privateRepo ? (
      <small>Private repository</small>
    ) : (
      project.url && <small>Source ↗</small>
    )}
  </>
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
              {project.url ? (
                <a className="project-card-surface" href={project.url}>
                  <ProjectCardContents project={project} />
                </a>
              ) : (
                <div className="project-card-surface project-card-surface--private">
                  <ProjectCardContents project={project} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
)

export default ProjectCatalogue
