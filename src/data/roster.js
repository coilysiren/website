/**
 * @typedef {object} Seat
 * @property {string} slug Role slug, and the creature file's basename.
 * @property {string} name The seat's preferred name.
 * @property {string} title The role's own charter title, not an abbreviation.
 */

/**
 * The seven composed seats, in the order the roster declares them.
 *
 * Creature art is `src/images/creatures/<slug>.png`, derived from the pinned
 * cut each role ships as its app icon. Slug is the join, so a re-derived
 * creature replaces one file and needs no edit here.
 *
 * The hero renders name and title only. Pronoun and job lines lived here while
 * the roster had its own band below the fold, and came off when the seats moved
 * into the hero, where seven of each read as body copy against the headline.
 *
 * @type {Seat[]}
 */
export const roster = [
  {
    slug: "platform",
    name: "Angie",
    title: "Platform Engineer",
  },
  {
    slug: "sysadmin",
    name: "Vera",
    title: "Systems Administrator",
  },
  {
    slug: "science",
    name: "Evie",
    title: "Applied Scientist",
  },
  {
    slug: "frontend",
    name: "Delphi",
    title: "Frontend Engineer",
  },
  {
    slug: "gamedev",
    name: "Sprite",
    title: "Game Developer",
  },
  {
    slug: "director",
    name: "Portia",
    title: "Portfolio Director",
  },
  {
    slug: "advocate",
    name: "Gem",
    title: "Developer Advocate",
  },
]
