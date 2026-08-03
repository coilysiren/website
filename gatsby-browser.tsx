import React from "react"
import type { GatsbyBrowser } from "gatsby"
import "@fontsource/roboto/latin-400.css"
import "@fontsource/roboto/latin-700.css"
import "@fontsource/roboto/latin-700-italic.css"
import { PageMetaProvider } from "./src/components/page-context"
import "prismjs/themes/prism-tomorrow.css"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => {
  const sourcePath = (props.pageContext as { sourcePath?: string } | undefined)
    ?.sourcePath
  return <PageMetaProvider value={{ sourcePath }}>{element}</PageMetaProvider>
}
