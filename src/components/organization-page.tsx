import React from "react"
import { Link } from "gatsby"
import Layout from "./layout"
import Closer from "./closer"
import {
  organizations,
  repositoryTags,
  type OrganizationProfile,
  type OrganizationRepository,
} from "../data/organizations"
import "../sass/orgs.scss"

const RepositoryLink = ({
  organization,
  name,
}: {
  organization: OrganizationProfile
  name: string
}) => {
  const repository = organization.repositories.find(
    (entry) => entry.name === name
  )
  return repository?.url ? (
    <a href={repository.url} target="_blank" rel="noreferrer">
      <code>{name}</code>
    </a>
  ) : (
    <code>{name}</code>
  )
}

const RepositoryCard = ({
  repository,
}: {
  repository: OrganizationRepository
}) => (
  <li className="org-repository">
    <div className="org-repository__title">
      {repository.url ? (
        <a href={repository.url} target="_blank" rel="noreferrer">
          <code>{repository.name}</code>
        </a>
      ) : (
        <code>{repository.name}</code>
      )}
      {repository.private ? (
        <span className="org-badge">
          <i className="fa-solid fa-lock" aria-hidden="true" /> private repo
        </span>
      ) : null}
      {repository.archived ? <span className="org-badge">archived</span> : null}
    </div>
    {repository.description ? <p>{repository.description}</p> : null}
  </li>
)

const OrganizationPage = ({
  organization,
}: {
  organization: OrganizationProfile
}) => {
  const peers = organizations.filter(
    (candidate) => candidate.slug !== organization.slug
  )

  return (
    <Layout>
      <section
        className={`post-body org-detail org-detail--${organization.slug}`}
      >
        <div className="post-header org-page-header">
          <span className="org-command">$ open /orgs/{organization.slug}</span>
          <h2>{organization.name}</h2>
          <p>{organization.purpose}</p>
        </div>

        <main className="post-content org-page">
          <header className="org-detail-hero">
            <img src={organization.icon} alt="" width="184" height="184" />
            <div>
              <span className="org-eyebrow">{organization.eyebrow}</span>
              <h1>{organization.name}</h1>
              {organization.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="org-actions">
                <a
                  className="org-action org-action--primary"
                  href={organization.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub organization{" "}
                  <i
                    className="fa-solid fa-arrow-up-right-from-square"
                    aria-hidden="true"
                  />
                </a>
                {organization.forgejoUrl ? (
                  <a
                    className="org-action org-action--primary"
                    href={organization.forgejoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    canonical Forgejo{" "}
                    <i
                      className="fa-solid fa-arrow-up-right-from-square"
                      aria-hidden="true"
                    />
                  </a>
                ) : null}
              </div>
            </div>
          </header>

          {organization.headlineProjects ? (
            <section
              className="org-section"
              aria-labelledby="headline-projects"
            >
              <div className="org-section__heading">
                <span className="org-eyebrow">SELECTED WORK</span>
                <h2 id="headline-projects">Headline projects</h2>
              </div>
              <div className="org-headline-grid">
                {organization.headlineProjects.map((project) => (
                  <article className="org-headline-card" key={project.name}>
                    <h3>
                      <a href={project.url} target="_blank" rel="noreferrer">
                        {project.label
                          ? `${project.label} (${project.name})`
                          : project.name}
                      </a>
                    </h3>
                    <p>{project.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="org-section" aria-labelledby="repositories">
            <div className="org-section__heading">
              <span className="org-eyebrow">CATALOG</span>
              <h2 id="repositories">Repositories</h2>
            </div>
            <ul className="org-repository-list">
              {organization.repositories.map((repository) => (
                <RepositoryCard repository={repository} key={repository.name} />
              ))}
            </ul>
          </section>

          <section className="org-section" aria-labelledby="tags-to-repos">
            <div className="org-section__heading">
              <span className="org-eyebrow">INDEX A</span>
              <h2 id="tags-to-repos">Tags → repos</h2>
            </div>
            <ul className="org-map-list">
              {organization.tags.map((tag) => (
                <li key={tag.name}>
                  <a
                    className="org-topic"
                    href={`https://github.com/topics/${tag.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {tag.name}
                  </a>
                  <span>
                    {tag.repositories.map((repository, index) => (
                      <React.Fragment key={repository}>
                        {index > 0 ? ", " : ""}
                        <RepositoryLink
                          organization={organization}
                          name={repository}
                        />
                      </React.Fragment>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="org-section" aria-labelledby="repos-to-tags">
            <div className="org-section__heading">
              <span className="org-eyebrow">INDEX B</span>
              <h2 id="repos-to-tags">Repos → tags</h2>
            </div>
            <ul className="org-map-list org-map-list--repos">
              {organization.repositories.map((repository) => (
                <li key={repository.name}>
                  <RepositoryLink
                    organization={organization}
                    name={repository.name}
                  />
                  <span>
                    {repositoryTags(organization, repository.name).map(
                      (tag, index) => (
                        <React.Fragment key={tag}>
                          {index > 0 ? ", " : ""}
                          <a
                            className="org-topic"
                            href={`https://github.com/topics/${tag}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {tag}
                          </a>
                        </React.Fragment>
                      )
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {organization.finalSection ? (
            <section
              className="org-section"
              aria-labelledby="org-final-section"
            >
              <div className="org-section__heading">
                <h2 id="org-final-section">
                  {organization.finalSection.title}
                </h2>
              </div>
              <ul className="org-link-list">
                {organization.finalSection.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="org-all-link">
            <a href={organization.githubUrl} target="_blank" rel="noreferrer">
              view all repositories on GitHub{" "}
              <i
                className="fa-solid fa-arrow-up-right-from-square"
                aria-hidden="true"
              />
            </a>
          </div>

          <nav className="org-cross-nav" aria-label="Organization pages">
            <Link to="/orgs/">all organizations</Link>
            {peers.map((peer) => (
              <Link to={`/orgs/${peer.slug}/`} key={peer.slug}>
                {peer.name}
              </Link>
            ))}
          </nav>
        </main>
        <Closer />
      </section>
    </Layout>
  )
}

export default OrganizationPage
