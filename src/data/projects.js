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
      "A role is context, never permission. The bundle is plain files you can read and diff before a run, carrying no credential, no mount, and no command.",
    page: "/projects/agent-compose/",
    url: "https://github.com/coilyco-flight-deck/agent-compose",
  },
  {
    slug: "sirens-echo",
    banner: "/images/banners/sirens-echo.jpg",
    banner2x: "/images/banners/sirens-echo-2x.jpg",
    alt: "sirens-echo // sirens-deep - a discord community agent harness",
    proof:
      "It answers only when a person mentions it in a channel it was granted, and a validator strips the greeting, the emoji, and the sign-off before anything posts.",
    url: "https://github.com/coilyco-gaming/sirens-echo",
  },
  {
    slug: "mcp-beaver",
    banner: "/images/banners/mcp-beaver.jpg",
    banner2x: "/images/banners/mcp-beaver-2x.jpg",
    mobileBanner: "/images/banners/mcp-beaver-mobile.jpg",
    mobileBanner2x: "/images/banners/mcp-beaver-mobile-2x.jpg",
    alt: "mcp-beaver // .mcp.kdl - A MCP server generator with a natural flow",
    proof:
      "An operation you did not declare has no tool and no endpoint, so the blast radius of a write-capable MCP is one small file you can read end to end.",
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
