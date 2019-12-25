import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "./layout"
import About from "./about"

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <Helmet titleTemplate="%s | Blog">
        <title>{`${post.frontmatter.title}`}</title>
        <meta name="description" content={`${post.frontmatter.description}`} />
      </Helmet>
      <div className="post-purple-block"></div>
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
