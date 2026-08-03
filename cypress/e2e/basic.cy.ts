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

    cy.contains(".nav-links a", "./hiring")
      .should("be.visible")
      .and("have.attr", "href", "/hiring/")
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

    cy.get(".portfolio-hero__tagline")
      .should("be.visible")
      .and("contain.text", "lights out")
      .and("contain.text", "flight deck green")
      .and("contain.text", "agents warded for an 8h+ run")
    cy.contains(".portfolio-section--catalogue h2", "Active portfolio").should(
      "be.visible"
    )
    cy.contains("Built to compose").should("not.exist")
    cy.get(".project-group").should("have.length", 3)
    cy.get(".project-group").eq(0).contains("h3", "Agent platform")
    cy.get(".project-group").eq(1).contains("h3", "Infrastructure")
    cy.get(".project-group").eq(2).contains("h3", "Product")
    cy.contains(
      ".project-card-name",
      "coilyco-flight-deck/agent-compose"
    ).should("be.visible")
    cy.contains(
      ".project-card-name",
      "coilyco-flight-deck/infrastructure"
    ).should("be.visible")
    cy.contains(".project-card-name", "coilyco-gaming/galaxy-gen").should(
      "be.visible"
    )
    const privateRepositories = [
      "coilyco-bridge/agentic-os-kai",
      "coilyco-bridge/deploy",
      "coilyco-gaming/sirens-echo",
    ]
    privateRepositories.forEach((repository) => {
      cy.contains(".project-card", repository).within(() => {
        cy.get(".project-card-name").should("contain.text", `${repository} 🔒`)
        cy.get("a").should("not.exist")
      })
    })
    cy.contains(".project-card", "Many MCPs")
      .find(".project-card-icon")
      .should("have.length", 3)
    cy.contains(".project-card", "Many MCPs").find("a").should("not.exist")
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(
        document.documentElement.clientWidth
      )
    })
  })

  it("retires the apps index without removing its standalone tools", () => {
    cy.request({ url: "/apps/", failOnStatusCode: false })
      .its("status")
      .should("eq", 404)
    cy.visit("/about/")
    cy.get('a[href="/apps/"]').should("not.exist")
    cy.request("/apps/bsky-popularity-contest/").its("status").should("eq", 200)
    cy.request("/apps/bsky-follow-suggestions/").its("status").should("eq", 200)
  })
})
