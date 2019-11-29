import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';

const BlogList = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      {posts &&
        posts.map(({ node: post }) => (
          <div key={post.id}>
            <Link className="homepage-post" to={post.fields.slug}>
              <div className="purple-fold"></div>
              <div>
                <h2>{post.frontmatter.title}</h2>
                <h4>{post.frontmatter.description}</h4>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

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
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogList data={data} count={count} />}
  />
);

export default BlogListWithQuery;
