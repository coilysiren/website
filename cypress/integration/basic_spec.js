describe('Basic test workflow', () => {
	it('can navigate from the homepage to a post page', () => {
		// Setup
		cy.visit('http://localhost:8000/');
		cy.get('.blog-main-title').click();
		cy.get('.homepage-post')
			.eq(0)
			.click();

		// Assertions
		cy.url().should('include', '/posts/');
		cy.get('h2').should('be.visible');
		cy.get('h4').should('be.visible');
		cy.get('h5').should('be.visible');
	});
});
