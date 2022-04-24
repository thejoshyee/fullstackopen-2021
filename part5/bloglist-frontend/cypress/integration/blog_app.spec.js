describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mowg Yee',
      username: 'mowgy',
      password: 'password123',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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

// Adding a new blog
describe('when logged in', function() {
  beforeEach(function() {
    cy.login({ username: 'joshyee', password: 'password123' })
  })

  it('a new blog can be added', function() {
    cy.contains('Add Blog').click()
    cy.get('#title').type('How to blog 101')
    cy.get('#author').type('Josh Yee')
    cy.get('#url').type('google.com')
    cy.get('#savebtn').click()
    cy.get('html').should('contain', 'How to blog 101 by Josh Yee')
  })
})

// blogs created and liked and deleted
describe('Working with blogs', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    const user = {
      name: 'Josh Yee',
      username: 'joshyee',
      password: 'password123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

    cy.login({ username: 'joshyee', password: 'password123' })

    cy.addNewBlog({ title: 'sample blog 1', author: 'josh yee', url: 'google.com' })
    cy.addNewBlog({ title: 'sample blog 2', author: 'josh yee', url: 'google.com' })
    cy.addNewBlog({ title: 'sample blog 3', author: 'josh yee', url: 'google.com' })
  })

  it('User can like a blog', function () {
    cy.contains('view').click()
    cy.get('#likeButton').click()
    cy.get('#likesCount').contains('Likes: 1')
  })

  it('User can delete', function () {
    cy.contains('sample blog 1').should('exist')
    cy.contains('view').click()
    cy.contains('Delete').click()
    cy.get('html').should('not.contain', 'sample blog 1')
  })

  // blogs created and ordered by likes
  describe('several blogs can be created', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      const user = {
        name: 'Josh Yee',
        username: 'joshyee',
        password: 'password123'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'joshyee', password: 'password123' })

      cy.addNewBlog({
        title: 'Blog with 1 like',
        author: 'Tester 1',
        url: 'test.com',
        likes: 1,
      })
      cy.addNewBlog({
        title: 'Blog with 10 likes',
        author: 'Tester 2',
        url: 'test.com',
        likes: 10,
      })
      cy.addNewBlog({
        title: 'Blog with 5 likes',
        author: 'Tester 3',
        url: 'test.com',
        likes: 5,
      })
    })

    it('and they are automatically sorted by likes', function () {
      cy.get('#blogWrapper>#blogTitle').should((blogTitle) => {
        expect(blogTitle[0]).to.contain('Blog with 10 likes')
        expect(blogTitle[1]).to.contain('Blog with 5 likes')
        expect(blogTitle[2]).to.contain('Blog with 1 like')
      })
    })
  })
})



