import React from "react"
import Closer from "../components/closer"
import DefaultHead from "../components/default-head"
import Layout from "../components/layout"
import "../sass/my-life.scss"

type Favorite = { src: string; alt: string; label: string; icon?: string }

type FavoriteSlideProps = {
  id: string
  title: string
  className: string
  icon?: string
  favorites: Favorite[]
}

type IconListItemProps = {
  icon: string
  label: string
}

const IconListItem = ({ icon, label }: IconListItemProps) => (
  <li>
    <span className="my-life-slide__list-icon" aria-hidden="true">
      {icon}
    </span>
    {label}
  </li>
)

const FavoriteSlide = ({
  id,
  title,
  className,
  icon,
  favorites,
}: FavoriteSlideProps) => (
  <article
    id={id}
    className={`my-life-slide my-life-slide--favorites ${className}`}
  >
    <div className="my-life-slide__copy">
      <h2>
        <a href={`#${id}`}>{title}</a>
      </h2>
      <ul className="my-life-slide__list">
        {favorites.map((favorite) => (
          <IconListItem
            key={favorite.label}
            icon={favorite.icon ?? icon ?? "•"}
            label={favorite.label}
          />
        ))}
      </ul>
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
      <header id="my-life" className="my-life-slide my-life-slide--intro">
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
          <h1>
            <a href="#my-life">My Life</a>
          </h1>
        </div>
      </header>

      <article
        id="technology"
        className="my-life-slide my-life-slide--technology"
      >
        <div className="my-life-slide__copy">
          <h2>
            <a href="#technology">Technology</a>
          </h2>
          <ul className="my-life-slide__list">
            <IconListItem icon="💻" label="Towers" />
            <IconListItem icon="💻" label="Monitors" />
          </ul>
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

      <article id="gaming" className="my-life-slide my-life-slide--gaming">
        <div className="my-life-slide__copy">
          <h2>
            <a href="#gaming">Gaming</a>
          </h2>
          <ul className="my-life-slide__list">
            <IconListItem icon="🎮" label="Factories" />
            <IconListItem icon="🎮" label="Galaxies" />
            <IconListItem icon="🎮" label="Economies" />
          </ul>
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

      <article id="fabrication" className="my-life-slide my-life-slide--home">
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
        </div>
        <div className="my-life-slide__copy">
          <h2>
            <a href="#fabrication">Fabrication</a>
          </h2>
          <ul className="my-life-slide__list">
            <IconListItem icon="🛠️" label="Walls" />
            <IconListItem icon="🛠️" label="Gardens" />
            <IconListItem icon="🛠️" label="ADUs" />
          </ul>
        </div>
      </article>

      <FavoriteSlide
        id="movies"
        title="Movies"
        className="my-life-slide--movies"
        icon="📺"
        favorites={[
          {
            src: "/my-life/fav-movie_spirited-away.png",
            alt: "Spirited Away movie poster",
            label: "Spirited Away",
          },
          {
            src: "/my-life/fav-movie_the-matrix.png",
            alt: "The Matrix movie poster",
            label: "The Matrix",
          },
          {
            src: "/my-life/fav-movie_doctor-strange.jpg",
            alt: "Doctor Strange movie poster",
            label: "Doctor Strange",
          },
          {
            src: "/my-life/fav-movie_avengers.jpg",
            alt: "Avengers movie poster",
            label: "Avengers",
          },
        ]}
      />
      <FavoriteSlide
        id="books"
        title="Books"
        className="my-life-slide--books"
        icon="📖"
        favorites={[
          {
            src: "/my-life/fav-book_antimemetics-division.jpg",
            alt: "There Is No Antimemetics Division book cover",
            label: "Antimemetics Division",
          },
          {
            src: "/my-life/fav-book_his-dark-materials.jpg",
            alt: "His Dark Materials book cover",
            label: "His Dark Materials",
          },
          {
            src: "/my-life/fav-book_hunger-games.jpg",
            alt: "The Hunger Games book cover",
            label: "The Hunger Games",
          },
          {
            src: "/my-life/fav-book_iron-widow.png",
            alt: "Iron Widow book cover",
            label: "Iron Widow",
          },
        ]}
      />
      <FavoriteSlide
        id="games"
        title="Games"
        className="my-life-slide--games"
        icon="🎮"
        favorites={[
          {
            src: "/my-life/fav-game_dyson-sphere-program.jpg",
            alt: "Dyson Sphere Program game artwork",
            label: "Dyson Sphere Program",
          },
          {
            src: "/my-life/fav-game_eco.jpg",
            alt: "Eco game artwork",
            label: "Eco",
          },
          {
            src: "/my-life/fav-game_final-fantasy-xiv.jpg",
            alt: "Final Fantasy XIV game artwork",
            label: "FFXIV",
          },
          {
            src: "/my-life/fav-game_oxygen-not-included.jpg",
            alt: "Oxygen Not Included game artwork",
            label: "Oxygen Not Included",
          },
        ]}
      />
      <FavoriteSlide
        id="shows"
        title="Shows"
        className="my-life-slide--shows"
        icon="📺"
        favorites={[
          {
            src: "/my-life/fav-show_the-expanse.jpg",
            alt: "The Expanse show artwork",
            label: "The Expanse",
          },
          {
            src: "/my-life/fav-show_korra.jpg",
            alt: "The Legend of Korra show artwork",
            label: "The Legend of Korra",
          },
          {
            src: "/my-life/fav-show_pantheon.jpg",
            alt: "Pantheon show artwork",
            label: "Pantheon",
          },
        ]}
      />
      <FavoriteSlide
        id="anime"
        title="Anime"
        className="my-life-slide--anime"
        icon="📺"
        favorites={[
          {
            src: "/my-life/fav-anime_ghost-in-the-shell-sac.jpg",
            alt: "Ghost in the Shell Stand Alone Complex artwork",
            label: "Ghost in the Shell",
          },
          {
            src: "/my-life/fav-anime_psycho-pass.png",
            alt: "Psycho-Pass artwork",
            label: "Psycho-Pass",
          },
          {
            src: "/my-life/fav-anime_witch-from-mercury.jpg",
            alt: "Mobile Suit Gundam: The Witch from Mercury artwork",
            label: "Mobile Suit Gundam: The Witch from Mercury",
          },
        ]}
      />
      <FavoriteSlide
        id="animals"
        title="Animals"
        className="my-life-slide--animals"
        favorites={[
          {
            src: "/my-life/fav-animal_crow.jpg",
            alt: "A crow",
            label: "Crow",
            icon: "🐦‍⬛",
          },
          {
            src: "/my-life/fav-animal_dolphin.jpg",
            alt: "A dolphin swimming underwater",
            label: "Dolphin",
            icon: "🐬",
          },
          {
            src: "/my-life/fav-animal_wolf.jpg",
            alt: "A wolf",
            label: "Wolf",
            icon: "🐺",
          },
          {
            src: "/my-life/fav-animal_beaver.jpg",
            alt: "A beaver",
            label: "Beaver",
            icon: "🦫",
          },
        ]}
      />
      <Closer />
    </section>
  </Layout>
)

export default MyLifePage
