// Fetches recent activity across GitHub, Bluesky, YouTube, Reddit, and Steam.
// Writes the combined data to scripts/now-data.json for the /now page generator.
//
// Run with: node scripts/fetch-now-data.js
//
// Required credentials (all gitignored):
//   - GitHub: gh CLI must be authed (`gh auth status`)
//   - Bluesky: scripts/.bsky-credentials.json
//   - YouTube: scripts/.youtube-token.json (run scripts/youtube-auth.js first)
//   - Reddit: no auth, public JSON API
//   - Steam: scripts/.steam-credentials.json

const fs = require("fs")
const https = require("https")
const path = require("path")
const { execFileSync } = require("child_process")

const SCRIPTS_DIR = __dirname
const OUTPUT_PATH = path.join(SCRIPTS_DIR, "now-data.json")
const REDDIT_USERNAME = "coilysiren"
const BSKY_HANDLE = "coilysiren.me"
const GH_USERNAME = "coilysiren"
const USER_AGENT = "coilysiren-now-page/1.0"

// ---------- helpers ----------

function readJsonFile(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

function httpsJson(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = ""
      res.on("data", (c) => (data += c))
      res.on("end", () => {
        try {
          resolve(JSON.parse(data))
        } catch (err) {
          reject(new Error(`Bad JSON from ${options.hostname}${options.path}: ${data.slice(0, 200)}`))
        }
      })
    })
    req.on("error", reject)
    if (body) req.write(body)
    req.end()
  })
}

function httpsGet(url, headers = {}) {
  const u = new URL(url)
  return httpsJson({
    hostname: u.hostname,
    path: u.pathname + u.search,
    method: "GET",
    headers: { "User-Agent": USER_AGENT, ...headers },
  })
}

// ---------- GitHub ----------

async function fetchGitHub() {
  console.log("→ GitHub")
  // Use gh CLI for authed access
  const events = JSON.parse(
    execFileSync("gh", ["api", `/users/${GH_USERNAME}/events?per_page=100`], {
      encoding: "utf8",
    })
  )

  // Group events by type
  const commits = []
  const prs = []
  const issueComments = []
  const repoSet = new Set()

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

  const stars = JSON.parse(
    execFileSync(
      "gh",
      ["api", `/users/${GH_USERNAME}/starred?per_page=10&sort=created`],
      { encoding: "utf8" }
    )
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
  const creds = readJsonFile(path.join(SCRIPTS_DIR, ".bsky-credentials.json"))

  const session = await httpsJson(
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

  const feed = await httpsGet(
    `https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed?actor=${BSKY_HANDLE}&limit=100`,
    auth
  )
  const likes = await httpsGet(
    `https://bsky.social/xrpc/app.bsky.feed.getActorLikes?actor=${BSKY_HANDLE}&limit=100`,
    auth
  )
  const follows = await httpsGet(
    `https://bsky.social/xrpc/app.bsky.graph.getFollows?actor=${BSKY_HANDLE}&limit=100`,
    auth
  )

  return {
    posts: (feed.feed || []).map((item) => ({
      text: item.post.record.text,
      created_at: item.post.record.createdAt,
      reply_count: item.post.replyCount,
      like_count: item.post.likeCount,
      repost_count: item.post.repostCount,
      is_repost: !!item.reason,
    })),
    likes: (likes.feed || []).map((item) => ({
      author: item.post.author.handle,
      text: item.post.record.text,
      created_at: item.post.record.createdAt,
    })),
    follows: (follows.follows || []).map((f) => ({
      handle: f.handle,
      display_name: f.displayName,
      description: (f.description || "").slice(0, 200),
    })),
  }
}

// ---------- YouTube ----------

async function refreshYouTubeToken() {
  const tokenPath = path.join(SCRIPTS_DIR, ".youtube-token.json")
  const secretPath = path.join(SCRIPTS_DIR, ".youtube-client-secret.json")
  const token = readJsonFile(tokenPath)
  const secret = readJsonFile(secretPath).installed

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

  const fresh = await httpsJson(
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

  const updated = {
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

  const liked = await httpsGet(
    "https://www.googleapis.com/youtube/v3/videos?myRating=like&part=snippet&maxResults=50",
    auth
  )
  const subs = await httpsGet(
    "https://www.googleapis.com/youtube/v3/subscriptions?mine=true&part=snippet&maxResults=50&order=relevance",
    auth
  )

  return {
    // NOTE: Items are in reverse-chronological order by LIKE time
    // (index 0 = most recently liked). The YouTube API does not
    // expose the actual liked-at timestamp, so we use index as a proxy.
    // video_published_at is when the video itself was published, not
    // when Kai liked it.
    liked: (liked.items || []).map((v, i) => ({
      like_recency_index: i,
      title: v.snippet.title,
      channel: v.snippet.channelTitle,
      video_published_at: v.snippet.publishedAt,
      description: (v.snippet.description || "").slice(0, 200),
    })),
    subscriptions: (subs.items || []).map((s) => ({
      channel: s.snippet.title,
      description: (s.snippet.description || "").slice(0, 200),
    })),
  }
}

// ---------- Reddit ----------

async function fetchReddit() {
  console.log("→ Reddit")
  const submissions = await httpsGet(
    `https://www.reddit.com/user/${REDDIT_USERNAME}/submitted.json?limit=100`
  )
  const comments = await httpsGet(
    `https://www.reddit.com/user/${REDDIT_USERNAME}/comments.json?limit=100`
  )

  return {
    submissions: (submissions.data?.children || []).map((c) => ({
      subreddit: c.data.subreddit,
      title: c.data.title,
      selftext: (c.data.selftext || "").slice(0, 300),
      score: c.data.score,
      created_utc: c.data.created_utc,
      url: c.data.url,
    })),
    comments: (comments.data?.children || []).map((c) => ({
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
  const creds = readJsonFile(path.join(SCRIPTS_DIR, ".steam-credentials.json"))

  const recent = await httpsGet(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${creds.api_key}&steamid=${creds.steam_id}`
  )
  const owned = await httpsGet(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${creds.api_key}&steamid=${creds.steam_id}&include_appinfo=true&include_played_free_games=true`
  )

  const recentlyPlayed = (recent.response?.games || []).map((g) => ({
    name: g.name,
    playtime_2weeks_hours: Math.round((g.playtime_2weeks / 60) * 10) / 10,
    playtime_total_hours: Math.round(g.playtime_forever / 60),
  }))

  // Top owned games by total playtime, for context
  const topOwned = (owned.response?.games || [])
    .sort((a, b) => b.playtime_forever - a.playtime_forever)
    .slice(0, 10)
    .map((g) => ({
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
  const out = {
    fetched_at: new Date().toISOString(),
    sources: {},
  }

  const sources = [
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
      console.error(`✗ ${name}:`, err.message)
      out.sources[name] = { error: err.message }
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(out, null, 2))
  console.log(`\n✓ Wrote ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
