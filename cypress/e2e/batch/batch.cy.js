// import {dataResponse} from "./dataResponse";
// const response = dataResponse;

describe("Labels page - Caso de uso cambiar estado de documento del lote", () => {
  const username = "garip.federico@gmail.com";
  const password = "123";

  beforeEach("Logueo", () => {
    cy.visit("http://localhost:3000/landing");
    if (cy.get(".MuiDialog-container > .MuiPaper-root").should("be.visible")) {
      cy.get(".MuiDialog-container").click(100, 100);
    }
    cy.get("#username").type("garip.federico@gmail.com");
    cy.get("#password").type("123");
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    cy.url().should("include", "http://localhost:3000/home");
    cy.get('[data-cy="digitalizacion"]').should("exist").click();
    cy.get('[data-cy="lotes"]').should("exist").click();
  });

  it.skip("Navegacion", () => {
    cy.url().should("include", "http://localhost:3000/digitalizacion/lotes");
  });
  it.skip("Comprobacion de nombres de columnas", () => {
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(2)").should(
      "have.text",
      "N° Lote"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(3)").should(
      "have.text",
      "Operador"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(4)").should(
      "have.text",
      "Fecha"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(5)").should(
      "have.text",
      "Cantidad de documentos"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(6)").should(
      "have.text",
      "Estado"
    );
  });

  it.skip("Comprobacion de existencia de filas con datos", () => {
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)").should(
      ($element) => {
        const text = $element.text();
        const isNumber = !isNaN(parseFloat(text)) && isFinite(text);

        expect(isNumber).to.equal(true, "El texto debe ser un número");
      }
    );

    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(3)").should(
      ($element) => {
        const text = $element.text();
        const isNumber = !isNaN(parseFloat(text)) && isFinite(text);

        expect(isNumber).to.equal(true, "El texto debe ser un número");
      }
    );

    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(4)").should(
      ($element) => {
        const text = $element.text();

        // Expresión regular para validar el formato de fecha (dd/mm/yyyy)
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        const isDate = dateRegex.test(text);

        expect(isDate).to.equal(
          true,
          "El texto debe tener el formato de fecha dd/mm/yyyy"
        );
      }
    );
    
    cy.get(':nth-child(1) > :nth-child(6) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select')
    .should(($select) => {
      const possibleTexts = ["en progreso", "inicializado", "escaneado"];
      const actualText = $select.text();
      expect(possibleTexts.some(text => actualText.includes(text))).to.be.true;
    }).click()

  });
  
  it.skip('Comprobando la existencia de los estados en el combobox',()=>{
    cy.get(':nth-child(1) > :nth-child(6) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select')
    .click();
    cy.get('[data-value="en progreso"]').should('be.visible')
    cy.get('[data-value="inicializado"]').should('be.visible')
    cy.get('[data-value="escaneado"]').should('be.visible')
  })

  it('Comprobando el cambio de estado exitoso',()=>{
    cy.get(':nth-child(1) > :nth-child(6) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select')
    .click();
    cy.get('[data-value="en progreso"]').should('be.visible').click()
    cy.get(':nth-child(1) > :nth-child(6) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select')
    .click();
    cy.get('[data-value="escaneado"]').should('be.visible').click()

    // cy.get(".MuiDialog-container").click(100, 100);
    // cy.get(':nth-child(1) > :nth-child(6) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select')
    // .click()
    // Click en el menu
    cy.get('.MuiToolbar-root > .MuiButtonBase-root')
    .click()
    // Click en home
    cy.get(':nth-child(3) > :nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root')
    .click()
// Click en digitalizacion
cy.get('[data-cy="digitalizacion"] > .css-1shxafo-MuiStack-root')
    .click()
    // Click en lotes
    cy.get('[data-cy="lotes"] > .css-1shxafo-MuiStack-root')
    .click()
    // cy.get('[data-cy="lotes"] > .css-1shxafo-MuiStack-root')
    cy.get(':nth-child(1) > :nth-child(6) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select')
    .should('have.text', 'escaneado')


  })

  





  it.skip("Imprimir etiquetas, problema de coneccion", () => {
    //     cy.intercept(
    //       {
    //         method: 'GET', // Route all GET requests
    //         url: '*/api/label/create-bulk/*', // that have a URL that matches '/users/*'
    //       },
    //       [{status:400}] // and force the response to be: []
    //     ).as('getUsers') // and assign an alias
    //     cy.get(".MuiStack-root > .MuiButtonBase-root")
    //     .should("have.text", "Crear e Imprimir")
    //     .click();
    //   // });
    /*
    // Hacer un console.log 
    cy.window().then((win) => {
      //   const decoded2 = JSON.parse(win.localStorage.getItem("docu.auth"));
      //   cy.log('docuAuth: ' , decoded2)
      //   expect(decoded2).to.not.be.null;
      //   cy.wait(2000);
    });
    */
    /*
    cy.request({
      method: "GET",
      url: "http://localhost:8003/api/document",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNzkwNjk3LCJpYXQiOjE2OTE1MzE0OTcsImp0aSI6ImFiZTk1Y2E3YzkyMzRlOWE4OGJlNjQ5ZTc2YTY2YTc5IiwiaWQiOjIsImVtYWlsIjoiZ2FyaXAuZmVkZXJpY29AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IiIsImxhc3RfbmFtZSI6IiIsImdyb3VwIjpbXX0.5WxnVXGcccy2k0kemooqg1-UVkk4rM6k0LGSnmxoYvo",
      },
    })
      .its("status")
      .should("equal", 200)
      .then((response) => {
        cy.window().then((win) => {
          cy.log("response: ", response);
        });
      });
      */
  });
});
