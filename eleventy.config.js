import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"
import * as sass from "sass"
import { umbraDocsFlat } from "./src/data/umbra-docs.js"

const repositoryRoot = path.dirname(fileURLToPath(import.meta.url))
const outputDirectory = path.join(repositoryRoot, "dist")

const compileStyles = () => {
  const result = sass.compile(path.join(repositoryRoot, "src/sass/site.scss"), {
    loadPaths: [path.join(repositoryRoot, "src/sass")],
    style: "compressed",
  })
  const stylesDirectory = path.join(outputDirectory, "styles")
  fs.mkdirSync(stylesDirectory, { recursive: true })
  fs.writeFileSync(path.join(stylesDirectory, "site.css"), result.css)
}

const asDate = (value) => {
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export default function configureEleventy(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPassthroughCopy({ static: "." })
  eleventyConfig.addPassthroughCopy({ "src/images": "images" })
  eleventyConfig.addPassthroughCopy({
    "node_modules/prismjs/themes/prism-tomorrow.css":
      "styles/prism-tomorrow.css",
  })

  for (const font of [
    "roboto-latin-400-normal.woff",
    "roboto-latin-400-normal.woff2",
    "roboto-latin-700-italic.woff",
    "roboto-latin-700-italic.woff2",
    "roboto-latin-700-normal.woff",
    "roboto-latin-700-normal.woff2",
  ]) {
    eleventyConfig.addPassthroughCopy({
      [`node_modules/@fontsource/roboto/files/${font}`]: `fonts/${font}`,
    })
  }

  // A code block that scrolls needs to be focusable or a keyboard user cannot
  // scroll it. Applied to every <pre>, since which ones overflow is content.
  eleventyConfig.addTransform("focusableCodeBlocks", function (content) {
    return this.page.outputPath?.endsWith(".html")
      ? content.replace(/<pre(?![^>]*\btabindex=)/g, '<pre tabindex="0"')
      : content
  })

  // Vendored docs still carry repo-relative `.md` links, which resolve to
  // nothing here. Rules and reasoning in docs/project-docs-mount.md.
  const UMBRA_SOURCE =
    "https://forgejo.coilysiren.me/coilyco-flight-deck/umbra/src/branch/main/"
  // Resolves against docs/ the way the source file meant it.
  const inRepo = (target) =>
    new URL(target, "file:///docs/").pathname.replace(/^\//, "")
  const mounted = new Set(umbraDocsFlat.map((page) => page.slug))
  eleventyConfig.addTransform("mountedDocLinks", function (content) {
    if (!this.page.url?.startsWith("/projects/umbra/docs/")) return content
    return content.replace(
      /href="(?!https?:)([^"#?]+)\.md(#[^"]*)?"/g,
      (whole, target, anchor = "") => {
        const slug = target.split("/").pop().toLowerCase()
        return mounted.has(slug)
          ? `href="/projects/umbra/docs/${slug}/${anchor}"`
          : `href="${UMBRA_SOURCE}${inRepo(target)}.md" rel="noreferrer"`
      }
    )
  })

  eleventyConfig.addWatchTarget("src/sass/")
  eleventyConfig.on("eleventy.before", compileStyles)

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/pages/posts/*.md")
      .sort((left, right) => right.date - left.date)
  )

  eleventyConfig.addFilter("displayDate", (value) => {
    const date = asDate(value)
    return date
      ? new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "long",
          timeZone: "UTC",
          year: "numeric",
        }).format(date)
      : ""
  })
  eleventyConfig.addFilter("monthYear", (value) => {
    const date = asDate(value)
    return date
      ? new Intl.DateTimeFormat("en-US", {
          month: "long",
          timeZone: "UTC",
          year: "numeric",
        }).format(date)
      : ""
  })
  eleventyConfig.addFilter("isoDate", (value) => asDate(value)?.toISOString())
  eleventyConfig.addFilter("isoDay", (value) =>
    asDate(value)?.toISOString().slice(0, 10)
  )

  return {
    dir: {
      data: "_data",
      includes: "_includes",
      input: "src",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false,
    templateFormats: ["md", "njk"],
  }
}
