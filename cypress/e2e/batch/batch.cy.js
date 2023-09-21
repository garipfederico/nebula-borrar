// TODO: el test "Comprobacion de existencia de filas con datos" suele arrojar
//       falsos positivos. Optimizar (Viene de Commands.table_isCellNumber)

describe("Batch page - Caso de uso cambiar estado de documento del lote", () => {
  const username = "garip.federico@gmail.com";
  const password = "123";

  beforeEach("Logueo", () => {
    cy.login(username, password);
    cy.verifyClickAndNavigate("digitalization");
    cy.verifyClickAndNavigate("batches", "digitalization/batches");
  });

  it("Navegacion", () => {
    cy.url().should("include", "http://localhost:3000/digitalization/batches");
  });

  it("Comprobacion de la estructura del backend", () => {
    cy.request("GET", "http://localhost:8003/api/document-status/").as(
      "respuestaEndpoint"
    );
    cy.get("@respuestaEndpoint").its("status").should("eq", 200);
    cy.get("@respuestaEndpoint").its("body.results").should("have.length", 3);

    cy.get("@respuestaEndpoint")
      .its("body.results")
      .each((result) => {
        expect(result)
          .to.have.property("name")
          .and.to.be.oneOf(["inicializado", "en progreso", "escaneado"]);
      });
  });

  it("Comprobacion de nombres de columnas", () => {
    cy.table_verifyColumnsNames([
      "N° de Documento",
      "Fecha",
      "Descripción del documento",
      "Estado",
    ]);
  });

  // El siguiente test suele arrojar falsos positivos
  it("Comprobacion de tipo de datos en la fila 1", () => {
    cy.table_isCellNumber(1, 1);
    cy.table_isCellDate(1, 2);

    cy.get(
      ":nth-child(1) > :nth-child(4) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select"
    )
      .should(($select) => {
        const possibleTexts = ["en progreso", "inicializado", "escaneado"];
        const actualText = $select.text();
        expect(possibleTexts.some((text) => actualText.includes(text))).to.be
          .true;
      })
      .click();
  });

  it("Comprobando la existencia de los estados en el combobox", () => {
    cy.get(
      ":nth-child(1) > :nth-child(4) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select"
    ).click();
    cy.get('[data-value="en progreso"]').should("be.visible");
    cy.get('[data-value="inicializado"]').should("be.visible");
    cy.get('[data-value="escaneado"]').should("be.visible");
  });

  it("Comprobando el cambio de estado exitoso", () => {
    // Click en el combobox para abrir las opciones
    const openDropdown = (nroFila) => {
      cy.get(
        `:nth-child(${nroFila}) > :nth-child(4) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select`
      ).click();
    };
    const verifyVisibilityAndClick = (stringOption) => {
      cy.get(`[data-value="${stringOption}"]`).should("be.visible").click();
    };

    const verifySelectedValueOfDropBox = (value) => {
      cy.get(
        ":nth-child(1) > :nth-child(4) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select"
      ).should("have.text", value);
    };
    const delay = 200;
    const estados = ["inicializado", "en progreso", "escaneado"];

    estados.forEach((estado) => {
      openDropdown(1);
      verifyVisibilityAndClick(estado);
      cy.wait(delay);
      verifySelectedValueOfDropBox(estado);

    })

    // Re-validacion saliendo al home y volviendo a entrar a la tabla
    // Click en el menu
    cy.get(".MuiToolbar-root > .MuiButtonBase-root").click();
    // Click en home
    cy.get(
      ":nth-child(3) > :nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    // Click en digitalizacion
    cy.get('[data-cy="digitalization"] > .css-1shxafo-MuiStack-root').click();
    // Click en lotes
    cy.get('[data-cy="batches"] > .css-1shxafo-MuiStack-root').click();
    cy.get(
      ":nth-child(1) > :nth-child(4) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select"
    ).should("have.text", "escaneado");

  });

  it("Comprobando paginacion - Navegacion inicio a fin y luego al inicio nuevamente", () => {
    cy.table_verifyNavigation();
  });

  it("Comprobando paginacion - Paging Control, el numero de filas mostradas deberá coincidir con la opcion seleccionada", () => {
    cy.table_verifyRowsPerPageForEachValueOf(["5", "10", "25", "100"], 3);
  });
});
