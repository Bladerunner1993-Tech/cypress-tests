class GaragePage {
  addCarBtn = () => cy.contains('button', 'Add car')
  brandSelect = () => cy.get('#addCarBrand')
  modelSelect = () => cy.get('#addCarModel')
  mileageInput = () => cy.get('#addCarMileage')
  submitAddBtn = () => cy.get('ngb-modal-window').contains('button', 'Add')

  addCar(brand, model, mileage) {
    this.addCarBtn().click({ force: true })
    this.brandSelect().select(brand)
    this.modelSelect().select(model)
    this.mileageInput().type(mileage)
    this.submitAddBtn().should('not.be.disabled').click()
  }
}
export default new GaragePage()
