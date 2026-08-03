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
  url: string
}

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
      "Policy, context, execution, model transport, and the operating layer that holds them together.",
    projects: [
      {
        name: "cli-guard",
        description:
          "Security framework for guarded command-line tools with scoped authority, validation, and audit logs.",
        tags: ["automation", "command-line", "devops", "security"],
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/cli-guard",
      },
      {
        name: "agentic-os",
        description:
          "Cross-platform agentic operating layer with dotfiles, skills, guarded tooling, and repository validators.",
        tags: ["ai-agents", "automation", "dotfiles", "security"],
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/agentic-os",
      },
      {
        name: "agent-proxy",
        description:
          "Observability and trajectory data plane for AI agents with OpenAI-compatible proxying and LiteLLM.",
        tags: ["ai-agents", "llm", "observability", "opentelemetry"],
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/agent-proxy",
      },
      {
        name: "agentic-os-hardware",
        description:
          "Hardware and local-LLM knowledge base with device profiles, benchmarks, and model rankings.",
        tags: ["benchmark", "homelab", "llm", "machine-learning"],
        url: "https://forgejo.coilysiren.me/coilyco-bridge/agentic-os-hardware",
      },
    ],
  },
  {
    title: "Platform and operations",
    description:
      "The Kubernetes, infrastructure, architecture, and observability substrate underneath the agent work.",
    projects: [
      {
        name: "infrastructure",
        description:
          "Infrastructure-as-code for Kai's hosts and Kubernetes homelab, including Ansible convergence and observability.",
        tags: ["ansible", "homelab", "infrastructure-as-code", "kubernetes"],
        url: "https://forgejo.coilysiren.me/coilyco-flight-deck/infrastructure",
      },
      {
        name: "deploy",
        description:
          "Kubernetes deployment monorepo for always-on services across Kai's homelab.",
        tags: ["devops", "helm", "homelab", "kubernetes"],
        url: "https://forgejo.coilysiren.me/coilyco-bridge/deploy",
      },
      {
        name: "atlas",
        description:
          "Static architecture site that visualizes repositories and their cross-org dependency graph.",
        tags: ["data-visualization", "devops", "static-site"],
        url: "https://forgejo.coilysiren.me/coilyco-bridge/atlas",
      },
    ],
  },
  {
    title: "Applied systems",
    description:
      "Real communities, game services, and playful surfaces where the platform has to meet actual use.",
    projects: [
      {
        name: "sirens-echo",
        description: "Sirens Echo Community harness for the Sirens Discord.",
        tags: ["community", "discord", "harness"],
        url: "https://forgejo.coilysiren.me/coilyco-gaming/sirens-echo",
      },
      {
        name: "eco-app",
        description: "Eco MCP service - server, jobs, replay, telemetry.",
        tags: [],
        url: "https://forgejo.coilysiren.me/coilyco-gaming/eco-app",
      },
      {
        name: "galaxy-gen",
        description:
          "Procedural galaxy simulation - Rust compiled to WASM, rendered in the browser. Live at https://galaxy-gen.coilysiren.me",
        tags: ["procedural-galaxy-simulation", "rust-wasm"],
        url: "https://forgejo.coilysiren.me/coilyco-gaming/galaxy-gen",
      },
    ],
  },
]
