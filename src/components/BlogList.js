import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

const BlogList = ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark

    return (
        <div >
            {posts &&
                posts.map(({ node: post }) => (
                    <div key={post.id}>
                        <article>
                            <header>
                                <p className="post-meta">
                                    <Link
                                        className="title"
                                        to={post.fields.slug}
                                    >
                                        {post.frontmatter.title}
                                    </Link>
                                    <span> &bull; </span>
                                    <span className="subtitle">
                                        {post.frontmatter.date}
                                    </span>
                                </p>
                            </header>
                            <p>
                                {/* TODO: Optional Description instead of using excerpt */}
                                {post.excerpt}
                                <br />
                                <br />
                                <Link className="button" to={post.fields.slug}>
                                    {/* perhaps replace this keep reading button idea with having the whole blog item being a link */}
                                    Keep Reading →
                                </Link>
                            </p>
                        </article>
                    </div>
                ))}
        </div>
    )
}

export default () => (
    <StaticQuery
        query={graphql`
        query BlogListQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { template_key: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  template_key
                  date(formatString: "MMMM DD, YYYY")
                }
              }
            }
          }
        }
      `}
        render={(data, count) => <BlogList data={data} count={count} />}
    />
)