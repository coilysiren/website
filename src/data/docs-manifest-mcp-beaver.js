/**
 * mcp-beaver's docs, ordered. Shape and reasoning: docs-manifest-umbra.js.
 *
 * umbra's blurbs were lifted verbatim from its own `umbra/docs/index.md`.
 * mcp-beaver has no such file, so every line below was written for this shelf
 * against the page it labels, which is the one thing here that is not
 * mechanical. coilysiren/website#137.
 *
 * @type {import("./docs-mount-loader.js").DocsFront}
 */
export const front = {
  headline: "Write the guardfile. Everything else derives.",
  description:
    "The documentation for mcp-beaver, a MCP server generator with a natural flow. Start with the idea, then the commands, the guardfile reference, and the chart that ships them.",
  lede: [
    "mcp-beaver renders a umbra guardfile into a guarded MCP server. Each grant becomes one MCP tool and one matching HTTP endpoint, with the input schema derived rather than written, so an operation nobody declared has neither. One runtime image serves every guardfile, and a generic Helm chart carries it to a cluster.",
  ],
  caseStudy: "the case for mcp-beaver",
}

/** @type {import("./docs-mount-loader.js").DocsShelf[]} */
export const shelves = [
  {
    title: "Getting started",
    pages: [
      {
        slug: "design",
        title: "The idea",
        blurb: "One guardfile in, a running MCP out.",
      },
      {
        slug: "features",
        title: "Features",
        blurb: "Every command and control that ships today.",
      },
    ],
  },
  {
    title: "Guides",
    pages: [
      {
        slug: "serve",
        title: "serve",
        blurb: "Every grant becomes one tool and one endpoint.",
      },
      {
        slug: "lint",
        title: "lint",
        blurb: "Validate a spec offline, then print its tool names.",
      },
      {
        slug: "upstream",
        title: "The passthrough proxy",
        blurb: "Wrap an existing MCP down to an exact allowlist.",
      },
      {
        slug: "upstream-pins",
        title: "Argument pins",
        blurb: "Fix a proxied argument when the scope rides in it.",
      },
      {
        slug: "ssm",
        title: "serve-ssm",
        blurb: "One parameter, bounded twice, in policy and in IAM.",
      },
      {
        slug: "s3",
        title: "serve-s3",
        blurb: "The one write-capable mode, fixed to a bucket.",
      },
      {
        slug: "image",
        title: "Image and packaging",
        blurb: "One distroless binary drives every guardfile.",
      },
      {
        slug: "ci",
        title: "CI",
        blurb: "Gate on every push, publish on a landed commit.",
      },
      {
        slug: "chart",
        title: "The Helm chart",
        blurb: "Adding an MCP becomes a values file and an upgrade.",
      },
      {
        slug: "chart-sidecars",
        title: "Sidecars and upgrades",
        blurb: "Co-locate an upstream, and why a selector blocks an upgrade.",
      },
    ],
  },
  {
    title: "Reference",
    pages: [
      {
        slug: "guardfile-siblings",
        title: "Context nodes",
        blurb: "Instructions, resources, prompts, server-info.",
      },
      {
        slug: "guardfile-controls",
        title: "Controls",
        blurb: "Pins, rate limits, cache, withheld verbs, confirmations.",
      },
      {
        slug: "extraction",
        title: "Extraction",
        blurb: "Turn a PDF or a feed into something a model can read.",
      },
      {
        slug: "chart-values",
        title: "Chart values",
        blurb: "Every value the chart takes, and what it defaults to.",
      },
      {
        slug: "request-bounds",
        title: "Request bounds",
        blurb: "Deadlines, cancellation, and the upstream client.",
      },
      {
        slug: "conformance",
        title: "Protocol conformance",
        blurb: "What MCP 2026-07-28 requires, and what it deprecated.",
      },
      {
        slug: "telemetry",
        title: "Telemetry",
        blurb: "Opt-in OpenTelemetry, a no-op until you configure it.",
      },
      {
        slug: "logs",
        title: "Structured logs",
        blurb: "One JSON line per call, joined to its trace.",
      },
    ],
  },
  {
    title: "Concepts",
    pages: [
      {
        slug: "transports",
        title: "Transports",
        blurb: "Two surfaces, one handler, and who owns the auth.",
      },
      {
        slug: "refusals",
        title: "Refusing an undeclared argument",
        blurb: "A dropped filter returns a large, plausible, wrong number.",
      },
    ],
  },
]
