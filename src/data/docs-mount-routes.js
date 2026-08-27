// Every route the docs mount emits. A new mount adds one import and one entry
// below, for the reason in docs/project-docs-render.md.
import config from "./docs-mounts.json" with { type: "json" }
import * as umbra from "./docs-manifest-umbra.js"

const manifests = { umbra }

export const DOCS_ROUTES = config.mounts.flatMap(({ project }) => [
  `/projects/${project}/docs/`,
  ...manifests[project].shelves.flatMap((shelf) =>
    shelf.pages.map((page) => `/projects/${project}/docs/${page.slug}/`)
  ),
])
