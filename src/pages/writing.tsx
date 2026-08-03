import React from "react"
import BlogList from "../components/blog-list"
import DefaultHead from "../components/default-head"
import Layout from "../components/layout"

export const Head = () => (
  <DefaultHead
    title="Writing | Kai Siren"
    description="Technical writing about platform engineering, cloud systems, developer tooling, and working with agents."
    canonical="/writing/"
  />
)

const WritingPage = () => (
  <Layout>
    <div className="portfolio-page writing-page">
      <header className="portfolio-page__hero">
        <p className="eyebrow">Writing</p>
        <h1>Notes from building the systems behind the work.</h1>
        <p>
          Platform engineering, cloud boundaries, developer tools, and the
          occasional method for thinking with machines.
        </p>
      </header>
      <section className="writing-list" aria-label="Articles">
        <BlogList />
      </section>
    </div>
  </Layout>
)

export default WritingPage
