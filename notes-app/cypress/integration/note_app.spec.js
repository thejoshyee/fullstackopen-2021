describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Josh Yee',
      username: 'joshyee',
      password: 'password123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('joshyee')
    cy.get('#password').type('password123')
    cy.get('#login-button').click()

    cy.contains('Josh Yee logged in')
  })

  // when log in fails
  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('joshyee')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Josh Yee logged in')

  })

  // when  logged in
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'joshyee', password: 'password123' })

    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and some notes exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })

  it('then example', function() {
    cy.get('button').then( buttons => {
      console.log('number of buttons', buttons.length)
      cy.wrap(buttons[0]).click()
    })
  })

})