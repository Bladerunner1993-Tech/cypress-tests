// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// ============================================
// Custom createExpenseViaApi() command — creates a fuel expense via API
// ============================================
Cypress.Commands.add('createExpenseViaApi', (carId, mileage, liters, totalCost) => {
  const base = Cypress.config('baseUrl') || 'https://qauto.forstudy.space'
  return cy.request({
    method: 'POST',
    url: `${base}/api/expenses`,
    auth: { username: 'guest', password: 'welcome2qauto' },
    body: {
      carId,
      reportedAt: new Date().toISOString(),
      mileage,
      liters,
      totalCost,
    },
  })
})
