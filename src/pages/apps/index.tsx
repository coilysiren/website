import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import DefaultHead from "../../components/default-head"
import "../../sass/apps.scss"

export const Head = () => (
  <DefaultHead
    title="Apps"
    description="A topology of the things I run on the internet."
  />
)

type Status = "unknown" | "up" | "down" | "na"

interface AppEntry {
  host: string
  url: string
  desc: string
  repo?: string
  tag?: string
  // when set, status is fixed (e.g. game-server TCP can't be checked from a browser).
  fixedStatus?: Status
}

interface HostGroup {
  name: string
  meta: string
  apps: AppEntry[]
}

const groups: HostGroup[] = [
  {
    name: "netlify (CDN)",
    meta: "static / edge",
    apps: [
      {
        host: "coilysiren.me",
        url: "https://coilysiren.me",
        desc: "this site - Gatsby, served from Netlify's edge.",
        repo: "https://github.com/coilysiren/website",
      },
      {
        host: "/apps/bsky-popularity-contest",
        url: "/apps/bsky-popularity-contest",
        desc: "rank a Bluesky user's follow list by adoring fans.",
        repo: "https://github.com/coilysiren/website",
        tag: "bluesky",
      },
      {
        host: "/apps/bsky-follow-suggestions",
        url: "/apps/bsky-follow-suggestions",
        desc: "find people the people you follow follow.",
        repo: "https://github.com/coilysiren/website",
        tag: "bluesky",
      },
    ],
  },
  {
    name: "kai-server (k3s, San Lorenzo)",
    meta: "homelab tower / k3s cluster",
    apps: [
      {
        host: "api.coilysiren.me",
        url: "https://api.coilysiren.me",
        desc: "FastAPI backend powering the Bluesky apps and other small services.",
        repo: "https://github.com/coilysiren/backend",
        tag: "api",
      },
      {
        host: "eco-mcp.coilysiren.me",
        url: "https://eco-mcp.coilysiren.me",
        desc: "MCP server + preview UI for the Eco game's live server data.",
        repo: "https://github.com/coilysiren/eco-mcp-app",
        tag: "mcp",
      },
      {
        host: "eco-jobs-tracker.coilysiren.me",
        url: "https://eco-jobs-tracker.coilysiren.me",
        desc: "tracks player skill specs against in-game job demand on the Sirens Eco server.",
        repo: "https://github.com/coilysiren/eco-spec-tracker",
        tag: "tracker",
      },
      {
        host: "galaxy-gen.coilysiren.me",
        url: "https://galaxy-gen.coilysiren.me",
        desc: "procedural galaxy generator. spin a seed, get a galaxy.",
        repo: "https://github.com/coilysiren/galaxy-gen",
        tag: "toy",
      },
      {
        host: "eco.coilysiren.me",
        url: "https://eco-mcp.coilysiren.me/preview",
        desc: "the Sirens Eco game server itself (TCP, port 3001). preview link goes to its live status page.",
        repo: "https://github.com/coilysiren/infrastructure",
        tag: "game",
        fixedStatus: "na",
      },
    ],
  },
]

const checkStatus = async (url: string): Promise<Status> => {
  if (url.startsWith("/")) return "up"
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 5000)
    await fetch(url, {
      mode: "no-cors",
      signal: controller.signal,
      cache: "no-store",
    })
    clearTimeout(timer)
    return "up"
  } catch {
    return "down"
  }
}

const StatusDot = ({ status }: { status: Status }) => {
  const cls =
    status === "up"
      ? "up"
      : status === "down"
        ? "down"
        : status === "na"
          ? "na"
          : ""
  const title =
    status === "up"
      ? "reachable"
      : status === "down"
        ? "unreachable"
        : status === "na"
          ? "not HTTP - status check skipped"
          : "checking..."
  return (
    <span className={`apps-status-dot ${cls}`} title={title} aria-label={title} />
  )
}

const AppsPage = () => {
  const [statuses, setStatuses] = useState<Record<string, Status>>({})

  useEffect(() => {
    let cancelled = false
    const all: Promise<[string, Status]>[] = []
    for (const g of groups) {
      for (const app of g.apps) {
        if (app.fixedStatus) {
          all.push(Promise.resolve([app.host, app.fixedStatus]))
        } else {
          all.push(checkStatus(app.url).then((s) => [app.host, s]))
        }
      }
    }
    Promise.all(all).then((entries) => {
      if (cancelled) return
      setStatuses(Object.fromEntries(entries))
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Layout>
      <section className="post-body">
        <div className="post-header">
          <h2>
            <p>Apps</p>
          </h2>
        </div>
        <div className="post-content apps-page">
          <div className="apps-intro">
            <p>
              Most of these run on a tower in my living room (the homelab,
              kai-server, running k3s). The static site you&apos;re reading lives
              on Netlify&apos;s edge. Status dots are checked live in your browser
              when this page loads, so if one&apos;s red it really is down right
              now (or your network can&apos;t reach it).
            </p>
          </div>

          <div className="apps-internet-node">
            <span className="pill">
              <i className="fa-solid fa-globe"></i> the internet (you are here)
            </span>
          </div>
          <div className="apps-arrow" aria-hidden="true">
            <i className="fa-solid fa-angles-down"></i>
          </div>

          <div className="apps-hosts">
            {groups.map((group) => (
              <div className="apps-host" key={group.name}>
                <div className="apps-host-header">
                  <span className="apps-host-name">{group.name}</span>
                  <span className="apps-host-meta">{group.meta}</span>
                </div>
                {group.apps.map((app) => {
                  const status = statuses[app.host] ?? "unknown"
                  return (
                    <div className="apps-card" key={app.host}>
                      <div className="apps-card-row1">
                        <StatusDot status={status} />
                        <a
                          className="apps-card-host"
                          href={app.url}
                          target={app.url.startsWith("/") ? undefined : "_blank"}
                          rel={
                            app.url.startsWith("/") ? undefined : "noreferrer"
                          }
                        >
                          {app.host}
                        </a>
                        {app.tag ? (
                          <span className="apps-card-tag">{app.tag}</span>
                        ) : null}
                      </div>
                      <p className="apps-card-desc">{app.desc}</p>
                      <div className="apps-card-links">
                        <a
                          href={app.url}
                          target={app.url.startsWith("/") ? undefined : "_blank"}
                          rel={
                            app.url.startsWith("/") ? undefined : "noreferrer"
                          }
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          visit
                        </a>
                        {app.repo ? (
                          <a href={app.repo} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-github"></i>
                            source
                          </a>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="apps-legend">
            <span className="legend-item">
              <span className="apps-status-dot up" /> reachable
            </span>
            <span className="legend-item">
              <span className="apps-status-dot down" /> unreachable
            </span>
            <span className="legend-item">
              <span className="apps-status-dot na" /> not checked (TCP / non-HTTP)
            </span>
          </div>
        </div>
        <Closer />
      </section>
    </Layout>
  )
}

export default AppsPage
