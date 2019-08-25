describe('Basic test workflow', () => {
  it('Visits the app', () => {
    cy.visit('http://localhost:8000/')

    cy.contains('Under Construction')

    cy.contains('New Website Frontend').click()

    cy.url().should('include', '/page-2/')
  })
})
