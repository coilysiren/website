/**
 * @typedef {object} DocsPage
 * @property {string} slug Matches the vendored file in src/projects/umbra-docs/.
 * @property {string} title
 * @property {string} blurb Kai's own one-liner, lifted verbatim from umbra's
 *   docs/index.md so the shelf never invents a second description.
 */

/**
 * @typedef {object} DocsShelf
 * @property {string} title
 * @property {DocsPage[]} pages
 */

/**
 * umbra's docs, ordered.
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
export const umbraDocs = [
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
        slug: "specgen",
        title: "The no-code driver",
        blurb: "Author policy and locks, never Go.",
      },
      {
        slug: "specgen-materialization",
        title: "Materialization",
        blurb: "How `run` and `build` cache a generated binary.",
      },
      {
        slug: "passthrough",
        title: "Passthrough",
        blurb: "Wrap a tool whole when naming every verb is impractical.",
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
        slug: "value-providers",
        title: "Value providers",
        blurb: "`env`, `file`, `literal`, and minted tokens.",
      },
      {
        slug: "broker",
        title: "Broker",
        blurb: "The root credential broker protocol.",
      },
      {
        slug: "ward-helpers",
        title: "ward helpers",
        blurb: "Reusable packages lifted out of ward.",
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

/** Flat reading order, which is what prev and next walk. */
export const umbraDocsFlat = umbraDocs.flatMap((shelf) =>
  shelf.pages.map((page) => ({ ...page, shelf: shelf.title }))
)
