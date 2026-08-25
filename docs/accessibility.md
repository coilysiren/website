# Accessibility

What is checked, how, and the two numbers a later change would otherwise undo.

[`cypress/e2e/accessibility.cy.ts`](../cypress/e2e/accessibility.cy.ts) runs
`axe-core` over **every route the build emits**, at WCAG 2.0 and 2.1 A and AA
plus `best-practice`. It asserts zero violations rather than a budget, because
a budget is a ratchet nobody tightens.

## Two wiring details

**Inject the browser bundle, not the package export.** `axe-core`'s export is
CommonJS, and the Cypress spec bundler turns it into `exports is not defined`.
The spec reads `node_modules/axe-core/axe.min.js` and evaluates it in the page.

**One route list, guarded.** [`cypress/routes.ts`](../cypress/routes.ts) holds
it, and both browser specs import it. A unit assertion in
[`src/build-output.test.ts`](../src/build-output.test.ts) compares it against
`dist/` and fails on drift, because the first pass covered eight of eighteen
routes and missed a real defect on a promoted post.

It is a module rather than derived at run time because `allowCypressEnv` is
deliberately `false` here, so `Cypress.env()` cannot carry it, and a spec
cannot generate its tests from a promise.

## Load-bearing, do not revert

**The writing-list date is `$mid-purple`.** At 7.14:1 on `$paper`. It was
`$light-purple` at 2.86:1, which fails AA at 12px bold. Size, family and case
carry the de-emphasis instead of lightness. Lightening it back reintroduces the
failure.

**Every `<pre>` carries `tabindex="0"`**, from a transform in
[`eleventy.config.js`](../eleventy.config.js). A code block that scrolls is
unreachable by keyboard without it. It is applied to every block rather than
selectively, because which blocks overflow depends on the code, so a narrower
rule regresses the moment someone pastes a wider snippet.

## What the first two runs caught

Everything here had already shipped, which is the argument for the check.

* **Heading order**, on five pages. Decks were `h4` and dates `h5`, so outlines jumped from `h1`. Neither is a heading, and both are classed `p` elements now. The heroku post additionally opened its body at `h3`, and its headings were each promoted a level.
* **Contrast**, on the writing-list date. See above.
* **`scrollable-region-focusable`**, on the code blocks of two posts, one of them promoted and indexed.

## See also

- [verification](verification.md) - the rest of the suite.
- [templates and data](templates.md) - where the markup comes from.
