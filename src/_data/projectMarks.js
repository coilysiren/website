import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Slugs that have a mark drawn, read off disk rather than listed, so a project
 * whose art has not landed yet falls back to the site favicon and picks up its
 * own the moment the file appears. Nothing in the render layer names a project.
 *
 * @type {string[]}
 */
export default fs
  .readdirSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "../images/marks")
  )
  .filter((name) => name.endsWith(".png"))
  .map((name) => path.basename(name, ".png"))
