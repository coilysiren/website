import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

// These assert what Eleventy emitted, not how it renders, so they read dist/
// rather than driving a browser. `pnpm run test:quick` builds first.
const CANONICAL_ROUTES = ["/", "/about/", "/hiring/", "/resume/"] as const
// The apex 301s here, so a canonical URL naming the apex would resolve
// through a redirect. One host, everywhere.
const HOST = "https://www.coilysiren.me"
const CANONICAL_URLS = CANONICAL_ROUTES.map((route) => `${HOST}${route}`)

const read = (path: string) => readFileSync(`dist/${path}`, "utf8")
const page = (route: string) =>
  read(route === "/" ? "index.html" : `${route.slice(1)}index.html`)
const schema = (route: string) =>
  page(route).match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  )?.[1]

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
      // ld+json is a data block the parser never executes, so it is exempt.
      // Anything else without async/defer blocks the parser and is not.
      const executable = page(route).replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
        ""
      )
      expect(executable).not.toMatch(/<script\b(?![^>]*\b(?:async|defer)\b)/i)
    })
  })

  it("points every canonical URL at the host that answers", () => {
    CANONICAL_ROUTES.forEach((route) => {
      const html = page(route)
      expect(html).toContain(`<link rel="canonical" href="${HOST}${route}">`)
      expect(html).toContain(
        `<meta property="og:url" content="${HOST}${route}">`
      )
    })
    // The bare apex never appears as a host. Subdomains of it are fine.
    ;["sitemap.xml", "robots.txt", "llms.txt", "index.html"].forEach((path) => {
      expect(read(path), `${path} names the redirecting apex`).not.toMatch(
        /\/\/coilysiren\.me/
      )
    })
  })

  it("describes the person once, where the person is described", () => {
    ;["/", "/about/"].forEach((route) => {
      const parsed = JSON.parse(schema(route)!)
      expect(parsed["@type"]).toBe("Person")
      expect(parsed.url).toBe(HOST)
      expect(parsed.name).toBe("Kai Siren")
      expect(parsed.jobTitle).toBeTruthy()
      expect(parsed.sameAs.length).toBeGreaterThan(0)
      // Entity resolution only works against URLs that resolve.
      parsed.sameAs.forEach((url: string) =>
        expect(url).toMatch(/^https:\/\/[^/]+\/.+/)
      )
    })
    ;["/hiring/", "/resume/"].forEach((route) =>
      expect(schema(route)).toBeUndefined()
    )
  })
})
