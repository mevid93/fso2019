describe('Blog app ', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('login form can be opened', function () {
    cy.contains('login')
      .click()
  })

  it('user can login', function () {
    cy.contains('login')
      .click()
    cy.get('#username')
      .type('Mosse')
    cy.get('#password')
      .type('security1234')
    cy.get('#loginbutton')
      .click()
    cy.contains('Mosse Bosse logged in')
  })

  it('user can log out', function () {
    cy.contains('login')
      .click()
    cy.get('#username')
      .type('Mosse')
    cy.get('#password')
      .type('security1234')
    cy.get('#loginbutton')
      .click()
    cy.contains('Mosse Bosse logged in')
    cy.contains('logout')
      .click()
    cy.contains('log in to application')
  })
})