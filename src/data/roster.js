/**
 * @typedef {object} Seat
 * @property {string} slug Role slug, and the creature file's basename.
 * @property {string} name The seat's preferred name.
 * @property {string} pronouns Rendered beside the name, never inferred.
 * @property {string} title The role's own charter title, not an abbreviation.
 * @property {string} job One line, present tense, in the seat's own terms.
 */

/**
 * The seven composed seats, in the order the roster declares them.
 *
 * Creature art is `src/images/creatures/<slug>.png`, derived from the pinned
 * cut each role ships as its app icon. Slug is the join, so a re-derived
 * creature replaces one file and needs no edit here.
 *
 * Job lines are capped by layout at 20ch across two reserved lines. Past
 * roughly 44 characters a line reaches a third and the band goes ragged, so
 * `coilysiren/website#145` carries the measurement behind that bound.
 *
 * @type {Seat[]}
 */
export const roster = [
  {
    slug: "platform",
    name: "Angie",
    pronouns: "she",
    title: "Platform Engineer",
    job: "Builds the floor everyone else stands on.",
  },
  {
    slug: "sysadmin",
    name: "Vera",
    pronouns: "she",
    title: "Systems Administrator",
    job: "Runs everything that has to stay up.",
  },
  {
    slug: "science",
    name: "Evie",
    pronouns: "she",
    title: "Applied Scientist",
    job: "Measures everything twice.",
  },
  {
    slug: "frontend",
    name: "Delphi",
    pronouns: "she",
    title: "Frontend Engineer",
    job: "Draws the screens, including this one.",
  },
  {
    slug: "gamedev",
    name: "Sprite",
    pronouns: "they",
    title: "Game Developer",
    job: "Ships the games, and plays them.",
  },
  {
    slug: "director",
    name: "Portia",
    pronouns: "they",
    title: "Portfolio Director",
    job: "Picks what gets built, and what waits.",
  },
  {
    slug: "advocate",
    name: "Gem",
    pronouns: "they",
    title: "Developer Advocate",
    job: "Writes the words you are reading.",
  },
]
