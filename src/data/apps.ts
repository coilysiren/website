// Shared apps catalog for the /apps page. Imported by both the React page
// and gatsby-node (for build-time OpenGraph fetching).

export type Status = "unknown" | "up" | "down" | "na"

export interface AppEntry {
  host: string
  url: string
  desc: string
  repo?: string
  tag?: string
  // when set, status is fixed (e.g. game-server TCP can't be checked from a browser).
  fixedStatus?: Status
  // URL to fetch for OG metadata. Defaults to `url`. Use this when `url` is
  // not an HTML page (e.g. an API root that returns JSON).
  ogUrl?: string
}

export interface HostGroup {
  name: string
  meta: string
  apps: AppEntry[]
}

export const groups: HostGroup[] = [
  {
    name: "kai-server (k3s, East Bay)",
    meta: "homelab tower / k3s cluster",
    apps: [
      {
        host: "api.coilysiren.me",
        url: "https://api.coilysiren.me",
        desc: "FastAPI ambient CRUD datastore - generic Postgres items table behind authed HTTP.",
        repo: "https://github.com/coilyco-flight-deck/backend",
        tag: "api",
      },
      {
        host: "eco-mcp.coilysiren.me",
        url: "https://eco-mcp.coilysiren.me",
        desc: "MCP server + preview UI for the Eco game's live server data.",
        repo: "https://github.com/coilyco-flight-deck/eco-mcp-app",
        tag: "mcp",
      },
      {
        host: "eco-jobs-tracker.coilysiren.me",
        url: "https://eco-jobs-tracker.coilysiren.me",
        desc: "tracks player skill specs against in-game job demand on the Sirens Eco server.",
        repo: "https://github.com/coilyco-flight-deck/eco-jobs-tracker",
        tag: "tracker",
      },
      {
        host: "galaxy-gen.coilysiren.me",
        url: "https://galaxy-gen.coilysiren.me",
        desc: "procedural galaxy generator. spin a seed, get a galaxy.",
        repo: "https://github.com/coilyco-flight-deck/galaxy-gen",
        tag: "toy",
      },
      {
        host: "grafana.coilysiren.me",
        url: "https://grafana.coilysiren.me",
        desc: "Grafana on the homelab. Node Exporter Full dashboard, anon viewer off.",
        repo: "https://github.com/coilyco-flight-deck/infrastructure",
        tag: "obs",
      },
      {
        host: "eco.coilysiren.me",
        url: "https://eco-mcp.coilysiren.me/preview",
        desc: "the Sirens Eco game server itself (TCP, port 3001). preview link goes to its live status page.",
        repo: "https://github.com/coilyco-flight-deck/infrastructure",
        tag: "game",
        fixedStatus: "na",
      },
    ],
  },
]

export interface OgData {
  title?: string
  description?: string
  image?: string
  siteName?: string
}

export type OgMap = Record<string, OgData>
