import React from "react"
import Layout from "./layout"
import Closer from "./closer"
import DefaultHead from "./default-head"
import { graphql, HeadProps } from "gatsby"
import useSiteMetadata from "./site-metadata"

interface ContentBlockData {
  markdownRemark: {
    id?: string
    html: string
    frontmatter: {
      title?: string
      description?: string
      date?: string
    }
  }
}

const ContentBlock = ({ data }: { data: ContentBlockData }) => {
  const { markdownRemark: post } = data
  const siteMetadata = useSiteMetadata()

  const title = post.frontmatter.title || siteMetadata.title

  const descriptionBlock = post.frontmatter.description ? (
    <h4>{post.frontmatter.description}</h4>
  ) : null

  const dateBlock = post.frontmatter.date ? <h5>{post.frontmatter.date}</h5> : null

  return (
    <Layout>
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

export const Head = ({ data }: HeadProps<ContentBlockData>) => (
  <DefaultHead
    title={data.markdownRemark.frontmatter.title}
    description={data.markdownRemark.frontmatter.description}
  />
)

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
