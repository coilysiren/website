describe("Basic test workflow", () => {
  it("places the talk between the hero and the product band", () => {
    cy.visit("/")

    cy.get(".portfolio-home > section").then(($sections) => {
      expect([...$sections].map((section) => section.id)).to.deep.equal([
        "talk",
        "products",
      ])
    })
    cy.get("#talk")
      .should("have.class", "talk-showcase")
      .within(() => {
        cy.get(".section-label").should("have.text", "Talk")
        cy.contains(
          "h2",
          "Vibe Check: Three Real Agent Setups and How They Collaborate"
        ).should("have.attr", "id", "talk-title")
        cy.get(".talk-showcase__player").should("be.visible")
        cy.get("iframe")
          .should(
            "have.attr",
            "src",
            "https://www.youtube-nocookie.com/embed/vKc7_vfgja4"
          )
          .and(
            "have.attr",
            "title",
            "Vibe Check: Three Real Agent Setups and How They Collaborate"
          )
          .and("have.attr", "loading", "lazy")
          .and(
            "have.attr",
            "allow",
            "accelerometer; clipboard-write; encrypted-media; picture-in-picture"
          )
          .and("have.prop", "allowFullscreen", true)
      })
    cy.get("#products")
      .should("have.class", "product-showcase")
      .and("be.visible")
    cy.contains("h2", "Active portfolio").should("not.exist")
    cy.get(".project-catalogue, .project-group, .project-card").should(
      "not.exist"
    )
    cy.get(".platform-diagram, .featured-project-grid").should("not.exist")

    cy.contains(".nav-source a", "source").should(
      "have.attr",
      "href",
      "https://github.com/coilysiren"
    )
    cy.get(".portfolio-home a").each(($link) => {
      expect($link.attr("href")).to.match(/^https:\/\/github\.com\//)
    })
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
    cy.contains(
      ".hiring-facts span",
      /I am based in the East Bay and I am not relocating\./
    ).should("be.visible")
    cy.contains(
      ".hiring-facts span",
      /Hard stop:\s+a company with US offices,\s+none of them in the Bay Area\./
    ).should("be.visible")
    cy.contains(
      "My base-compensation floor depends on the sector: $170K for nonprofit and government work, $200K for everyone else."
    ).should("be.visible")
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
      "follow, index"
    )
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(
        document.documentElement.clientWidth
      )
    })
  })

  it("leads the homepage with banner-led product tiles", () => {
    cy.visit("/")

    // The banner carries the name and the claim as baked-in type, so the tile
    // must not repeat them as markup. Assert the contract, not the wording.
    cy.get(".product-showcase__grid > .product-tile").should("have.length", 3)
    cy.get(".product-tile h1, .product-tile h2, .product-tile h3").should(
      "not.exist"
    )
    cy.get(".product-tile__banner").should("have.length", 2)
    cy.get(".product-tile__banner").each(($banner) => {
      expect($banner.attr("src")).to.match(/^\/images\/banners\//)
      expect($banner.attr("alt")).to.have.length.greaterThan(0)
      expect($banner.attr("loading")).to.equal("lazy")
    })

    cy.get('.product-tile[data-product="agent-compose"]')
      .find("a.product-tile__surface")
      .should(
        "have.attr",
        "href",
        "https://github.com/coilyco-flight-deck/agent-compose"
      )

    // Every tile now leads somewhere. A banner this size must not imply a
    // destination the page cannot deliver, so none of them may go nowhere.
    cy.get('.product-tile[data-product="sirens-echo"]')
      .find("a.product-tile__surface")
      .should(
        "have.attr",
        "href",
        "https://github.com/coilyco-gaming/sirens-echo"
      )
    cy.get(".product-tile").should("have.length", 3)
    cy.get(".product-tile a.product-tile__surface").should("have.length", 3)
    cy.contains(".product-tile", "Private repository").should("not.exist")

    // Ward has no mark or banner, so it sets the same three pieces of
    // information as type and takes the full row.
    cy.get('.product-tile[data-product="ward"]')
      .should("have.class", "product-tile--wide")
      .within(() => {
        cy.get(".product-tile__banner").should("not.exist")
        cy.get(".product-tile__stage").should("have.text", "Execute")
        cy.get(".product-tile__wordmark").should("have.text", "Ward")
        cy.get(".product-tile__claim").should("be.visible")
        cy.get("a.product-tile__surface").should(
          "have.attr",
          "href",
          "https://github.com/coilyco-flight-deck/ward"
        )
      })
  })

  it("keeps long-form writing out of visible navigation", () => {
    cy.visit("/")
    cy.get('a[href="/writing/"]').should("not.exist")

    cy.visit("/writing/")
    cy.get('meta[name="robots"]').should(
      "have.attr",
      "content",
      "noindex, nofollow"
    )

    const retainedDirectRoutes = [
      "/posts/stochastic-design-iteration/",
      "/coilysiren-personal-gmail-privacy/",
      "/cool-people/",
    ]
    retainedDirectRoutes.forEach((url) => {
      cy.visit(url)
      cy.get('meta[name="robots"]').should(
        "have.attr",
        "content",
        "noindex, nofollow"
      )
    })
  })

  it("ships static pages with scoped external media and text-only metadata", () => {
    const pages: Array<[string, string, string | undefined, string[]]> = [
      [
        "/",
        "Kai Siren",
        "https://coilysiren.me/",
        ["https://www.youtube-nocookie.com"],
      ],
      ["/about/", "About | Kai Siren", "https://coilysiren.me/about/", []],
      ["/hiring/", "Hiring | Kai Siren", "https://coilysiren.me/hiring/", []],
      ["/resume/", "Resume", undefined, []],
    ]

    pages.forEach(([url, title, canonical, allowedExternalOrigins]) => {
      const outputPath =
        url === "/" ? "dist/index.html" : `dist${url}index.html`
      cy.readFile(outputPath).should("not.match", /<script\b/i)
      cy.visit(url)
      cy.title().should("eq", title)
      cy.get('meta[name="robots"]').should(
        "have.attr",
        "content",
        "follow, index"
      )
      cy.get('meta[property="og:image"], meta[name="twitter:image"]').should(
        "not.exist"
      )
      if (canonical) {
        cy.get('link[rel="canonical"]').should("have.attr", "href", canonical)
      } else {
        cy.get('link[rel="canonical"]').should("not.exist")
      }
      cy.document().then((document) => {
        expect(document.documentElement.innerHTML).not.to.contain("___gatsby")
        const browserWindow = document.defaultView
        expect(browserWindow).not.to.equal(null)
        const thirdPartyResources = browserWindow!.performance
          .getEntriesByType("resource")
          .map((entry) => new URL(entry.name))
          .filter(
            (resourceUrl) =>
              resourceUrl.origin !== browserWindow!.location.origin
          )
        const thirdPartyOrigins = [
          ...new Set(
            thirdPartyResources.map((resourceUrl) => resourceUrl.origin)
          ),
        ]
        expect(thirdPartyOrigins).to.have.members(allowedExternalOrigins)
      })
    })
  })

  it("limits discovery output to the four canonical routes", () => {
    const canonicalUrls = [
      "https://coilysiren.me/",
      "https://coilysiren.me/about/",
      "https://coilysiren.me/hiring/",
      "https://coilysiren.me/resume/",
    ]

    cy.request("/sitemap.xml")
      .its("body")
      .then((body: string) => {
        const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
          (match) => match[1]
        )
        expect(urls).to.deep.equal(canonicalUrls)
      })
    cy.request("/llms.txt")
      .its("body")
      .then((body: string) => {
        canonicalUrls.forEach((url) => expect(body).to.contain(url))
        expect(body).not.to.contain("/writing/")
        expect(body).not.to.contain("/posts/")
      })
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

  it("keeps the homepage usable on mobile", () => {
    cy.viewport(390, 844)
    cy.visit("/")

    cy.get(".portfolio-hero h1").should(
      "have.text",
      "I build agentic engineering platforms"
    )
    cy.contains("Platform engineer \u00b7 East Bay, CA").should("not.exist")
    cy.get(".portfolio-hero__tagline")
      .should("be.visible")
      .and("contain.text", "lights out")
      .and("contain.text", "flight deck green")
      .and("contain.text", "agents warded for an 8h+ run")
    cy.get(".portfolio-hero .button-row").should("not.exist")
    cy.contains(".portfolio-hero", "Explore the work").should("not.exist")

    cy.get(".talk-showcase__player").then(($player) => {
      const playerElement = $player.get(0)
      const player = playerElement.getBoundingClientRect()

      expect(player.width / player.height).to.be.closeTo(16 / 9, 0.02)
      expect(player.right).to.be.at.most(
        playerElement.ownerDocument.documentElement.clientWidth
      )
    })

    // The tiles stack rather than shrinking the banners into a multi-up.
    cy.get(".product-tile").should("have.length", 3)
    cy.get(".product-tile__surface").then(($surfaces) => {
      const boxes = [...$surfaces].map((surface) =>
        surface.getBoundingClientRect()
      )

      boxes.forEach((box, index) => {
        const next = boxes[index + 1]

        if (next) {
          expect(box.bottom).to.be.at.most(next.top + 1)
        }
      })
    })

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
    cy.request({ url: "/rss.xml", failOnStatusCode: false })
      .its("status")
      .should("eq", 404)
    cy.request({ url: "/og/", failOnStatusCode: false })
      .its("status")
      .should("eq", 404)
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
    cy.get(".not-found-route-list strong").then(($titles) => {
      expect([...$titles].map((title) => title.textContent)).to.deep.equal([
        "About",
        "Hiring",
        "Resume",
      ])
    })
    cy.get('.not-found-page a[href="/writing/"]').should("not.exist")
    cy.get('meta[name="robots"]').should(
      "have.attr",
      "content",
      "noindex, nofollow"
    )
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(
        document.documentElement.clientWidth
      )
      const browserWindow = document.defaultView
      expect(browserWindow).not.to.equal(null)
      const thirdPartyResources = browserWindow!.performance
        .getEntriesByType("resource")
        .map((entry) => new URL(entry.name))
        .filter(
          (resourceUrl) => resourceUrl.origin !== browserWindow!.location.origin
        )
      expect(thirdPartyResources).to.deep.equal([])
    })
  })
})
