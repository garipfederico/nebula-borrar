import {dataResponse} from "./dataResponse";
const response = dataResponse;
describe("Labels page - Caso de Uso imprimir etiquetas", () => {
  const username = "garip.federico@gmail.com";
  const password = "123";
  beforeEach("Logueo", () => {
    // cy.session(username, () => {
    //   cy.request({
    //     method: 'POST',
    //     url: 'http://localhost:8003/api/log-in/',
    //     body: { username, password },
    //   }).then(({ body }) => {
    //     window.localStorage.setItem("docu.auth", JSON.stringify(response.data))
    //   })
    // })
    // cy.session(username, () => {
    // cy.visit("http://localhost:3000/landing");
    // cy.get("#username").type("garip.federico@gmail.com");
    // cy.get("#password").type("123");
    // cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    // cy.url().should("include", "http://localhost:3000/home");
    // // cy.visit("http://localhost:3000/digitalizacion/etiquetas");
    // })

    // Logueo
    cy.visit("http://localhost:3000/landing");
    cy.get("#username").type("garip.federico@gmail.com");
    cy.get("#password").type("123");
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    cy.url().should("include", "http://localhost:3000/home");
    // cy.visit("http://localhost:3000/digitalizacion/etiquetas");

    // Navegacion
    cy.url().should("include", "http://localhost:3000/home");
    cy.get('[data-cy="digitalizacion"]').should("exist").click();
    cy.get('[data-cy="etiquetas"]').should("exist").click();
    cy.url().should(
      "include",
      "http://localhost:3000/digitalizacion/etiquetas"
    );

    //Verificacion de la existencia de componentes
    cy.get('[data-cy="tab-text"]')
      .eq(0)
      .should("have.text", "Crear lote nuevo");
    cy.get('[data-cy="tab-text"]')
      .eq(1)
      .should("have.text", "Reimprimir etiquetas");
    //Verificacion del texto de los componentes
    cy.get("#numeroDeExpediente-label").should(
      "have.text",
      "Numero De Expediente"
    );
    cy.get("#cantidad-label").should("have.text", "Cantidad");
    cy.get("#numeroDeExpediente").type("12");
    cy.get("#cantidad").type("12");
  });



  it.skip("Imprimir etiquetas, curso normal", () => {
    cy.window().then((win) => {
      cy.stub(win.console, "log").as("consoleLog");
    });

    cy.get(".MuiStack-root > .MuiButtonBase-root")
      .should("have.text", "Crear e Imprimir")
      .click();
    // });
    cy.get("@consoleLog").should("be.calledWith", "Pdf generado correctamente");
    cy.window().then((win) => {
      // Verificar que la referencia a la nueva ventana no sea nula
      expect(win).to.not.be.null;
    });
    cy.url().should("include", "/home");
  });

  it("Imprimir etiquetas, problema de coneccion", () => {

    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: '*/api/label/create-bulk/*', // that have a URL that matches '/users/*'
      },
      [{status:400}] // and force the response to be: []
    ).as('getUsers') // and assign an alias

    cy.get(".MuiStack-root > .MuiButtonBase-root")
    .should("have.text", "Crear e Imprimir")
    .click();
  // });


  });
});
