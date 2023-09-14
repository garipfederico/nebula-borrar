describe("Documents page - Caso de uso cambiar comprobar existencia de documentos", () => {
  beforeEach("Logueo", () => {
    const username = "garip.federico@gmail.com";
    const password = "123";
    cy.login(username, password);
    cy.verifyClickAndNavigate("documents");
  });
  it("Comprobacion de nombres de columnas ", () => {
    
    cy.table_verifyColumnsNames(["Fecha", "Numero", "Nombre de documento"]);
  });
  
  it("Comprobacion de tipo de datos en la fila 1", () => {
    cy.table_isCellDate(1,1)
    cy.table_isCellNumber(1,2)
  })
  
  it.only("Comprobar la paginacion ", () => {
    cy.table_verifyNavigation()
  });
  it("Comprobar funcionalidad de cantidad de documentos por paginas (displayedRows)", () => {
    cy.table_verifyRowsPerPageForEachValueOf(["5", "10", "25", "100"], 4)
  });
});
