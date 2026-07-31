import React from "react"
import Closer from "../components/closer"
import DefaultHead from "../components/default-head"
import Layout from "../components/layout"
import "../sass/my-life.scss"

export const Head = () => (
  <DefaultHead
    title="My Life | Kai Siren"
    description="A small, visual tour of the things that make up Kai's life."
    canonical="/my-life/"
  />
)

const MyLifePage = () => (
  <Layout>
    <section className="my-life">
      <header className="my-life-slide my-life-slide--intro">
        <img
          className="my-life-slide__portrait"
          src="/my-life/11-social-look-sunglasses-purple-tails.jpg"
          alt="Kai in a black dress, colorful necklace, and purple-tipped locs"
        />
        <div className="my-life-slide__copy">
          <span className="my-life-kicker">A VERY SMALL EXHIBITION</span>
          <h1>My Life</h1>
          <p>
            A living scrapbook of people, projects, places, and little things
            that make a life feel like mine.
          </p>
        </div>
      </header>

      <article className="my-life-slide my-life-slide--making">
        <div className="my-life-slide__copy">
          <span className="my-life-kicker">01 / THE MAKING</span>
          <h2>Things I make</h2>
          <p>
            Sometimes the idea is a game, sometimes it is a tool, and sometimes
            it needs its own tiny universe.
          </p>
        </div>
        <div className="my-life-media-grid my-life-media-grid--making">
          <video
            className="my-life-video"
            autoPlay
            loop
            muted
            playsInline
            aria-label="A factory game in motion"
          >
            <source
              src="/my-life/03-factory-game-take-3.mov"
              type="video/quicktime"
            />
          </video>
          <img
            src="/my-life/05-eco-app-dashboard.png"
            alt="A dark green Eco application dashboard"
          />
          <img
            src="/my-life/06-mcp-list.png"
            alt="A directory of MCP integrations"
          />
        </div>
      </article>

      <article className="my-life-slide my-life-slide--home">
        <div className="my-life-home-images">
          <img
            className="my-life-home-images__primary"
            src="/my-life/12-wall-under-construction.jpg"
            alt="A home interior with a newly framed wall"
          />
          <img
            className="my-life-home-images__plan"
            src="/my-life/07-adu-floor-plan.png"
            alt="An ADU floor plan"
          />
          <img
            className="my-life-home-images__garden"
            src="/my-life/15-red-garden-bed.jpg"
            alt="A newly planted red raised garden bed"
          />
        </div>
        <div className="my-life-slide__copy">
          <span className="my-life-kicker">02 / HOME, SLOWLY</span>
          <h2>Making room</h2>
          <p>
            Plans, framing, dirt under my nails, and the patient work of making
            a place feel more like home.
          </p>
        </div>
      </article>

      <article className="my-life-slide my-life-slide--people">
        <div className="my-life-slide__copy">
          <span className="my-life-kicker">03 / MY PEOPLE</span>
          <h2>The best part</h2>
          <p>
            The very good company, with one small creature who insists on being
            in every chapter.
          </p>
        </div>
        <div className="my-life-people-images">
          <img
            className="my-life-people-images__luna"
            src="/my-life/09-luna.jpg"
            alt="Luna, a Siamese cat, sitting on a pink bedspread"
          />
          <img
            className="my-life-people-images__chavah"
            src="/my-life/20-me-and-chavah.jpg"
            alt="Kai and Chavah smiling together outside"
          />
          <img
            className="my-life-people-images__elizabeth"
            src="/my-life/19-me-and-elizabeth.jpg"
            alt="Kai and Elizabeth smiling together"
          />
        </div>
      </article>

      <article className="my-life-slide my-life-slide--favorites">
        <img
          className="my-life-favorites__plant"
          src="/my-life/13-pothos-slide-background.png"
          alt="A lush pothos spilling down a wall"
        />
        <div className="my-life-slide__copy">
          <span className="my-life-kicker">04 / ON REPEAT</span>
          <h2>Favorite things</h2>
          <p>
            A little nature, a little animation, and the stories that stay
            bright after the credits roll.
          </p>
        </div>
        <img
          className="my-life-favorites__korra"
          src="/my-life/fav-show_korra.png"
          alt="The Legend of Korra title mark"
        />
      </article>
      <Closer />
    </section>
  </Layout>
)

export default MyLifePage
