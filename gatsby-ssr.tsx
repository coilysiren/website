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
  const robots =
    pathname === "/hiring/"
      ? "noindex, nofollow"
      : pathname === "/404/" || pathname === "/404.html"
        ? "noindex, follow"
        : "follow, index"

  setHtmlAttributes({ lang: "en" })
  setHeadComponents([
    <meta key="robots" name="robots" content={robots} />,
    <link
      key="rss"
      rel="alternate"
      type="application/rss+xml"
      title="Kai Siren's Blog"
      href="/rss.xml"
    />,
  ])
}
