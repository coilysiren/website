/**
 * housecast's docs, ordered. Shape and reasoning: docs-manifest-umbra.js.
 *
 * umbra's blurbs were lifted verbatim from its own `umbra/docs/index.md`.
 * housecast has no such file, so every line below was written for this shelf
 * against the page it labels. Five of the ten pages are stubs upstream,
 * carrying a settled structure and a "Still to write" list, and their blurbs
 * say what the page covers rather than promising what it does not yet hold.
 *
 * @type {import("./docs-mount-loader.js").DocsFront}
 */
export const front = {
  headline: "Write the roster. The bundle and the board both derive.",
  description:
    "The documentation for housecast, a YAML driven roster framework for agent context. Start with the roster language, then the engine that composes it, then the board that grades what it composed.",
  lede: [
    "housecast reads roles, personalities, and boundaries authored as YAML, resolves each role's personality meld and boundary allocation, derives the identity primitives, and emits an immutable bundle. The challenge board that grades the result derives from the same file, so a role cannot change without changing what gets tested.",
    "These pages are early. Several carry a settled structure and an explicit list of what has not been written yet, and they are mounted verbatim from the repository rather than rewritten for the web.",
  ],
  caseStudy: "the case for housecast",
}

/** @type {import("./docs-mount-loader.js").DocsShelf[]} */
export const shelves = [
  {
    title: "Getting started",
    pages: [
      {
        slug: "features",
        title: "Features",
        blurb: "Every capability that ships today, and what does not.",
      },
      {
        slug: "roster-language",
        title: "The roster language",
        blurb: "What YAML the engine reads, and what it refuses.",
      },
    ],
  },
  {
    title: "The engine",
    pages: [
      {
        slug: "composition",
        title: "Composition",
        blurb: "How a roster on disk becomes an immutable bundle.",
      },
      {
        slug: "role-boundaries",
        title: "Role boundaries",
        blurb: "Who owns a capability, who defers it, who holds a slice.",
      },
      {
        slug: "identity",
        title: "Identity primitives",
        blurb: "The card, the instruction document, and the favorite colour.",
      },
    ],
  },
  {
    title: "Evaluation",
    pages: [
      {
        slug: "evaluation",
        title: "Evaluation",
        blurb: "The board the roster derives, and the runner behind it.",
      },
      {
        slug: "grading",
        title: "Grading",
        blurb: "The human half, and why it ships in an extra.",
      },
      {
        slug: "grading-surfaces",
        title: "Grading surfaces",
        blurb: "One set of rules across a terminal and a browser.",
      },
      {
        slug: "grading-evidence",
        title: "Grading evidence",
        blurb: "The public and private halves of a single run.",
      },
      {
        slug: "grading-schema",
        title: "Grading schema ids",
        blurb: "Why some ids keep a name the package no longer has.",
      },
    ],
  },
]
