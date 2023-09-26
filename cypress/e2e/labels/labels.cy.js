import {dataResponse} from "./dataResponse";
const response = dataResponse;
describe("Labels page - Caso de Uso imprimir etiquetas", () => {
  const username = "garip.federico@gmail.com";
  const password = "123";
  beforeEach("Logueo", () => {
    // Logueo
    const username = "garip.federico@gmail.com";
    const password = "123";
    cy.login(username, password);
    cy.verifyClickAndNavigate("digitalization");
    cy.verifyClickAndNavigate("labels","digitalization/labels");
    // Tiene que tipear el nro de documento y cantidad de etiquetas para hacer cada test
    cy.get("#expedientNumber").type("99");
    cy.get("#quantity").type("12");
  });
  it("Imprimir etiquetas, Display two tabs and 2 inputFields ", () => {
    //Verificacion de la existencia de componentes
    cy.get('[data-cy="tab-text"]')
    .eq(0)
    .should("have.text", "Crear lote nuevo");
  cy.get('[data-cy="tab-text"]')
    .eq(1)
    .should("have.text", "Reimprimir etiquetas");
  //Verificacion del texto de los componentes
  cy.get("#expedientNumber-label").should(
    "have.text",
    "Numero de expediente"
  );
  cy.get("#quantity-label").should("have.text", "Cantidad");
  })

  it("Imprimir etiquetas, Print labels", () => {
  
    

    cy.window().then((win) => {
      cy.stub(win.console, "log").as("consoleLog");
    });

    cy.get(".MuiStack-root > .MuiButtonBase-root")
      .should("have.text", "Crear e Imprimir")
      .click();

    cy.window().then((win) => {
      // Verificar que la referencia a la nueva ventana no sea nula
      expect(win).to.not.be.null;
    });

    cy.url().should("include", "/home");
    cy.get(".MuiSnackbar-root > .MuiPaper-root").should(
      "have.text",
      "Lote creado exitosamente. Un momento por favor."
    );
  });

  it("Imprimir etiquetas, 404 Recurso no encontrado", () => {
    cy.request_interceptor(
      "/api/document/create-document-and-labels/",
      "POST",
      404,
      "getUsers"
    );

    cy.get(".MuiStack-root > .MuiButtonBase-root")
      .should("have.text", "Crear e Imprimir")
      .click();

    cy.alertDialog_verifier("Recurso no encontrado ", 404);
  });

  it("Imprimir etiquetas, 403 No tiene permisos o no está autenticado", () => {
    cy.request_interceptor(
      "/api/document/create-document-and-labels/",
      "POST",
      403,
      "getUsers"
    );

    cy.get(".MuiStack-root > .MuiButtonBase-root")
      .should("have.text", "Crear e Imprimir")
      .click();

    cy.alertDialog_verifier(
      "No tiene permisos o no está autenticado - Inicie nuevamente la sesión ",
      403
    );
  });

  it("Imprimir etiquetas, 401 No autorizado", () => {
    cy.request_interceptor(
      "/api/document/create-document-and-labels/",
      "POST",
      401,
      "getUsers"
    );

    cy.get(".MuiStack-root > .MuiButtonBase-root")
      .should("have.text", "Crear e Imprimir")
      .click();

    cy.alertDialog_verifier("No autorizado ", 401);
  });
});
