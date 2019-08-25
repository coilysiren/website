import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="New Website Frontend" description="$1.5k / netlify CMS / gatsby / scss / with tests" />
    <h1>New Website Frontend</h1>
    <p>I'm looking for a frontend developer to redo this website. I liked the functionality of the old site, but the implementation was brittle and messy. I want a completely new site, that more or less looks and works the same - but is built much better.</p>
    <p>I'll give you:</p>
    <ul>
      <li>$1,500 (can be negotiated upwards)</li>
      <li>a Linkedin endorsement or similar (if desired)</li>
      <li>a <i>"website tech by (your name)"</i> mention on the site (if desired)</li>
    </ul>
    <p>Technically, the website should:</p>
    <ul>
      <li>use <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">netlify</a> as the CMS</li>
      <li>use <a href="https://www.npmjs.com/package/dart-sass" target="_blank" rel="noopener noreferrer">dart-sass</a> for its css</li>
      <li>has some degree of automated testing (via enzyme / puppeteer / or similar)</li>
    </ul>
    <p>The goal behind the technical requirements is to produce a website that I'll be comfortable maintaining. Relatedly, there's two "operational" requirements:</p>
    <ul>
      <li>You'll implement this new website on top of <a href="https://github.com/lynncyrin/lynncyrin-dot-me" target="_blank" rel="noopener noreferrer">the existing WIP site</a></li>
      <li>The implementation to be a fairly collaborative activity, in that you'll want to create many small pull requests and you should ping me for code reviews.</li>
    </ul>
    <p>The idea behind the operational requirements is that the end product will be easier for me to maintain if I see how it's built. That said, it won't be "pairing" - moreso I'll be in an advisory / reviewer role.</p>
    <p>I'm looking for someone who:</p>
    <ul>
      <li>is between the PT and ET time zones, Seattle residents preferred</li>
      <li>preferably has with an underrepresented identity in tech</li>
      <li>could give this work a few hours a week</li>
      <li>can commit to weekly synchronous checkins (video calls or otherwise)</li>
      <li>preferably has some degree of trust with a person / organization that I know (mention this in your intro, its functionally a "referral")</li>
    </ul>
    <p>If you're interested in this, follow-up with me via Twitter (@lynncyrin) or email (lynncyrin@gmail.com).</p>
    <Link to="/">Go back to the homepage</Link>

  </Layout>
)

export default SecondPage
