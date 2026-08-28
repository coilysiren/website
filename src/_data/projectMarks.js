import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

// Slugs with a mark drawn, read off disk so an undrawn one falls back to the
// site favicon. Reasoning in docs/project-page-assets.md.

/** @type {string[]} */
export default fs
  .readdirSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "../images/marks")
  )
  .filter((name) => name.endsWith(".png"))
  .map((name) => path.basename(name, ".png"))
