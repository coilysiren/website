import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"

interface BlogPost {
  id: string
  fields: { slug: string }
  frontmatter: {
    title: string
    description?: string
    date: string
  }
}

interface BlogListData {
  allMarkdownRemark: {
    edges: Array<{ node: BlogPost }>
  }
}

const BlogList = ({ data }: { data: BlogListData }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <div>
      {posts &&
        posts.map(({ node: post }) => (
          <div key={post.id}>
            <Link className="homepage-post" to={post.fields.slug}>
              <div>
                <h2>{post.frontmatter.title}</h2>
                <h4>{post.frontmatter.description}</h4>
                <p>{post.frontmatter.date}</p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  )
}

const BlogListWithQuery = () => (
  <StaticQuery
    query={graphql`
      query BlogListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { template_key: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                template_key
                description
                date(formatString: "MMMM YYYY")
              }
            }
          }
        }
      }
    `}
    render={(data) => <BlogList data={data} />}
  />
)

export default BlogListWithQuery
