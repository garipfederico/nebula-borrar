/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Labels page - Caso de Uso imprimir etiquetas", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/landing");
    cy.get("#username").type("garip.federico@gmail.com");
    cy.get("#password").type("123");
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    cy.url().should("include", "http://localhost:3000/home");
    cy.visit("http://localhost:3000/digitalizacion/etiquetas");
  });
  it.skip("Login and navigation to etiquetas", () => {
    cy.url().should("include", "http://localhost:3000/home");
    cy.get('[data-cy="digitalizacion"]').should("exist").click();
    cy.get('[data-cy="etiquetas"]').should("exist").click();
    cy.url().should(
      "include",
      "http://localhost:3000/digitalizacion/etiquetas"
    );
  });
  it("Verify structure of etiquetas", () => {
    cy.visit("http://localhost:3000/digitalizacion/etiquetas");
    // cy.url().should(
    //   "include",
    //   "http://localhost:3000/digitalizacion/etiquetas"
    // );
  
    cy.get('[data-cy="tab-text"]')
      .eq(0)
      .should("have.text", "Crear lote nuevo");
    cy.get('[data-cy="tab-text"]')
      .eq(1)
      .should("have.text", "Reimprimir etiquetas");

    // it("Display inputs and buttons with text", () => {
    cy.get("#cajaId-label").should("have.text", "Caja Id");
    cy.get("#cantidad-label").should("have.text", "Cantidad");
    cy.get(".MuiStack-root > .MuiButtonBase-root").should(
      "have.text",
      "Crear e Imprimir"
    );
    // });
  });

  it.skip("Login succesfull and redirect to home page", () => {
    cy.get("#username").type("garip.federico@gmail.com");
    cy.get("#password").type("123");
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    cy.url().should("include", "http://localhost:3000/home");
  });
  it.skip("Login failed and a dialog message will be showed and closed", () => {
    cy.get("#username").type("garip.federico@gmail.com");
    cy.get("#password").type("12345");
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    cy.get(".MuiDialog-container > .MuiPaper-root").should("be.visible");
    cy.get("#alert-dialog-title").should(
      "have.text",
      "Lo sentimos ha ocurrido un error"
    );
    cy.get("#alert-dialog-description").should(
      "have.text",
      "El usuario o la contraseña son incorrectos"
    );
    cy.get(".MuiDialog-container").click(100, 100);
    cy.get("#alert-dialog-description").should("not.be.visible");
  });
});
