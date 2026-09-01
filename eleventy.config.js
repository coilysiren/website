import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"
import * as sass from "sass"
import { docsMountList, docsMounts } from "./src/data/docs-mount-loader.js"
import { imageSize } from "./src/data/image-size.js"
import { projectCard } from "./src/data/project-cards.js"

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

// Attribute values here are authored, not user input. Escaped anyway, because a
// shortcode is the wrong place to learn that an em-dash was a quote character.
const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")

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
  const DOCS_URL = /^\/projects\/([^/]+)\/docs\//
  // Resolves against the source repo's docs dir the way the file meant it.
  const inRepo = (mount, target) =>
    new URL(target, `file:///${mount.docsDir}/`).pathname.replace(/^\//, "")
  eleventyConfig.addTransform("mountedDocLinks", function (content) {
    const project = this.page.url?.match(DOCS_URL)?.[1]
    const mount = project && docsMounts[project]
    if (!mount) return content
    const source = `${mount.repo}/src/branch/${mount.branch}/`
    return content.replace(
      /href="(?!https?:)([^"#?]+)\.md(#[^"]*)?"/g,
      (whole, target, anchor = "") => {
        const slug = target.split("/").pop().toLowerCase()
        return mount.slugs.has(slug)
          ? `href="${mount.root}${slug}/${anchor}"`
          : `href="${source}${inRepo(mount, target)}.md" rel="noreferrer"`
      }
    )
  })

  // One front door per mount. Virtual rather than paginated, for the reason
  // in docs/project-docs-render.md.
  for (const mount of docsMountList) {
    eleventyConfig.addTemplate(
      `projects/${mount.project}-docs-index.njk`,
      '{% include "components/docs-front.njk" %}',
      {
        layout: "layouts/base.njk",
        permalink: `projects/${mount.project}/docs/index.html`,
        canonical: mount.root,
        title: `${mount.project} docs | Kai Ase Siren`,
        description: mount.front.description,
        robots: "follow, index",
        project: mount.project,
        projectPage: mount.page,
        ogImage: projectCard(mount.project)?.image,
        ogImageAlt: projectCard(mount.project)?.alt,
        mount,
      }
    )
  }

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
  // Blank lines around the content are load-bearing, and docs/project-page-system.md
  // carries why: they let markdown process a body inside block-level HTML.
  const attr = (name, value) => (value ? ` ${name}="${escapeAttr(value)}"` : "")

  eleventyConfig.addPairedShortcode("section", (content, options = {}) => {
    const { id, band, accent, label, heading, extraClass } = options
    const head =
      label || heading
        ? `<div class="project__head">` +
          (label ? `<p class="label">${label}</p>` : "") +
          (heading
            ? `<h2>${heading}<a class="project__anchor" href="#${id}"` +
              ` aria-label="Link to this section">#</a></h2>`
            : "") +
          `</div>`
        : ""
    return (
      `<section id="${id}"${attr("class", extraClass)}` +
      `${attr("data-band", band)}${attr("data-accent", accent)}>` +
      `${head}\n\n${content}\n\n</section>`
    )
  })

  eleventyConfig.addPairedShortcode(
    "note",
    (content, label = "Note") =>
      `<div class="project__note"><p class="project__note-label">${label}</p>` +
      `\n\n${content}\n\n</div>`
  )

  // Intrinsic dimensions for a site-absolute image URL. Reserving the box is
  // what makes `loading="lazy"` defer at all: coilysiren/website#129.
  const IMAGE_ROOTS = { "/images/": "src/images/", "/": "static/" }
  eleventyConfig.addFilter("imageSize", (url) => {
    const prefix = Object.keys(IMAGE_ROOTS).find((key) => url.startsWith(key))
    const file = IMAGE_ROOTS[prefix] + url.slice(prefix.length)
    return imageSize(path.join(repositoryRoot, file))
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
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk"],
  }
}
