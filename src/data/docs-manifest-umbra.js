/**
 * @typedef {object} DocsPage
 * @property {string} slug Matches the vendored file under this project's dir.
 * @property {string} title
 * @property {string} blurb Kai's own one-liner, lifted verbatim from umbra's
 *   umbra/docs/index.md so the shelf never invents a second description.
 *   Three are written rather than lifted - mcpverb-cost, mcpverb-serving, and
 *   specverb-descriptors ship in umbra's docs/ but its index.md does not list
 *   them, so there is no upstream line to take (coilysiren/website#156,
 *   filed upstream as umbra#358).
 */

/**
 * @typedef {object} DocsShelf
 * @property {string} title
 * @property {DocsPage[]} pages
 */

/**
 * umbra's docs, ordered.
 *
 * One of these per mounted project, named docs-manifest-<project>.js so the
 * loader finds it from `docs-mounts.json` without a registry to update.
 *
 * This is the manifest, and it is the whole reason the section has structure.
 * The `documentation-layout` hook permits `docs/*.md` with no subdirectories,
 * so a repo cannot express sections as folders and alphabetical order is the
 * only order a reader gets. mdBook solves the same problem with `SUMMARY.md`,
 * and this is that file: the section tree, the reading order, and prev/next
 * all derive from it, so adding a page is a one-line reviewable diff.
 *
 * Shelves are reader-task rather than architecture, decided on
 * coilysiren/inbox#438. Learn what it is, do a thing, look a thing up,
 * understand why, then change it.
 *
 * @type {DocsShelf[]}
 */
/**
 * The front door's own copy. Written rather than derived, which is why it sits
 * in the manifest with the shelves instead of in a template: the front door is
 * one paginated template shared by every mount.
 *
 * `lede` is prose. `description` is the meta tag, and it stays a plain string
 * because search results are not the place for a two-paragraph argument.
 */
export const front = {
  headline: "Name every command, then prove it.",
  description:
    "The documentation for umbra, a config driven occlusion framework. Install it and watch a refusal, then the guides, the reference, and the concepts underneath.",
  lede: [
    "umbra sits between semi-trusted automation and the host system. What you did not declare does not get through. Policy lives in a KDL guardfile rather than in code, enforced across two surfaces: subprocess execution and outbound HTTP.",
  ],
  // Linked from the front door back to the case study, because the docs mount
  // beside that argument rather than replacing it.
  caseStudy: "the case for umbra",
}

export const shelves = [
  {
    title: "Getting started",
    pages: [
      {
        slug: "getting-started",
        title: "Getting started",
        blurb: "Install it, then watch a refusal.",
      },
      {
        slug: "features",
        title: "Features",
        blurb: "The inventory of what ships today.",
      },
    ],
  },
  {
    title: "Guides",
    pages: [
      {
        slug: "umbra-cli",
        title: "The no-code driver",
        blurb: "Author policy and locks, never Go.",
      },
      {
        slug: "umbra-materialization",
        title: "Materialization",
        blurb: "How `run` and `build` cache a generated binary.",
      },
      {
        slug: "specverb-fetch",
        title: "Fetch overlays",
        blurb: "Mount fixed HTTP leaves straight from the guardfile.",
      },
    ],
  },
  {
    title: "Reference",
    pages: [
      {
        slug: "specverb-policy",
        title: "Policy",
        blurb: "Auth, deny, restrict, tiering.",
      },
      {
        slug: "specverb-resolution",
        title: "Op resolution",
        blurb: "Verbs, wildcards, unrecognised shapes.",
      },
      {
        slug: "specverb-request",
        title: "Request semantics",
        blurb: "How a mounted leaf assembles and fires.",
      },
      {
        slug: "specverb-actions",
        title: "Complex actions",
        blurb: "Composite verbs and their five invariants.",
      },
      {
        slug: "specverb-describe",
        title: "Describe model",
        blurb: "Generated visibility for a generated surface.",
      },
      {
        slug: "specverb-descriptors",
        title: "Descriptors",
        blurb: "The spec-driven source without a CLI tree.",
      },
      {
        slug: "opcore-inline",
        title: "Inline operations",
        blurb: "Descriptors stated directly in KDL.",
      },
      {
        slug: "opcore-body",
        title: "Body projection",
        blurb: "`map`, `set`, and pinned values.",
      },
      {
        slug: "mcpapps",
        title: "MCP Apps host",
        blurb: "The frames a rendered widget sends back, under the guardfile.",
      },
      {
        slug: "mcpverb-serving",
        title: "Serving the granted surface",
        blurb: "The same grants projected into what a server advertises.",
      },
      {
        slug: "value-providers",
        title: "Value providers",
        blurb: "`env`, `file`, `literal`, and minted tokens.",
      },
    ],
  },
  {
    title: "Concepts",
    pages: [
      {
        slug: "architecture",
        title: "Architecture",
        blurb: "The two guarded surfaces and the shared core.",
      },
      {
        slug: "specverb",
        title: "Spec-driven verbs",
        blurb: "The three-layer engine behind the HTTP surface.",
      },
      {
        slug: "execverb",
        title: "Exec-dialect verbs",
        blurb: "The same grammar aimed at wrapped binaries.",
      },
      {
        slug: "mcpverb",
        title: "MCP-dialect verbs",
        blurb: "The same grammar aimed at upstream MCP servers.",
      },
      {
        slug: "mcpverb-cost",
        title: "What an MCP call costs",
        blurb: "Measured per-call latency, and the daemon it did not warrant.",
      },
    ],
  },
  {
    title: "Contributing",
    pages: [
      {
        slug: "contributing",
        title: "Contributing",
        blurb: "How to propose a change.",
      },
      {
        slug: "release-pipeline",
        title: "Release pipeline",
        blurb: "Forgejo-canonical publication and the mark.",
      },
    ],
  },
]
