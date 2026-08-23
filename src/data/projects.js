/**
 * @typedef {"mint" | "coral" | "periwinkle"} ProjectTone
 */

/**
 * @typedef {object} FeaturedProject
 * @property {"ward" | "agent-compose" | "mcp-beaver"} slug
 * @property {"Compose" | "Execute" | "Expose"} stage
 * @property {string} name
 * @property {string} title
 * @property {string} summary
 * @property {string} sourceUrl
 * @property {ProjectTone} tone
 */

/**
 * @typedef {{ kind: "emoji", glyph: string, label: string }} ProjectEmojiIcon
 */

/**
 * @typedef {{ kind: "image", src: string, alt: string }} ProjectImageIcon
 */

/**
 * @typedef {ProjectEmojiIcon | ProjectImageIcon} ProjectIcon
 */

/**
 * @typedef {object} ProjectLink
 * @property {string} name
 * @property {string} description
 * @property {string[]} tags
 * @property {string} [url]
 * @property {boolean} [privateRepo]
 * @property {ProjectIcon[]} [icons]
 */

/**
 * @typedef {object} ProjectGroup
 * @property {string} title
 * @property {string} description
 * @property {ProjectLink[]} projects
 */

/** @type {FeaturedProject[]} */
export const featuredProjects = [
  {
    slug: "agent-compose",
    stage: "Compose",
    name: "agent-compose",
    title: "Portable context for agents that work differently.",
    summary:
      "A context compiler that selects roles, personality, skills, and tool inventories, then emits an inspectable bundle without smuggling in executable authority.",
    sourceUrl: "https://github.com/coilyco-flight-deck/agent-compose",
    tone: "periwinkle",
  },
  {
    slug: "ward",
    stage: "Execute",
    name: "Ward",
    title: "Delegate real repository work without giving up the boundary.",
    summary:
      "A governed execution layer for unattended coding agents, built around fresh clones, least-access containers, fixed workflows, recoverable outcomes, and a durable audit trail.",
    sourceUrl: "https://github.com/coilyco-flight-deck/ward",
    tone: "mint",
  },
  {
    slug: "mcp-beaver",
    stage: "Expose",
    name: "mcp-beaver",
    title: "Turn a narrow policy into a usable MCP service.",
    summary:
      "A runtime that derives Streamable HTTP MCP tools and matching HTTP endpoints from an umbra guardfile, so tool discovery never becomes permission by implication.",
    sourceUrl: "https://forgejo.coilysiren.me/coilyco-flight-deck/mcp-beaver",
    tone: "coral",
  },
]

export const showcaseProducts = [
  {
    slug: "agent-compose",
    banner: "/images/banners/agent-compose.jpg",
    banner2x: "/images/banners/agent-compose-2x.jpg",
    alt: "agent-compose // $ acompose - Eval driven agent roles and personas",
    proof:
      "Selects roles, personalities, skills, and tool inventories, then emits an inspectable bundle. No executable authority rides along.",
    url: "https://github.com/coilyco-flight-deck/agent-compose",
  },
  {
    slug: "sirens-echo",
    banner: "/images/banners/sirens-echo.jpg",
    banner2x: "/images/banners/sirens-echo-2x.jpg",
    alt: "sirens-echo // sirens-deep - a discord community agent harness",
    proof:
      "Go ops tooling for the Sirens community Discord: message dumps, normalization, and the analysis pipelines over them.",
    url: "https://github.com/coilyco-gaming/sirens-echo",
  },
  {
    slug: "mcp-beaver",
    banner: "/images/banners/mcp-beaver.jpg",
    banner2x: "/images/banners/mcp-beaver-2x.jpg",
    mobileBanner: "/images/banners/mcp-beaver-mobile.jpg",
    mobileBanner2x: "/images/banners/mcp-beaver-mobile-2x.jpg",
    alt: "mcp-beaver // .mcp.kdl - A MCP server generator with a natural flow",
    proof:
      "Renders a guardfile into a guarded MCP server and HTTP tool API. One generic runtime, many guardfiles, and an undeclared operation has no handler at all.",
    url: "https://forgejo.coilysiren.me/coilyco-flight-deck/mcp-beaver",
  },
  {
    slug: "umbra",
    banner: "/images/banners/umbra.jpg",
    banner2x: "/images/banners/umbra-2x.jpg",
    mobileBanner: "/images/banners/umbra-mobile.jpg",
    mobileBanner2x: "/images/banners/umbra-mobile-2x.jpg",
    alt: "umbra - a config driven occlusion framework",
    proof:
      "A config driven occlusion framework that puts explicit boundaries around CLIs and APIs.",
    url: "https://forgejo.coilysiren.me/coilyco-flight-deck/umbra",
  },
]

/** @type {ProjectGroup[]} */
export const projectGroups = [
  {
    title: "Infrastructure",
    description:
      "The operating and deployment layers beneath the agent platform.",
    projects: [
      {
        name: "coilyco-flight-deck/agentic-os",
        description:
          "Cross-platform agentic operating layer with dotfiles, skills, guarded tooling, and repository validators.",
        tags: ["ai-agents", "automation", "dotfiles", "security"],
        url: "https://github.com/coilyco-flight-deck/agentic-os",
      },
      {
        name: "coilyco-flight-deck/infrastructure",
        description:
          "Infrastructure-as-code for Kai's hosts and Kubernetes homelab, including Ansible convergence and observability.",
        tags: ["ansible", "homelab", "infrastructure-as-code", "kubernetes"],
        url: "https://github.com/coilyco-flight-deck/infrastructure",
      },
      {
        name: "coilyco-bridge/agentic-os-kai",
        description:
          "Kai's agent operating context, skill catalog, fleet inventory, and cross-repository automation.",
        tags: ["ai-agents", "automation", "devops", "mcp"],
        privateRepo: true,
      },
      {
        name: "coilyco-bridge/deploy",
        description:
          "Kubernetes deployment monorepo for always-on services across Kai's homelab.",
        tags: ["devops", "helm", "homelab", "kubernetes"],
        privateRepo: true,
      },
    ],
  },
  {
    title: "Agent platform",
    description:
      "Context, governed execution, tool delivery, and the observable model path.",
    projects: [
      {
        name: "coilyco-flight-deck/agent-compose",
        description:
          "Context compiler that composes roles, personalities, skills, and tool inventories for AI-agent harnesses.",
        tags: ["ai-agents", "automation", "llm", "mcp"],
        url: "https://github.com/coilyco-flight-deck/agent-compose",
      },
      {
        name: "coilyco-flight-deck/ward",
        description:
          "Governed execution layer for unattended coding agents in isolated repository workflows.",
        tags: ["ai-agents", "automation", "devops", "security"],
        url: "https://github.com/coilyco-flight-deck/ward",
      },
      {
        name: "coilyco-flight-deck/mcp-beaver",
        description:
          "MCP runtime that turns umbra guardfiles into guarded streamable HTTP services and container images.",
        tags: ["automation", "mcp", "model-context-protocol", "security"],
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/mcp-beaver",
      },
      {
        name: "coilyco-flight-deck/agent-proxy",
        description:
          "Observability and trajectory data plane for AI agents with OpenAI-compatible proxying and LiteLLM.",
        tags: ["ai-agents", "llm", "observability", "opentelemetry"],
        url: "https://github.com/coilyco-flight-deck/agent-proxy",
      },
    ],
  },
  {
    title: "Product",
    description:
      "Things built with the platform for communities, games, and daily life.",
    projects: [
      {
        name: "coilyco-gaming/eco-app",
        description: "Eco MCP service - server, jobs, replay, telemetry.",
        tags: [],
        url: "https://github.com/coilyco-gaming/eco-app",
        icons: [{ kind: "emoji", glyph: "🌎", label: "Earth" }],
      },
      {
        name: "coilyco-gaming/galaxy-gen",
        description:
          "Procedural galaxy simulation - Rust compiled to WASM, rendered in the browser. Live at https://galaxy-gen.coilysiren.me",
        tags: ["procedural-galaxy-simulation", "rust-wasm"],
        url: "https://github.com/coilyco-gaming/galaxy-gen",
        icons: [{ kind: "emoji", glyph: "🌌", label: "Milky Way" }],
      },
      {
        name: "coilyco-gaming/sirens-echo",
        description: "Sirens Echo Community harness for the Sirens Discord.",
        tags: ["community", "discord", "harness"],
        url: "https://github.com/coilyco-gaming/sirens-echo",
        icons: [{ kind: "emoji", glyph: "🤖", label: "Robot" }],
      },
      {
        name: "Many MCPs",
        description:
          "Narrow agent interfaces for personal finance, private feeds, games, browsers, project work, and the systems around them.",
        tags: ["lunch-money", "reddit", "steam", "+6 more"],
        icons: [
          {
            kind: "image",
            src: "/apps-icons/lunch-money.ico",
            alt: "Lunch Money",
          },
          {
            kind: "image",
            src: "/apps-icons/reddit.svg",
            alt: "Reddit",
          },
          {
            kind: "image",
            src: "/apps-icons/steam.svg",
            alt: "Steam",
          },
        ],
      },
    ],
  },
]
