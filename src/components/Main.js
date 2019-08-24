import React, { useState } from "react";
import Blogpost from "./ShortBlogpost";

function Main(props) {
  return (
    <>
      <section id="home">
        <div className="header-container">
          <h1>Hi! I'm Lynn</h1>
          <h3>and I write about stuff! Please check it out ^-^</h3>
        </div>
      </section>

      <section className="blogposts-container">
        <div className="posts">
          {/* Some map function for every blog post over here */}
          <Blogpost />
          <Blogpost />
          <Blogpost />
          {/* <div className="blog-post"></div>
          <div className="blog-post"></div>
          <div className="blog-post"></div> */}
        </div>
      </section>

      <footer>
        All rights reserved © Website by Kate Efimova and Komal Ali
      </footer>
    </>
  );
}

export default Main;
