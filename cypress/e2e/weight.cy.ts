import { ROUTES } from "../routes"

// Ceilings, in KiB of actual transfer. They only ever go down, and they are
// what asserts the site's stated shape: static HTML with local CSS and fonts.
const DEFAULT_BUDGET = 150
const BUDGETS: Record<string, number> = {
  // Product banners. Heavier than a text page on purpose.
  "/": 900,
  // A defect, not a budget: 34MB of undeferred phone photos and an 8MB GIF.
  // Ratchet down as coilysiren/website#129 lands, delete at DEFAULT_BUDGET.
  "/about/": 36000,
}

describe("Page weight", () => {
  ROUTES.forEach((route) => {
    it(`stays inside its transfer budget on ${route}`, () => {
      cy.visit(route, { failOnStatusCode: false })
      cy.window({ log: false }).then((win) => {
        const navigation = win.performance.getEntriesByType("navigation")[0] as
          PerformanceNavigationTiming | undefined
        const resources = win.performance.getEntriesByType(
          "resource"
        ) as PerformanceResourceTiming[]
        const kib = Math.round(
          ((navigation?.transferSize ?? 0) +
            resources.reduce(
              (sum, entry) => sum + (entry.transferSize || 0),
              0
            )) /
            1024
        )
        const budget = BUDGETS[route] ?? DEFAULT_BUDGET
        expect(
          kib,
          `${route} transferred ${kib}K against a ${budget}K budget`
        ).to.be.at.most(budget)
      })
    })
  })
})
