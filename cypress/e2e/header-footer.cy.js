describe('Header and Footer elements', () => {
    beforeEach(() => {
      cy.visit('https://qauto.forstudy.space/', {
        auth: {
          username: 'guest',
          password: 'welcome2qauto'
        }
      });
    });
  
    it('should find the logo', () => {
      cy.contains('hillel').should('be.visible');
    });
  
    it('should find Home link', () => {
      cy.contains('a', 'Home').should('be.visible');
    });
  
    it('should find About link', () => {
      cy.contains('About').should('be.visible');
    });
  
    it('should find Contacts link', () => {
      cy.contains('Contacts').should('be.visible');
    });
  
    it('should find Guest log in button', () => {
      cy.contains('Guest log in').should('be.visible');
    });
  
    it('should find Sign In button', () => {
      cy.contains('button', 'Sign In').should('be.visible');
    });
  
    it('should find Facebook icon in footer', () => {
      cy.get('#contactsSection').find('.icon-facebook').scrollIntoView().should('be.visible');
    });
  
    it('should find Telegram icon in footer', () => {
      cy.get('#contactsSection').find('.icon-telegram').scrollIntoView().should('be.visible');
    });
  
    it('should find YouTube icon in footer', () => {
      cy.get('#contactsSection').find('.icon-youtube').scrollIntoView().should('be.visible');
    });
  
    it('should find Instagram icon in footer', () => {
      cy.get('#contactsSection').find('.icon-instagram').scrollIntoView().should('be.visible');
    });
  
    it('should find LinkedIn icon in footer', () => {
      cy.get('#contactsSection').find('.icon-linkedin').scrollIntoView().should('be.visible');
    });
  
    it('should find ithillel.ua link in footer', () => {
      cy.get('#contactsSection').contains('ithillel.ua').scrollIntoView().should('be.visible');
    });
  
    it('should find support email link in footer', () => {
      cy.get('#contactsSection').contains('support@ithillel.ua').scrollIntoView().should('be.visible');
    });
  });