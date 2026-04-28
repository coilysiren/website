import { Link } from "gatsby"
import React from "react"

const Header = ({ siteTitle = "" }: { siteTitle?: string }) => (
  <header
    style={{
      background: "rebeccapurple",
      marginBottom: "1.45rem",
    }}
  >
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "1.45rem 1.0875rem",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <p
        style={{
          margin: "0.25rem 0 0",
          color: "white",
          fontSize: "0.95rem",
          opacity: 0.85,
        }}
      >
        ⚙⚒ lights out, platform&apos;s green, agents are working the line ⚒⚙
      </p>
    </div>
  </header>
)

export default Header
