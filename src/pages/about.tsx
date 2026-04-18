import React from "react"
import { navigate } from "gatsby"

const AboutRedirect = () => {
  React.useEffect(() => {
    navigate("/now", { replace: true })
  }, [])
  return null
}

export default AboutRedirect
