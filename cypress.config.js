const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "env": {
      // "REACT_APP_BASE_URL": "http://localhost:3000"
    }
  },
});
