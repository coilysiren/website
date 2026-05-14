// Fetches the last 30 days of public commits by coilysiren across all
// public repos and writes a rollup to scripts/pulse-data.yaml for the
// /pulse page's activity sparkline.
//
// Run with: pnpm fetch-pulse-data
// Auth: GITHUB_TOKEN env var (Actions) or `gh auth token` (local).

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"
import yaml from "js-yaml"
import pLimit from "p-limit"
import parseLinkHeader from "parse-link-header"
import { format, subDays } from "date-fns"

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = path.join(SCRIPTS_DIR, "pulse-data.yaml")
const GH_USERNAME = "coilysiren"
const WINDOW_DAYS = 30
const USER_AGENT = "coilysiren-pulse/1.0"
const LINGUIST_COLORS_URL =
  "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
const FALLBACK_COLOR = "#888888"
const CONCURRENCY = 12

type Commit = {
  sha: string
  repo: string
  date: string
  message: string
  url: string
  loc: number
}

type DaySegment = { repo: string; loc: number; commits: number }
type Day = {
  date: string
  totalLoc: number
  totalCommits: number
  topCommit: Omit<Commit, "date"> | null
  segments: DaySegment[]
}

function ghToken(): string {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN
  return execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim()
}

const TOKEN = ghToken()

async function ghFetch(url: string, extraHeaders: Record<string, string> = {}): Promise<Response> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/vnd.github+json",
      ...extraHeaders,
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub API ${res.status} on ${url}: ${body.slice(0, 200)}`)
  }
  return res
}

async function ghApi<T>(endpoint: string): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `https://api.github.com${endpoint}`
  const res = await ghFetch(url, { Authorization: `Bearer ${TOKEN}` })
  return (await res.json()) as T
}

async function ghApiPaginated<T>(
  endpoint: string,
  extract: (page: unknown) => T[]
): Promise<T[]> {
  let url: string | null = endpoint.startsWith("http")
    ? endpoint
    : `https://api.github.com${endpoint}`
  const items: T[] = []
  while (url) {
    const res = await ghFetch(url, { Authorization: `Bearer ${TOKEN}` })
    items.push(...extract(await res.json()))
    const links = parseLinkHeader(res.headers.get("link"))
    url = links?.next?.url ?? null
  }
  return items
}

function isoDaysAgo(n: number): string {
  return format(subDays(new Date(), n), "yyyy-MM-dd")
}

async function listOwnedRepos(): Promise<string[]> {
  // REST /users/{u}/repos returns public repos only (regardless of token scope).
  // type=owner filters out repos the user contributes to but doesn't own.
  const repos = await ghApiPaginated<Record<string, unknown>>(
    `/users/${GH_USERNAME}/repos?per_page=100&type=owner&sort=pushed`,
    (page) => (page as Record<string, unknown>[]) || []
  )
  return repos
    .filter((r) => !r.archived && !r.fork && !r.disabled)
    .map((r) => r.full_name as string)
}

async function fetchCommits(): Promise<Commit[]> {
  const since = isoDaysAgo(WINDOW_DAYS)
  const sinceIso = new Date(`${since}T00:00:00Z`).toISOString()
  console.log(`→ commits since ${since}`)

  const repos = await listOwnedRepos()
  console.log(`  scanning ${repos.length} owned public repos`)

  const limit = pLimit(CONCURRENCY)
  const perRepo = await Promise.all(
    repos.map((repoFull) =>
      limit(async () => {
        try {
          return await ghApiPaginated<Record<string, unknown>>(
            `/repos/${repoFull}/commits?author=${GH_USERNAME}&since=${sinceIso}&per_page=100`,
            (page) => (page as Record<string, unknown>[]) || []
          )
        } catch (err) {
          // 409 Conflict = empty repo. Treat as no commits, not a failure.
          const msg = err instanceof Error ? err.message : String(err)
          if (msg.includes(" 409 ")) return []
          throw err
        }
      })
    )
  )

  const commits: Commit[] = []
  for (let i = 0; i < repos.length; i++) {
    const repoFull = repos[i]
    for (const item of perRepo[i]) {
      const commit = item.commit as {
        committer: { date: string }
        message: string
      }
      const sha = item.sha as string
      const firstLine = (commit.message || "").split("\n")[0] || ""
      commits.push({
        sha,
        repo: repoFull,
        date: commit.committer.date,
        message: firstLine.slice(0, 240),
        url: `https://github.com/${repoFull}/commit/${sha}`,
        loc: 0,
      })
    }
  }

  console.log(`  found ${commits.length} commits`)
  if (commits.length === 0) {
    throw new Error(
      "REST /repos/X/commits returned 0 results across all owned repos - refusing to overwrite pulse-data.yaml with empty data. Likely an auth or pagination regression; investigate before rerunning.",
    )
  }
  return commits
}

async function enrichLoc(commits: Commit[]) {
  console.log(`→ stats for ${commits.length} commits (concurrency ${CONCURRENCY})`)
  const limit = pLimit(CONCURRENCY)
  let done = 0
  await Promise.all(
    commits.map((c) =>
      limit(async () => {
        try {
          const info = await ghApi<{
            stats?: { additions: number; deletions: number }
          }>(`/repos/${c.repo}/commits/${c.sha}`)
          c.loc = info.stats ? info.stats.additions + info.stats.deletions : 0
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err)
          console.warn(`  stats failed for ${c.repo}@${c.sha.slice(0, 7)}: ${msg.slice(0, 120)}`)
        }
        done++
        if (done % 100 === 0) console.log(`  ${done}/${commits.length}`)
      })
    )
  )
}

async function fetchRepoLanguages(
  repos: string[]
): Promise<Record<string, string | null>> {
  console.log(`→ language for ${repos.length} repos`)
  const out: Record<string, string | null> = {}
  await Promise.all(
    repos.map(async (r) => {
      try {
        const info = await ghApi<{ language: string | null }>(`/repos/${r}`)
        out[r] = info.language
      } catch {
        out[r] = null
      }
    })
  )
  return out
}

async function fetchLinguistColors(): Promise<Record<string, string>> {
  console.log("→ linguist colors")
  const res = await ghFetch(LINGUIST_COLORS_URL)
  const raw = (await res.json()) as Record<string, { color?: string }>
  const map: Record<string, string> = {}
  for (const [lang, entry] of Object.entries(raw)) {
    if (entry.color) map[lang] = entry.color
  }
  return map
}

function bucketByDay(commits: Commit[]): Day[] {
  const byDate: Record<string, Commit[]> = {}
  for (const c of commits) {
    const day = c.date.slice(0, 10)
    ;(byDate[day] ||= []).push(c)
  }

  const days: Day[] = []
  for (let i = WINDOW_DAYS - 1; i >= 0; i--) {
    const date = isoDaysAgo(i)
    const dayCommits = byDate[date] || []
    const byRepo: Record<string, DaySegment> = {}
    for (const c of dayCommits) {
      const seg = (byRepo[c.repo] ||= { repo: c.repo, loc: 0, commits: 0 })
      seg.loc += c.loc
      seg.commits += 1
    }
    const segments = Object.values(byRepo).sort((a, b) => b.loc - a.loc)
    const top = [...dayCommits].sort((a, b) => b.loc - a.loc)[0]
    days.push({
      date,
      totalLoc: segments.reduce((s, x) => s + x.loc, 0),
      totalCommits: dayCommits.length,
      topCommit: top
        ? {
            sha: top.sha,
            repo: top.repo,
            message: top.message,
            url: top.url,
            loc: top.loc,
          }
        : null,
      segments,
    })
  }
  return days
}

function pickOutlier(days: Day[]) {
  const candidate = [...days].sort((a, b) => b.totalLoc - a.totalLoc)[0]
  if (!candidate || candidate.totalLoc === 0) return null
  return {
    date: candidate.date,
    loc: candidate.totalLoc,
    commits: candidate.totalCommits,
    topCommit: candidate.topCommit,
  }
}

async function main() {
  const commits = await fetchCommits()
  await enrichLoc(commits)

  const uniqueRepos = [...new Set(commits.map((c) => c.repo))].sort()
  const [langs, colors] = await Promise.all([
    fetchRepoLanguages(uniqueRepos),
    fetchLinguistColors(),
  ])

  const repoMeta: Record<string, { language: string | null; color: string }> = {}
  for (const r of uniqueRepos) {
    const lang = langs[r] ?? null
    repoMeta[r] = {
      language: lang,
      color: (lang && colors[lang]) || FALLBACK_COLOR,
    }
  }

  const days = bucketByDay(commits)
  const outlier = pickOutlier(days)

  const workflowRunUrl =
    process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : null

  const out = {
    refreshedAt: new Date().toISOString(),
    workflowRunUrl,
    windowDays: WINDOW_DAYS,
    repos: repoMeta,
    days,
    outlier,
  }

  fs.writeFileSync(
    OUTPUT_PATH,
    yaml.dump(out, { lineWidth: 120, noRefs: true, sortKeys: false })
  )
  console.log(`\n✓ Wrote ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
