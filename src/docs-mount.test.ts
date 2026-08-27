import { readFileSync, readdirSync } from "node:fs"
import { describe, expect, it } from "vitest"
import umbraDocs from "./_data/umbraDocs.js"
import { umbraDocsFlat } from "./data/umbra-docs.js"

// The two ways the sync goes quiet: it stops running, or it brings back a
// page the manifest does not know. See docs/project-docs-sync.md.
const config = JSON.parse(
  readFileSync("src/data/docs-mounts.json", "utf8")
) as {
  mounts: { project: string; target: string; exclude: string[] }[]
}
const stamp = JSON.parse(
  readFileSync("src/data/docs-mount-source.json", "utf8")
) as Record<string, { commit: string; date: string; syncedAt: string }>

// The workflow runs daily. Two weeks absorbs a paused runner or a quiet week
// without letting a copy that nobody is refreshing pass for a current one.
const STALE_AFTER_DAYS = 14
const DAY_MS = 24 * 60 * 60 * 1000

describe("project docs mount", () => {
  it("stamps every declared mount", () => {
    for (const mount of config.mounts) {
      const entry = stamp[mount.project]
      expect(entry, `no stamp for ${mount.project}`).toBeTruthy()
      expect(entry?.commit).toMatch(/^[0-9a-f]{7,40}$/)
    }
  })

  it("was synced recently enough to trust", () => {
    for (const mount of config.mounts) {
      const syncedAt = Date.parse(`${stamp[mount.project]?.syncedAt}T00:00:00Z`)
      expect(
        Number.isNaN(syncedAt),
        `${mount.project} syncedAt is unparseable`
      ).toBe(false)
      const age = Math.floor((Date.now() - syncedAt) / DAY_MS)
      expect(
        age,
        `${mount.project} was last synced ${age} days ago. Run the "Sync project docs" workflow, or "just sync-project-docs" locally, and commit the result.`
      ).toBeLessThanOrEqual(STALE_AFTER_DAYS)
    }
  })

  it("keeps the manifest and the vendored files in agreement", () => {
    const umbra = config.mounts.find((mount) => mount.project === "umbra")
    expect(umbra).toBeTruthy()
    const onDisk = readdirSync(umbra!.target)
      .filter((name) => name.endsWith(".md"))
      .map((name) => name.replace(/\.md$/, ""))
      .sort()
    const inManifest = umbraDocsFlat.map((page) => page.slug).sort()
    // A page added upstream has no shelf, title, or reading position until
    // the manifest names it, which is the one-line diff this asks for.
    expect(
      onDisk,
      "src/data/umbra-docs.js does not match what the sync vendored"
    ).toEqual(inManifest)
  })

  it("hands the page the stamp the sync wrote", () => {
    expect(umbraDocs.source.repo).toContain("forgejo.coilysiren.me")
    expect(umbraDocs.source.commit).toBe(stamp.umbra?.commit)
  })
})
