describe('Basic test workflow', () => {
  it('can navigate from the homepage to a post page', () => {
    // setup
    cy.visit('http://localhost:8000/')
    cy.get('.blog-main-title').click()
    cy.get('.homepage-post').eq(0).click()

    // assertions
    cy.url().should('include', '/posts/')
    cy.get('p.description').should('be.visible')
  })
})
