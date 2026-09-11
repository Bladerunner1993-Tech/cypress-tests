import FuelExpensesPage from '../pages/FuelExpensesPage'

describe('API testing with Cypress', () => {
  const email = `alex${Date.now()}@test.com`
  const password = 'Qwerty123'

  it('covers car creation, list validation, expense creation via API, and UI verification', () => {
    let createdCarId

    // Step 2: register, intercept car-creation response, validate status, save id
    cy.intercept('POST', '**/api/cars').as('createCar')

    cy.visit('https://qauto.forstudy.space/', {
      auth: { username: 'guest', password: 'welcome2qauto' },
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

    cy.contains('button', 'Add car').click({ force: true })
    cy.get('#addCarBrand').select('Audi')
    cy.get('#addCarModel').select('TT')
    cy.get('#addCarMileage').type('10000')
    cy.get('ngb-modal-window').contains('button', 'Add').should('not.be.disabled').click()

    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201)
      createdCarId = interception.response.body.data.id

      // Step 3: GET /api/cars list contains the created car
      cy.intercept('GET', '**/api/cars').as('getCars')
      cy.reload()
      cy.wait('@getCars').then((getInterception) => {
        expect(getInterception.response.statusCode).to.eq(200)
        const cars = getInterception.response.body.data
        const match = cars.find((c) => c.id === createdCarId)
        expect(match).to.exist
        expect(match.brand).to.eq('Audi')
        expect(match.model).to.eq('TT')
        expect(match.mileage).to.eq(10000)

        // Step 4: create expense via API using a custom command
        cy.createExpenseViaApi(createdCarId, 15000, 40, 60).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.status).to.eq('ok')
          expect(res.body.data.carId).to.eq(createdCarId)
          expect(res.body.data.mileage).to.eq(15000)
          expect(res.body.data.liters).to.eq(40)
          expect(res.body.data.totalCost).to.eq(60)

          // Step 5: verify the API-created expense appears in the UI
          cy.reload()
          FuelExpensesPage.goTo()
          cy.contains('40').should('be.visible')
          cy.contains('60').should('be.visible')
        })
      })
    })
  })
})
