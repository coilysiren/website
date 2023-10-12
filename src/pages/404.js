import React from "react"
import ContentBlock from "../components/content-block"

const NotFoundPage = () => {
  const title = "404: Not found"
  const html = "You just hit a route that doesnt exist... oh, the sadness."

  return (
    <ContentBlock
      data={{
        markdownRemark: {
          frontmatter: { title },
          html: `<p>${html}</p>`,
        },
      }}
    />
  )
}

export default NotFoundPage
