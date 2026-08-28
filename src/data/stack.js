/**
 * @typedef {object} StackStep
 * @property {string} name
 * @property {string} state Release, or the word standing in for one. Preview
 *   and Live are states a version number cannot express.
 * @property {boolean} [live] Paints the state in the section accent.
 * @property {string} [page] Own page on this site.
 * @property {string} role What this step does in the chain, written so the
 *   sentence still reads when the reader is standing on a different step.
 */

/**
 * The chain every project page closes on. One list rather than one
 * per page: it was copied into umbra.njk by hand, and by the time the second
 * page wanted it the versions there were three minor releases stale on umbra
 * and a whole major behind on agent-compose.
 *
 * Versions are still edited by hand. The build has no network and should not
 * grow one for a footer, so this file is the one place to correct them.
 *
 * @type {StackStep[]}
 */
export const stackChain = [
  {
    name: "umbra",
    state: "v0.170.0",
    page: "/projects/umbra/",
    role: "Writes the policy.",
  },
  {
    name: "mcp-beaver",
    state: "Preview",
    page: "/projects/mcp-beaver/",
    role: "Renders that same guardfile into a guarded MCP server.",
  },
  {
    name: "agent-compose",
    state: "v2.61.0",
    page: "/projects/agent-compose/",
    role: "Composes the context around it, carrying no authority.",
  },
]
