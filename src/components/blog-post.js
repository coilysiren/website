import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "./layout"
import About from "./about"
import useSiteMetadata from "./site-metadata"

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  const siteMetadata = useSiteMetadata()

  return (
    <Layout>
      <Helmet>
        <title>{`${post.frontmatter.title}`}</title>
        <meta name="og:title" content={`${post.frontmatter.title}`} />
        <meta name="twitter:title" content={`${post.frontmatter.title}`} />
        <meta name="description" content={`${post.frontmatter.description}`} />
        <meta
          name="og:description"
          content={`${post.frontmatter.description}`}
        />
        <meta
          name="twitter:description"
          content={`${post.frontmatter.description}`}
        />
        <meta name="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={`${siteMetadata.author}`} />
      </Helmet>
      <section className="post-body">
        <div className="post-header">
          <h2>{post.frontmatter.title}</h2>
          <h4>{post.frontmatter.description}</h4>
          <h5>{post.frontmatter.date}</h5>
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <About />
      </section>
    </Layout>
  )
}

export default BlogPost

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
