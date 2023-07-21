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
    cy.get("#cajaId").type("12");
    cy.get("#cantidad").type("12");

    // pone en escucha de los POST
    cy.intercept("POST", "**/api/label/create-bulk/", {
      fixture: "labelsInfo.json",
    }).as("postBulk");
    // pone en escucha del console.log
    cy.window().then((win) => {
      cy.stub(win.console, "log").as("consoleLog");
    });

    cy.get(".MuiStack-root > .MuiButtonBase-root")
      .should("have.text", "Crear e Imprimir")
      .click();

    cy.wait("@postBulk").should(({request, response}) => {
      // expect(request.body).to.include('documento_id')
      // expect(request.body).to.include('documento_id')
      // expect(request.headers).to.have.property('content-type')
      // expect(response && response.body).to.have.property(
      //   "documento_id",
      //   "Using POST in cy.intercept()"
      // );
      // expect(response.status).to.eq(200); // Verificar que la respuesta tenga un estado HTTP 200 (OK)
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("documento_id");
      expect(response.body).to.have.property("lote_id");
      expect(response.body).to.have.property("etiquetas_id");
      expect(response.body).to.have.property("imagen_etiquetas_url");
    });
    cy.get('@consoleLog').should('be.calledWith', 'Mensaje esperado en el console.log');
  });
});
