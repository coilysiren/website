export type ProjectTone = "mint" | "coral" | "periwinkle"

export interface FeaturedProject {
  slug: "ward" | "agent-compose" | "ward-mcp"
  stage: "Compose" | "Execute" | "Expose"
  name: string
  title: string
  summary: string
  sourceUrl: string
  tone: ProjectTone
}

export interface ProjectLink {
  name: string
  description: string
  tags: string[]
  url?: string
  privateRepo?: boolean
  icons?: ProjectIcon[]
}

export type ProjectIcon =
  | { kind: "emoji"; glyph: string; label: string }
  | { kind: "image"; src: string; alt: string }

export interface ProjectGroup {
  title: string
  description: string
  projects: ProjectLink[]
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "agent-compose",
    stage: "Compose",
    name: "agent-compose",
    title: "Portable context for agents that work differently.",
    summary:
      "A context compiler that selects roles, personality, skills, and tool inventories, then emits an inspectable bundle without smuggling in executable authority.",
    sourceUrl:
      "https://forgejo.coilysiren.me/coilyco-flight-deck/agent-compose",
    tone: "periwinkle",
  },
  {
    slug: "ward",
    stage: "Execute",
    name: "Ward",
    title: "Delegate real repository work without giving up the boundary.",
    summary:
      "A governed execution layer for unattended coding agents, built around fresh clones, least-access containers, fixed workflows, recoverable outcomes, and a durable audit trail.",
    sourceUrl: "https://forgejo.coilysiren.me/coilyco-flight-deck/ward",
    tone: "mint",
  },
  {
    slug: "ward-mcp",
    stage: "Expose",
    name: "Ward MCP",
    title: "Turn a narrow policy into a usable MCP service.",
    summary:
      "A runtime that derives Streamable HTTP MCP tools and matching HTTP endpoints from cli-guard policy, so tool discovery never becomes permission by implication.",
    sourceUrl: "https://forgejo.coilysiren.me/coilyco-flight-deck/ward-mcp",
    tone: "coral",
  },
]

export const projectGroups: ProjectGroup[] = [
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
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/agent-compose",
      },
      {
        name: "coilyco-flight-deck/ward",
        description:
          "Governed execution layer for unattended coding agents in isolated repository workflows.",
        tags: ["ai-agents", "automation", "devops", "security"],
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/ward",
      },
      {
        name: "coilyco-flight-deck/ward-mcp",
        description:
          "MCP runtime that turns cli-guard policy files into guarded streamable HTTP services and container images.",
        tags: ["automation", "mcp", "model-context-protocol", "security"],
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/ward-mcp",
      },
      {
        name: "coilyco-flight-deck/agent-proxy",
        description:
          "Observability and trajectory data plane for AI agents with OpenAI-compatible proxying and LiteLLM.",
        tags: ["ai-agents", "llm", "observability", "opentelemetry"],
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/agent-proxy",
      },
    ],
  },
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
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/agentic-os",
      },
      {
        name: "coilyco-flight-deck/infrastructure",
        description:
          "Infrastructure-as-code for Kai's hosts and Kubernetes homelab, including Ansible convergence and observability.",
        tags: ["ansible", "homelab", "infrastructure-as-code", "kubernetes"],
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/infrastructure",
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
    title: "Product",
    description:
      "Things built with the platform for communities, games, and daily life.",
    projects: [
      {
        name: "coilyco-gaming/eco-app",
        description: "Eco MCP service - server, jobs, replay, telemetry.",
        tags: [],
        url: "https://forgejo.coilysiren.me/coilyco-gaming/eco-app",
        icons: [{ kind: "emoji", glyph: "🌎", label: "Earth" }],
      },
      {
        name: "coilyco-gaming/galaxy-gen",
        description:
          "Procedural galaxy simulation - Rust compiled to WASM, rendered in the browser. Live at https://galaxy-gen.coilysiren.me",
        tags: ["procedural-galaxy-simulation", "rust-wasm"],
        url: "https://forgejo.coilysiren.me/coilyco-gaming/galaxy-gen",
        icons: [{ kind: "emoji", glyph: "🌌", label: "Milky Way" }],
      },
      {
        name: "coilyco-gaming/sirens-echo",
        description: "Sirens Echo Community harness for the Sirens Discord.",
        tags: ["community", "discord", "harness"],
        privateRepo: true,
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
