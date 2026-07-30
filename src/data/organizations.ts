import bridgeIcon from "../images/icons/bridge.svg"
import flightDeckIcon from "../images/icons/flight-deck.svg"
import gamingIcon from "../images/icons/gaming.svg"

// Static site projection of the three `.github/profile/README.md` sources
// registered by AOSK in `data/repo-skill-sources.json`.

export interface OrganizationRepository {
  name: string
  description?: string
  url?: string
  private?: boolean
  archived?: boolean
}

export interface OrganizationTag {
  name: string
  repositories: string[]
}

export interface HeadlineProject {
  name: string
  label?: string
  description: string
  url: string
}

export interface OrganizationLink {
  label: string
  url: string
}

export interface OrganizationProfile {
  slug: string
  name: string
  icon: string
  eyebrow: string
  purpose: string
  intro: string[]
  highlights: string[]
  githubUrl: string
  forgejoUrl?: string
  headlineProjects?: HeadlineProject[]
  repositories: OrganizationRepository[]
  tags: OrganizationTag[]
  finalSection?: {
    title: string
    links: OrganizationLink[]
  }
}

const flightDeck: OrganizationProfile = {
  slug: "coilyco-flight-deck",
  name: "coilyco-flight-deck",
  icon: flightDeckIcon,
  eyebrow: "PUBLIC OSS / FLIGHT DECK",
  purpose:
    "Public OSS portfolio of Kai Siren. LLM observability, agent devex, and tooling for AI consumers.",
  intro: [
    "Public OSS portfolio of Kai Siren.",
    "Focus: LLM observability, agent devex, tooling for AI consumers.",
  ],
  highlights: ["o2r", "gauntlet", "repo-recall"],
  githubUrl: "https://github.com/coilyco-flight-deck",
  headlineProjects: [
    {
      name: "otel-a2a-relay",
      label: "o2r",
      url: "https://github.com/coilyco-flight-deck/otel-a2a-relay",
      description:
        "OpenTelemetry relay for the A2A agent protocol. Translates JSON-RPC 2.0 agent calls into OTel spans exported to Phoenix, Tempo, and Grafana.",
    },
    {
      name: "gauntlet",
      url: "https://github.com/coilyco-flight-deck/gauntlet",
      description:
        "Adversarial MCP server and Claude Code plugin that stress-tests HTTP APIs under sustained two-role (Attacker plus Inspector) attack.",
    },
    {
      name: "repo-recall",
      url: "https://github.com/coilyco-flight-deck/repo-recall",
      description:
        "Rust hydration layer joining git, gh, and Claude Code session history into a local-first MCP and HTTP surface. Published via Homebrew tap.",
    },
    {
      name: "cli-guard",
      url: "https://github.com/coilyco-flight-deck/cli-guard",
      description:
        "Go security-boundary framework for urfave/cli - audit logging, scope tokens, and allowlist enforcement.",
    },
  ],
  repositories: [
    {
      name: "coilyco-flight-deck/.github",
      url: "https://github.com/coilyco-flight-deck/.github",
      description:
        "Organization profile for public AI-agent tooling, observability, and developer-platform projects.",
    },
    {
      name: "coilyco-flight-deck/agent-compose",
      url: "https://github.com/coilyco-flight-deck/agent-compose",
      description:
        "Context compiler that composes roles, personalities, skills, and tool inventories for AI-agent harnesses.",
    },
    {
      name: "coilyco-flight-deck/agent-proxy",
      url: "https://github.com/coilyco-flight-deck/agent-proxy",
      description:
        "Observability and trajectory data plane for AI agents with OpenAI-compatible proxying and LiteLLM.",
    },
    {
      name: "coilyco-flight-deck/agentic-os",
      url: "https://github.com/coilyco-flight-deck/agentic-os",
      description:
        "Cross-platform agentic operating layer with dotfiles, skills, guarded tooling, and repository validators.",
    },
    {
      name: "coilyco-flight-deck/bluesky-mcp",
      url: "https://github.com/coilyco-flight-deck/bluesky-mcp",
      description:
        "Authenticated read-only Bluesky MCP with a fixed, bounded AT Protocol tool surface.",
    },
    {
      name: "coilyco-flight-deck/cli-guard",
      url: "https://github.com/coilyco-flight-deck/cli-guard",
      description:
        "Security framework for guarded command-line tools with scoped authority, validation, and audit logs.",
    },
    {
      name: "coilyco-flight-deck/homebrew-tap",
      url: "https://github.com/coilyco-flight-deck/homebrew-tap",
      description:
        "Homebrew tap for coilyco-flight-deck tools with automated formula updates.",
    },
    {
      name: "coilyco-flight-deck/infrastructure",
      url: "https://github.com/coilyco-flight-deck/infrastructure",
      description:
        "Infrastructure-as-code for Kai's hosts and Kubernetes homelab, including Ansible convergence and observability.",
    },
    {
      name: "coilyco-flight-deck/lunch-money-k8s",
      url: "https://github.com/coilyco-flight-deck/lunch-money-k8s",
      description:
        "MCP server and Helm chart for the Lunch Money personal-finance API.",
    },
    {
      name: "coilyco-flight-deck/node-stats-mcp",
      url: "https://github.com/coilyco-flight-deck/node-stats-mcp",
      description:
        "Read-only MCP for Linux and Kubernetes diagnostics with bounded host introspection and OTLP export.",
    },
    {
      name: "coilyco-flight-deck/reddit-mcp",
      url: "https://github.com/coilyco-flight-deck/reddit-mcp",
      description:
        "Read-only MCP for private Reddit feeds and public subreddit RSS.",
    },
    {
      name: "coilyco-flight-deck/scoop-bucket",
      url: "https://github.com/coilyco-flight-deck/scoop-bucket",
      description:
        "Scoop bucket for Windows binaries published by coilyco-flight-deck.",
    },
    {
      name: "coilyco-flight-deck/ward",
      url: "https://github.com/coilyco-flight-deck/ward",
      description:
        "Governed execution layer for unattended coding agents in isolated repository workflows.",
    },
    {
      name: "coilyco-flight-deck/ward-mcp",
      url: "https://github.com/coilyco-flight-deck/ward-mcp",
      description:
        "MCP runtime that turns cli-guard policy files into guarded streamable HTTP services and container images.",
    },
  ],
  tags: [
    {
      name: "ai-agents",
      repositories: [
        "coilyco-flight-deck/.github",
        "coilyco-flight-deck/agent-compose",
        "coilyco-flight-deck/agent-proxy",
        "coilyco-flight-deck/agentic-os",
        "coilyco-flight-deck/ward",
      ],
    },
    {
      name: "ansible",
      repositories: ["coilyco-flight-deck/infrastructure"],
    },
    {
      name: "automation",
      repositories: [
        "coilyco-flight-deck/agent-compose",
        "coilyco-flight-deck/agentic-os",
        "coilyco-flight-deck/cli-guard",
        "coilyco-flight-deck/homebrew-tap",
        "coilyco-flight-deck/scoop-bucket",
        "coilyco-flight-deck/ward",
        "coilyco-flight-deck/ward-mcp",
      ],
    },
    {
      name: "bluesky",
      repositories: ["coilyco-flight-deck/bluesky-mcp"],
    },
    {
      name: "command-line",
      repositories: ["coilyco-flight-deck/cli-guard"],
    },
    {
      name: "devops",
      repositories: [
        "coilyco-flight-deck/.github",
        "coilyco-flight-deck/cli-guard",
        "coilyco-flight-deck/homebrew-tap",
        "coilyco-flight-deck/scoop-bucket",
        "coilyco-flight-deck/ward",
      ],
    },
    {
      name: "dotfiles",
      repositories: ["coilyco-flight-deck/agentic-os"],
    },
    {
      name: "github-profile",
      repositories: ["coilyco-flight-deck/.github"],
    },
    {
      name: "helm",
      repositories: ["coilyco-flight-deck/lunch-money-k8s"],
    },
    {
      name: "homelab",
      repositories: ["coilyco-flight-deck/infrastructure"],
    },
    {
      name: "homebrew",
      repositories: ["coilyco-flight-deck/homebrew-tap"],
    },
    {
      name: "infrastructure-as-code",
      repositories: ["coilyco-flight-deck/infrastructure"],
    },
    {
      name: "kubernetes",
      repositories: [
        "coilyco-flight-deck/infrastructure",
        "coilyco-flight-deck/node-stats-mcp",
      ],
    },
    {
      name: "llm",
      repositories: [
        "coilyco-flight-deck/agent-compose",
        "coilyco-flight-deck/agent-proxy",
      ],
    },
    {
      name: "mcp",
      repositories: [
        "coilyco-flight-deck/agent-compose",
        "coilyco-flight-deck/bluesky-mcp",
        "coilyco-flight-deck/lunch-money-k8s",
        "coilyco-flight-deck/node-stats-mcp",
        "coilyco-flight-deck/reddit-mcp",
        "coilyco-flight-deck/ward-mcp",
      ],
    },
    {
      name: "model-context-protocol",
      repositories: [
        "coilyco-flight-deck/bluesky-mcp",
        "coilyco-flight-deck/lunch-money-k8s",
        "coilyco-flight-deck/reddit-mcp",
        "coilyco-flight-deck/ward-mcp",
      ],
    },
    {
      name: "observability",
      repositories: [
        "coilyco-flight-deck/.github",
        "coilyco-flight-deck/agent-proxy",
        "coilyco-flight-deck/node-stats-mcp",
      ],
    },
    {
      name: "opentelemetry",
      repositories: [
        "coilyco-flight-deck/agent-proxy",
        "coilyco-flight-deck/node-stats-mcp",
      ],
    },
    {
      name: "personal-finance",
      repositories: ["coilyco-flight-deck/lunch-money-k8s"],
    },
    {
      name: "reddit",
      repositories: ["coilyco-flight-deck/reddit-mcp"],
    },
    {
      name: "rss",
      repositories: ["coilyco-flight-deck/reddit-mcp"],
    },
    {
      name: "scoop",
      repositories: ["coilyco-flight-deck/scoop-bucket"],
    },
    {
      name: "security",
      repositories: [
        "coilyco-flight-deck/agentic-os",
        "coilyco-flight-deck/bluesky-mcp",
        "coilyco-flight-deck/cli-guard",
        "coilyco-flight-deck/ward",
        "coilyco-flight-deck/ward-mcp",
      ],
    },
  ],
  finalSection: {
    title: "Elsewhere",
    links: [
      {
        label: "Personal site",
        url: "https://coilysiren.me",
      },
      {
        label: "Operational back-office",
        url: "https://github.com/coilyco-bridge",
      },
      {
        label: "Canonical Forgejo home for the operational back-office",
        url: "https://forgejo.coilysiren.me/coilyco-bridge",
      },
    ],
  },
}

const bridge: OrganizationProfile = {
  slug: "coilyco-bridge",
  name: "coilyco-bridge",
  icon: bridgeIcon,
  eyebrow: "CONTROL SURFACES / BRIDGE",
  purpose:
    "Operational back office. The canonical source lives on Forgejo, with GitHub as a name-squat redirect.",
  intro: [
    "GitHub home for coilyco-bridge. The canonical source lives on Forgejo.",
    "Code, issues, discussions, and CI happen there. This GitHub presence is a name-squat redirect.",
  ],
  highlights: [
    "agent operating context",
    "architecture maps",
    "deployment machinery",
  ],
  githubUrl: "https://github.com/coilyco-bridge",
  forgejoUrl: "https://forgejo.coilysiren.me/coilyco-bridge",
  repositories: [
    {
      name: "coilyco-bridge/.github",
      url: "https://github.com/coilyco-bridge/.github",
      description:
        "Organization profile and canonical Forgejo redirect for coilyco-bridge.",
    },
    {
      name: "coilyco-bridge/agentic-os-hardware",
      private: true,
      description:
        "Hardware and local-LLM knowledge base with device profiles, benchmarks, and model rankings.",
    },
    {
      name: "coilyco-bridge/agentic-os-kai",
      private: true,
      description:
        "Kai's agent operating context, skill catalog, fleet inventory, and cross-repository automation.",
    },
    {
      name: "coilyco-bridge/agentic-os-xxx",
      private: true,
      description:
        "Private ComfyUI harness for agent-driven image generation, workflow assets, and reference media.",
    },
    {
      name: "coilyco-bridge/atlas",
      private: true,
      description:
        "Static architecture site that visualizes repositories and their cross-org dependency graph.",
    },
    {
      name: "coilyco-bridge/deploy",
      private: true,
      description:
        "Kubernetes deployment monorepo for always-on services across Kai's homelab.",
    },
  ],
  tags: [
    {
      name: "ai-agents",
      repositories: [
        "coilyco-bridge/agentic-os-kai",
        "coilyco-bridge/agentic-os-xxx",
      ],
    },
    {
      name: "automation",
      repositories: ["coilyco-bridge/agentic-os-kai"],
    },
    {
      name: "benchmark",
      repositories: ["coilyco-bridge/agentic-os-hardware"],
    },
    {
      name: "comfyui",
      repositories: ["coilyco-bridge/agentic-os-xxx"],
    },
    {
      name: "data-visualization",
      repositories: ["coilyco-bridge/atlas"],
    },
    {
      name: "devops",
      repositories: [
        "coilyco-bridge/.github",
        "coilyco-bridge/agentic-os-kai",
        "coilyco-bridge/atlas",
        "coilyco-bridge/deploy",
      ],
    },
    {
      name: "documentation",
      repositories: ["coilyco-bridge/.github"],
    },
    {
      name: "generative-ai",
      repositories: ["coilyco-bridge/agentic-os-xxx"],
    },
    {
      name: "github-profile",
      repositories: ["coilyco-bridge/.github"],
    },
    {
      name: "helm",
      repositories: ["coilyco-bridge/deploy"],
    },
    {
      name: "homelab",
      repositories: [
        "coilyco-bridge/agentic-os-hardware",
        "coilyco-bridge/deploy",
      ],
    },
    {
      name: "kubernetes",
      repositories: ["coilyco-bridge/deploy"],
    },
    {
      name: "llm",
      repositories: ["coilyco-bridge/agentic-os-hardware"],
    },
    {
      name: "machine-learning",
      repositories: [
        "coilyco-bridge/agentic-os-hardware",
        "coilyco-bridge/agentic-os-xxx",
      ],
    },
    {
      name: "mcp",
      repositories: ["coilyco-bridge/agentic-os-kai"],
    },
    {
      name: "static-site",
      repositories: ["coilyco-bridge/atlas"],
    },
  ],
  finalSection: {
    title: "See also",
    links: [
      {
        label: "Public portfolio",
        url: "https://github.com/coilyco-flight-deck",
      },
    ],
  },
}

const gaming: OrganizationProfile = {
  slug: "coilyco-gaming",
  name: "coilyco-gaming",
  icon: gamingIcon,
  eyebrow: "PLAYTEST FLOOR / GAMING",
  purpose: "Games, simulations, mods, and game-service tooling.",
  intro: [
    "GitHub home for games, simulations, mods, and game-service tooling.",
  ],
  highlights: ["Eco", "Galaxy Gen", "Steam tooling"],
  githubUrl: "https://github.com/coilyco-gaming",
  repositories: [
    {
      name: "coilyco-gaming/.github",
      url: "https://github.com/coilyco-gaming/.github",
    },
    {
      name: "coilyco-gaming/eco-app",
      url: "https://github.com/coilyco-gaming/eco-app",
      description: "Eco MCP service - server, jobs, replay, telemetry.",
    },
    {
      name: "coilyco-gaming/eco-mods",
      url: "https://github.com/coilyco-gaming/eco-mods",
      description: "Eco mods and Unity assets.",
    },
    {
      name: "coilyco-gaming/eco-ops",
      private: true,
      description:
        "Eco operational inputs - cycle-prep, configs, private mods.",
    },
    {
      name: "coilyco-gaming/factorio-mods",
      private: true,
      description: "Factorio mods.",
    },
    {
      name: "coilyco-gaming/factory-game-v3",
      private: true,
    },
    {
      name: "coilyco-gaming/galaxy-gen",
      url: "https://github.com/coilyco-gaming/galaxy-gen",
      description:
        "Procedural galaxy simulation - Rust compiled to WASM, rendered in the browser. Live at https://galaxy-gen.coilysiren.me",
    },
    {
      name: "coilyco-gaming/sirens-discord-ops",
      private: true,
      description:
        "Go ops tooling for the Sirens Eco community Discord: message dumps, normalization, and analysis pipelines.",
    },
    {
      name: "coilyco-gaming/steam-ops",
      url: "https://github.com/coilyco-gaming/steam-ops",
    },
  ],
  tags: [
    {
      name: "bevy",
      repositories: ["coilyco-gaming/factory-game-v3"],
    },
    {
      name: "discord",
      repositories: ["coilyco-gaming/sirens-discord-ops"],
    },
    {
      name: "eco-community-discord",
      repositories: ["coilyco-gaming/sirens-discord-ops"],
    },
    {
      name: "eco-game",
      repositories: [
        "coilyco-gaming/eco-app",
        "coilyco-gaming/eco-mods",
        "coilyco-gaming/eco-ops",
        "coilyco-gaming/sirens-discord-ops",
      ],
    },
    {
      name: "factorio",
      repositories: ["coilyco-gaming/factorio-mods"],
    },
    {
      name: "game-development",
      repositories: ["coilyco-gaming/factory-game-v3"],
    },
    {
      name: "game-modding",
      repositories: [
        "coilyco-gaming/eco-mods",
        "coilyco-gaming/eco-ops",
        "coilyco-gaming/factorio-mods",
      ],
    },
    {
      name: "game-operations",
      repositories: ["coilyco-gaming/eco-ops"],
    },
    {
      name: "gaming",
      repositories: ["coilyco-gaming/.github"],
    },
    {
      name: "github-profile",
      repositories: ["coilyco-gaming/.github"],
    },
    {
      name: "go",
      repositories: ["coilyco-gaming/sirens-discord-ops"],
    },
    {
      name: "go-ops-tooling",
      repositories: ["coilyco-gaming/sirens-discord-ops"],
    },
    {
      name: "mcp",
      repositories: ["coilyco-gaming/eco-app", "coilyco-gaming/steam-ops"],
    },
    {
      name: "message-dumps",
      repositories: ["coilyco-gaming/sirens-discord-ops"],
    },
    {
      name: "model-context-protocol",
      repositories: ["coilyco-gaming/eco-app", "coilyco-gaming/steam-ops"],
    },
    {
      name: "procedural-galaxy-simulation",
      repositories: ["coilyco-gaming/galaxy-gen"],
    },
    {
      name: "rust",
      repositories: [
        "coilyco-gaming/factory-game-v3",
        "coilyco-gaming/galaxy-gen",
      ],
    },
    {
      name: "rust-wasm",
      repositories: ["coilyco-gaming/galaxy-gen"],
    },
    {
      name: "steam",
      repositories: ["coilyco-gaming/steam-ops"],
    },
    {
      name: "telemetry",
      repositories: ["coilyco-gaming/eco-app"],
    },
    {
      name: "unity",
      repositories: ["coilyco-gaming/eco-mods"],
    },
    {
      name: "webassembly",
      repositories: [
        "coilyco-gaming/factory-game-v3",
        "coilyco-gaming/galaxy-gen",
      ],
    },
  ],
}

export const organizations = [flightDeck, bridge, gaming] as const

export const organizationBySlug = Object.fromEntries(
  organizations.map((organization) => [organization.slug, organization])
) as Record<string, OrganizationProfile>

export const repositoryTags = (
  organization: OrganizationProfile,
  repositoryName: string
): string[] =>
  organization.tags
    .filter((tag) => tag.repositories.includes(repositoryName))
    .map((tag) => tag.name)
