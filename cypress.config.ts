import { defineConfig } from "cypress";
// const setupNodeEvents = require("@synthetixio/synpress/plugins/index");
// Set timeout (in milliseconds) for Cypress & Synpress to wait before failing.
// Note: big timeout can slow the tests down. Slow timeouts can cause the test to fail.
// Read more about timeouts: https://docs.cypress.io/guides/references/configuration#Timeouts
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Let's figure out how to use node set up event for Synpress ----
    },
  },
});
