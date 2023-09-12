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
    cy.get(".MuiTablePagination-displayedRows")
      .invoke("text")
      .then((text) => {
        const matches = text.match(/(\d+)\s*–\s*(\d+)\s*of\s*(\d+)/);

        if (matches) {
          const firstRow = parseInt(matches[1]);
          const lastRow = parseInt(matches[2]);
          const totalRows = parseInt(matches[3]);

          const documentPerPage = totalRows - firstRow + 1;
          const numberOfClicks = Math.floor(totalRows / documentPerPage);

          for (let x = 1; x <= numberOfClicks; x++) {
            cy.wait(1500);
            cy.get('[aria-label="Go to next page"]').click();
          }
          for (let x = 1; x <= numberOfClicks; x++) {
            cy.wait(1500);
            cy.get('[aria-label="Go to previous page"]').click();
          }
        }
      });
  });
  it("Comprobar funcionalidad de cantidad de documentos por paginas", () => {
    cy.table_dropdown_verifyValues(["5", "10", "25", "100"]);
    cy.table_dropdown_selectAnOption("5");
    cy.table_verifyNumberOfRows(5)
    cy.table_dropdown_selectAnOption("10");
    cy.table_verifyNumberOfRows(10)
    cy.table_dropdown_selectAnOption("25");
    cy.table_verifyNumberOfRows(12) // Actualmente solo hay cargados 12 documentos
  });
});
