Apply the synpress to the service for testing a connection between web3 wallet and service.

### First of all

#### 1. Installation

** Project should be over node 18.x **

CMD : `yarn add -D @synthetixio/synpress`

### Setup

(READ THE DOCS)[https://github.com/synpress-io/docs/blob/main/e2e-testing/using-with-cypress.md]

#### 1. Install Cypress & Run it

Add cypress lib : `yarn add -D cypress`

After install the cypress lib, run cmd `yarn cypress open`

It will check the first running and create the dir for the test

```
project_dir
└── src (Project Codes)
└── cypress
    └── e2e // Where all of your E2E tests will live.
        └── spec.cy.ts
    └── fixtures
        └── example.json
    └── support
        └── commands.ts
        └── e2e.ts Where you will import Synpress plugins.
```

#### 2. Add synpress lib

Add `import "@synthetixio/synpress/support/index";` to the /cypress/support/e2e.ts

> is it possible to import library? Absolute path is not applied.

#### 3. Add synpress.config.ts (Not cypress.config.ts)

> No Idea How to handle it

```
//... synpress.config.ts

import { defineConfig } from "cypress";
const setupNodeEvents = require("@synthetixio/synpress/plugins/index");
// Set timeout (in milliseconds) for Cypress & Synpress to wait before failing.
// Note: big timeout can slow the tests down. Slow timeouts can cause the test to fail.
// Read more about timeouts: https://docs.cypress.io/guides/references/configuration#Timeouts
const timeout = process.env.SYNDEBUG ? 9999999 : 30000;

const e2e = {
    // For the Synpress config ----------
    testIsolation: false,
    // Url for the test dApp
    baseUrl: "http://127.0.0.1:8080/",
    // Where all tests can be found.
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    // Path for your support file your setup early
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents,
    // For the Synpress config ----------
}

const config = {
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
}

export default defineConfig({

  ...config,

  e2e: {

    ...e2e,
    //setupNodeEvents(on, config) {
    // implement node event listeners here
    // Let's figure out how to use node set up event for Synpress ----
    //},
  },
});



```

#### 4. Add .env

```
# .env.e2e
# The recovery phrase for the wallet that will be restored while preparing Metamask
# Will be the selected wallet by default when connecting to the dApp
SECRET_WORDS='battle raccoon helmet please deliver keep kiss round orphan frame update message'
# Network info at which the tests will run.
NETWORK_NAME='Mumbai'
CHAIN_ID=80001
RPC_URL='https://matic-mumbai.chainstacklabs.com'
SYMBOL="MATIC"
IS_TESTNET=true

```

#### 5. Add Synpress scripts to package.json

`"synpress:run": "env-cmd -f .env.e2e synpress run --configFile synpress.config.js"`
`"test:e2e": "start-server-and-test 'yarn start' http://localhost:8080 'yarn synpress:run'"`

#### 6. Fix the errors

> (ISSUE)[https://github.com/cypress-io/cypress/issues/26308]

Error msg : `TSError: ⨯ Unable to compile TypeScript:
error TS5095: Option 'bundler' can only be used when 'module' is set to 'es2015' or later.`

Cypress 12.x has an error related to bundling source code.

The simple way to fix the issue is to change the "moduleResolution": "bundler" to "moduleResolution": "node" in tsconfig.json;

But, in the case of the users who use nextjs, "moduleResolution": "bundler" options is applied. So, checking the **ISSUE** Cypress developers refer to add "ts-node" option to the tsconfig.json. And the issue is solved.

This issue is also the same for Synpress using Cypress 12.x versions.

#### 7. Fix the errors of cypress

After test the synpress, I just compare synpress and cypress but it returns error "Webpack Compilation Error
Module parse failed: 'import' and 'export' may appear only with 'sourceType: module'"

Now, I dealing with this issue.

---

### The Other uses (Not tested)

(READ THE DOCS)[https://github.com/synpress-io/docs/blob/main/getting-starting/writing-your-first-e2e-test.md];

#### 1. Directory structure

```
project_dir
└── src (Project Codes)
└── tests
    └── e2e
        └── .eslintrc.js
        └── support.js
        └── tsconfig.json
        └── specs
            └── example-spec.js
        └── pages
            └── example-page.js
```

#### 2. In your test folder create .eslintrc.js

```
const path = require('path');
const synpressPath = path.join(
  process.cwd(),
  '/node_modules/@synthetixio/synpress',
);

module.exports = {
  extends: `${synpressPath}/.eslintrc.js`,
};
```

#### 3. In the same folder create support.js

Add `import '@synthetixio/synpress/support/index';` to the /tests/e2e/support.js

#### 4. Create tsconfig.json

```
{
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": "../../node_modules",
    "types": [
      "cypress",
      "@synthetixio/synpress/support",
      "cypress-wait-until",
      "@testing-library/cypress"
    ],
    "outDir": "./output"
  },
  "include": ["**/*.*"]
}
```

#### 5. Add cypress to the root dir

ADD : `yarn add -D cypress`
