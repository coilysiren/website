import React from "react"
import type { GatsbyBrowser } from "gatsby"
import { PageMetaProvider } from "./src/components/page-context"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => {
  const sourcePath = (props.pageContext as { sourcePath?: string } | undefined)?.sourcePath
  return <PageMetaProvider value={{ sourcePath }}>{element}</PageMetaProvider>
}

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  const wrap = document.getElementById("eco-tracker-embed")
  if (!wrap) return
  const iframe = wrap.querySelector("iframe")
  const offline = document.getElementById("eco-tracker-offline")
  if (!iframe || !offline) return
  fetch("https://eco-jobs-tracker.coilysiren.me/", { mode: "no-cors", cache: "no-store" }).catch(() => {
    ;(iframe as HTMLElement).style.display = "none"
    offline.style.display = "block"
  })
}
