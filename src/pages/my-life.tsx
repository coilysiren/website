import React from "react"
import Closer from "../components/closer"
import DefaultHead from "../components/default-head"
import Layout from "../components/layout"
import "../sass/my-life.scss"

type Favorite = { src: string; alt: string }

type FavoriteSlideProps = {
  title: string
  className: string
  favorites: Favorite[]
}

const FavoriteSlide = ({ title, className, favorites }: FavoriteSlideProps) => (
  <article className={`my-life-slide my-life-slide--favorites ${className}`}>
    <div className="my-life-slide__copy">
      <h2>{title}</h2>
    </div>
    <div className="my-life-favorite-grid">
      {favorites.map((favorite) => (
        <img key={favorite.src} src={favorite.src} alt={favorite.alt} />
      ))}
    </div>
  </article>
)

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
        <img
          className="my-life-intro__secondary"
          src="/my-life/16-car-headphones-sunglasses.jpg"
          alt="Kai wearing sunglasses and headphones in a car"
        />
        <div className="my-life-slide__copy">
          <h1>My Life</h1>
        </div>
      </header>

      <article className="my-life-slide my-life-slide--technology">
        <div className="my-life-slide__copy">
          <h2>Technology</h2>
        </div>
        <div className="my-life-project-grid my-life-technology-grid">
          <img
            className="my-life-technology-grid__tower"
            src="/my-life/17-tower-interior.jpg"
            alt="The blue and purple lit interior of a desktop computer tower"
          />
          <img
            className="my-life-technology-grid__screens"
            src="/my-life/14-two-monitor-desktop.jpg"
            alt="A colorful two-monitor desk setup"
          />
          <img
            className="my-life-technology-grid__hardware"
            src="/my-life/08-motherboard-and-gpu.jpg"
            alt="A motherboard and graphics card lit by purple LEDs"
          />
        </div>
      </article>

      <article className="my-life-slide my-life-slide--gaming">
        <div className="my-life-slide__copy">
          <h2>Gaming</h2>
        </div>
        <div className="my-life-project-grid my-life-gaming-grid">
          <img
            className="my-life-gaming-grid__factory"
            src="/my-life/project-factory-game.gif"
            alt="An animated factory game simulation"
          />
          <img
            className="my-life-gaming-grid__galaxy"
            src="/my-life/project-galaxy-gen.gif"
            alt="An animated procedural galaxy generator"
          />
          <img
            className="my-life-gaming-grid__eco"
            src="/my-life/05-eco-app-dashboard.png"
            alt="A dark green Eco application dashboard"
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
          <img
            className="my-life-home-images__build"
            src="/my-life/18-garden-bed-construction.jpg"
            alt="Raised garden beds under construction"
          />
          <img
            className="my-life-home-images__pothos"
            src="/my-life/13-pothos-wall.jpg"
            alt="A pothos cascading down an indoor wall"
          />
        </div>
        <div className="my-life-slide__copy">
          <h2>Making room</h2>
        </div>
      </article>

      <FavoriteSlide
        title="Favorite movies"
        className="my-life-slide--movies"
        favorites={[
          {
            src: "/my-life/fav-movie_spirited-away.png",
            alt: "Spirited Away movie poster",
          },
          {
            src: "/my-life/fav-movie_the-matrix.png",
            alt: "The Matrix movie poster",
          },
          {
            src: "/my-life/fav-movie_doctor-strange.jpg",
            alt: "Doctor Strange movie poster",
          },
          {
            src: "/my-life/fav-movie_avengers.jpg",
            alt: "Avengers movie poster",
          },
        ]}
      />
      <FavoriteSlide
        title="Favorite books"
        className="my-life-slide--books"
        favorites={[
          {
            src: "/my-life/fav-book_antimemetics-division.jpg",
            alt: "There Is No Antimemetics Division book cover",
          },
          {
            src: "/my-life/fav-book_his-dark-materials.jpg",
            alt: "His Dark Materials book cover",
          },
          {
            src: "/my-life/fav-book_hunger-games.jpg",
            alt: "The Hunger Games book cover",
          },
          {
            src: "/my-life/fav-book_iron-widow.png",
            alt: "Iron Widow book cover",
          },
        ]}
      />
      <FavoriteSlide
        title="Favorite games"
        className="my-life-slide--games"
        favorites={[
          {
            src: "/my-life/fav-game_dyson-sphere-program.jpg",
            alt: "Dyson Sphere Program game artwork",
          },
          { src: "/my-life/fav-game_eco.jpg", alt: "Eco game artwork" },
          {
            src: "/my-life/fav-game_final-fantasy-xiv.jpg",
            alt: "Final Fantasy XIV game artwork",
          },
          {
            src: "/my-life/fav-game_oxygen-not-included.jpg",
            alt: "Oxygen Not Included game artwork",
          },
        ]}
      />
      <FavoriteSlide
        title="Favorite shows"
        className="my-life-slide--shows"
        favorites={[
          {
            src: "/my-life/fav-show_korra.png",
            alt: "The Legend of Korra title mark",
          },
          {
            src: "/my-life/fav-show_pantheon.jpg",
            alt: "Pantheon show artwork",
          },
          {
            src: "/my-life/fav-show_the-expanse.png",
            alt: "The Expanse title mark",
          },
        ]}
      />
      <FavoriteSlide
        title="Favorite anime"
        className="my-life-slide--anime"
        favorites={[
          {
            src: "/my-life/fav-anime_ghost-in-the-shell-sac.jpg",
            alt: "Ghost in the Shell Stand Alone Complex artwork",
          },
          {
            src: "/my-life/fav-anime_psycho-pass.png",
            alt: "Psycho-Pass artwork",
          },
          {
            src: "/my-life/fav-anime_witch-from-mercury.jpg",
            alt: "Mobile Suit Gundam The Witch from Mercury artwork",
          },
        ]}
      />
      <FavoriteSlide
        title="Favorite animals"
        className="my-life-slide--animals"
        favorites={[
          { src: "/my-life/fav-animal_crow.jpg", alt: "A crow" },
          { src: "/my-life/fav-animal_beaver.jpg", alt: "A beaver" },
          {
            src: "/my-life/fav-animal_dolphin.jpg",
            alt: "A dolphin swimming underwater",
          },
          { src: "/my-life/fav-animal_wolf.jpg", alt: "A wolf" },
        ]}
      />
      <Closer />
    </section>
  </Layout>
)

export default MyLifePage
