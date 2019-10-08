import React, { useState } from "react"
import blogPostImg from "../images/blogpost.png"
import catImg from "../images/cat.png"
import sparkles from "../images/sparkles-twitter.svg"
import { Link } from "gatsby"
import Footer from "./footer"
import "../sass/post.scss"

function Post(props) {
  return (
    <div className="post-body">
      <img className="post-cover" src={blogPostImg} />
      <div className="post-header">
        <h2>Axios Calls: The Comprehensive Tutorial</h2>
        <h4>
          Quick tutorial diving into doing 3rd party API calls using axios npm.
        </h4>
        <h5>July 31, 2019</h5>
      </div>
      <div className="post-content">
        <div className="post-paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod <span className="highlight">tempor</span> incididunt ut labore
          et dolore magna aliqua. Cum sociis natoque penatibus et magnis dis. Id
          volutpat lacus laoreet non curabitur gravida. Pretium lectus quam id
          leo in vitae. Quis ipsum suspendisse ultrices gravida. Nibh tortor id
          aliquet lectus. Pretium aenean pharetra magna ac.{" "}
          <span className="highlight">Euismod in pellentesque massa</span>{" "}
          placerat duis ultricies lacus sed. Vestibulum lectus mauris ultrices
          eros in cursus turpis massa tincidunt. Sem nulla pharetra diam sit
          amet nisl.
        </div>
        <ul className="unordered-list">
          <li>Here's a quick</li>
          <ul>
            <li>Black tea</li>
            <li>Green tea</li>
          </ul>
          <li>Check on how does the</li>
          <li>
            Unordered list looks like 🤔 More tex in order to test how will the
            padding look!
          </li>
        </ul>

        <div className="post-paragraph">
          Fringilla est ullamcorper eget nulla facilisi etiam dignissim. Sed
          risus pretium quam vulputate dignissim suspendisse in. Nec dui nunc
          mattis enim ut. Suspendisse ultrices gravida dictum fusce ut placerat.
          Nam at lectus urna duis convallis convallis tellus. Sed viverra tellus
          in hac habitasse. Nullam ac tortor vitae purus faucibus ornare
          suspendisse. Viverra adipiscing at in tellus integer feugiat
          scelerisque. Sed velit dignissim sodales ut eu sem integer vitae
          justo. Volutpat consequat mauris nunc congue nisi. Platea dictumst
          quisque sagittis purus sit amet volutpat consequat. Non consectetur a
          erat nam at lectus urna duis convallis. Sit amet nulla facilisi morbi
          tempus iaculis. Consectetur adipiscing elit pellentesque habitant
          morbi tristique. Non curabitur gravida arcu ac tortor dignissim
          convallis.
        </div>

        <h1 className="h1-title text-center">Title 1</h1>
        <h2 className="h2-title text-center">Title 2</h2>
        <h3 className="h3-title">
          Just a longer Title 3 to test how it looks like
        </h3>
        <h4 className="h4-title">Title 4</h4>
        <h5 className="h5-title">Title 5 - in case you want small text</h5>

        <div className="post-paragraph">
          A erat nam at lectus urna duis convallis. Tincidunt dui ut ornare
          lectus sit amet est. Lacus suspendisse faucibus interdum posuere lorem
          ipsum dolor. Bibendum enim facilisis gravida neque convallis a cras.
          In nisl nisi scelerisque eu ultrices vitae auctor eu. Viverra aliquet
          eget sit amet tellus cras adipiscing. Mauris vitae ultricies leo
          integer malesuada nunc vel. Sem fringilla ut morbi tincidunt augue.
          Bibendum arcu vitae elementum curabitur vitae nunc sed. Suspendisse
          faucibus interdum posuere lorem ipsum dolor sit. Velit egestas dui id
          ornare arcu. Enim diam vulputate ut pharetra sit. Bibendum enim
          facilisis gravida neque. Enim neque volutpat ac tincidunt vitae semper
          quis lectus nulla. Ut morbi tincidunt augue interdum. Nec dui nunc
          mattis enim ut tellus. Viverra suspendisse potenti nullam ac tortor
          vitae purus. Ultrices vitae auctor eu augue. Consectetur libero id
          faucibus nisl tincidunt eget.
        </div>
        <ol className="ordered-list">
          <li className="h4-title">Making some coffee?</li>
          <ol>
            <li>Latte</li>
            <li>Spiced latte</li>
            <li className="h5-title">More latte?</li>
          </ol>
          <li className="h4-title">Tea</li>
          <li className="h4-title">Milk</li>
        </ol>
        <div className="image-segment">
          <img
            src={blogPostImg}
            alt="You can put any alt text here that will also go under the picture"
          />
          <p>
            You can put any alt text here that will also go under the picture
          </p>
        </div>
        <div className="post-paragraph">
          Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Duis at
          consectetur lorem donec. Volutpat odio facilisis mauris sit amet. Est
          velit egestas dui id. Penatibus et magnis dis parturient montes
          nascetur ridiculus mus. At consectetur lorem donec massa. Lectus urna
          duis convallis convallis tellus id. Dignissim enim sit amet venenatis
          urna cursus eget nunc. Rhoncus aenean vel elit scelerisque. Diam
          maecenas sed enim ut sem viverra. Amet est placerat in egestas erat.
          Amet tellus cras adipiscing enim eu. Pretium vulputate sapien nec
          sagittis aliquam malesuada bibendum arcu vitae. Et malesuada fames ac
          turpis egestas.
        </div>
        <div className="image-segment">
          <img
            src={catImg}
            alt="You can put any alt text here that will also go under the picture"
          />
          <p>Cat's face looking deeply into your soul from inside of a box</p>
        </div>
        <div className="post-paragraph">
          Fermentum iaculis eu non diam phasellus vestibulum lorem. Non tellus
          orci ac auctor. Odio morbi quis commodo odio aenean sed adipiscing.
          Massa tempor nec feugiat nisl pretium fusce. Nunc consequat interdum
          varius sit amet mattis. Ut aliquam purus sit amet luctus. Nulla
          malesuada pellentesque elit eget gravida. Aliquam vestibulum morbi
          blandit cursus risus at. Adipiscing bibendum est ultricies integer
          quis. Dictumst quisque sagittis purus sit amet. Imperdiet proin
          fermentum leo vel orci porta. Volutpat diam ut venenatis tellus in
          metus vulputate eu scelerisque.
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Post
