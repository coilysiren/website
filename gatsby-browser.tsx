import React from "react"
import type { GatsbyBrowser } from "gatsby"
import { PageMetaProvider } from "./src/components/page-context"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => {
  const sourcePath = (props.pageContext as { sourcePath?: string } | undefined)?.sourcePath
  return <PageMetaProvider value={{ sourcePath }}>{element}</PageMetaProvider>
}
