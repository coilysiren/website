import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

// These assert what Eleventy emitted, not how it renders, so they read dist/
// rather than driving a browser. `pnpm run test:quick` builds first.
const CANONICAL_ROUTES = ["/", "/about/", "/hiring/", "/resume/"] as const
const CANONICAL_URLS = CANONICAL_ROUTES.map(
  (route) => `https://coilysiren.me${route}`
)

const read = (path: string) => readFileSync(`dist/${path}`, "utf8")
const page = (route: string) =>
  read(route === "/" ? "index.html" : `${route.slice(1)}index.html`)

describe("build output", () => {
  it("limits discovery to the canonical routes", () => {
    const sitemap = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)]
    expect(sitemap.map((match) => match[1])).toEqual(CANONICAL_URLS)

    const llms = read("llms.txt")
    CANONICAL_URLS.forEach((url) => expect(llms).toContain(url))
    expect(llms).not.toContain("/writing/")
    expect(llms).not.toContain("/posts/")
  })

  it("keeps long-form and retired routes out of the index", () => {
    CANONICAL_ROUTES.forEach((route) => {
      expect(page(route)).toContain('content="follow, index"')
    })
    // Reachable by direct link, never by crawler.
    ;[
      "/writing/",
      "/cool-people/",
      "/posts/stochastic-design-iteration/",
    ].forEach((route) => {
      expect(page(route)).toContain('content="noindex, nofollow"')
    })
    // Exact emitted paths - a directory-shaped guess here would pass on a
    // route that was never directory-shaped to begin with.
    ;[
      "apps/index.html",
      "apps/bsky-popularity-contest/index.html",
      "apps/bsky-follow-suggestions/index.html",
      "pulse/index.html",
      "og/index.html",
      "rss.xml",
    ].forEach((path) => {
      expect(() => read(path)).toThrow()
    })
  })

  it("ships no render-blocking script", () => {
    CANONICAL_ROUTES.forEach((route) => {
      expect(page(route)).not.toMatch(/<script\b(?![^>]*\b(?:async|defer)\b)/i)
    })
  })
})
