import React, { useState } from "react"
import blogPostImg from "../images/blogpost.png"
import sparkles from "../images/sparkles-twitter.svg"
import { Link } from "gatsby"
import "../sass/post.scss"

function Post(props) {
  return (
    <div>
      <img className="post-cover" src={blogPostImg} />
    </div>
  )
}

export default Post
