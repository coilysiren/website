export type ProjectTone = "mint" | "coral" | "periwinkle"

export interface CaseStudyStep {
  label: string
  detail: string
}

export interface FeaturedProject {
  slug: "ward" | "agent-compose" | "ward-mcp"
  stage: "Compose" | "Execute" | "Expose"
  name: string
  title: string
  summary: string
  sourceUrl: string
  caseStudyUrl: string
  tone: ProjectTone
  problem: string
  flow: CaseStudyStep[]
  judgment: {
    title: string
    detail: string
  }
  evidence: string[]
  limitation: string
  request?: {
    input: string
    result: string
  }
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
    caseStudyUrl: "/work/agent-compose/",
    tone: "periwinkle",
    problem:
      "Every harness has its own load points, capability conventions, and context limits. Copying one ever-growing prompt across them creates drift, hides ownership, and makes the runtime harder to inspect.",
    flow: [
      {
        label: "Declare",
        detail: "Role, model class, delivery mode, and capability sources.",
      },
      {
        label: "Resolve",
        detail: "One roster, its personality meld, and admitted skills.",
      },
      {
        label: "Compile",
        detail: "An immutable bundle with a retained decision trace.",
      },
      {
        label: "Project",
        detail: "Native harness skills or a verified staged home.",
      },
    ],
    judgment: {
      title: "Completeness has to fit inside a real context budget.",
      detail:
        "Pruning belongs to each skill and role compatibility fails closed. The compiler records what it selected and why, instead of silently trimming a prompt after the fact.",
    },
    evidence: [
      "The compose command turns a KDL request into an immutable offline bundle.",
      "Describe and --why expose the selection path for one included or excluded item.",
      "Diff and verify inspect semantic changes, entry points, delivery, and identity.",
      "Acompose converges native hosts while staged-home adapters preserve the same verified boundary.",
    ],
    limitation:
      "Non-identical candidates for the same delivery slot still fail instead of using an override grammar. That keeps collisions visible, but leaves deliberate merging for later work.",
  },
  {
    slug: "ward",
    stage: "Execute",
    name: "Ward",
    title: "Delegate real repository work without giving up the boundary.",
    summary:
      "A governed execution layer for unattended coding agents, built around fresh clones, least-access containers, fixed workflows, recoverable outcomes, and a durable audit trail.",
    sourceUrl: "https://forgejo.coilysiren.me/coilyco-flight-deck/ward",
    caseStudyUrl: "/work/ward/",
    tone: "mint",
    problem:
      "An agent needs enough room to investigate, build, test, and land meaningful work. A broad shell gives it motion, but leaves the operator choosing between blind trust and replaying the whole session.",
    flow: [
      {
        label: "Resolve",
        detail: "Read the issue, trust policy, role, harness, and workflow.",
      },
      {
        label: "Preflight",
        detail: "Check capacity, reservations, credentials, and launch health.",
      },
      {
        label: "Run",
        detail:
          "Work in a fresh clone and an ephemeral least-access container.",
      },
      {
        label: "Recover",
        detail: "Retain the branch, review trail, logs, and explicit outcome.",
      },
    ],
    judgment: {
      title: "Role labels never become permission grants.",
      detail:
        "Ward keeps productive motion and operator authority separate. Fixed workflows describe how work may land, while the execution layer still owns credentials, mounts, network reach, and container boundaries.",
    },
    evidence: [
      "The warded entry point launches typed harness adapters into ephemeral containers.",
      "Issue-thread reservations and open-PR backpressure are checked again at launch time.",
      "Ward exec validates repository-declared verbs and writes an append-only audit row.",
      "Director, engineer, QA, and review lanes leave explicit issue, branch, PR, log, and outcome evidence.",
    ],
    limitation:
      "On macOS and Windows, the development verb gate enforces the direct invocation only. Linux can hold the boundary at arbitrary process depth through the sandbox jail.",
  },
  {
    slug: "ward-mcp",
    stage: "Expose",
    name: "Ward MCP",
    title: "Turn a narrow policy into a usable MCP service.",
    summary:
      "A runtime that derives Streamable HTTP MCP tools and matching HTTP endpoints from cli-guard policy, so tool discovery never becomes permission by implication.",
    sourceUrl: "https://forgejo.coilysiren.me/coilyco-flight-deck/ward-mcp",
    caseStudyUrl: "/work/ward-mcp/",
    tone: "coral",
    problem:
      "Making an API visible to an agent is easy. Making only the intended operations visible, validating their inputs, and keeping the blast radius reviewable is the actual platform problem.",
    flow: [
      {
        label: "Author",
        detail:
          "Write the upstream, outbound auth, restrictions, and grants in KDL.",
      },
      {
        label: "Project",
        detail: "Derive typed tools, schemas, annotations, and HTTP routes.",
      },
      {
        label: "Guard",
        detail: "Validate the declared contract before an upstream request.",
      },
      {
        label: "Serve",
        detail: "Expose the same handler through /mcp and /api/{tool-name}.",
      },
    ],
    judgment: {
      title: "The unwritten tool is the strongest deletion guard.",
      detail:
        "The served surface is exactly the policy's grants. There is no second handler registry to drift and no generic escape route that quietly widens the service.",
    },
    evidence: [
      "One static runtime parses a .mcp.kdl policy and derives each tool's input schema.",
      "MCP tools and direct HTTP endpoints call the same guarded handler.",
      "Unknown tools, invalid inputs, oversized bodies, and guard failures return explicit errors.",
      "The generic image and Helm chart keep runtime mechanics separate from deployment-owned identity, TLS, ingress, and rollout.",
    ],
    limitation:
      "The runtime does not authenticate inbound callers. A consuming deployment must own identity and network exposure. Multi-operation action composition and cross-server tool naming also remain open.",
    request: {
      input:
        '{ "owner": "coilyco-flight-deck", "repo": "ward-mcp", "index": "41" }',
      result:
        "The request is checked against the declared owner restriction and typed fields, then the shared handler returns an MCP CallToolResult through either protocol face.",
    },
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

export const findFeaturedProject = (slug: FeaturedProject["slug"]) => {
  const project = featuredProjects.find((candidate) => candidate.slug === slug)
  if (!project) throw new Error(`Unknown featured project: ${slug}`)
  return project
}
