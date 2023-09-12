// import "../../support/commands";

describe("Document page - Consultar documento", () => {
  const username = "garip.federico@gmail.com";
  const password = "123";
  const numberOfFilesToTest = 2;
  let accessToken = null;

  /**
   * @description Cambia el valor del combobox, guarda, ingresa nuevamente
   * y verifica que el estado se cambio. Esto se repite para cada uno de
   * los estados indicados la array y en el documento dado por el filenumber
   * de la tabla
   * @param {*} comboboxValuesArray
   * @param {*} comboboxName
   * @param {*} fileNumber
   */
  const goToFileChangingOneComboboxType = (
    comboboxValuesArray,
    comboboxName,
    fileNumber
  ) => {
    comboboxValuesArray.forEach((textOption) => {
      // Ingresa y cambia el estado
      cy.wait(800);
      cy.url().should("include", "http://localhost:3000/documents");
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
    cy.login(username, password).then(() => {
      accessToken = JSON.parse(localStorage.getItem("docu.auth")).access;
    });
    cy.verifyClickAndNavigate("documents");
    // cy.wait(500).then(() => {
    //   accessToken = JSON.parse(localStorage.getItem("docu.auth")).access;
    // });
  });
  it("Verificar estructura de la respuesta del back", () => {
    // Realiza una solicitud al servidor y obtén la respuesta
    cy.request({
      method: "GET",
      url: "http://localhost:8003/api/document/88/get-document-to-edit/",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Utiliza el token en el encabezado de autorización
        // Otros encabezados si son necesarios
      },
    }).then((response) => {
      // Verifica que la respuesta tenga el estado HTTP 200 (OK)
      cy.expect(response.status).to.equal(200);

      // Verifica que la respuesta sea un objeto JSON
      cy.expect(response.headers["content-type"]).to.include(
        "application/json"
      );

      const responseStructure = [
        {name: "id", type: "number"},
        {name: "internal_id", type: "string"},
        {name: "label", type: "string"},
        {name: "document_description", type: "string"},
        {name: "document_type", type: "string"},
        {name: "confidentiality", type: "string"},
        {name: "status", type: "string"},
        {name: "is_active", type: "boolean"},
        {name: "batch", type: "number"},
        {name: "created_at", type: "string"},
        {name: "location", type: "number"},
        {
          name: "all_confidentialities",
          type: "array",
          subType: "object",
          subStructure: [
            {name: "id", type: "number"},
            {name: "level", type: "string"},
          ],
        },
        {
          name: "all_document_types",
          type: "array",
          subType: "object",
          subStructure: [
            {name: "id", type: "number"},
            {name: "type", type: "string"},
          ],
        },
        {
          name: "all_document_locations",
          type: "array",
          subType: "object",
          subStructure: [
            {name: "id", type: "string"},
            {name: "name", type: "string"},
          ],
        },
      ];

      // Hacer de esto una funcion para reutilizar, sirve para dos niveles
      //
      responseStructure.forEach((attribute) => {
        cy.expect(response.body).to.have.property(attribute.name);
        cy.expect(response.body[attribute.name]).to.be.a(attribute.type);

        if (attribute.type === "array" && attribute.subType === "object") {
          const arrayProp = attribute;

          // Verificar la estructura de datos anidados
          cy.expect(response.body[arrayProp.name]).to.be.an("array");
          response.body[arrayProp.name].forEach((item) => {
            arrayProp.subStructure.forEach((subAttribute) => {
              cy.expect(item).to.have.property(subAttribute.name);
              cy.expect(item[subAttribute.name]).to.be.a(subAttribute.type);
            });
          });
        }
      });
    });
  });

  it("Verificar navegacion, existencia de elementos visuales y tipos de datos . ", () => {
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
    cy.comboBox_verifySelectedValue("Categoria", "document_type", [
      "document",
      "Multas",
      "Impuestos",
    ]);
    cy.comboBox_verifySelectedValue("Nivel de Confidencialidad", "confidentiality", [
      "1",
      "2",
      "3",
    ]);

    //  Existencia de titulo de seccion Situacion fisica
    cy.get(".css-nen11g-MuiStack-root > .MuiTypography-root").should(
      "have.text",
      "Situación Física"
    );
  });

  it("Verificar combobox Ubicacion", () => {
    cy.table_fileClick(numberOfFilesToTest);
    cy.comboBox_verifySelectedValue("Edificio", "location", [
      "Berazategui Barrio las Palmas - 2 - 5 - 6 - 18",
      "Berazategui Centro - 1 - 2 - 5 - 14",
      "Berazategui Barrio Los Paraisos - 2 - 3 - 4 - 30",
    ]);
  });

  it(`Verificar modificacion de documento campo Categoria(en ${numberOfFilesToTest} filas)`, () => {
    const documentTypes = ["document", "Multas", "Impuestos"];
    for (let i = 1; i <= numberOfFilesToTest; i++) {
      goToFileChangingOneComboboxType(documentTypes, "document_type", i);
    }
  });
  it(`Verificar modificacion de documento campo Confidencialidad(en ${numberOfFilesToTest} filas)`, () => {
    const confidentialityTypes = ["1", "2", "3"];
    for (let i = 1; i <= numberOfFilesToTest; i++) {
      goToFileChangingOneComboboxType(
        confidentialityTypes,
        "confidentiality",
        i
      );
    }
  });

  it(`Verificar modificacion de documento campo Ubicacion(en ${numberOfFilesToTest} filas)`, () => {
    const locationTypes = [
      "Berazategui Barrio las Palmas - 2 - 5 - 6 - 18",
      "Berazategui Centro - 1 - 2 - 5 - 14",
      "Berazategui Barrio Los Paraisos - 2 - 3 - 4 - 30",
    ];

    for (let i = 1; i <= numberOfFilesToTest; i++) {
      goToFileChangingOneComboboxType(locationTypes, "location", i);
    }
  });

  it("Verificar manejo de errores del back. 401", () => {
  cy.table_fileClick(2)
  cy.request_interceptor("/api/document/\\d+/edit-document/", "PATCH", 401, "getUsers")
  cy.get('[data-cy="editar"]').should("have.text", "Editar").click();
  
  cy.get('[data-cy="editar"]').should("have.text", "Guardar").click();
  cy.alertDialog_verifier("No autorizado ", 401)
});

  it("Verificar manejo de errores del back. 402", () => {
  cy.table_fileClick(2)
  cy.request_interceptor("/api/document/\\d+/edit-document/", "PATCH", 402, "getUsers")
  cy.get('[data-cy="editar"]').should("have.text", "Editar").click();
  
  cy.get('[data-cy="editar"]').should("have.text", "Guardar").click();
  cy.alertDialog_verifier("Estado de respuesta no reconocido ", 402)

  });
  it("Verificar manejo de errores del back. 404", () => {
  cy.table_fileClick(2)
  cy.request_interceptor("/api/document/\\d+/edit-document/", "PATCH", 404, "getUsers")
  cy.get('[data-cy="editar"]').should("have.text", "Editar").click();
  
  cy.get('[data-cy="editar"]').should("have.text", "Guardar").click();
  cy.alertDialog_verifier("Recurso no encontrado ", 404)

  });
});
