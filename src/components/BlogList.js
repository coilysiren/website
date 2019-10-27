import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import blogPostImg from "../images/blogpost.png"
import sparkles from "../images/sparkles-twitter.svg"

const BlogList = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <div>
      {posts &&
        posts.map(({ node: post }) => (
          <div key={post.id}>
            <article className="homepage-post">
              {console.log(post.frontmatter)}
              <h2>{post.frontmatter.title}</h2>
              <h4>{post.frontmatter.description}</h4>
              <span className="subtitle">{post.frontmatter.date}</span>
              {/* <img src={blogPostImg} alt="Temporary static picture" /> */}
              <p>
                {/* TODO: Optional Description instead of using excerpt */}
                {post.excerpt}
              </p>
              <div className="homepage-buttons">
                <div className="star-counter">
                  <img src={sparkles} alt="A shiny emoji with three stars" />
                  <h5>340</h5>
                </div>
                <div className="continue-reading">Continue reading...</div>
              </div>
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
                description
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
