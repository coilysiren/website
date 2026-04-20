import React from "react"
import ContentBlock from "../components/content-block"
import DefaultHead from "../components/default-head"

const title = "404: Not found"
const html = "You just hit a route that doesnt exist... oh, the sadness."

const NotFoundPage = () => (
  <ContentBlock
    data={{
      markdownRemark: {
        frontmatter: { title },
        html: `<p>${html}</p>`,
      },
    }}
  />
)

export default NotFoundPage

export const Head = () => <DefaultHead title={title} />
