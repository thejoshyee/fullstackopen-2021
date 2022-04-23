describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Some Dope Blogs')
  })
})


describe('Logging in successfully and unsuccessfully', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    const user = {
      name: 'Josh Yee',
      username: 'joshyee',
      password: 'password123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('User can login', function () {
    cy.get('#username').type('joshyee')
    cy.get('#password').type('password123')
    cy.get('#loginbutton').click()

    cy.contains('Josh Yee logged-in')
  })

  it('Login Fails with wrong password', function () {
    cy.get('#username').type('joshyee')
    cy.get('#password').type('wrongpw')
    cy.get('#loginbutton').click()
    cy.get('.login-message')
      .should('contain', 'Wrong Credentials')
      .and('have.css', 'border-color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', 'Josh Yee is logged in')

  })

})