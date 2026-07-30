import React from "react"
import DefaultHead from "../../components/default-head"
import OrganizationPage from "../../components/organization-page"
import { organizationBySlug } from "../../data/organizations"

const organization = organizationBySlug["coilyco-flight-deck"]!

export const Head = () => (
  <DefaultHead
    title="coilyco-flight-deck"
    description={organization.purpose}
    image="/og/orgs/coilyco-flight-deck.png"
    canonical="/orgs/coilyco-flight-deck/"
  />
)

const FlightDeckPage = () => <OrganizationPage organization={organization} />

export default FlightDeckPage
