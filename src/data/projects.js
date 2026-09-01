/**
 * @typedef {object} ShowcaseProduct
 * @property {string} slug
 * @property {string} banner
 * @property {string} banner2x
 * @property {string} [mobileBanner]
 * @property {string} [mobileBanner2x]
 * @property {string} alt
 * @property {string} proof
 * @property {string} url
 * @property {string} [page] Own page on this site. When present the tile
 *   links here instead of off to the repository, because the tile is the
 *   strongest content on the homepage and sending it off-domain spends that
 *   attention at the moment of highest interest.
 */

/**
 * The homepage product band. The banner carries the name and the claim as
 * baked-in type, so `alt` has to say what the image says and `proof` has to
 * add something the banner does not.
 *
 * @type {ShowcaseProduct[]}
 */
export const showcaseProducts = [
  {
    slug: "agent-compose",
    banner: "/images/banners/agent-compose.jpg",
    banner2x: "/images/banners/agent-compose-2x.jpg",
    alt: "agent-compose // $ acompose - Eval driven composer for roles and personas",
    proof:
      "The test board comes from the roster itself. Every role you change moves the cases that test it, and diff names exactly what moved between two bundles.",
    page: "/projects/agent-compose/",
    url: "https://github.com/coilyco-flight-deck/agent-compose",
  },
  {
    slug: "mcp-beaver",
    banner: "/images/banners/mcp-beaver.jpg",
    banner2x: "/images/banners/mcp-beaver-2x.jpg",
    mobileBanner: "/images/banners/mcp-beaver-mobile.jpg",
    mobileBanner2x: "/images/banners/mcp-beaver-mobile-2x.jpg",
    alt: "mcp-beaver // .mcp.kdl - A MCP server generator with a natural flow",
    proof:
      "One grant becomes one MCP tool and one HTTP endpoint, schema and all. Write the file, get a server that serves exactly what the file says.",
    page: "/projects/mcp-beaver/",
    url: "https://github.com/coilyco-flight-deck/mcp-beaver",
  },
  {
    slug: "umbra",
    banner: "/images/banners/umbra.jpg",
    banner2x: "/images/banners/umbra-2x.jpg",
    mobileBanner: "/images/banners/umbra-mobile.jpg",
    mobileBanner2x: "/images/banners/umbra-mobile-2x.jpg",
    alt: "umbra - a config driven occlusion framework",
    proof:
      "Declare what a tool may run. Arguments are validated before the process starts, each verb needs its own scope token, and every call lands in an append-only audit log.",
    page: "/projects/umbra/",
    url: "https://github.com/coilyco-flight-deck/umbra",
  },
]
