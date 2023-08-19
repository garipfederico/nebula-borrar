// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
/** Make a login and verify tha is redirected to the home page
 * @description Make a login and verify tha is redirected to the home page
 * Custom command to log in to the application.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @example
 * cy.login("user@example.com", "password123");
 */
Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://localhost:3000/landing");
  // if (cy.get(".MuiDialog-container > .MuiPaper-root").should("be.visible")) {
  //   cy.get(".MuiDialog-container").click(100, 100);
  // }
  cy.get("#username").type(email);
  cy.get("#password").type(password);
  cy.get(".MuiStack-root > .MuiButtonBase-root").click();
  cy.url().should("include", "http://localhost:3000/home");
});

Cypress.Commands.add("verifyClickAndNavigate", (data_cy) => {
  cy.get(`[data-cy=${data_cy}]`).should("exist").click();
  cy.url().should("include", "http://localhost:3000/" + data_cy);
});

Cypress.Commands.add("tableVerifyColumnsNames", (arrayNames) => {
  arrayNames.map((aName, index) =>
    cy
      .get(`.MuiTableHead-root > .MuiTableRow-root > :nth-child(${index+1})`)
      .should("have.text", aName)
  );
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
