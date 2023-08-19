// import {cy} from "date-fns/locale";
// import "../../support/commands";

describe("Documents page - Caso de uso cambiar comprobar existencia de documentos", () => {
  beforeEach("Logueo", () => {
    const username = "garip.federico@gmail.com";
    const password = "123";
    cy.login(username, password);
    cy.verifyClickAndNavigate("documents");

  });

  it.only("Verificar contenido de la pagina ", () => {
    cy.tableVerifyColumnsNames(["Fecha", 'Numero', 'Nombre de documento'])
    //   cy.url().should("include", "http://localhost:3000/digitalization/lotes");
    // });
    // it("Comprobacion de nombres de columnas", () => {
    //   cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(1)").should(
    //     "have.text",
    //     "N° Lote"
    //   );
    //   cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(2)").should(
    //     "have.text",
    //     "Operador"
    //   );
    //   cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(3)").should(
    //     "have.text",
    //     "Fecha"
    //   );
    //   cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(4)").should(
    //     "have.text",
    //     "Estado"
    //   );
  });

  it("Comprobacion de existencia de filas con datos", () => {
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(1)").should(
      ($element) => {
        const text = $element.text();
        const isNumber = !isNaN(parseFloat(text)) && isFinite(text);

        expect(isNumber).to.equal(true, "El texto debe ser un número");
      }
    );

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

        // Expresión regular para validar el formato de fecha (dd/mm/yyyy)
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        const isDate = dateRegex.test(text);

        expect(isDate).to.equal(
          true,
          "El texto debe tener el formato de fecha dd/mm/yyyy"
        );
      }
    );

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
    const verifyAndClick = (stringOption) => {
      cy.get(`[data-value="${stringOption}"]`).should("be.visible").click();
    };
    const delay = 200;
    openDropdown(1);
    verifyAndClick("inicializado");
    cy.wait(delay);

    openDropdown(1);
    verifyAndClick("en progreso");
    cy.wait(delay);

    openDropdown(1);
    verifyAndClick("escaneado");
    cy.wait(delay);

    openDropdown(2);
    verifyAndClick("inicializado");
    cy.wait(delay);
    openDropdown(2);
    verifyAndClick("en progreso");
    cy.wait(delay);
    openDropdown(2);
    verifyAndClick("escaneado");
    cy.wait(delay);

    // Click en el menu
    cy.get(".MuiToolbar-root > .MuiButtonBase-root").click();
    // Click en home
    cy.get(
      ":nth-child(3) > :nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    // Click en digitalizacion
    cy.get('[data-cy="digitalization"] > .css-1shxafo-MuiStack-root').click();
    // Click en lotes
    cy.get('[data-cy="lotes"] > .css-1shxafo-MuiStack-root').click();
    cy.get(
      ":nth-child(1) > :nth-child(4) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #demo-simple-select"
    ).should("have.text", "escaneado");
  });
});
