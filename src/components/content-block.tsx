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
    fields?: {
      slug?: string
    }
    frontmatter: {
      title?: string
      description?: string
      date?: string
      isoDate?: string
      templateKey?: string
    }
  }
}

const ogImageForSlug = (slug: string | undefined): string | undefined => {
  if (!slug) return undefined
  const trimmed = slug.replace(/^\/+|\/+$/g, "")
  if (!trimmed) return undefined
  return `/og/${trimmed}.png`
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

export const Head = ({ data }: HeadProps<ContentBlockData>) => {
  const { frontmatter, fields } = data.markdownRemark
  const isPost = frontmatter.templateKey === "blog-post"
  return (
    <DefaultHead
      title={frontmatter.title}
      description={frontmatter.description}
      image={ogImageForSlug(fields?.slug)}
      type={isPost ? "article" : undefined}
      publishedTime={isPost ? frontmatter.isoDate : undefined}
      author={isPost ? "Kai Siren" : undefined}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        isoDate: date
        title
        description
        templateKey
      }
    }
  }
`
