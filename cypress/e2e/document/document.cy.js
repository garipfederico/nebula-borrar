// import {cy} from "date-fns/locale";
// import "../../support/commands";

import { wait } from "@testing-library/user-event/dist/utils";

describe("Documents page - Caso de uso cambiar comprobar existencia de documentos", () => {
  beforeEach("Logueo", () => {
    const username = "garip.federico@gmail.com";
    const password = "123";
    cy.login(username, password);
    cy.verifyClickAndNavigate("documents");
  });
  it.only("Verificar navegacion y existencia de elementos visuales . ", () => {
    
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').click()
    cy.url().should("match", /http:\/\/localhost:3000\/documents\/\d+/);

    // Existencia de Titulo en la TitleCard
    cy.get('.MuiPaper-elevation24 > .MuiPaper-elevation6 > .MuiStack-root > .MuiTypography-h6')
    .should('have.text', 'Edicion de documento')
    
    //  Existencia de titulo de seccion Datos del documento digital
    cy.get('.css-c789a6-MuiStack-root > .MuiTypography-root')
    .should('have.text', 'Datos del Documento Digital')

    // Input Nro Documento
    cy.get('#internal_id-label')
    .should('have.text', 'Nro documento')
    
    cy.get('[data-cy="internal_id"]').invoke('text').then((text) => {
      const numericValue = parseInt(text);
      expect(numericValue).to.be.a('number');
    });
    cy.get('#document_description-label')
    .should('have.text', 'Nombre')
    
    cy.get('[data-cy="internal_id"]').invoke('text').then((text) => {
      expect(text).to.be.a('string');
    });
    // cy.wait(2000)
    // cy.get('#\\:rh\\:').should('have.text', '18/08/2023')
    // cy.get('[data-cy="createdAt"]').should('exist');
    // const datePicker =  cy.get('.MuiBox-root > .MuiStack-root > .MuiFormControl-root > .MuiInputBase-root')
    const datePicker =  cy.get('#\\:ra\\:')
    cy.log('datePicker: ', datePicker)
    
    
    /*
    .invoke('value').then(date => {
      expect(date).to.match(/^\d{2}\/\d{2}\/\d{4}$/);
      cy.log('date: ',date )
    });
    */
    
    //  Existencia de titulo de seccion Situacion fisica
    cy.get('.css-nen11g-MuiStack-root > .MuiTypography-root')
    .should('have.text', 'Situación Física')
    

    


    // let rowsPerPage;

    // cy.table_verifyColumnsNames(["Fecha", "Numero", "Nombre de documento"]);

    // cy.get("#\\:r4\\:")
    //   .invoke("text")
    //   .then((value) => {
    //     cy.log("value ", value);
    //     rowsPerPage = value;
    //     cy.log("rowsPerPage", rowsPerPage);
    //     for (let row = 1; row <= rowsPerPage; row++) {
    //       cy.log(row);
    //       cy.table_isCellNumber(row, 2);
    //       // cy.table_isCellDate(row, 1) // Agregar cuando este listo el back
    //     }
    //   });
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
