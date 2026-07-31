import React from "react"
import Closer from "../components/closer"
import DefaultHead from "../components/default-head"
import Layout from "../components/layout"
import headshot from "../images/headshot.jpg"
import "../sass/my-life.scss"

export const Head = () => (
  <DefaultHead
    title="My Life | Kai Siren"
    description="A small, visual tour of the things that make up Kai's life."
    canonical="/my-life/"
  />
)

const subjects = [
  {
    number: "01",
    title: "Me, lately",
    detail:
      "A little room for the faces, outfits, and ordinary days worth keeping.",
    className: "my-life-frame--self",
    imageLabel: "Selfie collection goes here",
  },
  {
    number: "02",
    title: "Movies I love",
    detail: "Posters, stills, and the films that live rent-free in my head.",
    className: "my-life-frame--movies",
    imageLabel: "Favorite movie images go here",
  },
  {
    number: "03",
    title: "Books within reach",
    detail:
      "The novels, dog-eared paperbacks, and beautiful covers on my shelf.",
    className: "my-life-frame--books",
    imageLabel: "Favorite book images go here",
  },
  {
    number: "04",
    title: "Little obsessions",
    detail:
      "The objects, games, plants, and small delights that make a life feel like mine.",
    className: "my-life-frame--things",
    imageLabel: "Favorite things go here",
  },
]

const MyLifePage = () => (
  <Layout>
    <section className="my-life">
      <header className="my-life-hero">
        <div className="my-life-hero__portrait-wrap">
          <img
            className="my-life-hero__portrait"
            src={headshot}
            alt="Kai Siren"
          />
        </div>
        <div className="my-life-hero__copy">
          <span className="my-life-kicker">A VERY SMALL EXHIBITION</span>
          <h1>My Life</h1>
          <p>
            A living scrapbook of the things I love, assembled one good image at
            a time.
          </p>
        </div>
      </header>

      <main className="my-life-subjects">
        {subjects.map((subject) => (
          <article className="my-life-subject" key={subject.number}>
            <div className="my-life-subject__copy">
              <span className="my-life-subject__number">{subject.number}</span>
              <h2>{subject.title}</h2>
              <p>{subject.detail}</p>
            </div>
            <div
              className={`my-life-frame ${subject.className}`}
              aria-label={subject.imageLabel}
              role="img"
            >
              <span>{subject.imageLabel}</span>
            </div>
          </article>
        ))}
      </main>
      <Closer />
    </section>
  </Layout>
)

export default MyLifePage
