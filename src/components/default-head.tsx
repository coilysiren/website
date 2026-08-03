import React from "react"
import favicon from "../images/favicon.ico"
import useSiteMetadata from "./site-metadata"

interface DefaultHeadProps {
  title?: string
  description?: string
  canonical?: string
  type?: string
  publishedTime?: string
  author?: string
}

const resolveUrl = (siteUrl: string | undefined, path: string): string => {
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

const DefaultHead = ({
  title,
  description,
  canonical,
  type,
  publishedTime,
  author,
}: DefaultHeadProps) => {
  const siteMetadata = useSiteMetadata()
  const resolvedTitle = title ?? siteMetadata.title
  const resolvedDescription = description ?? siteMetadata.description
  const resolvedCanonical = canonical
    ? resolveUrl(siteMetadata.siteUrl, canonical)
    : undefined
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
      {resolvedCanonical ? (
        <>
          <link rel="canonical" href={resolvedCanonical} />
          <meta property="og:url" content={resolvedCanonical} />
        </>
      ) : null}
      {resolvedType === "article" && resolvedPublishedTime && (
        <meta
          property="article:published_time"
          content={resolvedPublishedTime}
        />
      )}
      {resolvedType === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
    </>
  )
}

export default DefaultHead
