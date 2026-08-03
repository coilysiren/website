describe("Basic test workflow", () => {
  it("opens the strongest project proof from the homepage", () => {
    cy.visit("/")
    cy.contains(".featured-project", "Ward")
      .contains("a", "Read the case study")
      .click()

    cy.location("pathname").should("equal", "/work/ward/")
    cy.contains("h1", "Ward").should("be.visible")
    cy.contains("h2", "Trust cannot depend").should("be.visible")
  })

  it("keeps the hiring thesis and next action in the mobile entry view", () => {
    cy.viewport(390, 844)
    cy.visit("/hiring/")

    cy.contains("h1", "I build the governed platform layer").should(
      "be.visible"
    )
    cy.contains("a", "Read the resume").should("be.visible")
    cy.get('meta[name="robots"]').should(
      "have.attr",
      "content",
      "noindex, nofollow"
    )
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(
        document.documentElement.clientWidth
      )
    })
  })

  it("keeps long-form writing reachable without making it the homepage", () => {
    cy.visit("/writing/")
    cy.get(".homepage-post").first().click()

    cy.location("pathname").should("include", "/posts/")
    cy.get("h2").should("be.visible")
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
