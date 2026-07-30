import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Closer from "../../components/closer"
import DefaultHead from "../../components/default-head"
import {
  groups,
  integrations,
  observability,
  siteToys,
  type AppEntry,
  type OgMap,
  type Status,
} from "../../data/apps"
import "../../sass/apps.scss"

const publicApps = groups.flatMap((group) => group.apps)

export const Head = () => (
  <DefaultHead
    title="Apps"
    description="Apps, observability systems, and agent integrations I build and run."
    image="/og/apps/index.png"
  />
)

const checkStatus = async (url: string): Promise<Status> => {
  if (url.startsWith("/")) return "up"
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    await fetch(url, {
      mode: "no-cors",
      signal: controller.signal,
      cache: "no-store",
    })
    return "up"
  } catch {
    return "down"
  } finally {
    clearTimeout(timer)
  }
}

const statusLabel = (status: Status) => {
  if (status === "up") return "reachable"
  if (status === "down") return "unreachable"
  if (status === "na") return "not checked"
  return "checking"
}

const StatusDot = ({ status }: { status: Status }) => {
  const label = statusLabel(status)
  return (
    <span
      className={`apps-status-dot ${status}`}
      title={label}
      aria-label={label}
    />
  )
}

const SectionHeading = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) => (
  <div className="apps-section-heading">
    <span className="apps-eyebrow">{eyebrow}</span>
    <h3>{title}</h3>
    <p>{children}</p>
  </div>
)

const AppCard = ({
  app,
  status,
  og,
}: {
  app: AppEntry
  status: Status
  og?: OgMap[string]
}) => (
  <article className="apps-feature-card">
    <a
      className="apps-feature-visual"
      href={app.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit ${app.name}`}
    >
      {og?.image ? (
        <img src={og.image} alt="" loading="lazy" />
      ) : (
        <i className={app.icon} aria-hidden="true" />
      )}
      <span className="apps-feature-tag">{app.tag}</span>
    </a>
    <div className="apps-feature-copy">
      <div className="apps-feature-title">
        <StatusDot status={status} />
        <h4>{app.name}</h4>
      </div>
      <p>{app.desc}</p>
      <span className="apps-feature-host">{app.host}</span>
      <div className="apps-card-links">
        <a href={app.url} target="_blank" rel="noreferrer">
          visit <i className="fa-solid fa-arrow-up-right-from-square" />
        </a>
        {app.repo ? (
          <a href={app.repo} target="_blank" rel="noreferrer">
            source <i className="fa-solid fa-code-branch" />
          </a>
        ) : null}
      </div>
    </div>
  </article>
)

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
    Promise.all(
      publicApps.map(async (app): Promise<[string, Status]> => [
        app.host,
        app.fixedStatus ?? (await checkStatus(app.url)),
      ])
    ).then((entries) => {
      if (!cancelled) setStatuses(Object.fromEntries(entries))
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Layout>
      <section className="post-body">
        <div className="post-header apps-page-header">
          <span className="apps-command">$ ls ~/things-i-run</span>
          <h2>Apps</h2>
          <p>Things I build, instrument, and wire into agents.</p>
        </div>

        <div className="post-content apps-page">
          <div className="apps-hero">
            <span className="apps-eyebrow">DEPLOYMENT OF ONE</span>
            <h3>Small apps. Serious plumbing.</h3>
            <p>
              The visible layer is playful: games, simulations, and tools for
              friends. Underneath it is a homelab built to make agent-driven
              software observable, bounded, and useful.
            </p>
          </div>

          <nav className="apps-jump" aria-label="Apps page sections">
            <a href="#public-apps">apps</a>
            <a href="#observability">observability</a>
            <a href="#agent-integrations">agent integrations</a>
            <a href="#web-toys">web toys</a>
          </nav>

          <div className="apps-section" id="public-apps">
            <SectionHeading eyebrow="01 / APPS" title="Running on the internet">
              Public things you can click right now. The status lights check
              reachability from your browser when this page opens.
            </SectionHeading>
            <div className="apps-feature-grid">
              {publicApps.map((app) => (
                <AppCard
                  app={app}
                  status={statuses[app.host] ?? "unknown"}
                  og={appsOg[app.host]}
                  key={app.host}
                />
              ))}
            </div>
            <div className="apps-status-legend">
              <span>
                <span className="apps-status-dot up" /> reachable
              </span>
              <span>
                <span className="apps-status-dot down" /> unreachable
              </span>
              <span>
                <span className="apps-status-dot unknown" /> checking
              </span>
            </div>
          </div>

          <div className="apps-section apps-observability" id="observability">
            <SectionHeading eyebrow="02 / OBSERVABILITY" title="The core skill">
              I care less about a green dashboard than whether the system can
              explain itself when it is broken. These pieces cover the path from
              raw signal to useful operator evidence.
            </SectionHeading>
            <div className="apps-capability-grid">
              {observability.map((capability) => (
                <article className="apps-capability-card" key={capability.name}>
                  <span className="apps-capability-icon">
                    <i className={capability.icon} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="apps-capability-stack">
                      {capability.stack}
                    </span>
                    <h4>{capability.name}</h4>
                    <p>{capability.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="apps-section" id="agent-integrations">
            <SectionHeading
              eyebrow="03 / AGENT INTEGRATIONS"
              title="A very cute tool belt"
            >
              Each service is wrapped as a deliberately small MCP surface. Brand
              icons show the system on the other side. The badges show what I
              let the agents do.
            </SectionHeading>
            <div className="apps-integration-grid">
              {integrations.map((integration) => (
                <a
                  className="apps-integration-card"
                  href={integration.href}
                  target="_blank"
                  rel="noreferrer"
                  key={integration.name}
                >
                  <span className="apps-integration-icon">
                    <img
                      src={integration.icon}
                      alt=""
                      loading="lazy"
                      width="48"
                      height="48"
                    />
                  </span>
                  <span className="apps-integration-copy">
                    <strong>{integration.name}</strong>
                    <span>{integration.desc}</span>
                  </span>
                  <span className="apps-integration-badges">
                    <span>{integration.mode}</span>
                    <span>{integration.access}</span>
                    <span className="apps-mcp-badge">MCP</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="apps-section apps-toys" id="web-toys">
            <SectionHeading eyebrow="04 / WEB TOYS" title="Made on this site">
              Two smaller Bluesky experiments still live here too.
            </SectionHeading>
            <div className="apps-toy-grid">
              {siteToys.map((toy) => (
                <Link className="apps-toy-card" to={toy.href} key={toy.name}>
                  <i className={toy.icon} aria-hidden="true" />
                  <span>
                    <strong>{toy.name}</strong>
                    <span>{toy.desc}</span>
                  </span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Closer />
      </section>
    </Layout>
  )
}

export default AppsPage
