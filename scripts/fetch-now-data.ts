// Fetches recent activity across GitHub, Bluesky, YouTube, Reddit, and Steam.
// Writes the combined data to scripts/now-data.json for the /now page generator.
//
// Run with: pnpm fetch-now-data
//
// Required credentials (all gitignored):
//   - GitHub: gh CLI must be authed (`gh auth status`)
//   - Bluesky: scripts/.bsky-credentials.json
//   - YouTube: scripts/.youtube-token.json (run scripts/youtube-auth.ts first)
//   - Reddit: no auth, public JSON API
//   - Steam: scripts/.steam-credentials.json

import fs from "node:fs"
import https from "node:https"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = path.join(SCRIPTS_DIR, "now-data.json")
const REDDIT_USERNAME = "coilysiren"
const BSKY_HANDLE = "coilysiren.me"
const GH_USERNAME = "coilysiren"
const USER_AGENT = "coilysiren-now-page/1.0"

// ---------- helpers ----------

function readJsonFile<T = unknown>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T
}

function httpsJson<T = any>(options: https.RequestOptions, body?: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = ""
      res.on("data", (c) => (data += c))
      res.on("end", () => {
        try {
          resolve(JSON.parse(data) as T)
        } catch {
          reject(new Error(`Bad JSON from ${options.hostname}${options.path}: ${data.slice(0, 200)}`))
        }
      })
    })
    req.on("error", reject)
    if (body) req.write(body)
    req.end()
  })
}

function httpsGet<T = any>(url: string, headers: Record<string, string> = {}): Promise<T> {
  const u = new URL(url)
  return httpsJson<T>({
    hostname: u.hostname,
    path: u.pathname + u.search,
    method: "GET",
    headers: { "User-Agent": USER_AGENT, ...headers },
  })
}

// ---------- GitHub ----------

async function fetchGitHub() {
  console.log("→ GitHub")
  const events: any[] = JSON.parse(
    execFileSync("gh", ["api", `/users/${GH_USERNAME}/events?per_page=100`], {
      encoding: "utf8",
    })
  )

  const commits: Array<{ repo: string; message: string; date: string }> = []
  const prs: Array<{ repo: string; action: string; title?: string; date: string }> = []
  const issueComments: Array<{ repo: string; issue?: string; body: string; date: string }> = []
  const repoSet = new Set<string>()

  for (const e of events) {
    repoSet.add(e.repo.name)
    if (e.type === "PushEvent") {
      for (const c of e.payload.commits || []) {
        commits.push({
          repo: e.repo.name,
          message: c.message,
          date: e.created_at,
        })
      }
    } else if (e.type === "PullRequestEvent") {
      prs.push({
        repo: e.repo.name,
        action: e.payload.action,
        title: e.payload.pull_request?.title,
        date: e.created_at,
      })
    } else if (e.type === "IssueCommentEvent") {
      issueComments.push({
        repo: e.repo.name,
        issue: e.payload.issue?.title,
        body: (e.payload.comment?.body || "").slice(0, 300),
        date: e.created_at,
      })
    }
  }

  const stars = (
    JSON.parse(
      execFileSync("gh", ["api", `/users/${GH_USERNAME}/starred?per_page=10&sort=created`], { encoding: "utf8" })
    ) as any[]
  ).map((r) => ({
    repo: r.full_name,
    description: r.description,
    language: r.language,
  }))

  return {
    commits: commits.slice(0, 30),
    prs: prs.slice(0, 20),
    issue_comments: issueComments.slice(0, 20),
    active_repos: [...repoSet],
    recent_stars: stars,
  }
}

// ---------- Bluesky ----------

async function fetchBluesky() {
  console.log("→ Bluesky")
  const creds = readJsonFile<{ identifier: string; password: string }>(
    path.join(SCRIPTS_DIR, ".bsky-credentials.json")
  )

  const session = await httpsJson<{ accessJwt?: string }>(
    {
      hostname: "bsky.social",
      path: "/xrpc/com.atproto.server.createSession",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    JSON.stringify({ identifier: creds.identifier, password: creds.password })
  )

  if (!session.accessJwt) {
    throw new Error("Bluesky auth failed: " + JSON.stringify(session))
  }

  const auth = { Authorization: `Bearer ${session.accessJwt}` }

  const feed = await httpsGet<any>(
    `https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed?actor=${BSKY_HANDLE}&limit=100`,
    auth
  )
  const likes = await httpsGet<any>(
    `https://bsky.social/xrpc/app.bsky.feed.getActorLikes?actor=${BSKY_HANDLE}&limit=100`,
    auth
  )
  const follows = await httpsGet<any>(
    `https://bsky.social/xrpc/app.bsky.graph.getFollows?actor=${BSKY_HANDLE}&limit=100`,
    auth
  )

  return {
    posts: (feed.feed || []).map((item: any) => ({
      text: item.post.record.text,
      created_at: item.post.record.createdAt,
      reply_count: item.post.replyCount,
      like_count: item.post.likeCount,
      repost_count: item.post.repostCount,
      is_repost: !!item.reason,
    })),
    likes: (likes.feed || []).map((item: any) => ({
      author: item.post.author.handle,
      text: item.post.record.text,
      created_at: item.post.record.createdAt,
    })),
    follows: (follows.follows || []).map((f: any) => ({
      handle: f.handle,
      display_name: f.displayName,
      description: (f.description || "").slice(0, 200),
    })),
  }
}

// ---------- YouTube ----------

interface YouTubeToken {
  access_token?: string
  refresh_token: string
  expires_in: number
  obtained_at?: number
}

async function refreshYouTubeToken(): Promise<string> {
  const tokenPath = path.join(SCRIPTS_DIR, ".youtube-token.json")
  const secretPath = path.join(SCRIPTS_DIR, ".youtube-client-secret.json")
  const token = readJsonFile<YouTubeToken>(tokenPath)
  const secret = readJsonFile<{ installed: { client_id: string; client_secret: string } }>(secretPath).installed

  const ageMs = Date.now() - (token.obtained_at || 0)
  const expiresMs = (token.expires_in - 60) * 1000
  if (ageMs < expiresMs && token.access_token) {
    return token.access_token
  }

  console.log("  refreshing YouTube token...")
  const body = new URLSearchParams({
    client_id: secret.client_id,
    client_secret: secret.client_secret,
    refresh_token: token.refresh_token,
    grant_type: "refresh_token",
  }).toString()

  const fresh = await httpsJson<{ access_token?: string; expires_in: number }>(
    {
      hostname: "oauth2.googleapis.com",
      path: "/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(body),
      },
    },
    body
  )

  if (!fresh.access_token) {
    throw new Error("YouTube refresh failed: " + JSON.stringify(fresh))
  }

  const updated: YouTubeToken = {
    ...token,
    access_token: fresh.access_token,
    expires_in: fresh.expires_in,
    obtained_at: Date.now(),
  }
  fs.writeFileSync(tokenPath, JSON.stringify(updated, null, 2))
  return fresh.access_token
}

async function fetchYouTube() {
  console.log("→ YouTube")
  const accessToken = await refreshYouTubeToken()
  const auth = { Authorization: `Bearer ${accessToken}` }

  const liked = await httpsGet<any>(
    "https://www.googleapis.com/youtube/v3/videos?myRating=like&part=snippet&maxResults=50",
    auth
  )
  const subs = await httpsGet<any>(
    "https://www.googleapis.com/youtube/v3/subscriptions?mine=true&part=snippet&maxResults=50&order=relevance",
    auth
  )

  return {
    // Items are in reverse-chronological order by LIKE time (index 0 = most
    // recently liked). The YouTube API does not expose the actual liked-at
    // timestamp, so we use index as a proxy. video_published_at is when the
    // video itself was published, not when Kai liked it.
    liked: (liked.items || []).map((v: any, i: number) => ({
      like_recency_index: i,
      title: v.snippet.title,
      channel: v.snippet.channelTitle,
      video_published_at: v.snippet.publishedAt,
      description: (v.snippet.description || "").slice(0, 200),
    })),
    subscriptions: (subs.items || []).map((s: any) => ({
      channel: s.snippet.title,
      description: (s.snippet.description || "").slice(0, 200),
    })),
  }
}

// ---------- Reddit ----------

async function fetchReddit() {
  console.log("→ Reddit")
  const submissions = await httpsGet<any>(
    `https://www.reddit.com/user/${REDDIT_USERNAME}/submitted.json?limit=100`
  )
  const comments = await httpsGet<any>(
    `https://www.reddit.com/user/${REDDIT_USERNAME}/comments.json?limit=100`
  )

  return {
    submissions: (submissions.data?.children || []).map((c: any) => ({
      subreddit: c.data.subreddit,
      title: c.data.title,
      selftext: (c.data.selftext || "").slice(0, 300),
      score: c.data.score,
      created_utc: c.data.created_utc,
      url: c.data.url,
    })),
    comments: (comments.data?.children || []).map((c: any) => ({
      subreddit: c.data.subreddit,
      body: (c.data.body || "").slice(0, 400),
      score: c.data.score,
      created_utc: c.data.created_utc,
      link_title: c.data.link_title,
    })),
  }
}

// ---------- Steam ----------

async function fetchSteam() {
  console.log("→ Steam")
  const creds = readJsonFile<{ api_key: string; steam_id: string }>(
    path.join(SCRIPTS_DIR, ".steam-credentials.json")
  )

  const recent = await httpsGet<any>(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${creds.api_key}&steamid=${creds.steam_id}`
  )
  const owned = await httpsGet<any>(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${creds.api_key}&steamid=${creds.steam_id}&include_appinfo=true&include_played_free_games=true`
  )

  const recentlyPlayed = (recent.response?.games || []).map((g: any) => ({
    name: g.name,
    playtime_2weeks_hours: Math.round((g.playtime_2weeks / 60) * 10) / 10,
    playtime_total_hours: Math.round(g.playtime_forever / 60),
  }))

  const topOwned = (owned.response?.games || [])
    .sort((a: any, b: any) => b.playtime_forever - a.playtime_forever)
    .slice(0, 10)
    .map((g: any) => ({
      name: g.name,
      playtime_total_hours: Math.round(g.playtime_forever / 60),
    }))

  return {
    recently_played: recentlyPlayed,
    top_owned: topOwned,
    total_owned: owned.response?.game_count || 0,
  }
}

// ---------- main ----------

async function main() {
  const out: { fetched_at: string; sources: Record<string, unknown> } = {
    fetched_at: new Date().toISOString(),
    sources: {},
  }

  const sources: Array<[string, () => Promise<unknown>]> = [
    ["github", fetchGitHub],
    ["bluesky", fetchBluesky],
    ["youtube", fetchYouTube],
    ["reddit", fetchReddit],
    ["steam", fetchSteam],
  ]

  for (const [name, fn] of sources) {
    try {
      out.sources[name] = await fn()
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`✗ ${name}:`, message)
      out.sources[name] = { error: message }
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(out, null, 2))
  console.log(`\n✓ Wrote ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
