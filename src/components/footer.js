import React from "react"
import sparkles from "../images/sparkles-twitter.svg"
import "../sass/footer.scss"

function Footer() {
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
    </footer>
  )
}

export default Footer
