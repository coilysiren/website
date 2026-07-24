import React from "react"
import type { GatsbyBrowser } from "gatsby"
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

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  const wrap = document.querySelector<HTMLElement>("#eco-tracker-embed")
  if (!wrap) return
  const iframe = wrap.querySelector<HTMLIFrameElement>("iframe")
  const offline = document.querySelector<HTMLElement>("#eco-tracker-offline")
  if (!iframe || !offline) return
  fetch("https://eco-jobs-tracker.coilysiren.me/", {
    mode: "no-cors",
    cache: "no-store",
  }).catch(() => {
    iframe.style.display = "none"
    offline.style.display = "block"
  })
}
