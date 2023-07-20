describe("Labels page - Caso de Uso imprimir etiquetas", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/landing");
    cy.get("#username").type("garip.federico@gmail.com");
    cy.get("#password").type("123");
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    cy.url().should("include", "http://localhost:3000/home");
    // cy.visit("http://localhost:3000/digitalizacion/etiquetas");
  });
it("Verify structure of etiquetas", () => {
    cy.url().should("include", "http://localhost:3000/home");
    cy.get('[data-cy="digitalizacion"]').should("exist").click();
    cy.get('[data-cy="etiquetas"]').should("exist").click();
    cy.url().should(
      "include",
      "http://localhost:3000/digitalizacion/etiquetas"
    );  
    cy.get('[data-cy="tab-text"]')
      .eq(0)
      .should("have.text", "Crear lote nuevo");
    cy.get('[data-cy="tab-text"]')
      .eq(1)
      .should("have.text", "Reimprimir etiquetas");

    // it("Display inputs and buttons with text", () => {
    cy.get("#cajaId-label").should("have.text", "Caja Id");
    cy.get("#cantidad-label").should("have.text", "Cantidad");
    cy.get("#cajaId").type('12')
    cy.get("#cantidad").type('12')
    cy.get(".MuiStack-root > .MuiButtonBase-root").should(
      "have.text",
      "Crear e Imprimir"
    ).click(); 
  });

 
});
