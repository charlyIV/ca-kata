describe('Product List Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should display all products with correct details', () => {
    cy.get('.product-card').should('have.length.greaterThan', 0);

    cy.get('.product-card').first().within(() => {
      cy.get('h2').should('contain.text', 'Strawberry');
      cy.get('.category').should('contain.text', 'Importé');
      cy.get('.product-body strong').eq(0).should('contain.text', '1,76');
    });
  });

  it('should filter products by category', () => {
    cy.get('#category-filter').select(3);
    cy.get('#category-filter').should('have.value', 'Books');

    cy.get('.product-card ').first().within(() => {
      cy.get('.category').should('contain.text', 'Books');
    });
  });

  it('should allow adding a product to the cart', () => {
    cy.get('.product-card').first().within(() => {

      cy.get('select').select(6);
      cy.get('button').contains('Ajouter au panier').click();
    });
    cy.get('.cart-button').should('contain.text', 7);
    cy.get('.product-footer').contains('Non disponible')
  });
});
