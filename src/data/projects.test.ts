import { describe, expect, it } from "vitest"
import { projectGroups } from "./projects"

const portfolioProjects = projectGroups.flatMap((group) => group.projects)

describe("project portfolio", () => {
  it("uses canonical organization and repository names", () => {
    const repositoryNames = portfolioProjects
      .filter((project) => project.name !== "Many MCPs")
      .map((project) => project.name)

    expect(repositoryNames).toHaveLength(11)
    repositoryNames.forEach((name) => {
      expect(name).toMatch(
        /^coilyco-(?:flight-deck|bridge|gaming)\/[a-z0-9-]+$/
      )
    })
  })

  it("keeps private repositories and the MCP summary unlinked", () => {
    const unlinkedProjects = portfolioProjects
      .filter((project) => !project.url)
      .map((project) => project.name)

    expect(unlinkedProjects).toEqual([
      "coilyco-bridge/agentic-os-kai",
      "coilyco-bridge/deploy",
      "coilyco-gaming/sirens-echo",
      "Many MCPs",
    ])
  })
})
