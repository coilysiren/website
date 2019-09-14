import React, { useState } from "react"
import blogPostImg from "../images/blogpost.png"
import sparkles from "../images/sparkles-twitter.svg"
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
          <div className="homepage-post">
            <h2>Making Axios Calls</h2>
            <h4>
              Quick tutorial diving into doing 3rd party API calls using axios
              npm
            </h4>
            <img
              src={blogPostImg}
              alt="2B from Nier Automata is the bae, so I'm using her for mock up design 👀"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Facilisis mauris sit amet massa vitae tortor. Amet aliquam id diam
              maecenas ultricies mi eget mauris. Platea dictumst quisque
              sagittis purus sit amet volutpat consequat mauris. Id donec
              ultrices tincidunt arcu non sodales neque sodales ut. Elementum
              facilisis leo vel fringilla. Duis tristique sollicitudin nibh sit
              amet commodo nulla facilisi nullam. Tincidunt arcu non sodales
              neque sodales ut. Hac habitasse platea dictumst vestibulum rhoncus
              est pellentesque. In eu mi bibendum neque egestas congue quisque
              egestas diam. Tristique magna sit amet purus gravida quis blandit.
              Ut porttitor leo a diam. Vitae tortor condimentum lacinia quis vel
              eros. Donec ultrices tincidunt arcu non sodales neque sodales.
              Curabitur vitae nunc sed velit ...
            </p>
            <div className="homepage-buttons">
              <div className="star-counter">
                <img src={sparkles} alt="A shiny emoji with three stars" />
                <h5>340</h5>
              </div>
              <div className="continue-reading">Continue reading...</div>
            </div>
          </div>

          <div className="homepage-post">
            <h2>Longer Post Talking About Important Stuff</h2>
            <h4>
              Quick tutorial diving into doing 3rd party API calls using axios
              npm
            </h4>
            <img
              src={blogPostImg}
              alt="2B from Nier Automata is the bae, so I'm using her for mock up design 👀"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Facilisis mauris sit amet massa vitae tortor. Amet aliquam id diam
              maecenas ultricies mi eget mauris. Platea dictumst quisque
              sagittis purus sit amet volutpat consequat mauris. Id donec
              ultrices tincidunt arcu non sodales neque sodales ut. Elementum
              facilisis leo vel fringilla. Duis tristique sollicitudin nibh sit
              amet commodo nulla facilisi nullam. Tincidunt arcu non sodales
              neque sodales ut. Hac habitasse platea dictumst vestibulum rhoncus
              est pellentesque. In eu mi bibendum neque egestas congue quisque
              egestas diam. Tristique magna sit amet purus gravida quis blandit.
              Ut porttitor leo a diam. Vitae tortor condimentum lacinia quis vel
              eros. Donec ultrices tincidunt arcu non sodales neque sodales.
              Curabitur vitae nunc sed velit ...
            </p>
            <div className="homepage-buttons">
              <div className="star-counter">
                <img src={sparkles} alt="A shiny emoji with three stars" />
                <h5>340</h5>
              </div>
              <div className="continue-reading">Continue reading...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
