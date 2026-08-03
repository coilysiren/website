describe("Basic test workflow", () => {
  it("links the strongest project proof to its public source", () => {
    cy.visit("/")
    cy.contains(".featured-project", "Ward")
      .contains("a", "View source")
      .should(
        "have.attr",
        "href",
        "https://forgejo.coilysiren.me/coilyco-flight-deck/ward"
      )
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

  it("keeps the homepage portfolio usable on mobile", () => {
    cy.viewport(390, 844)
    cy.visit("/")

    cy.contains("h3", "Agent platform").should("be.visible")
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(
        document.documentElement.clientWidth
      )
    })
  })
})
