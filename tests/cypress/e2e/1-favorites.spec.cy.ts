import { LAUNCHES } from 'tests/assets/launches';

describe('GIVEN a user navigating to a Launch page', () => {
  beforeEach(() => {
    // Arrange
    cy.intercept('GET', Cypress.env('apiUrl') + 'launch/upcoming/?limit=10&mode=list', { body: { results: LAUNCHES } });
    cy.intercept('GET', Cypress.env('apiUrl') + `launch/?slug=${LAUNCHES[0].slug}`, { body: { results: [LAUNCHES[0]] } });
    cy.visit('/');
  });
  context('WHEN click "Add to favorites" button to add the launch to favorites', () => {
    beforeEach(() => {
      // Act
      cy.visit('/launch/' + LAUNCHES[0].slug);
      cy.get('[data-testid="add-fav-button"]').click();
      cy.visit('/favorites');
    });
    it('THEN the Launch should be in the favorites list', () => {
      // Assert
      cy.contains(LAUNCHES[0].name);
    });
  });
});
