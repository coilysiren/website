describe("Basic test workflow", () => {
  it("moves the active portfolio into the homepage proof band", () => {
    cy.visit("/")

    cy.get(".portfolio-home > .portfolio-section")
      .should("have.length", 1)
      .and("have.class", "portfolio-section--featured")
      .and("have.class", "portfolio-section--catalogue")
      .and("have.attr", "id", "featured-work")
    cy.contains("h2", "Active portfolio").should("be.visible")
    cy.contains("One platform, three proof routes.").should("not.exist")
    cy.get(".platform-diagram, .featured-project-grid").should("not.exist")
    cy.contains(".project-card-name", /^coilyco-flight-deck\/ward$/)
      .parents("a")
      .should(
        "have.attr",
        "href",
        "https://github.com/coilyco-flight-deck/ward"
      )
    cy.get(".project-card a.project-card-surface").each(($link) => {
      expect($link.attr("href")).to.match(/^https:\/\/github\.com\//)
    })
    cy.contains(".nav-source a", "source").should(
      "have.attr",
      "href",
      "https://github.com/coilysiren"
    )
    cy.get('a[href^="https://forgejo.coilysiren.me/"]').should("not.exist")
  })

  it("keeps the hiring page a project-free information reference", () => {
    cy.viewport(390, 844)
    cy.visit("/hiring/")

    cy.contains(".nav-links a", "./hiring")
      .should("be.visible")
      .and("have.attr", "href", "/hiring/")
    cy.get(".hiring-page")
      .should("be.visible")
      .and("have.css", "border-top-color", "rgb(220, 143, 114)")
    cy.contains("h1", "Where I do my best work").should("be.visible")
    cy.contains("No Bay Area office is a hard stop").should("be.visible")
    cy.contains("My base-compensation floor is $170K").should("be.visible")
    cy.contains("Cost to serve").should("not.exist")
    cy.contains("h2", "I want the next chapter").should("be.visible")
    cy.contains("I do not do async-proctored puzzle coding").should(
      "be.visible"
    )
    cy.contains("a", "Resume").should("be.visible")
    cy.get(
      ".hiring-hero, .hiring-proof-grid, .platform-diagram, .hiring-page table"
    ).should("not.exist")
    cy.get(".hiring-page").should("not.contain.text", "Ward")
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
    cy.visit("/")
    cy.contains(".nav-links a", "./writing")
      .should("be.visible")
      .and("have.attr", "href", "/writing/")
      .click()
    cy.location("pathname").should("eq", "/writing/")
    cy.get(".homepage-post").first().click()

    cy.location("pathname").should("include", "/posts/")
    cy.get("h2").should("be.visible")
  })

  it("pairs the About introduction with one portrait on desktop", () => {
    cy.viewport(1280, 900)
    cy.visit("/about/")

    cy.contains("Staff-level").should("not.exist")
    cy.contains("systems other engineers rely on").should("not.exist")
    cy.contains("I live in the East Bay").should("be.visible")
    cy.get(".my-life-intro__links").should("not.exist")
    cy.get(".my-life-slide--intro img")
      .should("have.length", 1)
      .and("have.attr", "src", "/my-life/16-car-headphones-sunglasses.jpg")
    cy.get(
      'img[src="/my-life/11-social-look-sunglasses-purple-tails.jpg"]'
    ).should("not.exist")
    cy.get(".my-life-slide--intro").then(($intro) => {
      const portraitElement = $intro.find(".my-life-intro__portrait").get(0)
      const copyElement = $intro.find(".my-life-slide__copy").get(0)

      if (!portraitElement || !copyElement) {
        throw new Error("About introduction is missing its portrait or copy")
      }

      const portrait = portraitElement.getBoundingClientRect()
      const copy = copyElement.getBoundingClientRect()

      expect(portrait.right).to.be.lessThan(copy.left)
      expect(portrait.top).to.be.lessThan(copy.bottom)
      expect(copy.top).to.be.lessThan(portrait.bottom)
    })
  })

  it("keeps the homepage portfolio usable on mobile", () => {
    cy.viewport(390, 844)
    cy.visit("/")

    cy.get(".portfolio-hero h1").should(
      "have.text",
      "I build agentic engineering platforms"
    )
    cy.contains("Platform engineer · East Bay, CA").should("not.exist")
    cy.get(".portfolio-hero__tagline")
      .should("be.visible")
      .and("contain.text", "lights out")
      .and("contain.text", "flight deck green")
      .and("contain.text", "agents warded for an 8h+ run")
    cy.get(".portfolio-hero .button-row").should("not.exist")
    cy.contains(".portfolio-hero", "Explore the work").should("not.exist")
    cy.contains(".portfolio-section--catalogue h2", "Active portfolio").should(
      "be.visible"
    )
    cy.contains("Built to compose").should("not.exist")
    cy.get(".project-group").should("have.length", 3)
    cy.get(".project-group").eq(0).contains("h3", "Infrastructure")
    cy.get(".project-group").eq(1).contains("h3", "Agent platform")
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
    const productEmojis: Array<[string, string]> = [
      ["coilyco-gaming/eco-app", "🌎"],
      ["coilyco-gaming/galaxy-gen", "🌌"],
      ["coilyco-gaming/sirens-echo", "🤖"],
    ]
    productEmojis.forEach(([repository, emoji]) => {
      cy.contains(".project-card", repository)
        .find(".project-card-emoji")
        .should("have.text", emoji)
    })
    cy.contains(".project-card", "Many MCPs")
      .find(".project-card-icon")
      .should("have.length", 3)
    cy.contains(".project-card", "Many MCPs")
      .find("img")
      .should("have.length", 3)
    cy.contains(".project-card", "Many MCPs")
      .find(".project-card-emoji")
      .should("not.exist")
    cy.contains(".project-card", "Many MCPs").find("a").should("not.exist")
    cy.contains("Notes from the work.").should("not.exist")
    cy.contains("Working together").should("not.exist")
    cy.get("footer")
      .should("contain.text", "Kai Siren")
      .and("contain.text", "Platform Engineer")
      .and("not.contain.text", "Lynn Conway")
    cy.get("footer").find("a, img").should("not.exist")
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(
        document.documentElement.clientWidth
      )
    })
  })

  it("does not expose retired app routes", () => {
    const retiredRoutes = [
      "/apps/",
      "/apps/bsky-popularity-contest/",
      "/apps/bsky-follow-suggestions/",
      "/pulse/",
    ]
    retiredRoutes.forEach((url) => {
      cy.request({ url, failOnStatusCode: false })
        .its("status")
        .should("eq", 404)
    })
    cy.visit("/about/")
    cy.get('a[href="/apps/"]').should("not.exist")
    cy.get('a[href="/pulse/"]').should("not.exist")
  })

  it("gives missing routes a designed recovery page", () => {
    const missingRoute = "/definitely-not-here/"

    cy.request({ url: missingRoute, failOnStatusCode: false })
      .its("status")
      .should("eq", 404)

    cy.viewport(390, 844)
    cy.visit(missingRoute, { failOnStatusCode: false })
    cy.get(".not-found-page").should("be.visible")
    cy.contains("h1", "This path ends here.").should("be.visible")
    cy.contains(".not-found-scroll-cue", "Recovery routes below").should(
      "be.visible"
    )
    cy.get(".not-found-signal__code").should("have.text", "404")
    cy.get(".not-found-route-list a").should("have.length", 3)
    cy.get('.not-found-route-list a[href="/"]').should("be.visible")
    cy.get(".not-found-route-list strong").then(($titles) => {
      expect([...$titles].map((title) => title.textContent)).to.deep.equal([
        "Home",
        "About",
        "Writing",
      ])
    })
    cy.get('meta[name="robots"]').should(
      "have.attr",
      "content",
      "noindex, follow"
    )
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(
        document.documentElement.clientWidth
      )
    })
  })
})
