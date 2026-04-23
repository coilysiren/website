import React, { useState } from "react"
import { PageProps } from "gatsby"
import Layout from "../components/layout"
import DefaultHead from "../components/default-head"
import "../sass/pulse.scss"

export const Head = () => <DefaultHead title="Pulse" />

type RepoMeta = { language: string | null; color: string }
type Segment = { repo: string; loc: number; commits: number }
type TopCommit = {
  sha: string
  repo: string
  message: string
  url: string
  loc: number
}
type Day = {
  date: string
  totalLoc: number
  totalCommits: number
  topCommit: TopCommit | null
  segments: Segment[]
}
type Outlier = {
  date: string
  loc: number
  commits: number
  topCommit: TopCommit | null
} | null

type PulseData = {
  refreshedAt: string
  workflowRunUrl: string | null
  windowDays: number
  repos: Record<string, RepoMeta>
  days: Day[]
  outlier: Outlier
}

const fmtShortDate = (iso: string) => {
  const [, m, d] = iso.split("-")
  return `${Number(m)}/${Number(d)}`
}
const fmtLongDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
const fmtLoc = (n: number) => n.toLocaleString("en-US")
const shortRepo = (full: string) => full.replace(/^coilysiren\//, "")
const fmtRefreshed = (iso: string) => {
  const diffMin = Math.max(0, (Date.now() - new Date(iso).getTime()) / 60000)
  if (diffMin < 60) return `${Math.round(diffMin)}m ago`
  const diffHr = diffMin / 60
  if (diffHr < 24) return `${Math.round(diffHr)}h ago`
  return `${Math.round(diffHr / 24)}d ago`
}

const computeScaleMax = (days: Day[]): number => {
  // Clamp the bar-height scale so a single huge day (e.g. a public-repo
  // initial commit with tens of thousands of vendored lines) doesn't flatten
  // every other day to invisible. Uses 2x the 75th percentile of non-zero
  // days, which keeps normal busy days readable while letting outlier bars
  // visibly peg the top.
  const totals = days.map((d) => d.totalLoc).filter((n) => n > 0).sort((a, b) => a - b)
  if (totals.length === 0) return 1
  const p75 = totals[Math.floor(totals.length * 0.75)] ?? totals[totals.length - 1]!
  return Math.max(1, (p75 ?? 1) * 2)
}

const Sparkline = ({
  days,
  repos,
  selected,
  setSelected,
}: {
  days: Day[]
  repos: Record<string, RepoMeta>
  selected: number | null
  setSelected: (i: number | null) => void
}) => {
  const width = 720
  const height = 140
  const padY = 4
  const gap = 2
  const barW = (width - gap * (days.length - 1)) / days.length
  const scaleMax = computeScaleMax(days)

  return (
    <svg
      className="pulse-sparkline"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Daily commit activity for the last ${days.length} days`}
    >
      {days.map((day, i) => {
        const x = i * (barW + gap)
        const scale = Math.min(1, day.totalLoc / scaleMax)
        const barH = scale * (height - padY * 2)
        const clamped = day.totalLoc > scaleMax
        let yCursor = height - padY
        const isSelected = selected === i
        return (
          <g
            key={day.date}
            onMouseEnter={() => setSelected(i)}
            onFocus={() => setSelected(i)}
            tabIndex={0}
            className={isSelected ? "pulse-bar selected" : "pulse-bar"}
          >
            <rect
              x={x}
              y={0}
              width={barW}
              height={height}
              fill="transparent"
            />
            {day.segments.length === 0 ? (
              <rect
                x={x}
                y={height - padY - 1}
                width={barW}
                height={1}
                className="pulse-bar-empty"
              />
            ) : (
              day.segments.map((seg) => {
                const segH = (seg.loc / day.totalLoc) * barH
                yCursor -= segH
                return (
                  <rect
                    key={seg.repo}
                    x={x}
                    y={yCursor}
                    width={barW}
                    height={segH}
                    fill={repos[seg.repo]?.color || "#888"}
                  />
                )
              })
            )}
            {clamped ? (
              <rect
                x={x}
                y={padY - 1}
                width={barW}
                height={2}
                className="pulse-bar-clamp"
              />
            ) : null}
          </g>
        )
      })}
    </svg>
  )
}

const DayCard = ({
  day,
  repos,
}: {
  day: Day
  repos: Record<string, RepoMeta>
}) => {
  if (day.totalCommits === 0) {
    return (
      <div className="pulse-daycard empty">
        <div className="pulse-daycard-head">{fmtLongDate(day.date)}</div>
        <div className="pulse-daycard-empty">a quiet day.</div>
      </div>
    )
  }
  return (
    <div className="pulse-daycard">
      <div className="pulse-daycard-head">
        <span>{fmtLongDate(day.date)}</span>
        <span className="pulse-daycard-stats">
          {fmtLoc(day.totalLoc)} lines / {day.totalCommits}{" "}
          {day.totalCommits === 1 ? "commit" : "commits"}
        </span>
      </div>
      {day.topCommit ? (
        <div className="pulse-daycard-top">
          <span className="pulse-daycard-label">top:</span>{" "}
          <a href={day.topCommit.url} target="_blank" rel="noreferrer">
            {day.topCommit.message}
          </a>{" "}
          <span className="pulse-daycard-loc">
            +{fmtLoc(day.topCommit.loc)} in {shortRepo(day.topCommit.repo)}
          </span>
        </div>
      ) : null}
      <ul className="pulse-daycard-segs">
        {day.segments.map((seg) => (
          <li key={seg.repo}>
            <span
              className="pulse-swatch"
              style={{ background: repos[seg.repo]?.color || "#888" }}
              aria-hidden
            />
            <span className="pulse-seg-repo">{shortRepo(seg.repo)}</span>
            <span className="pulse-seg-nums">
              {fmtLoc(seg.loc)} / {seg.commits}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const outlierAside = (outlier: NonNullable<Outlier>): string | null => {
  const top = outlier.topCommit
  if (!top) return null
  const msg = top.message.toLowerCase()
  if (/^(initial commit|first commit|import|bootstrap)/.test(msg) && top.loc > 10000) {
    return "(an initial-commit import, not a day of actual typing.)"
  }
  if (top.loc > 20000) {
    return "(mostly one enormous commit; probably a vendored drop, not me actually typing.)"
  }
  if (outlier.commits >= 30) {
    return `(${outlier.commits} commits in one day is a choice.)`
  }
  return null
}

const OutlierCallout = ({ outlier }: { outlier: Outlier }) => {
  if (!outlier || !outlier.topCommit) return null
  const aside = outlierAside(outlier)
  return (
    <div className="pulse-outlier">
      <div className="pulse-outlier-label">biggest day in the last 30</div>
      <div className="pulse-outlier-body">
        <strong>{fmtLongDate(outlier.date)}</strong> — {fmtLoc(outlier.loc)}{" "}
        lines across {outlier.commits}{" "}
        {outlier.commits === 1 ? "commit" : "commits"}. Headliner:{" "}
        <a href={outlier.topCommit.url} target="_blank" rel="noreferrer">
          {outlier.topCommit.message}
        </a>{" "}
        (+{fmtLoc(outlier.topCommit.loc)} in{" "}
        {shortRepo(outlier.topCommit.repo)}).
        {aside ? <span className="pulse-outlier-aside"> {aside}</span> : null}
      </div>
    </div>
  )
}

const Legend = ({ repos }: { repos: Record<string, RepoMeta> }) => {
  const byLang: Record<string, { color: string; repos: string[] }> = {}
  for (const [name, meta] of Object.entries(repos)) {
    const key = meta.language || "—"
    ;(byLang[key] ||= { color: meta.color, repos: [] }).repos.push(name)
  }
  const entries = Object.entries(byLang).sort(
    (a, b) => b[1].repos.length - a[1].repos.length
  )
  return (
    <ul className="pulse-legend">
      {entries.map(([lang, info]) => (
        <li key={lang}>
          <span
            className="pulse-swatch"
            style={{ background: info.color }}
            aria-hidden
          />
          <span className="pulse-legend-lang">{lang}</span>
          <span className="pulse-legend-count">×{info.repos.length}</span>
        </li>
      ))}
    </ul>
  )
}

const NoData = () => (
  <div className="pulse-empty">
    <p>
      Pulse data hasn&apos;t been fetched yet. Run{" "}
      <code>pnpm fetch-pulse-data</code> locally, or wait for the daily
      workflow.
    </p>
  </div>
)

const PulsePage = ({ pageContext }: PageProps<object, { pulseData?: PulseData | null }>) => {
  const data = pageContext.pulseData
  const [selected, setSelected] = useState<number | null>(
    data ? data.days.length - 1 : null
  )

  return (
    <Layout>
      <section>
        <div className="post-header">
          <h2>Pulse</h2>
          <h4>how the site is built, and what it&apos;s been up to</h4>
        </div>
        <div className="post-content post-body">
          <h3>The stack</h3>
          <ul>
            <li>
              <strong>Gatsby 5</strong> with React 19, TypeScript, and Sass.
              The page you&apos;re reading is an SSR&apos;d React component.
            </li>
            <li>
              <strong>Netlify</strong> handles builds and hosting. A push to{" "}
              <code>main</code> triggers a deploy.
            </li>
            <li>
              <strong>GitHub Actions</strong> runs the daily refresh job that
              regenerates the data this page renders, then commits it.
            </li>
            <li>
              <strong>Source:</strong>{" "}
              <a
                href="https://github.com/coilysiren/website"
                target="_blank"
                rel="noreferrer"
              >
                github.com/coilysiren/website
              </a>
              .
            </li>
          </ul>

          <h3>Where the data comes from</h3>
          <ul>
            <li>
              <strong>/now</strong> is hand-written from a JSON snapshot
              produced by <code>scripts/fetch-now-data.ts</code>, which pulls
              from GitHub, Bluesky, YouTube, Reddit, and Steam.
            </li>
            <li>
              <strong>/pulse</strong> (this page) is driven by{" "}
              <code>scripts/fetch-pulse-data.ts</code>, which hits the GitHub
              search API for every public commit I&apos;ve authored in the
              last 30 days, enriches each with line-change stats, and colors
              them by each repo&apos;s primary language via{" "}
              <a
                href="https://github.com/github-linguist/linguist"
                target="_blank"
                rel="noreferrer"
              >
                linguist
              </a>
              .
            </li>
          </ul>

          {data ? (
            <>
              <h3>Last 30 days</h3>
              <OutlierCallout outlier={data.outlier} />
              <Sparkline
                days={data.days}
                repos={data.repos}
                selected={selected}
                setSelected={setSelected}
              />
              <div className="pulse-axis">
                <span>{data.days[0] ? fmtShortDate(data.days[0].date) : ""}</span>
                <span>
                  {data.days[data.days.length - 1]
                    ? fmtShortDate(data.days[data.days.length - 1]!.date)
                    : ""}
                </span>
              </div>
              {selected !== null && data.days[selected] ? (
                <DayCard day={data.days[selected]!} repos={data.repos} />
              ) : null}

              <h3>Languages in the mix</h3>
              <Legend repos={data.repos} />

              <p className="pulse-footer">
                Last refreshed {fmtRefreshed(data.refreshedAt)} (
                <time dateTime={data.refreshedAt}>{data.refreshedAt}</time>)
                {data.workflowRunUrl ? (
                  <>
                    {" "}
                    by{" "}
                    <a
                      href={data.workflowRunUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      this workflow run
                    </a>
                  </>
                ) : null}
                .
              </p>
            </>
          ) : (
            <NoData />
          )}
        </div>
      </section>
    </Layout>
  )
}

export default PulsePage
