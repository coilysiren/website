import { Link } from "gatsby"
import React from "react"
import DefaultHead from "../components/default-head"
import Layout from "../components/layout"
import "../sass/not-found.scss"

const recoveryRoutes = [
  {
    path: "./",
    title: "Home",
    description: "Start with the active portfolio and platform thesis.",
    to: "/",
  },
  {
    path: "./writing",
    title: "Writing",
    description: "Browse the long-form technical archive.",
    to: "/writing/",
  },
  {
    path: "./about",
    title: "About",
    description: "Meet Kai through her story and collected interests.",
    to: "/about/",
  },
]

const NotFoundPage = () => (
  <Layout>
    <div className="not-found-page">
      <header className="not-found-hero">
        <div className="not-found-hero__copy">
          <p className="eyebrow">404 · route not found</p>
          <h1>This path ends here.</h1>
          <p className="not-found-hero__lede">
            The map is intact, but this address does not resolve. Choose a known
            route and keep exploring.
          </p>
        </div>
        <div className="not-found-signal" aria-hidden="true">
          <div className="not-found-signal__panel">
            <span className="not-found-signal__code">404</span>
            <span className="not-found-signal__status">route: unresolved</span>
          </div>
        </div>
      </header>

      <section
        className="not-found-routes"
        aria-labelledby="recovery-routes-heading"
      >
        <div className="not-found-routes__inner">
          <div className="not-found-routes__heading">
            <p className="section-label">Known coordinates</p>
            <h2 id="recovery-routes-heading">Choose where to land.</h2>
          </div>
          <ul className="not-found-route-list">
            {recoveryRoutes.map((route) => (
              <li key={route.to}>
                <Link to={route.to}>
                  <span className="not-found-route__path">{route.path}</span>
                  <strong>{route.title}</strong>
                  <span className="not-found-route__description">
                    {route.description}
                  </span>
                  <span className="not-found-route__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  </Layout>
)

export default NotFoundPage

export const Head = () => (
  <DefaultHead
    title="Page not found · Kai Siren"
    description="That route does not exist. Return to Kai Siren's portfolio, writing, or about page."
  />
)
