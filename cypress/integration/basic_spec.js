describe('Basic test workflow', () => {
  it('Visits the blog', () => {
    cy.visit('http://localhost:8000/')

    cy.title()

    cy.get('.blog-main-title').click()

    cy.get('.homepage-post').eq(0).click()

    cy.url().should('include', '/posts/')

    cy.title()

    cy.get('.description')
  })
})
