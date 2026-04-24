import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Kai Siren",
    description: "⚙️ ( DevOps || Platform || Infrastructure ) && Engineer ⚙️",
    author: "@coilysiren",
    email: "coilysiren@gmail.com",
  },
  plugins: [
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.GATSBY_SENTRY_DSN,
        // tracesSampleRate: 0.1, // opt-in later
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                author
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { allMarkdownRemark } }: { query: { allMarkdownRemark: { nodes: Array<{ frontmatter: { title: string; date: string; description?: string }; excerpt: string; html: string; fields: { slug: string } }> } } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.description || node.excerpt,
                  date: node.frontmatter.date,
                  url: `https://coilysiren.me${node.fields.slug}`,
                  guid: `https://coilysiren.me${node.fields.slug}`,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(
                filter: { frontmatter: { template_key: { eq: "blog-post" } } }
                sort: { frontmatter: { date: DESC } }
              ) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                    description
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Kai Siren's Blog",
            site_url: "https://coilysiren.me",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
  ],
}

export default config
