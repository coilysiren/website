import React, { useState } from "react"
import blogPostImg from "../images/blogpost.png"
import sparkles from "../images/sparkles-twitter.svg"
import { Link } from "gatsby"
import "../sass/post.scss"

function Post(props) {
  return (
    <div className="post-body">
      <img className="post-cover" src={blogPostImg} />
      <div className="post-header">
        <h2>Making Axios Calls: The Comprehensive Tutorial</h2>
        <h4>
          Quick tutorial diving into doing 3rd party API calls using axios npm.
        </h4>
        <h5>July 31, 2019</h5>
      </div>
    </div>
  )
}

export default Post
