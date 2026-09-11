class FuelExpensesPage {
  navLink = () => cy.contains('a', 'Fuel expenses')
  addExpenseBtn = () => cy.contains('button', 'Add an expense')
  mileageInput = () => cy.get('#addExpenseMileage')
  litersInput = () => cy.get('#addExpenseLiters')
  totalCostInput = () => cy.get('#addExpenseTotalCost')
  submitAddBtn = () => cy.get('ngb-modal-window').contains('button', 'Add')

  goTo() {
    this.navLink().click({ force: true })
  }

  addExpense(mileage, liters, totalCost) {
    this.addExpenseBtn().should('not.be.disabled').click()
    this.mileageInput().clear().type(mileage).blur()
    this.litersInput().clear().type(liters).blur()
    this.totalCostInput().clear().type(totalCost).blur()
    this.submitAddBtn().should('not.be.disabled').click()
  }
}
export default new FuelExpensesPage()
