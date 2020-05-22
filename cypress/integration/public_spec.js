const landingMessage = 'Consulta De Procesos Automatizada';

describe('Public flow', function () {
  it('Landing page', function () {
    cy.visit('/')
    cy.get('.header_content h1').should('be.visible')
  })
  it('Should exist the Signup path', function () {
    cy.visit('/singup')
  })
  it('Should exist the Login path', function () {
    cy.visit('/login')
  })
  it('Should return 404 error', function () {
    cy.visit('/404error')
    cy.get('.error-404-container').should('be.visible')
  })
})
