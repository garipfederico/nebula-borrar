const { defineConfig } = require("cypress");
// import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "env": {
      "API_URL": "http://localhost:8003"
    }
  },
});
