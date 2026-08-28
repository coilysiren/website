/**
 * agent-compose's docs, ordered. Shape and reasoning: docs-manifest-umbra.js.
 *
 * umbra's blurbs were lifted verbatim from its own `umbra/docs/index.md`.
 * agent-compose has no such file, so every line below was written for this
 * shelf against the page it labels, which is the one thing here that is not
 * mechanical. The five planning artifacts named in `docs-mounts.json` never
 * mount, so they have no entry. coilysiren/website#137.
 *
 * @type {import("./docs-mount-loader.js").DocsFront}
 */
export const front = {
  headline: "Compose the context, then diff it.",
  description:
    "The documentation for agent-compose, an eval driven composer for agent roles and personas. Start with what ships and the vocabulary, then launching a role, the bundle reference, and the boundary model underneath.",
  lede: [
    "Agent-compose sits between the people who author reusable knowledge and the harnesses that consume it. A KDL request names a role, a delivery mode, and its sources, and what comes back is one immutable tree of plain files.",
    "That tree carries no credential, no mount, and no command. A role changes what an agent knows and never what it may do, which is why the whole thing is readable before a session starts.",
  ],
  caseStudy: "the case for agent-compose",
}

/** @type {import("./docs-mount-loader.js").DocsShelf[]} */
export const shelves = [
  {
    title: "Getting started",
    pages: [
      {
        slug: "features",
        title: "Features",
        blurb: "The engine, the roster, and the harnesses it reaches.",
      },
      {
        slug: "architecture",
        title: "Architecture and terminology",
        blurb: "Providers, consumers, and the nine words in between.",
      },
    ],
  },
  {
    title: "Guides",
    pages: [
      {
        slug: "native-role-launch",
        title: "Native role launch",
        blurb: "One command, one caller-assigned role.",
      },
      {
        slug: "launch",
        title: "Launch-time refresh",
        blurb: "Freshen the context, then exec the real command.",
      },
      {
        slug: "cascade",
        title: "Cascade",
        blurb: "Doctrine sources into each harness's global context.",
      },
      {
        slug: "staged-home",
        title: "The staged home",
        blurb: "Turn a bundle into a home tree a launcher can boot.",
      },
      {
        slug: "overlay",
        title: "Identity overlay",
        blurb: "One seat's identity, as a card or as JSON.",
      },
      {
        slug: "statusline",
        title: "Status line",
        blurb: "The composition facts worth keeping visible.",
      },
      {
        slug: "whoami",
        title: "whoami and short ids",
        blurb: "What a session calls itself, and how it knows.",
      },
      {
        slug: "person-packages",
        title: "Person packages",
        blurb: "Replace the shipped roster entirely, never partly.",
      },
      {
        slug: "evaluation",
        title: "Evaluation",
        blurb: "The board derives from the roster. A human grades it.",
      },
    ],
  },
  {
    title: "Reference",
    pages: [
      {
        slug: "kdl-contracts",
        title: "KDL contracts",
        blurb: "Requests and policy, rejected on anything unknown.",
      },
      {
        slug: "bundle-protocol",
        title: "The bundle protocol",
        blurb: "One immutable tree, entered through `manifest.json`.",
      },
      {
        slug: "manifest-schema",
        title: "Bundle manifest",
        blurb: "What was composed, and where its entry points are.",
      },
      {
        slug: "decision-trace",
        title: "Decision trace",
        blurb: "Every pick and its reason, recorded as it happens.",
      },
      {
        slug: "projection",
        title: "Load-point projection",
        blurb: "Where each harness reads, and what gets placed there.",
      },
      {
        slug: "person-contract",
        title: "The person contract",
        blurb: "The shape an external package has to match.",
      },
      {
        slug: "identity",
        title: "Identity primitives",
        blurb: "Emblem, motif, geometry, sound, and the seat's name.",
      },
      {
        slug: "personality",
        title: "Personalities",
        blurb: "Profiles, libraries, and the signature-and-bond pairing.",
      },
      {
        slug: "skill-catalogues",
        title: "Skill catalogues",
        blurb: "Read the effective profile. Inspection changes nothing.",
      },
      {
        slug: "skill-selectors",
        title: "Skill selectors",
        blurb: "Which ordinary skills a role gets, and where they land.",
      },
      {
        slug: "claude-launch-identity",
        title: "Claude launch identity",
        blurb: "Two flags, so nothing has to land in `~/.claude`.",
      },
      {
        slug: "claude-native-ui-surfaces",
        title: "Claude Code UI surfaces",
        blurb: "Themes, status lines, and verbs, read off the binary.",
      },
      {
        slug: "harness-vendoring",
        title: "Harness vendoring and model tiers",
        blurb: "Three facts the harness never published, pinned in testdata.",
      },
      {
        slug: "compose-marks",
        title: "The mark and banner",
        blurb: "A spool of thread, and every raster it ships as.",
      },
    ],
  },
  {
    title: "Concepts",
    pages: [
      {
        slug: "integration",
        title: "Integration and delivery",
        blurb: "The cascade owns a host. Projection owns a container.",
      },
      {
        slug: "ownership",
        title: "Boundary and content ownership",
        blurb: "The owner is a relationship, never an authority.",
      },
      {
        slug: "role-boundaries",
        title: "Role boundaries",
        blurb: "One behavior, taken out of many charters and given to one.",
      },
      {
        slug: "boundary-omission",
        title: "Boundary omission",
        blurb: "What a defer means when nobody is there to receive it.",
      },
      {
        slug: "role-briefings",
        title: "Role briefings and methods",
        blurb: "What a charter carries, and what stays lazy.",
      },
      {
        slug: "role-selection",
        title: "Role selection",
        blurb: "Task shape may suggest a role. It never overrides one.",
      },
      {
        slug: "role-adjacency",
        title: "Role adjacency",
        blurb: "The two roles a seat is most likely to absorb.",
      },
      {
        slug: "native-adaptation",
        title: "Native adaptation",
        blurb: "When a live session may switch, and when it may not.",
      },
      {
        slug: "eval-engineer",
        title: "The eval role and its budget",
        blurb: "The evidence loop, and the context a role fits inside.",
      },
    ],
  },
  {
    title: "Contributing",
    pages: [
      {
        slug: "release",
        title: "Release",
        blurb: "Forgejo-canonical, and published only when inputs move.",
      },
    ],
  },
]
