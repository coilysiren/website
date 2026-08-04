import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repositoryRoot = path.dirname(
  path.dirname(fileURLToPath(import.meta.url))
)

for (const directory of [".cache", "dist", "public", "static/og"]) {
  fs.rmSync(path.join(repositoryRoot, directory), {
    force: true,
    recursive: true,
  })
}
