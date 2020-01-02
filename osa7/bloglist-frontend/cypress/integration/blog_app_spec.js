describe('Blog app ', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mosse Bosse',
      username: 'Mosse',
      password: 'security1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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

  describe('when logged in', function () {

    beforeEach(function () {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('Mosse')
      cy.get('#password')
        .type('security1234')
      cy.get('#loginbutton')
        .click()
    })

    it('user can log out', function () {
      cy.contains('logout')
        .click()
      cy.contains('log in to application')
    })

    it('user can create blog', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('Testititle')
      cy.get('#url')
        .type('http://testiurl.com')
      cy.get('#author')
        .type('Testiauthor')
      cy.get('#createblogbutton')
        .click()
      cy.contains('Testititle')
    })

  })

})


