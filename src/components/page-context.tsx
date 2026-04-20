import React, { createContext, ReactNode, useContext } from "react"

interface PageMeta {
  sourcePath?: string
}

const PageMetaContext = createContext<PageMeta>({})

export const usePageMeta = () => useContext(PageMetaContext)

export const PageMetaProvider = ({
  value,
  children,
}: {
  value: PageMeta
  children: ReactNode
}) => <PageMetaContext.Provider value={value}>{children}</PageMetaContext.Provider>
