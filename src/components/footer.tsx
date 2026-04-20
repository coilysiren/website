import React from "react"
import sparkles from "../images/sparkles-twitter.svg"
import { usePageMeta } from "./page-context"
import "../sass/footer.scss"

const REPO_URL = "https://github.com/coilysiren/website"

function Footer() {
  const { sourcePath } = usePageMeta()
  return (
    <footer>
      <div className="copyright-footer">
        <img src={sparkles} alt="Three sparkles colored in purple" />
        <h3>Copyright {new Date().getFullYear()} Kai Siren</h3>
        <img src={sparkles} alt="Three sparkles colored in purple" />
      </div>
      <h4>
        With contributions from{" "}
        <a href="https://github.com/kefimochi">Kate Efimova</a>,{" "}
        <a href="https://github.com/slimekat">Sadie Lee</a>,{" "}
        <a href="https://github.com/komalali">Komal Ali</a>
      </h4>
      {sourcePath && (
        <h4>
          <a href={`${REPO_URL}/blob/main/${sourcePath}`}>View source on GitHub</a>
        </h4>
      )}
    </footer>
  )
}

export default Footer
