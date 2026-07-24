import type { OgData } from "../data/apps"

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, codePoint) =>
      String.fromCharCode(Number(codePoint))
    )
}

export function parseOg(html: string, baseUrl: string): OgData {
  const head = html.split(/<\/head>/i)[0] ?? html
  const og: OgData = {}
  const metaTags = /<meta\b[^>]*>/gi

  for (const tag of head.match(metaTags) ?? []) {
    const propertyMatch = tag.match(
      /\b(?:property|name)\s*=\s*["']([^"']+)["']/i
    )
    const contentMatch = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)
    if (!propertyMatch?.[1] || contentMatch?.[1] === undefined) continue

    const property = propertyMatch[1].toLowerCase()
    const content = decodeHtmlEntities(contentMatch[1]).trim()
    if (!content) continue

    if (property === "og:title" && !og.title) og.title = content
    else if (property === "og:description" && !og.description)
      og.description = content
    else if (property === "og:image" && !og.image) og.image = content
    else if (property === "og:site_name" && !og.siteName) og.siteName = content
    else if (property === "twitter:title" && !og.title) og.title = content
    else if (property === "twitter:description" && !og.description)
      og.description = content
    else if (property === "twitter:image" && !og.image) og.image = content
  }

  if (!og.title) {
    const title = head.match(/<title[^>]*>([^<]*)<\/title>/i)
    if (title?.[1]) {
      og.title = decodeHtmlEntities(title[1]).trim() || undefined
    }
  }

  if (!og.description) {
    const description = head.match(
      /<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*\bcontent\s*=\s*["']([^"']*)["']/i
    )
    if (description?.[1] !== undefined) {
      og.description = decodeHtmlEntities(description[1]).trim() || undefined
    }
  }

  if (og.image) {
    try {
      og.image = new URL(og.image, baseUrl).toString()
    } catch {
      // Keep malformed image URLs unchanged so callers can still inspect them.
    }
  }

  return og
}
