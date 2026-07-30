import React from "react"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import DefaultHead from "../../components/default-head"
import OrganizationCard from "../../components/organization-card"
import { organizations } from "../../data/organizations"
import "../../sass/orgs.scss"

export const Head = () => (
  <DefaultHead
    title="The Coily Co orgs"
    description="Public tools, the operator back office, and the games where the machinery gets playtested."
    image="/og/orgs/index.png"
    canonical="/orgs/"
  />
)

const OrganizationsPage = () => (
  <Layout>
    <section className="post-body">
      <div className="post-header org-page-header">
        <span className="org-command">$ ls /orgs</span>
        <h2>Organizations</h2>
        <p>Three rooms off the same hallway.</p>
      </div>

      <main className="post-content orgs-page">
        <header className="orgs-hero">
          <span className="org-eyebrow">THREE BAYS / ONE WORKSHOP</span>
          <h1>The Coily Co orgs</h1>
          <p>
            Public tools, the operator back office, and the games where the
            machinery gets playtested.
          </p>
        </header>

        <div className="org-card-grid">
          {organizations.map((organization) => (
            <OrganizationCard
              organization={organization}
              key={organization.slug}
            />
          ))}
        </div>
      </main>
      <Closer />
    </section>
  </Layout>
)

export default OrganizationsPage
