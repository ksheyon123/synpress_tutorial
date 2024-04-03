import { defineConfig } from "cypress";
// const setupNodeEvents = require("@synthetixio/synpress/plugins/index");
// Set timeout (in milliseconds) for Cypress & Synpress to wait before failing.
// Note: big timeout can slow the tests down. Slow timeouts can cause the test to fail.
// Read more about timeouts: https://docs.cypress.io/guides/references/configuration#Timeouts
const timeout = process.env.SYNDEBUG ? 9999999 : 30000;
export default defineConfig({
  // For the Synpress config ----------
  userAgent: "synpress",
  retries: {
    runMode: process.env.CI ? 1 : 0,
    openMode: 0,
  },
  fixturesFolder: "@synthetixio/synpress/fixtures",
  chromeWebSecurity: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  env: {
    coverage: false,
  },
  defaultCommandTimeout: timeout,
  pageLoadTimeout: timeout,
  requestTimeout: timeout,
  // For the Synpress config ----------

  e2e: {
    // For the Synpress config ----------
    testIsolation: false,
    // Url for the test dApp
    baseUrl: "http://127.0.0.1:8080/",
    // Where all tests can be found.
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    // Path for your support file your setup early
    supportFile: "cypress/support/e2e.ts",
    // For the Synpress config ----------

    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Let's figure out how to use node set up event for Synpress ----
    },
  },
});
