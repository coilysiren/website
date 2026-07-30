import React from "react"
import { Link } from "gatsby"
import type { OrganizationProfile } from "../data/organizations"

const OrganizationCard = ({
  organization,
}: {
  organization: OrganizationProfile
}) => {
  return (
    <article className={`org-card org-card--${organization.slug}`}>
      <div className="org-card__mark">
        <img src={organization.icon} alt="" width="112" height="112" />
      </div>
      <span className="org-eyebrow">{organization.eyebrow}</span>
      <h3>{organization.name}</h3>
      <p>{organization.purpose}</p>
      <ul className="org-card__capabilities" aria-label="Representative work">
        {organization.highlights.map((capability) => (
          <li key={capability}>{capability}</li>
        ))}
      </ul>
      <div className="org-actions">
        <Link
          className="org-action org-action--primary"
          to={`/orgs/${organization.slug}/`}
        >
          explore <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
        <a
          className="org-action"
          href={organization.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          GitHub{" "}
          <i
            className="fa-solid fa-arrow-up-right-from-square"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  )
}

export default OrganizationCard
