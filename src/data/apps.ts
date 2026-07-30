// Shared catalog for /apps. Gatsby also uses the public-app entries for
// build-time Open Graph previews.

export type Status = "unknown" | "up" | "down" | "na"

export interface AppEntry {
  name: string
  host: string
  url: string
  desc: string
  repo?: string
  tag: string
  icon: string
  fixedStatus?: Status
  ogUrl?: string
}

export interface HostGroup {
  name: string
  meta: string
  apps: AppEntry[]
}

export const groups: HostGroup[] = [
  {
    name: "Public apps",
    meta: "built or hosted from the homelab",
    apps: [
      {
        name: "Eco App",
        host: "eco-app.coilysiren.me",
        url: "https://eco-app.coilysiren.me",
        desc: "The companion app for the Sirens Eco server: player data, jobs, replay, telemetry, and an MCP surface in one deployable.",
        repo: "https://forgejo.coilysiren.me/coilyco-gaming/eco-app",
        tag: "Eco",
        icon: "fa-solid fa-leaf",
      },
      {
        name: "Factory Game",
        host: "factory.coilysiren.me",
        url: "https://factory.coilysiren.me",
        desc: "A Bevy and WebAssembly factory-game shell running directly in the browser.",
        tag: "Game",
        icon: "fa-solid fa-industry",
      },
      {
        name: "Galaxy Gen",
        host: "galaxy-gen.coilysiren.me",
        url: "https://galaxy-gen.coilysiren.me",
        desc: "A procedural galaxy simulation built in Rust, compiled to WebAssembly, and rendered with React and D3.",
        repo: "https://github.com/coilyco-flight-deck/galaxy-gen",
        tag: "Simulation",
        icon: "fa-solid fa-star",
      },
      {
        name: "Eco Gnome",
        host: "eco-gnome.coilysiren.me",
        url: "https://eco-gnome.coilysiren.me",
        desc: "A self-hosted Eco price calculator for working out useful buy and sell prices from professions and recipes.",
        repo: "https://github.com/Eco-Gnome/eco-gnome-website",
        tag: "Self-hosted",
        icon: "fa-solid fa-hat-wizard",
      },
    ],
  },
]

export interface CapabilityEntry {
  name: string
  stack: string
  desc: string
  icon: string
}

export const observability: CapabilityEntry[] = [
  {
    name: "Metrics",
    stack: "VictoriaMetrics + vmalert",
    desc: "Fleet and service metrics, recording rules, and alerts that stay useful when the main application path is unhealthy.",
    icon: "fa-solid fa-chart-line",
  },
  {
    name: "Traces + logs",
    stack: "SigNoz + ClickHouse",
    desc: "One query surface for distributed traces and structured logs across applications, infrastructure, and agents.",
    icon: "fa-solid fa-wave-square",
  },
  {
    name: "Reachability",
    stack: "Gatus",
    desc: "Directed, full-mesh health checks that probe the real kernel data path instead of trusting a control-plane ping.",
    icon: "fa-solid fa-route",
  },
  {
    name: "Log engineering",
    stack: "Versioned ingest pipelines",
    desc: "Source-controlled parsing and normalization so every producer lands on a coherent field contract.",
    icon: "fa-solid fa-diagram-project",
  },
  {
    name: "Outside view",
    stack: "ser8 watchtower",
    desc: "A second-site observer that can notice kai-server failures from outside the cluster it is watching.",
    icon: "fa-solid fa-binoculars",
  },
  {
    name: "Agent access",
    stack: "Node Stats MCP + SigNoz MCP",
    desc: "Narrow, read-only interfaces that let agents inspect hosts, traces, logs, dashboards, rules, and pipelines.",
    icon: "fa-solid fa-robot",
  },
]

export type IntegrationMode = "READ" | "READ + WRITE" | "BROWSER"
export type IntegrationAccess = "AUTH" | "PRIVATE"

export interface IntegrationEntry {
  name: string
  desc: string
  mode: IntegrationMode
  access: IntegrationAccess
  icon: string
  href: string
}

export const integrations: IntegrationEntry[] = [
  {
    name: "AWS SSM",
    desc: "A narrowly-scoped parameter broker for agents.",
    mode: "READ",
    access: "AUTH",
    icon: "/apps-icons/aws.ico",
    href: "https://aws.amazon.com/systems-manager/",
  },
  {
    name: "Forgejo",
    desc: "Issue discovery, creation, editing, comments, and closure.",
    mode: "READ + WRITE",
    access: "AUTH",
    icon: "/apps-icons/forgejo.svg",
    href: "https://forgejo.org/",
  },
  {
    name: "Glama",
    desc: "Search and inspect the wider MCP server registry.",
    mode: "READ",
    access: "AUTH",
    icon: "/apps-icons/glama.ico",
    href: "https://glama.ai/",
  },
  {
    name: "Lunch Money",
    desc: "Personal-finance transactions, budgets, and summaries.",
    mode: "READ",
    access: "AUTH",
    icon: "/apps-icons/lunch-money.ico",
    href: "https://lunchmoney.app/",
  },
  {
    name: "Playwright",
    desc: "A hosted Chromium browser that agents can steer.",
    mode: "BROWSER",
    access: "AUTH",
    icon: "/apps-icons/playwright.svg",
    href: "https://playwright.dev/",
  },
  {
    name: "Reddit",
    desc: "Private front page, unread inbox, and upvoted feeds.",
    mode: "READ",
    access: "AUTH",
    icon: "/apps-icons/reddit.svg",
    href: "https://www.reddit.com/",
  },
  {
    name: "SkillsMP",
    desc: "Search the agent-skill ecosystem by topic and category.",
    mode: "READ",
    access: "AUTH",
    icon: "/apps-icons/skillsmp.ico",
    href: "https://skillsmp.com/",
  },
  {
    name: "Steam",
    desc: "Library, playtime, and game discovery from my account.",
    mode: "READ",
    access: "AUTH",
    icon: "/apps-icons/steam.svg",
    href: "https://store.steampowered.com/",
  },
  {
    name: "Trello",
    desc: "A bounded interface for the job-search pipeline.",
    mode: "READ + WRITE",
    access: "PRIVATE",
    icon: "/apps-icons/trello.svg",
    href: "https://trello.com/",
  },
]

export interface SiteToyEntry {
  name: string
  desc: string
  href: string
  icon: string
}

export const siteToys: SiteToyEntry[] = [
  {
    name: "Bluesky Popularity Contest",
    desc: "Rank your follows by who actually shows up in your feed.",
    href: "/apps/bsky-popularity-contest/",
    icon: "fa-solid fa-ranking-star",
  },
  {
    name: "Bluesky Follow Suggestions",
    desc: "Find new accounts through the people you already follow.",
    href: "/apps/bsky-follow-suggestions/",
    icon: "fa-brands fa-bluesky",
  },
]

export interface OgData {
  title?: string
  description?: string
  image?: string
  siteName?: string
}

export type OgMap = Record<string, OgData>
