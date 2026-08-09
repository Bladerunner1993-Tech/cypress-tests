const { defineConfig } = require("cypress")
module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/qauto2',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: 'https://qauto2.forstudy.space',
    env: { authUser: 'guest', authPass: 'welcome2qauto' },
    specPattern: 'cypress/e2e/garage-fuel.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },
})
