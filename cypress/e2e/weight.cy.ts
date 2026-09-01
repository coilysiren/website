import { ROUTES } from "../routes"

// Ceilings, in KiB of actual transfer. They only ever go down, and they are
// what asserts the site's stated shape: static HTML with local CSS and fonts.
const DEFAULT_BUDGET = 150
const BUDGETS: Record<string, number> = {
  // Product banners. Heavier than a text page on purpose.
  "/": 900,
  // Photo-led, and the first favourites slide loads with the page. The rest
  // defers now that every image reserves its box (coilysiren/website#129).
  //
  // This one went up, against the rule above, and the reason is the reason it
  // is written down: 1200 was measured while the portrait was drawing at its
  // own pixel height, which made the page 770px taller than it should be and
  // pushed three home-slide images past the lazy threshold. Correcting the
  // portrait pulled them back in. Measured either side of the fix: 1027K
  // before, 1714K after, and the 687K between them is those three files. They
  // are already at a crisp 2x at 2560, so there is nothing to win back by
  // resizing - only softer images.
  "/about/": 1800,
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
