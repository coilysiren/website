import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import DefaultHead from "../../components/default-head"
import { groups, type Status, type OgMap } from "../../data/apps"
import "../../sass/apps.scss"

export const Head = () => (
  <DefaultHead
    title="Apps"
    description="A topology of the things I run on the internet."
  />
)

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

interface AppsPageProps {
  pageContext: {
    appsOg?: OgMap
  }
}

const AppsPage = ({ pageContext }: AppsPageProps) => {
  const [statuses, setStatuses] = useState<Record<string, Status>>({})
  const appsOg = pageContext.appsOg ?? {}

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
              These run on a tower in my living room (the homelab, kai-server,
              running k3s). Status dots are checked live in your browser when
              this page loads, so if one&apos;s red it really is down right now
              (or your network can&apos;t reach it).
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
                  const og = appsOg[app.host]
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
                      {og && (og.image || og.title || og.description) ? (
                        <a
                          className="apps-card-og"
                          href={app.url}
                          target={app.url.startsWith("/") ? undefined : "_blank"}
                          rel={
                            app.url.startsWith("/") ? undefined : "noreferrer"
                          }
                        >
                          {og.image ? (
                            <img
                              className="apps-card-og-image"
                              src={og.image}
                              alt=""
                              loading="lazy"
                            />
                          ) : null}
                          <div className="apps-card-og-text">
                            {og.title ? (
                              <span className="apps-card-og-title">
                                {og.title}
                              </span>
                            ) : null}
                            {og.description ? (
                              <span className="apps-card-og-desc">
                                {og.description}
                              </span>
                            ) : null}
                            {og.siteName ? (
                              <span className="apps-card-og-site">
                                {og.siteName}
                              </span>
                            ) : null}
                          </div>
                        </a>
                      ) : null}
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
