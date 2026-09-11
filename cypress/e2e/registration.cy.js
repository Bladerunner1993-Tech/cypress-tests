describe('Registration', () => {
  const email = `alex${Date.now()}@test.com`
  const password = 'Qwerty123'

  beforeEach(() => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    })
    cy.contains('button', 'Sign up').click()
  })

  it('Registration title is visible', () => {
    cy.contains('Registration').should('be.visible')
  })

  it('Name - empty field shows required error and red border', () => {
    cy.get('#signupName').focus().blur()
    cy.contains('Name required').should('be.visible')
    cy.get('#signupName').should('have.class', 'is-invalid')
  })

  it('Name - invalid characters show error', () => {
    cy.get('#signupName').type('12345').blur()
    cy.contains('Name is invalid').should('be.visible')
  })

  it('Name - too short shows length error', () => {
    cy.get('#signupName').type('A').blur()
    cy.contains('Name has to be from 2 to 20 characters long').should('be.visible')
  })

  it('Last name - empty field shows required error and red border', () => {
    cy.get('#signupLastName').focus().blur()
    cy.contains('Last name required').should('be.visible')
    cy.get('#signupLastName').should('have.class', 'is-invalid')
  })

  it('Last name - invalid characters show error', () => {
    cy.get('#signupLastName').type('@@@').blur()
    cy.contains('Last name is invalid').should('be.visible')
  })

  it('Last name - too short shows length error', () => {
    cy.get('#signupLastName').type('A').blur()
    cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible')
  })

  it('Email - empty field shows required error and red border', () => {
    cy.get('#signupEmail').focus().blur()
    cy.contains('Email required').should('be.visible')
    cy.get('#signupEmail').should('have.class', 'is-invalid')
  })

  it('Email - incorrect format shows error', () => {
    cy.get('#signupEmail').type('bad-email').blur()
    cy.contains('Email is incorrect').should('be.visible')
  })

  it('Password - empty field shows required error and red border', () => {
    cy.get('#signupPassword').focus().blur()
    cy.contains('Password required').should('be.visible')
    cy.get('#signupPassword').should('have.class', 'is-invalid')
  })

  it('Password - wrong format shows error', () => {
    cy.get('#signupPassword').type('qwerty', { sensitive: true }).blur()
    cy.contains(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    ).should('be.visible')
  })

  it('Re-enter password - empty field shows required error and red border', () => {
    cy.get('#signupPassword').type(password, { sensitive: true })
    cy.get('#signupRepeatPassword').focus().blur()
    cy.contains('Re-enter password required').should('be.visible')
    cy.get('#signupRepeatPassword').should('have.class', 'is-invalid')
  })

  it('Re-enter password - mismatch shows error', () => {
    cy.get('#signupPassword').type(password, { sensitive: true })
    cy.get('#signupRepeatPassword').type('Wrong123', { sensitive: true }).blur()
    cy.contains('Passwords do not match').should('be.visible')
  })

  it('Register button is disabled when form is empty', () => {
    cy.contains('button', 'Register').should('be.disabled')
  })

  it('successful registration with valid data', () => {
    cy.get('#signupName').type('Alex')
    cy.get('#signupLastName').type('Test')
    cy.get('#signupEmail').type(email)
    cy.get('#signupPassword').type(password, { sensitive: true })
    cy.get('#signupRepeatPassword').type(password, { sensitive: true })

    cy.contains('button', 'Register').should('not.be.disabled').click()
    cy.url().should('include', '/panel/garage')
  })
})
