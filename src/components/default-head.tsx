import React from "react"
import favicon from "../images/favicon.ico"
import useSiteMetadata from "./site-metadata"

interface DefaultHeadProps {
  title?: string
  description?: string
  image?: string
}

const DEFAULT_OG_IMAGE = "/og/default.png"

const resolveImage = (siteUrl: string | undefined, image: string | undefined): string => {
  const path = image ?? DEFAULT_OG_IMAGE
  if (/^https?:\/\//i.test(path)) return path
  const base = (siteUrl ?? "").replace(/\/$/, "")
  return base ? `${base}${path}` : path
}

const DefaultHead = ({ title, description, image }: DefaultHeadProps) => {
  const siteMetadata = useSiteMetadata()
  const resolvedTitle = title ?? siteMetadata.title
  const resolvedDescription = description ?? siteMetadata.description
  const resolvedImage = resolveImage(siteMetadata.siteUrl, image)

  return (
    <>
      <title>{resolvedTitle}</title>
      <link rel="icon" href={favicon} type="image/x-icon" />
      <meta name="description" content={resolvedDescription} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
    </>
  )
}

export default DefaultHead
