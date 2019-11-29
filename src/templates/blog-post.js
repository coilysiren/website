import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Content, { HTMLContent } from "../components/content"
import About from "../components/about"

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  date,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <div>
      <div className="post-purple-block"> </div>
      <section className="post-body">
        {helmet || ""}
        <div className="post-header">
          <h2>{title}</h2>
          <h4>{description}</h4>
          <h5>{date}</h5>
        </div>

        <PostContent className="post-content" content={content} />
      </section>
      <About />
    </div>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
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
