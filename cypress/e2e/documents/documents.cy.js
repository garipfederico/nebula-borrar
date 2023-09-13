// import {cy} from "date-fns/locale";
// import "../../support/commands";

describe("Documents page - Caso de uso cambiar comprobar existencia de documentos", () => {
  beforeEach("Logueo", () => {
    const username = "garip.federico@gmail.com";
    const password = "123";
    cy.login(username, password);
    cy.verifyClickAndNavigate("documents");
  });
  it("Verificar contenido de la tabla. Titulos y tipo de datos en todas las celdas ", () => {
    let rowsPerPage;

    cy.table_verifyColumnsNames(["Fecha", "Numero", "Nombre de documento"]);

    cy.get("#\\:r4\\:")
      .invoke("text")
      .then((value) => {
        cy.log("value ", value);
        rowsPerPage = value;
        cy.log("rowsPerPage", rowsPerPage);
        for (let row = 1; row <= rowsPerPage; row++) {
          cy.log(row);
          cy.table_isCellNumber(row, 2);
          // cy.table_isCellDate(row, 1) // Agregar cuando este listo el back
        }
      });
  });

  it("Comprobar la paginacion ", () => {
    cy.table_verifyNavigation()
  });
  it("Comprobar funcionalidad de cantidad de documentos por paginas (displayedRows)", () => {
    cy.table_verifyRowsPerPageForEachValueOf(["5", "10", "25", "100"], 4)
  });
});
