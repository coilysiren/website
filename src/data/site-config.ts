// Per-site config for the three repo-enumerating Gatsby sites. Fields here
// replace the coilysiren hardcodes in scripts/render-og-images.tsx.

export type Dialect = "metrics" | "narrative" | "blend"

// Keys mirror the COLORS object in scripts/render-og-images.tsx exactly.
export interface Palette {
  bgDeep: string
  bgDark: string
  bgMid: string
  bgLight: string
  panel: string
  rule: string
  ruleFaint: string
  text: string
  textMuted: string
  textDim: string
  accent: string
  accentMid: string
}

export interface Branding {
  /** Real host, no scheme. Drives SITE_HOST + footer route. */
  host: string
  /** Footer wordmark — replaces the hardcoded "coilysiren" in StandardCard. */
  wordmark: string
  /** Hero name / MarkBlock label — replaces KAI. */
  owner: string
  /** DefaultCard fallback subtitle — replaces SITE_TAGLINE. */
  tagline: string
  /** DefaultCard bottom kicker strip. */
  footerKicker: string
}

/** The Verou <-> Appleton axis, expressed as render flags. */
export interface CardStyle {
  dialect: Dialect
  /** GridBackdrop vs a warm illustration slot vs a mix. */
  backdrop: "grid" | "illustration" | "blend"
  /** BoltMark vs a per-site glyph. */
  mark: "bolt" | "custom"
  /** Render a stars/commits stat row on the card (Verou dialect only). */
  showMetrics: boolean
}

export type SiteId = "flight-deck" | "bridge" | "coilysiren"

export interface SiteConfig {
  id: SiteId
  branding: Branding
  palette: Palette
  card: CardStyle
}

/** Velocity bucket names are TBD per forgejo #521; keep it a plain string. */
export type VelocityBucket = string

/** A repo as enumerated on a card — replaces markdown-frontmatter discovery. */
export interface RepoEntry {
  /** -> card title */
  name: string
  /** -> card subtitle */
  description: string
  url: string
  kind: "repo"
  /** -> KindBadge text once #521 ships */
  bucket?: VelocityBucket
  /** Populated at build time (same mechanism src/data/apps.ts uses for OG). */
  metrics?: {
    stars?: number
    commitsPerWeek?: number
    lastRelease?: string
  }
}

export const SITES: Record<SiteId, SiteConfig> = {
  // metrics & authority — Verou. cool, data-forward.
  "flight-deck": {
    id: "flight-deck",
    branding: {
      host: "flightdeck.coilysiren.me",
      wordmark: "flightdeck",
      owner: "Coily Co — Flight Deck",
      // TODO(kai): real tagline — draft below.
      tagline: "instruments green, the line is moving",
      footerKicker: "platform / metrics / uptime",
    },
    palette: {
      bgDeep: "#0d1b24",
      bgDark: "#12303d",
      bgMid: "#1c4a5e",
      bgLight: "#3d7a91",
      panel: "rgba(255, 255, 255, 0.04)",
      rule: "rgba(120, 200, 220, 0.22)",
      ruleFaint: "rgba(120, 200, 220, 0.08)",
      text: "#ffffff",
      textMuted: "#cfeaf2",
      textDim: "#8fb8c4",
      accent: "#4fd6e8",
      accentMid: "#3d7a91",
    },
    card: { dialect: "metrics", backdrop: "grid", mark: "bolt", showMetrics: true },
  },

  // warmth & narrative — Appleton. illustration over grid, no stat row.
  bridge: {
    id: "bridge",
    branding: {
      host: "bridge.coilysiren.me",
      wordmark: "bridge",
      owner: "Coily Co — Bridge",
      // TODO(kai): real tagline — draft below.
      tagline: "where the work meets the people",
      footerKicker: "connection / stories / craft",
    },
    palette: {
      bgDeep: "#2b1d14",
      bgDark: "#3d2a1c",
      bgMid: "#5e4330",
      bgLight: "#a8794f",
      panel: "rgba(255, 255, 255, 0.05)",
      rule: "rgba(230, 190, 150, 0.22)",
      ruleFaint: "rgba(230, 190, 150, 0.08)",
      text: "#fdf6ee",
      textMuted: "#ecd9c4",
      textDim: "#c9a883",
      accent: "#f0b27a",
      accentMid: "#a8794f",
    },
    card: { dialect: "narrative", backdrop: "illustration", mark: "custom", showMetrics: false },
  },

  // personal + weird, a blend — keeps the current coilysiren violet palette verbatim.
  coilysiren: {
    id: "coilysiren",
    branding: {
      host: "coilysiren.me",
      wordmark: "coilysiren",
      owner: "Kai Siren",
      tagline: "lights out, platform's green, agents are working the line",
      footerKicker: "platform engineer / east bay",
    },
    palette: {
      bgDeep: "#2a2540",
      bgDark: "#3e375d",
      bgMid: "#574f7d",
      bgLight: "#9192bb",
      panel: "rgba(255, 255, 255, 0.04)",
      rule: "rgba(255, 255, 255, 0.18)",
      ruleFaint: "rgba(255, 255, 255, 0.08)",
      text: "#ffffff",
      textMuted: "#dfd9f0",
      textDim: "#b6acd6",
      accent: "#dff0ea",
      accentMid: "#95adbe",
    },
    card: { dialect: "blend", backdrop: "blend", mark: "bolt", showMetrics: true },
  },
}
