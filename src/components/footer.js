import React, { useState } from "react"
import sparkles from "../images/sparkles-twitter.svg"
import "../sass/footer.scss"

function Footer(props) {
  return (
    <footer>
      <div className="copyright-footer">
        <img src={sparkles} />
        <h3>Copyright 2019</h3>
        <img src={sparkles} />
      </div>
      <h4>
        Website made with love by{" "}
        <a href="https://twitter.com/kefimochi">@Kefimochi</a> and{" "}
        <a href="/">@Komal</a>
      </h4>
    </footer>
  )
}
export default Footer
