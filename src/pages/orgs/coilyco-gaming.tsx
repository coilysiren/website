import React from "react"
import DefaultHead from "../../components/default-head"
import OrganizationPage from "../../components/organization-page"
import { organizationBySlug } from "../../data/organizations"

const organization = organizationBySlug["coilyco-gaming"]!

export const Head = () => (
  <DefaultHead
    title="coilyco-gaming"
    description={organization.purpose}
    image="/og/orgs/coilyco-gaming.png"
    canonical="/orgs/coilyco-gaming/"
  />
)

const GamingPage = () => <OrganizationPage organization={organization} />

export default GamingPage
