import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import type { CSSProperties } from "react"
import yaml from "js-yaml"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT = path.resolve(__dirname, "..")
const OUT_DIR = path.join(ROOT, "static", "og")
const FONT_DIR = path.join(ROOT, "node_modules", "@fontsource", "roboto", "files")

const SITE_HOST = "coilysiren.me"
const SITE_TAGLINE = "lights out, platform's green, agents are working the line"
const KAI = "Kai Siren"

type Kind = "post" | "now" | "apps" | "page" | "default"

interface Entry {
  outPath: string
  kind: Kind
  title: string
  subtitle?: string
  date?: string
}

const COLORS = {
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
}

const KIND_LABEL: Record<Kind, string> = {
  post: "POST",
  now: "NOW",
  apps: "APPS",
  page: "PAGE",
  default: "",
}

function loadFont(file: string): Buffer {
  return fs.readFileSync(path.join(FONT_DIR, file))
}

interface Frontmatter {
  title?: string
  description?: string
  date?: string
  templateKey?: string
}

function parseFrontmatter(filepath: string): Frontmatter {
  const content = fs.readFileSync(filepath, "utf8")
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return {}
  const raw = yaml.load(m[1] ?? "", { schema: yaml.JSON_SCHEMA }) as
    | Record<string, unknown>
    | null
    | undefined
  if (!raw) return {}
  const pickStr = (v: unknown): string | undefined =>
    typeof v === "string" && v.trim() ? v.trim() : undefined
  return {
    title: pickStr(raw.title),
    description: pickStr(raw.description),
    date: pickStr(raw.date),
    templateKey: pickStr(raw["template-key"]) ?? pickStr(raw["template_key"]),
  }
}

function discoverPosts(): Entry[] {
  const dir = path.join(ROOT, "src", "pages", "posts")
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const stem = f.slice(0, -3)
      const fm = parseFrontmatter(path.join(dir, f))
      return {
        outPath: `posts/${stem}.png`,
        kind: "post" as Kind,
        title: fm.title ?? stem,
        subtitle: fm.description,
        date: fm.date,
      }
    })
}

function discoverTopLevelMarkdown(): Entry[] {
  const dir = path.join(ROOT, "src", "pages")
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const stem = f.slice(0, -3)
      const fm = parseFrontmatter(path.join(dir, f))
      const kind: Kind = stem === "now" ? "now" : "page"
      const outPath = `${stem}.png`
      return {
        outPath,
        kind,
        title: fm.title ?? stem,
        subtitle: fm.description ?? MARKDOWN_SUBTITLE_OVERRIDES[outPath],
      }
    })
}

const MARKDOWN_SUBTITLE_OVERRIDES: Record<string, string> = {
  "now.png": "What I'm focused on at this point in my life - building, reading, and playing.",
  "cool-people.png": "People I think are great and want to hype up.",
  "eco-modding.png": "Public C# mods I've shipped for Strange Loop Games' Eco.",
  "resume.png":
    "Senior platform engineer. Python, AWS, Kubernetes, Terraform, observability, LLM APIs.",
}

const TSX_ENTRIES: Entry[] = [
  {
    outPath: "default.png",
    kind: "default",
    title: KAI,
    subtitle: SITE_TAGLINE,
  },
  {
    outPath: "home.png",
    kind: "default",
    title: KAI,
    subtitle: SITE_TAGLINE,
  },
  {
    outPath: "pulse.png",
    kind: "page",
    title: "Pulse",
    subtitle: "site activity rhythms - posts, builds, and the cadence of the week",
  },
  {
    outPath: "apps/index.png",
    kind: "apps",
    title: "Apps",
    subtitle: "A topology of the things I run on the internet.",
  },
  {
    outPath: "apps/bsky-popularity-contest.png",
    kind: "apps",
    title: "Bluesky Popularity Contest",
    subtitle: "Rank your follows by who actually shows up in your feed.",
  },
  {
    outPath: "apps/bsky-follow-suggestions.png",
    kind: "apps",
    title: "Bluesky Follow Suggestions",
    subtitle: "Find new accounts via the people you already follow.",
  },
]

function deduplicateByOutPath(entries: Entry[]): Entry[] {
  const seen = new Map<string, Entry>()
  for (const e of entries) seen.set(e.outPath, e)
  return [...seen.values()]
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true })
}

function fitTitle(title: string, max = 90): string {
  if (title.length <= max) return title
  return title.slice(0, max - 1).replace(/\s+\S*$/, "") + "..."
}

function fitSubtitle(subtitle: string | undefined, max = 180): string | undefined {
  if (!subtitle) return undefined
  if (subtitle.length <= max) return subtitle
  return subtitle.slice(0, max - 1).replace(/\s+\S*$/, "") + "..."
}

const BASE_FRAME: CSSProperties = {
  width: 1200,
  height: 630,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  fontFamily: "Roboto",
  color: COLORS.text,
  backgroundColor: COLORS.bgDark,
  backgroundImage: `linear-gradient(135deg, ${COLORS.bgDeep} 0%, ${COLORS.bgDark} 45%, ${COLORS.bgMid} 100%)`,
  overflow: "hidden",
}

function MarkBlock() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          width: 48,
          height: 48,
          borderRadius: 24,
          border: `2px solid ${COLORS.accent}`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: COLORS.accent,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: COLORS.text,
          }}
        >
          {KAI}
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "0.18em",
            color: COLORS.accentMid,
            textTransform: "uppercase",
          }}
        >
          {SITE_HOST}
        </div>
      </div>
    </div>
  )
}

function GridBackdrop() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: 240,
          backgroundColor: "rgba(159, 153, 200, 0.10)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: -160,
          width: 560,
          height: 560,
          borderRadius: 280,
          backgroundColor: "rgba(149, 173, 190, 0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 80,
          width: 6,
          height: 220,
          backgroundColor: COLORS.accent,
          opacity: 0.55,
          transform: "rotate(20deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 130,
          width: 6,
          height: 140,
          backgroundColor: COLORS.accentMid,
          opacity: 0.5,
          transform: "rotate(20deg)",
        }}
      />
    </div>
  )
}

function KindBadge({ kind }: { kind: Kind }) {
  const label = KIND_LABEL[kind]
  if (!label) return null
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 16px",
        borderRadius: 999,
        border: `1px solid ${COLORS.rule}`,
        backgroundColor: COLORS.panel,
      }}
    >
      <div
        style={{
          display: "flex",
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: COLORS.accent,
        }}
      />
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: COLORS.textMuted,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function BoltMark({ size = 22, color = COLORS.accent }: { size?: number; color?: string }) {
  // A small "lightning bolt" mark drawn with two rotated rectangles, since
  // most unicode bolt glyphs (⌁ ⚡) are missing from Roboto's Latin set.
  const w = Math.round(size * 0.32)
  const h = Math.round(size * 0.7)
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: w,
          height: h,
          backgroundColor: color,
          transform: "rotate(20deg) translateX(-3px)",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: w,
          height: h,
          backgroundColor: color,
          transform: "rotate(20deg) translateX(3px) translateY(2px)",
          opacity: 0.6,
        }}
      />
    </div>
  )
}

function StandardCard(entry: Entry) {
  const title = fitTitle(entry.title)
  const subtitle = fitSubtitle(entry.subtitle)
  const titleLen = title.length
  const titleSize =
    titleLen > 70 ? 64 : titleLen > 45 ? 78 : titleLen > 28 ? 92 : titleLen > 12 ? 108 : 132

  return (
    <div style={BASE_FRAME}>
      <GridBackdrop />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "64px 80px",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MarkBlock />
          <KindBadge kind={entry.kind} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 120,
              height: 4,
              backgroundColor: COLORS.accent,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              color: COLORS.text,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 32,
                fontWeight: 400,
                lineHeight: 1.3,
                color: COLORS.textMuted,
                maxWidth: 1000,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            borderTop: `1px solid ${COLORS.ruleFaint}`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: COLORS.textDim,
            }}
          >
            {entry.date ?? `${SITE_HOST}${routeFromOutPath(entry.outPath)}`}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <BoltMark size={22} color={COLORS.accent} />
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: COLORS.accent,
              }}
            >
              coilysiren
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DefaultCard(entry: Entry) {
  return (
    <div style={BASE_FRAME}>
      <GridBackdrop />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "80px 96px",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              borderRadius: 22,
              border: `2px solid ${COLORS.accent}`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: COLORS.accent,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: COLORS.textMuted,
              textTransform: "uppercase",
            }}
          >
            {SITE_HOST}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 152,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: COLORS.text,
            }}
          >
            {entry.title}
          </div>
          <div
            style={{
              display: "flex",
              width: 180,
              height: 4,
              backgroundColor: COLORS.accent,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 34,
              fontWeight: 400,
              lineHeight: 1.35,
              color: COLORS.textMuted,
              maxWidth: 980,
            }}
          >
            {entry.subtitle ?? SITE_TAGLINE}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <BoltMark size={22} color={COLORS.accent} />
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: COLORS.accent,
              textTransform: "uppercase",
            }}
          >
            platform engineer / east bay
          </div>
          <BoltMark size={22} color={COLORS.accent} />
        </div>
      </div>
    </div>
  )
}

function routeFromOutPath(outPath: string): string {
  // home.png -> "/", default.png -> "/", "apps/index.png" -> "/apps/",
  // "posts/foo.png" -> "/posts/foo/", "now.png" -> "/now/"
  const stem = outPath.replace(/\.png$/, "")
  if (stem === "home" || stem === "default") return "/"
  if (stem.endsWith("/index")) return `/${stem.slice(0, -"/index".length)}/`
  return `/${stem}/`
}

function renderToReactNode(entry: Entry) {
  if (entry.kind === "default") return DefaultCard(entry)
  return StandardCard(entry)
}

async function renderOne(entry: Entry, fonts: Awaited<ReturnType<typeof loadFonts>>): Promise<void> {
  const node = renderToReactNode(entry)
  const svg = await satori(node, {
    width: 1200,
    height: 630,
    fonts,
  })
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
    .render()
    .asPng()
  const out = path.join(OUT_DIR, entry.outPath)
  ensureDir(path.dirname(out))
  fs.writeFileSync(out, png)
}

async function loadFonts() {
  return [
    {
      name: "Roboto",
      data: loadFont("roboto-latin-400-normal.woff"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Roboto",
      data: loadFont("roboto-latin-700-normal.woff"),
      weight: 700 as const,
      style: "normal" as const,
    },
  ]
}

async function main() {
  const t0 = Date.now()
  ensureDir(OUT_DIR)
  const entries = deduplicateByOutPath([
    ...TSX_ENTRIES,
    ...discoverTopLevelMarkdown(),
    ...discoverPosts(),
  ])
  const fonts = await loadFonts()
  let ok = 0
  let failed = 0
  for (const entry of entries) {
    try {
      await renderOne(entry, fonts)
      ok += 1
    } catch (err) {
      failed += 1
      console.error(`[og] FAIL ${entry.outPath}:`, err instanceof Error ? err.message : err)
    }
  }
  const ms = Date.now() - t0
  console.log(`[og] rendered ${ok}/${entries.length} images to static/og/ in ${ms}ms`)
  if (failed > 0) process.exit(1)
}

main().catch((err) => {
  console.error("[og] fatal:", err)
  process.exit(1)
})
