// ============================================
// Custom "type" override — masks sensitive input in Cypress logs
// ============================================
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }
  return originalFn(element, text, options)
})

// ============================================
// Custom login() command — logs in via UI with given creds
// ============================================
Cypress.Commands.add('login', (email, password) => {
  cy.contains('button', 'Sign In').click()
  cy.get('#signinEmail').type(email)
  cy.get('#signinPassword').type(password, { sensitive: true })
  cy.contains('button', 'Login').click()
})

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
