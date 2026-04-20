// One-time OAuth setup for YouTube Data API.
// Run with: pnpm youtube-auth
// Saves refresh token to scripts/.youtube-token.json for future use.

import fs from "node:fs"
import http from "node:http"
import https from "node:https"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"
import type { AddressInfo } from "node:net"

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url))
const CLIENT_SECRET_PATH = path.join(SCRIPTS_DIR, ".youtube-client-secret.json")
const TOKEN_PATH = path.join(SCRIPTS_DIR, ".youtube-token.json")
const SCOPE = "https://www.googleapis.com/auth/youtube.readonly"

interface ClientSecret {
  installed: {
    client_id: string
    client_secret: string
    token_uri: string
    auth_uri: string
  }
}

const clientSecret = JSON.parse(fs.readFileSync(CLIENT_SECRET_PATH, "utf8")) as ClientSecret
const { client_id, client_secret, token_uri, auth_uri } = clientSecret.installed

const server = http.createServer()
server.listen(0, "127.0.0.1", () => {
  const addr = server.address() as AddressInfo
  const port = addr.port
  const redirectUri = `http://127.0.0.1:${port}/callback`

  const authUrl = new URL(auth_uri)
  authUrl.searchParams.set("client_id", client_id)
  authUrl.searchParams.set("redirect_uri", redirectUri)
  authUrl.searchParams.set("response_type", "code")
  authUrl.searchParams.set("scope", SCOPE)
  authUrl.searchParams.set("access_type", "offline")
  authUrl.searchParams.set("prompt", "consent")

  console.log("\nOpening browser to authorize...")
  console.log("If it doesn't open, visit this URL manually:\n")
  console.log(authUrl.toString())
  console.log()

  try {
    execFileSync("open", [authUrl.toString()])
  } catch {
    // ignore — user can copy the URL
  }
})

let handled = false
server.on("request", (req, res) => {
  const addr = server.address() as AddressInfo | null
  if (!addr) {
    res.end()
    return
  }
  const reqUrl = new URL(req.url ?? "/", `http://127.0.0.1:${addr.port}`)
  if (reqUrl.pathname !== "/callback" || handled) {
    res.writeHead(404)
    res.end()
    return
  }
  handled = true

  const code = reqUrl.searchParams.get("code")
  const error = reqUrl.searchParams.get("error")

  if (error) {
    res.writeHead(400, { "Content-Type": "text/html" })
    res.end(`<h1>OAuth error: ${error}</h1>`)
    console.error("OAuth error:", error)
    server.close()
    process.exit(1)
  }

  if (!code) {
    res.writeHead(400)
    res.end("Missing code")
    return
  }

  const port = addr.port
  const body = new URLSearchParams({
    code,
    client_id,
    client_secret,
    redirect_uri: `http://127.0.0.1:${port}/callback`,
    grant_type: "authorization_code",
  }).toString()

  const tokenUrl = new URL(token_uri)
  const tokenReq = https.request(
    {
      hostname: tokenUrl.hostname,
      path: tokenUrl.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(body),
      },
    },
    (tokenRes) => {
      let data = ""
      tokenRes.on("data", (chunk) => (data += chunk))
      tokenRes.on("end", () => {
        const tokens = JSON.parse(data) as {
          error?: string
          refresh_token?: string
          [key: string]: unknown
        }
        if (tokens.error) {
          res.writeHead(400, { "Content-Type": "text/html" })
          res.end(`<h1>Token exchange failed: ${tokens.error}</h1>`)
          console.error("Token exchange failed:", tokens)
          server.close()
          process.exit(1)
        }

        const toSave = { ...tokens, obtained_at: Date.now() }
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(toSave, null, 2))
        fs.chmodSync(TOKEN_PATH, 0o600)

        res.writeHead(200, { "Content-Type": "text/html" })
        res.end("<h1>Success! You can close this tab and return to your terminal.</h1>")
        console.log(`\n✓ Tokens saved to ${TOKEN_PATH}`)
        console.log("  Has refresh_token:", !!tokens.refresh_token)
        server.close()
      })
    }
  )

  tokenReq.on("error", (err) => {
    console.error("Token request failed:", err)
    server.close()
    process.exit(1)
  })

  tokenReq.write(body)
  tokenReq.end()
})
