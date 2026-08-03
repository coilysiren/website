import React from "react"
import type { GatsbySSR } from "gatsby"
import { PageMetaProvider } from "./src/components/page-context"

const INDEXABLE_PATHS = new Set(["/", "/about/", "/hiring/", "/resume/"])

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({
  element,
  props,
}) => {
  const sourcePath = (props.pageContext as { sourcePath?: string } | undefined)
    ?.sourcePath
  return <PageMetaProvider value={{ sourcePath }}>{element}</PageMetaProvider>
}

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  pathname,
  setHtmlAttributes,
  setHeadComponents,
}) => {
  const robots = INDEXABLE_PATHS.has(pathname)
    ? "follow, index"
    : "noindex, nofollow"

  setHtmlAttributes({ lang: "en" })
  setHeadComponents([<meta key="robots" name="robots" content={robots} />])
}
