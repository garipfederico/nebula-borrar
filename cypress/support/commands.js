// TODO:
// - Combobox: tomar datos del back para verificar que esten todas las opciones
//            disponibles en el front del combobox, para que si hay un cambio en
//             el back no haya que modificar el test
// - Table: Hacer que table_verifyNavigation o una funcion similar verifique que
//          los valores que vienen del back se vean reflejados en la tabla

/** Make a login and verify tha is redirected to the home page
 * @description Make a login and verify tha is redirected to the home page
 * Custom command to log in to the application.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @example
 * cy.login("user@example.com", "password123");
 */
Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://localhost:3000/landing");
  cy.get("#username").type(email);
  cy.get("#password").type(password);
  cy.get(".MuiStack-root > .MuiButtonBase-root").click();
  cy.url().should("include", "http://localhost:3000/home");
});

Cypress.Commands.add("verifyClickAndNavigate", (data_cy, url = data_cy) => {
  cy.get(`[data-cy=${data_cy}]`).should("exist").click();
  cy.url().should("include", "http://localhost:3000/" + url);
});

Cypress.Commands.add("table_verifyColumnsNames", (arrayNames) => {
  arrayNames.map((aName, index) =>
    cy
      .get(`.MuiTableHead-root > .MuiTableRow-root > :nth-child(${index + 1})`)
      .should("have.text", aName)
  );
});
/**
 * Este comando personalizado se utiliza para hacer clic en un archivo en una tabla.
//  * @param {number} fileToClick - El índice del archivo que se va a hacer clic en la tabla.
 */
Cypress.Commands.add("table_fileClick", (fileToClick) => {
  cy.get(
    `.MuiTableBody-root > :nth-child(${fileToClick}) > :nth-child(1)`
  ).click();
});

Cypress.Commands.add("table_verifyNumberOfRows", (rowFileNumber) => {
  // From the table it selects the rows (tr) and then it can access
  // to the length property. Finally compares with the value rowFileNumber
  cy.get(".MuiTableBody-root")
    .find("tr")
    .then((rows) => {
      const rowCount = rows.length;
      expect(rowCount).to.be.lte(parseInt(rowFileNumber));
    });
});

Cypress.Commands.add("table_isCellNumber", (row, column) => {
  cy.get(
    `.MuiTableBody-root > :nth-child(${row}) > :nth-child(${column})`
  ).should(($element) => {
    const text = $element.text();
    const isNumber = !isNaN(parseFloat(text)) && isFinite(text);

    expect(isNumber).to.equal(true, "El texto debe ser un número");
  });
});

Cypress.Commands.add("table_isCellDate", (row, column) => {
  cy.get(
    `.MuiTableBody-root > :nth-child(${row}) > :nth-child(${column})`
  ).should(($element) => {
    const text = $element.text();
    // cy.log("text ",text )
    // Expresión regular para validar el formato de fecha (dd/mm/yyyy)
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    const isDate = dateRegex.test(text);

    expect(isDate).to.equal(
      true,
      "El texto debe tener el formato de fecha dd/mm/yyyy"
    );
  });
});

Cypress.Commands.add("table_verifyNavigation", () => {
  cy.get(".MuiTablePagination-displayedRows")
    .invoke("text")
    .then((text) => {
      const matches = text.match(/(\d+)\s*–\s*(\d+)\s*of\s*(\d+)/);
      cy.log(text);
      if (matches) {
        const firstRow = parseInt(matches[1]);
        cy.log("firstRow: ", firstRow);
        const lastRow = parseInt(matches[2]);
        cy.log("lastRow: ", lastRow);
        const totalRows = parseInt(matches[3]);
        cy.log("totalRows: ", totalRows);

        const rowsPerPage = lastRow - firstRow + 1;
        const amountOfPages = Math.floor((totalRows - 1) / rowsPerPage) + 1;
        cy.log("amountOfPages: ", amountOfPages);

        // Advance the pagination to the end
        cy.log("documentPerPage: ", rowsPerPage);
        for (let aPage = 0; aPage < amountOfPages - 1; aPage++) {
          cy.wait(600);
          const isLastPage = aPage === amountOfPages;
          const lowerRange = aPage * 10 + 1;
          const upperRange = isLastPage ? totalRows : (aPage + 1) * 10;
          const expectedText =
            lowerRange + "-" + upperRange + " of " + totalRows;
          // Controls the string value of the pagination info (ex.: 1-10 of 37)
          cy.get(".MuiTablePagination-displayedRows")
            .invoke("text")
            .should("to.be", expectedText);

          // cy.get('[aria-label="Go to next page"]').click();
          cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
        }
        // go back the pagination to the beginning
        for (let x = 0; x < amountOfPages - 1; x++) {
          cy.wait(600);
          // cy.get('[aria-label="Go to previous page"]').click();
          cy.get('[data-testid="KeyboardArrowLeftIcon"]').click();
        }
      }
    });
});

/**
 * id_r its the value of the selector id. ex.: #\\:r4\\:
 * So the parameter value must a number like 4 for this case.
 * In the cypress inspector you must to watch this number
 */
Cypress.Commands.add(
  "table_verifyRowsPerPageForEachValueOf",
  (arrayOfValues, id_r) => {
    cy.table_pagingControlDropdown_verifyValues(arrayOfValues, id_r);
    for (let value of arrayOfValues) {
      cy.table_dropdown_selectAnOption(value, id_r);
      cy.table_verifyNumberOfRows(value);
    }
  }
);

Cypress.Commands.add("datePicker", (variableName) => {
  cy.get(`[data-cy="${variableName}"]`)
    .children("input")
    .invoke("prop", "value")
    .then((value) => {
      cy.log("value: ", value);
      expect(value).to.match(/^\d{2}\/\d{2}\/\d{4}$/);
    });
});

Cypress.Commands.add(
  "comboBox_verifySelectedValue",
  (labelName, variableName, possiblesNames) => {
    cy.get(`[data-cy="${variableName}-label"]`).should("have.text", labelName);
    cy.get(`[data-cy="${variableName}"] > #demo-simple-select`).should(
      ($select) => {
        const possibleTexts = possiblesNames;
        const actualText = $select.text();
        expect(possibleTexts.some((text) => actualText.includes(text))).to.be
          .true;
      }
    );
  }
);

Cypress.Commands.add("comboBox_open", (data_cy) => {
  cy.get(`[data-cy=${data_cy}] > #demo-simple-select`).click();
});

Cypress.Commands.add("combobox_selectOption", (stringOption) => {
  cy.get(`[data-value="${stringOption}"]`).should("be.visible").click();
});

/**
 * id_r its the value of the selector id. ex.: #\\:r4\\:
 * So the parameter value must a number like 4 for this case.
 * In the cypress inspector you must to watch this number
 */
Cypress.Commands.add(
  "table_pagingControlDropdown_verifyValues",
  (textValuesArray, id_r) => {
    cy.log("id_r}", `#\\:r${id_r}\\:`);
    // cy.get(`#\\:r${id_r}\\:`).click();  // Se usaba este, pero el id_r cambiaba. Probando por clase
    cy.get(
      ".MuiInputBase-root.MuiInputBase-colorPrimary.css-16c50h-MuiInputBase-root-MuiTablePagination-select"
    )
      .should("exist") // Verificar que el elemento existe
      .click(); // Hacer clic en el elemento si es interactivo

    for (let value of textValuesArray) {
      cy.get(`[data-value=${value}]`).should("be.visible");
    }
    cy.get(`[data-value=${textValuesArray[0]}]`).click();
  }
);

// Request
Cypress.Commands.add(
  "request_interceptor",
  (apiUrlPatternString, method, status, alias) => {
    const apiUrlPattern = new RegExp(
      Cypress.env("API_URL") + apiUrlPatternString
    );
    cy.log(`La URL de la API es: ${apiUrlPattern}`);
    cy.intercept(
      {
        method: method, // Route all GET requests
        url: apiUrlPattern, // that have a URL that matches '/users/*'
      },
      {
        statusCode: status, // and force the response to be: []
      }
    ).as(alias);
  }
);
Cypress.Commands.add(
  "alertDialog_verifier",
  (content, status, title = "Lo sentimos ha ocurrido un error") => {
    cy.get('[data-cy="alertDialogTitle"]').should("have.text", title);
    cy.get('[data-cy="alertDialogContent"]').should("have.text", content);
    cy.get('[data-cy="alertDialogOtherMessages"] > span').should(
      "have.text",
      "Status: " + status
    );
  }
);

// Especificos de tablas que tienen un componente Dropdown. Ver si conviene pasarlo
// a funciones locales.
Cypress.Commands.add("table_dropdown_selectAnOption", (stringOption, id_r) => {
  // cy.get(`#\\:r${id_r}\\:`).click();  // Se usaba este, pero el id_r cambiaba. Probando por clase
  cy.get(
    ".MuiInputBase-root.MuiInputBase-colorPrimary.css-16c50h-MuiInputBase-root-MuiTablePagination-select"
  )
    .should("exist") // Verificar que el elemento existe
    .click(); // Hacer clic en el elemento si es interactivo
  cy.get(`[data-value=${stringOption}]`).click();
});

Cypress.Commands.add("documentChangeType", (fileToClick, estadoACambiar) => {
  cy.get(
    `.MuiTableBody-root > :nth-child(${fileToClick}) > :nth-child(1)`
  ).click();
  cy.get('[data-cy="editar"]').should("have.text", "Editar").click();
  cy.get('[data-cy="document_type"] > #demo-simple-select').click();
  cy.get(`[data-value=${estadoACambiar}]`).click();
  cy.get('[data-cy="editar"]').click();
});
