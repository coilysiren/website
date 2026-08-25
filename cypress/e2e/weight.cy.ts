import { ROUTES } from "../routes"

// Ceilings, in KiB of actual transfer. They only ever go down. The site's
// stated shape is static HTML with locally served CSS and fonts, and nothing
// asserted that until now.
const DEFAULT_BUDGET = 150
const BUDGETS: Record<string, number> = {
  // Product banners. Heavier than a text page on purpose.
  "/": 900,
  // A defect, not a budget. 34MB of unresized phone photos and one 8MB GIF,
  // none of it deferred. Tracked in coilysiren/website#129. Ratchet this down
  // as that lands, and delete the entry when it reaches DEFAULT_BUDGET.
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
