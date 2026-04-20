import path from "path"
import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"

const toRepoRelative = (absPath: string) =>
  path.relative(__dirname, absPath).split(path.sep).join("/")

export const createPages: GatsbyNode["createPages"] = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  createRedirect({ fromPath: "/about", toPath: "/now", isPermanent: true })

  return graphql<{
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id: string
          fileAbsolutePath: string
          fields: { slug: string }
        }
      }>
    }
  }>(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      const errors = Array.isArray(result.errors) ? result.errors : [result.errors]
      errors.forEach((error) => console.error(error.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data!.allMarkdownRemark.edges

    posts.forEach((edge) => {
      const { id, fileAbsolutePath } = edge.node
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve("src/components/content-block.tsx"),
        context: { id, sourcePath: toRepoRelative(fileAbsolutePath) },
      })
    })
  })
}

export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  if (page.context && (page.context as { sourcePath?: string }).sourcePath) return
  const { createPage, deletePage } = actions
  const sourcePath = toRepoRelative(page.component)
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      sourcePath,
    },
  })
}

// Gatsby's built-in eslint-loader pulls in eslint-config-react-app, which is
// incompatible with eslint 9. We run eslint separately via `pnpm test:quick`,
// so strip the plugin from Gatsby's webpack config to avoid the conflict.
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions, getConfig }) => {
  const config = getConfig()
  config.plugins = config.plugins.filter(
    (plugin: { constructor?: { name?: string } }) => plugin.constructor?.name !== "ESLintWebpackPlugin"
  )
  actions.replaceWebpackConfig(config)
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value,
    })
  }
}
