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
    alt: "agent-compose // $ acompose - Eval driven agent roles and personas",
    proof:
      "Selects roles, personalities, skills, and tool inventories, then emits an inspectable bundle. No executable authority rides along.",
    url: "https://github.com/coilyco-flight-deck/agent-compose",
  },
  {
    slug: "sirens-echo",
    banner: "/images/banners/sirens-echo.jpg",
    banner2x: "/images/banners/sirens-echo-2x.jpg",
    alt: "sirens-echo // sirens-deep - a discord community agent harness",
    proof:
      "Go ops tooling for the Sirens community Discord: message dumps, normalization, and the analysis pipelines over them.",
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
      "Renders a guardfile into a guarded MCP server and HTTP tool API. One generic runtime, many guardfiles, and an undeclared operation has no handler at all.",
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
      "A config driven occlusion framework that puts explicit boundaries around CLIs and APIs.",
    url: "https://github.com/coilyco-flight-deck/umbra",
  },
]
