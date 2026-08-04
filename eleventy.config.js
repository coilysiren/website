import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"
import * as sass from "sass"

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
