import React, { useState } from "react"
import blogPostImg from "../images/blogpost.png"
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
        <div className="post-paragraph">
          Feugiat sed lectus vestibulum mattis ullamcorper. Eget mauris pharetra
          et ultrices neque ornare aenean euismod elementum. Pellentesque eu
          tincidunt tortor aliquam nulla. Quam lacus suspendisse faucibus
          interdum posuere. Dui ut ornare lectus sit. Nisl nisi scelerisque eu
          ultrices vitae. Ac turpis egestas sed tempus urna et pharetra pharetra
          massa. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar
          sapien et. Cursus sit amet dictum sit amet justo donec enim diam.
          Mollis nunc sed id semper risus in hendrerit gravida rutrum. Donec
          ultrices tincidunt arcu non sodales. Venenatis cras sed felis eget
          velit. Quam lacus suspendisse faucibus interdum.
        </div>{" "}
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
        <div className="post-paragraph">
          Et ligula ullamcorper malesuada proin. Magna fringilla urna porttitor
          rhoncus dolor purus non enim praesent. Dolor morbi non arcu risus quis
          varius quam. Ante in nibh mauris cursus mattis molestie a iaculis.
          Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar
          pellentesque habitant. Felis eget velit aliquet sagittis id
          consectetur purus. Tellus cras adipiscing enim eu turpis egestas
          pretium aenean. Mauris pellentesque pulvinar pellentesque habitant
          morbi tristique senectus et netus. Lectus arcu bibendum at varius vel
          pharetra vel turpis. Egestas congue quisque egestas diam in arcu
          cursus euismod. Ac placerat vestibulum lectus mauris ultrices eros in
          cursus. Maecenas accumsan lacus vel facilisis volutpat est velit. Nunc
          sed augue lacus viverra vitae congue eu. Blandit aliquam etiam erat
          velit scelerisque in dictum non consectetur. Diam ut venenatis tellus
          in metus. Duis ultricies lacus sed turpis tincidunt id aliquet. Enim
          blandit volutpat maecenas volutpat blandit aliquam etiam erat velit.
          Nam libero justo laoreet sit amet cursus.
        </div>
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
        <div className="post-paragraph">
          Eu mi bibendum neque egestas. Viverra vitae congue eu consequat ac
          felis donec. Eget mauris pharetra et ultrices neque. Laoreet sit amet
          cursus sit amet dictum sit amet. Pellentesque eu tincidunt tortor
          aliquam nulla. Viverra orci sagittis eu volutpat odio facilisis mauris
          sit amet. Massa massa ultricies mi quis hendrerit. Volutpat maecenas
          volutpat blandit aliquam etiam erat velit. Vitae proin sagittis nisl
          rhoncus. Tristique senectus et netus et malesuada fames ac turpis.
          Enim nulla aliquet porttitor lacus luctus accumsan tortor. Feugiat in
          fermentum posuere urna. Arcu odio ut sem nulla pharetra diam sit. A
          condimentum vitae sapien pellentesque.
        </div>
        <div className="post-paragraph">
          Sodales neque sodales ut etiam sit amet nisl purus in. Aliquet
          bibendum enim facilisis gravida neque convallis a. Nibh tellus
          molestie nunc non blandit. Volutpat commodo sed egestas egestas
          fringilla phasellus faucibus. Dignissim suspendisse in est ante in
          nibh mauris. Sit amet nisl suscipit adipiscing bibendum est. Vivamus
          at augue eget arcu dictum. Pellentesque adipiscing commodo elit at
          imperdiet dui accumsan sit amet. Nibh venenatis cras sed felis eget
          velit. Lorem mollis aliquam ut porttitor. Pharetra convallis posuere
          morbi leo urna molestie at. Quisque sagittis purus sit amet volutpat
          consequat mauris nunc. Et ligula ullamcorper malesuada proin libero
          nunc consequat interdum varius. Lacus luctus accumsan tortor posuere
          ac ut consequat semper viverra.
        </div>
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
        </div>{" "}
      </div>
      <Footer />
    </div>
  )
}

export default Post
