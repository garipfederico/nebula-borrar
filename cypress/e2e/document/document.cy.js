// import {cy} from "date-fns/locale";
// import "../../support/commands";

import { wait } from "@testing-library/user-event/dist/utils";

describe("Document page - Consultar documento", () => {
  // beforeEach("Logueo", () => {
  before("Logueo", () => {
    const username = "garip.federico@gmail.com";
    const password = "123";
    cy.login(username, password);
    cy.verifyClickAndNavigate("documents");
  });
  it("Verificar navegacion, existencia de elementos visuales y tipos de datos . ", () => {
    
    
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').click()
    cy.url().should("match", /http:\/\/localhost:3000\/documents\/\d+/);
    // espera carga de datos
    cy.wait(800)
    //Verificando existencia de botones y sus textos
    cy.get('[data-cy="ver"]').should('have.text','Ver')
    cy.get('[data-cy="editar"]').should('have.text','Editar')
    cy.get('[data-cy="imprimir"]').should('have.text','Imprimir')
    cy.get('[data-cy="volver"]').should('have.text','Volver')
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
    
    cy.get('[data-cy="internal_id"]')
    .invoke('text')
    .then((text) => {
      expect(text).to.be.a('string');
    });
  
    // DatePicker
    cy.datePicker('created_at')

    // Selects
    cy.comboBox('Categoria','document_type', ['document'])
    cy.comboBox('Nivel de Confidencialidad','confidentiality', ['1','2'])
    cy.comboBox('Estado','status', ['en progreso','inicializado', 'escaneado'])


    //  Existencia de titulo de seccion Situacion fisica
    cy.get('.css-nen11g-MuiStack-root > .MuiTypography-root')
    .should('have.text', 'Situación Física')
  });

  it.skip("Verificar modificacion de documento ", () => {
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
});
