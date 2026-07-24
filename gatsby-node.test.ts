import { describe, expect, it } from "vitest"
import { parseOg } from "./src/lib/parse-og"

describe("parseOg", () => {
  it("extracts Open Graph metadata and resolves relative images", () => {
    const metadata = parseOg(
      `
        <head>
          <meta property="og:title" content="Factory &amp; field notes">
          <meta property="og:description" content="A practical build log">
          <meta property="og:image" content="/images/preview.png">
          <meta property="og:site_name" content="coilysiren.me">
        </head>
      `,
      "https://coilysiren.me/posts/example/"
    )

    expect(metadata).toEqual({
      title: "Factory & field notes",
      description: "A practical build log",
      image: "https://coilysiren.me/images/preview.png",
      siteName: "coilysiren.me",
    })
  })

  it("falls back to standard title and description metadata", () => {
    const metadata = parseOg(
      `
        <head>
          <title>Kai&#39;s notes</title>
          <meta name="description" content="Platform systems and side projects">
        </head>
      `,
      "https://coilysiren.me/"
    )

    expect(metadata).toEqual({
      title: "Kai's notes",
      description: "Platform systems and side projects",
    })
  })
})
