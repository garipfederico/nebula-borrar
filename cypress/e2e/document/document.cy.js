// import "../../support/commands";

describe("Document page - Consultar documento", () => {
  const username = "garip.federico@gmail.com";
  const password = "123";

  const numberOfFilesToTest = 2;

  const goToFileChangingOneComboboxType = (
    comboboxValuesArray,
    comboboxName,
    fileNumber
  ) => {
    comboboxValuesArray.forEach((textOption) => {
      // Ingresa y cambia el estado
      // const getFile = () => {return cy.get(`.MuiTableBody-root > :nth-child(${fileNumber}) > :nth-child(1)`)}
      cy.wait(800);
      cy.url().should("include", "http://localhost:3000/documents");
      // cy.get(`.MuiTableBody-root > :nth-child(${fileNumber}) > :nth-child(1)`)
      // getFile.should('be.visible').click();
      cy.table_fileClick(fileNumber);
      cy.get('[data-cy="editar"]').should("have.text", "Editar").click();
      cy.comboBox_open(comboboxName);
      cy.combobox_selectOption(textOption);
      cy.get('[data-cy="editar"]').should("have.text", "Guardar").click();
      cy.wait(800);
      cy.url().should("include", "http://localhost:3000/documents");
      // Ingresa y verifica el cambio de estado
      cy.table_fileClick(fileNumber);
      cy.wait(500);
      cy.url().should("match", /http:\/\/localhost:3000\/documents\/\d+/);
      cy.get(`[data-cy=${comboboxName}] > #demo-simple-select`).should(
        "have.text",
        textOption
      );
      cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    });
  };

  beforeEach("Logueo", () => {
    cy.login(username, password);
    cy.verifyClickAndNavigate("documents");
  });
  it.skip("Verificar navegacion, existencia de elementos visuales y tipos de datos . ", () => {
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)").click();
    cy.url().should("match", /http:\/\/localhost:3000\/documents\/\d+/);
    // espera carga de datos
    cy.wait(800);
    //Verificando existencia de botones y sus textos
    cy.get('[data-cy="ver"]').should("have.text", "Ver");
    cy.get('[data-cy="editar"]').should("have.text", "Editar");
    cy.get('[data-cy="imprimir"]').should("have.text", "Imprimir");
    cy.get('[data-cy="volver"]').should("have.text", "Volver");
    // Existencia de Titulo en la TitleCard
    cy.get(
      ".MuiPaper-elevation24 > .MuiPaper-elevation6 > .MuiStack-root > .MuiTypography-h6"
    ).should("have.text", "Edicion de documento");

    //  Existencia de titulo de seccion Datos del documento digital
    cy.get(".css-c789a6-MuiStack-root > .MuiTypography-root").should(
      "have.text",
      "Datos del Documento Digital"
    );

    // Input Nro Documento
    cy.get("#internal_id-label").should("have.text", "Nro documento");

    cy.get('[data-cy="internal_id"]')
      .invoke("text")
      .then((text) => {
        const numericValue = parseInt(text);
        expect(numericValue).to.be.a("number");
      });
    cy.get("#document_description-label").should("have.text", "Nombre");

    cy.get('[data-cy="internal_id"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.be.a("string");
      });

    // DatePicker
    cy.datePicker("created_at");

    // Selects
    cy.comboBox("Categoria", "document_type", ["document"]);
    cy.comboBox("Nivel de Confidencialidad", "confidentiality", ["1", "2"]);
    // cy.comboBox('Edificio','location', ['	Berazategui Barrio las Palmas - 2 - 5 - 6 - 18','Berazategui Centro - 1 - 2 - 5 - 14','1 - 1 - - - '])

    //  Existencia de titulo de seccion Situacion fisica
    cy.get(".css-nen11g-MuiStack-root > .MuiTypography-root").should(
      "have.text",
      "Situación Física"
    );
  });

  it("Verificar combobox Ubicacion", () => {
    cy.table_fileClick(1)
    // cy.get('[data-cy="location"] > #demo-simple-select').should('have.text','Edificio')
    // cy.get('[data-cy="location"] > #demo-simple-select').should('have.text','Berazategui Barrio las Palmas - 2 - 5 - 6 - 18')
    // cy.comboBox_open()
    cy.comboBox("Edificio", "location", [
      "Berazategui Barrio las Palmas - 2 - 5 - 6 - 18",
      "Berazategui Centro - 1 - 2 - 5 - 14",
      "Berazategui Barrio Los Paraisos - 2 - 3 - 4 - 30",
    ]);
  });

  it.skip("Verificar modificacion de documento campo Categoria", () => {

    const documentTypes = ["document", "Multas", "Impuestos"];
    for (let i = 1; i <= numberOfFilesToTest; i++) {
      goToFileChangingOneComboboxType(documentTypes, "document_type", i);
    }
  });
  it.skip("Verificar modificacion de documento campo Confidencialidad", () => {

    const confidentialityTypes = ["1", "2", "3"];
    for (let i = 1; i <= numberOfFilesToTest; i++) {
      goToFileChangingOneComboboxType(confidentialityTypes, "confidentiality", i);
    }
  });
});
