import React from "react"
import type { GatsbySSR } from "gatsby"
import { PageMetaProvider } from "./src/components/page-context"

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
  setHtmlAttributes({ lang: "en" })
  setHeadComponents([
    <meta
      key="robots"
      name="robots"
      content={pathname === "/hiring/" ? "noindex, nofollow" : "follow, index"}
    />,
    <link
      key="rss"
      rel="alternate"
      type="application/rss+xml"
      title="Kai Siren's Blog"
      href="/rss.xml"
    />,
  ])
}
