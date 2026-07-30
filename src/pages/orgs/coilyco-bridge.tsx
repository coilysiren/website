import React from "react"
import DefaultHead from "../../components/default-head"
import OrganizationPage from "../../components/organization-page"
import { organizationBySlug } from "../../data/organizations"

const organization = organizationBySlug["coilyco-bridge"]!

export const Head = () => (
  <DefaultHead
    title="coilyco-bridge"
    description={organization.purpose}
    image="/og/orgs/coilyco-bridge.png"
    canonical="/orgs/coilyco-bridge/"
  />
)

const BridgePage = () => <OrganizationPage organization={organization} />

export default BridgePage
