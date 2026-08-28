import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { showcaseProducts } from "./projects.js"

const bannersDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../images/banners"
)

// The social card a project's pages share, or undefined when it has none.
// Why image and alt travel together: docs/project-page-assets.md.

/** @type {(slug: string) => {image: string, alt: string} | undefined} */
export const projectCard = (slug) => {
  const file = `${slug}-card.jpg`
  const alt = showcaseProducts.find((product) => product.slug === slug)?.alt
  return alt && fs.existsSync(path.join(bannersDir, file))
    ? { image: `/images/banners/${file}`, alt }
    : undefined
}
