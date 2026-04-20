import React from "react"
import favicon from "../images/favicon.ico"
import useSiteMetadata from "./site-metadata"

interface DefaultHeadProps {
  title?: string
  description?: string
}

const DefaultHead = ({ title, description }: DefaultHeadProps) => {
  const siteMetadata = useSiteMetadata()
  const resolvedTitle = title ?? siteMetadata.title
  const resolvedDescription = description ?? siteMetadata.description

  return (
    <>
      <title>{resolvedTitle}</title>
      <link rel="icon" href={favicon} type="image/x-icon" />
      <meta name="description" content={resolvedDescription} />
      <meta name="og:title" content={resolvedTitle} />
      <meta name="og:description" content={resolvedDescription} />
      <meta name="og:type" content="website" />
    </>
  )
}

export default DefaultHead
