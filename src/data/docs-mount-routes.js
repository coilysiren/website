// Every route the docs mount emits. A new mount adds one import and one entry
// below, for the reason in docs/project-docs-render.md.
import config from "./docs-mounts.json" with { type: "json" }
import * as agentCompose from "./docs-manifest-agent-compose.js"
import * as housecast from "./docs-manifest-housecast.js"
import * as mcpBeaver from "./docs-manifest-mcp-beaver.js"
import * as umbra from "./docs-manifest-umbra.js"

const manifests = {
  "agent-compose": agentCompose,
  housecast,
  "mcp-beaver": mcpBeaver,
  umbra,
}

export const DOCS_ROUTES = config.mounts.flatMap(({ project }) => [
  `/projects/${project}/docs/`,
  ...manifests[project].shelves.flatMap((shelf) =>
    shelf.pages.map((page) => `/projects/${project}/docs/${page.slug}/`)
  ),
])
