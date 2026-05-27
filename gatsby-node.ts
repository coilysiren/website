import fs from "fs"
import path from "path"
import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import yaml from "js-yaml"
import { groups as appsGroups, type OgData, type OgMap } from "./src/data/apps"

function loadPulseData(): unknown {
  const p = path.join(__dirname, "scripts", "pulse-data.yaml")
  if (!fs.existsSync(p)) return null
  return yaml.load(fs.readFileSync(p, "utf8"))
}

const APPS_OG_CACHE = path.join(__dirname, "scripts", "apps-og-cache.json")
const APPS_OG_TTL_MS = 24 * 60 * 60 * 1000 // 24h

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
}

function parseOg(html: string, baseUrl: string): OgData {
  const head = html.split(/<\/head>/i)[0] ?? html
  const og: OgData = {}
  const metaRe = /<meta\b[^>]*>/gi
  for (const tag of head.match(metaRe) ?? []) {
    const propMatch = tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i)
    const contentMatch = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)
    if (!propMatch?.[1] || contentMatch?.[1] === undefined) continue
    const prop = propMatch[1].toLowerCase()
    const content = decodeHtmlEntities(contentMatch[1]).trim()
    if (!content) continue
    if (prop === "og:title" && !og.title) og.title = content
    else if (prop === "og:description" && !og.description) og.description = content
    else if (prop === "og:image" && !og.image) og.image = content
    else if (prop === "og:site_name" && !og.siteName) og.siteName = content
    else if (prop === "twitter:title" && !og.title) og.title = content
    else if (prop === "twitter:description" && !og.description) og.description = content
    else if (prop === "twitter:image" && !og.image) og.image = content
  }
  if (!og.title) {
    const t = head.match(/<title[^>]*>([^<]*)<\/title>/i)
    if (t?.[1]) og.title = decodeHtmlEntities(t[1]).trim() || undefined
  }
  if (!og.description) {
    const d = head.match(/<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*\bcontent\s*=\s*["']([^"']*)["']/i)
    if (d?.[1] !== undefined) og.description = decodeHtmlEntities(d[1]).trim() || undefined
  }
  if (og.image) {
    try {
      og.image = new URL(og.image, baseUrl).toString()
    } catch {
      // leave as-is
    }
  }
  return og
}

async function fetchOg(url: string): Promise<OgData | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "coilysiren-site/1.0 (+https://coilysiren.me/apps/)",
        Accept: "text/html,application/xhtml+xml",
      },
    })
    clearTimeout(timer)
    if (!res.ok) return null
    const ct = res.headers.get("content-type") ?? ""
    if (!/html|xml/i.test(ct)) return null
    const html = await res.text()
    const og = parseOg(html, res.url || url)
    return Object.keys(og).length ? og : null
  } catch {
    return null
  }
}

async function loadAppsOg(): Promise<OgMap> {
  let cache: { fetchedAt: number; data: OgMap } | null = null
  if (fs.existsSync(APPS_OG_CACHE)) {
    try {
      cache = JSON.parse(fs.readFileSync(APPS_OG_CACHE, "utf8"))
    } catch {
      cache = null
    }
  }
  const fresh =
    cache && Date.now() - cache.fetchedAt < APPS_OG_TTL_MS ? cache.data : null
  if (fresh) return fresh

  const out: OgMap = {}
  await Promise.all(
    appsGroups.flatMap((g) =>
      g.apps.map(async (app) => {
        const target = app.ogUrl ?? app.url
        const og = await fetchOg(target)
        if (og) out[app.host] = og
      })
    )
  )
  try {
    fs.writeFileSync(
      APPS_OG_CACHE,
      JSON.stringify({ fetchedAt: Date.now(), data: out }, null, 2)
    )
  } catch {
    // best-effort cache
  }
  return out
}

const toRepoRelative = (absPath: string) =>
  path.relative(__dirname, absPath).split(path.sep).join("/")

export const createPages: GatsbyNode["createPages"] = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  createRedirect({ fromPath: "/about", toPath: "/now", isPermanent: true })
  createRedirect({ fromPath: "/posts/agent-launch-pillars", toPath: "/", isPermanent: false })
  createRedirect({ fromPath: "/posts/agent-launch-pillars/", toPath: "/", isPermanent: false })

  return graphql<{
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id: string
          fileAbsolutePath: string
          fields: { slug: string }
        }
      }>
    }
  }>(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      const errors = Array.isArray(result.errors) ? result.errors : [result.errors]
      errors.forEach((error) => console.error(error.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data!.allMarkdownRemark.edges

    posts.forEach((edge) => {
      const { id, fileAbsolutePath } = edge.node
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve("src/components/content-block.tsx"),
        context: { id, sourcePath: toRepoRelative(fileAbsolutePath) },
      })
    })
  })
}

export const onCreatePage: GatsbyNode["onCreatePage"] = async ({ page, actions }) => {
  if (page.context && (page.context as { sourcePath?: string }).sourcePath) return
  const { createPage, deletePage } = actions
  const sourcePath = toRepoRelative(page.component)
  const extraContext: Record<string, unknown> = { sourcePath }
  if (page.path === "/pulse/" || page.path === "/pulse") {
    extraContext.pulseData = loadPulseData()
  }
  if (page.path === "/apps/" || page.path === "/apps") {
    extraContext.appsOg = await loadAppsOg()
  }
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      ...extraContext,
    },
  })
}

// Gatsby's bundled eslint-loader conflicts with eslint 9; lint runs via pnpm test:quick.
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions, getConfig }) => {
  const config = getConfig()
  config.plugins = config.plugins.filter(
    (plugin: { constructor?: { name?: string } }) => plugin.constructor?.name !== "ESLintWebpackPlugin"
  )
  actions.replaceWebpackConfig(config)
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value,
    })
  }
}
