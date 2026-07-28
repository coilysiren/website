describe("Basic test workflow", () => {
  it("can navigate from the homepage to a post page", () => {
    cy.visit("/")
    cy.get(".homepage-post").first().click()

    cy.location("pathname").should("include", "/posts/")
    cy.get("h2").should("be.visible")
    cy.get("h4").should("be.visible")
    cy.get("h5").should("be.visible")
  })
})
