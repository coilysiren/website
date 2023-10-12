import React from "react"
import Helmet from "react-helmet"
import Layout from "./layout"
import Closer from "./closer"
import { graphql } from "gatsby"
import useSiteMetadata from "./site-metadata"

const ContentBlock = ({ data }) => {
  const { markdownRemark: post } = data
  const siteMetadata = useSiteMetadata()

  // If the post has a title, use it. Otherwise, use the site's title.
  const title = post.frontmatter.title
    ? post.frontmatter.title
    : siteMetadata.title

  // If the post has a description, use it. Otherwise, use the site's description.
  const description = post.frontmatter.description
    ? post.frontmatter.description
    : siteMetadata.description

  // If the post has a description, use it. Otherwise, don't render anything.
  const descriptionBlock = post.frontmatter.description ? (
    <h4>{post.frontmatter.description}</h4>
  ) : null

  // If the post has a date, use it. Otherwise, don't render anything.
  const dateBlock = post.frontmatter.date ? (
    <h5>{post.frontmatter.date}</h5>
  ) : null

  return (
    <Layout>
      <Helmet>
        <title>{`${title}`}</title>
        <meta name="og:title" content={`${title}`} />
        <meta name="description" content={`${description}`} />
        <meta name="og:description" content={`${description}`} />
        <meta name="og:type" content="website" />
      </Helmet>
      <section className="post-body">
        <div className="post-header">
          <h2>{title}</h2>
          {descriptionBlock}
          {dateBlock}
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <Closer />
      </section>
    </Layout>
  )
}

export default ContentBlock

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`
