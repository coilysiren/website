import React, { useState } from "react"
import { Link } from "gatsby"
import "../sass/homepage.scss"

function Homepage(props) {
  return (
    <div>
      <div className="header">
        <h2>Hi! I'm Lynn</h2>
        <h4>and I write about stuff. Please check it out!</h4>
      </div>
      <div className="homepage-container">
        <div className="homepage-list">
          <div className="homepage-post">Hi!</div>
          <div className="homepage-post">Pist</div>
          <div className="homepage-post">La</div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
