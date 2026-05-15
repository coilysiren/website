import React from "react"
import favicon from "../images/favicon.ico"
import useSiteMetadata from "./site-metadata"

interface DefaultHeadProps {
  title?: string
  description?: string
  image?: string
  type?: string
  publishedTime?: string
  author?: string
}

const DEFAULT_OG_IMAGE = "/og/default.png"

const resolveImage = (siteUrl: string | undefined, image: string | undefined): string => {
  const path = image ?? DEFAULT_OG_IMAGE
  if (/^https?:\/\//i.test(path)) return path
  const base = (siteUrl ?? "").replace(/\/$/, "")
  return base ? `${base}${path}` : path
}

const toIsoDate = (value: string | undefined): string | undefined => {
  if (!value) return undefined
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toISOString()
}

const DefaultHead = ({ title, description, image, type, publishedTime, author }: DefaultHeadProps) => {
  const siteMetadata = useSiteMetadata()
  const resolvedTitle = title ?? siteMetadata.title
  const resolvedDescription = description ?? siteMetadata.description
  const resolvedImage = resolveImage(siteMetadata.siteUrl, image)
  const resolvedType = type ?? "website"
  const resolvedPublishedTime = toIsoDate(publishedTime)

  return (
    <>
      <title>{resolvedTitle}</title>
      <link rel="icon" href={favicon} type="image/x-icon" />
      <meta name="description" content={resolvedDescription} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={resolvedType} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {resolvedType === "article" && resolvedPublishedTime && (
        <meta property="article:published_time" content={resolvedPublishedTime} />
      )}
      {resolvedType === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
    </>
  )
}

export default DefaultHead
