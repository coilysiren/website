// One-time OAuth setup for YouTube Data API.
// Run with: pnpm youtube-auth
//
// Reads /youtube/client-id and /youtube/client-secret from AWS SSM, runs the
// OAuth consent flow, and writes the minted refresh token back to SSM under
// /youtube/refresh-token.
//
// Re-run only when the refresh token gets revoked (sign-out, client-secret
// rotation, 6-month inactivity).

import http from "node:http"
import https from "node:https"
import { execFileSync } from "node:child_process"
import type { AddressInfo } from "node:net"

const SCOPE = "https://www.googleapis.com/auth/youtube.readonly"
const AUTH_URI = "https://accounts.google.com/o/oauth2/auth"
const TOKEN_URI = "https://oauth2.googleapis.com/token"

function ssmGet(name: string): string {
  return execFileSync(
    "aws",
    ["ssm", "get-parameter", "--name", name, "--with-decryption", "--query", "Parameter.Value", "--output", "text"],
    { encoding: "utf8" }
  ).trim()
}

function ssmPut(name: string, value: string): void {
  execFileSync("aws", ["ssm", "put-parameter", "--name", name, "--type", "SecureString", "--value", value, "--overwrite"])
}

const client_id = ssmGet("/youtube/client-id")
const client_secret = ssmGet("/youtube/client-secret")

const server = http.createServer()
server.listen(0, "127.0.0.1", () => {
  const addr = server.address() as AddressInfo
  const port = addr.port
  const redirectUri = `http://127.0.0.1:${port}/callback`

  const authUrl = new URL(AUTH_URI)
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
    // ignore, user can copy the URL
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

  const tokenUrl = new URL(TOKEN_URI)
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
        }
        if (tokens.error) {
          res.writeHead(400, { "Content-Type": "text/html" })
          res.end(`<h1>Token exchange failed: ${tokens.error}</h1>`)
          console.error("Token exchange failed:", tokens)
          server.close()
          process.exit(1)
        }
        if (!tokens.refresh_token) {
          res.writeHead(500, { "Content-Type": "text/html" })
          res.end("<h1>No refresh_token in response. Check prompt=consent + access_type=offline.</h1>")
          console.error("No refresh_token in token response:", tokens)
          server.close()
          process.exit(1)
        }

        ssmPut("/youtube/refresh-token", tokens.refresh_token)

        res.writeHead(200, { "Content-Type": "text/html" })
        res.end("<h1>Success! You can close this tab and return to your terminal.</h1>")
        console.log("\n✓ Refresh token written to SSM /youtube/refresh-token")
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
