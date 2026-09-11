import GaragePage from '../pages/GaragePage'
import FuelExpensesPage from '../pages/FuelExpensesPage'

describe('Garage and Fuel Expenses', () => {
  const email = `alex${Date.now()}@test.com`
  const password = 'Qwerty123'

  before(() => {
    cy.visit('/', {
      auth: { username: Cypress.env('authUser'), password: Cypress.env('authPass') },
    })
    cy.contains('button', 'Sign up').click()
    cy.get('#signupName').type('Alex')
    cy.get('#signupLastName').type('Test')
    cy.get('#signupEmail').type(email)
    cy.get('#signupPassword').type(password)
    cy.get('#signupRepeatPassword').type(password)
    cy.contains('button', 'Register').click()
    cy.url().should('include', '/panel/garage')
    cy.wait(2500)
  })

  it('adds a car to the garage, then adds a fuel expense to it', () => {
    GaragePage.addCar('Audi', 'TT', '10000')
    cy.contains('Audi').should('be.visible')

    FuelExpensesPage.goTo()
    FuelExpensesPage.addExpense('15000', '40', '60')
    cy.contains('40').should('be.visible')
  })
})
