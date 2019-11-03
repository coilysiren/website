describe('Basic test workflow', () => {
  it('Visits the blog', () => {
    cy.visit('http://localhost:8000/')

    cy.title()

    cy.contains(`Lynn's Blog`).click()

    cy.contains(`My Second post`).click()

    cy.url().should('include', '/posts/post2/')

    cy.title()

    cy.get('.description').contains('a Hella post!')
  })
})
