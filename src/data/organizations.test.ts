import { describe, expect, it } from "vitest"
import {
  organizationBySlug,
  organizations,
  repositoryTags,
} from "./organizations"

describe("organization profile catalog", () => {
  it("matches the three source profile inventory sizes", () => {
    const flightDeck = organizationBySlug["coilyco-flight-deck"]!
    const bridge = organizationBySlug["coilyco-bridge"]!
    const gaming = organizationBySlug["coilyco-gaming"]!

    expect(flightDeck.repositories).toHaveLength(14)
    expect(flightDeck.tags).toHaveLength(23)
    expect(flightDeck.headlineProjects).toHaveLength(4)
    expect(bridge.repositories).toHaveLength(6)
    expect(bridge.tags).toHaveLength(16)
    expect(gaming.repositories).toHaveLength(9)
    expect(gaming.tags).toHaveLength(22)
  })

  it("keeps both sides of every tag mapping reciprocal", () => {
    for (const organization of organizations) {
      const repositoryNames = new Set(
        organization.repositories.map((repository) => repository.name)
      )

      for (const tag of organization.tags) {
        for (const repository of tag.repositories) {
          expect(repositoryNames.has(repository)).toBe(true)
          expect(repositoryTags(organization, repository)).toContain(tag.name)
        }
      }

      for (const repository of organization.repositories) {
        expect(
          repositoryTags(organization, repository.name).length
        ).toBeGreaterThan(0)
      }
    }
  })
})
