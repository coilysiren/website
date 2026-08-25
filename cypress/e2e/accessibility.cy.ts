import type { AxeResults, Result } from "axe-core"
import { ROUTES } from "../routes"

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]

const describeViolation = (violation: Result) =>
  `${violation.impact ?? "unknown"}  ${violation.id} x${violation.nodes.length}\n` +
  violation.nodes
    .slice(0, 3)
    .map((node) => `      ${JSON.stringify(node.target)}`)
    .join("\n")

describe("Accessibility", () => {
  ROUTES.forEach((route) => {
    it(`raises no axe violation on ${route}`, () => {
      cy.visit(route, { failOnStatusCode: false })
      // The browser bundle rather than the package export, which is CommonJS
      // and does not survive the spec bundler.
      cy.readFile("node_modules/axe-core/axe.min.js").then((source: string) => {
        cy.window({ log: false })
          .then((win) => {
            win.eval(source)
            return (
              win as unknown as {
                axe: { run: (c: Document, o: unknown) => Promise<AxeResults> }
              }
            ).axe.run(win.document, { runOnly: TAGS })
          })
          .then((results) => {
            const report = results.violations.map(describeViolation).join("\n")
            expect(report, `${route}\n${report}`).to.equal("")
          })
      })
    })
  })
})
