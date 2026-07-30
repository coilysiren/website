describe("Basic test workflow", () => {
  it("can navigate from the homepage to a post page", () => {
    cy.visit("/")
    cy.get(".homepage-post").first().click()

    cy.location("pathname").should("include", "/posts/")
    cy.get("h2").should("be.visible")
    cy.get("h4").should("be.visible")
    cy.get("h5").should("be.visible")
  })

  it("opens the organization hub from the primary navigation", () => {
    cy.viewport(390, 844)
    cy.visit("/")
    cy.contains("a.nav-btn", "./orgs").click()

    cy.location("pathname").should("equal", "/orgs/")
    cy.contains("h1", "The Coily Co orgs").should("be.visible")
    cy.get(".org-card").should("have.length", 3).and("be.visible")
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(
        document.documentElement.clientWidth
      )
    })
  })

  for (const organization of [
    "coilyco-flight-deck",
    "coilyco-bridge",
    "coilyco-gaming",
  ]) {
    it(`renders the ${organization} organization page`, () => {
      cy.visit(`/orgs/${organization}/`)

      cy.contains("h1", organization).should("be.visible")
      cy.contains("h2", "Repositories").should("be.visible")
      cy.contains("h2", "Tags → repos").should("be.visible")
      cy.contains("h2", "Repos → tags").should("be.visible")
    })
  }
})
