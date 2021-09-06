describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'ilia shamakhia',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.contains('ilia shamakhia Logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain','wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#create-blog-button').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submit-blog-button').click()
      cy.get('.blog').contains('test title test author view')
    })

    it('User can like a blog', function() {
      cy.get('#create-blog-button').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submit-blog-button').click()
      cy.get('.view-hide-button-0').click()
      cy.get('.like-button').click()
      cy.get('.likes').contains('Likes 1')
    })

    it('User who created blog can remove it', function() {
      cy.get('#create-blog-button').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submit-blog-button').click()
      cy.get('.view-hide-button-0').click()
      cy.get('.remove-button').click()
      cy.get('.blogs').should('not.contain', 'test title test author view')
    })

    it('Other users can not delete the blog', function() {
      cy.get('#create-blog-button').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submit-blog-button').click()
      cy.get('#logout-button').click()
      const user = {
        name: 'other user',
        username: 'otherusername',
        password: 'otherpassword'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.get('#username').type('otherusername')
      cy.get('#password').type('otherpassword')
      cy.get('#login-button').click()
      cy.get('.view-hide-button-0').click()
      cy.get('.blogs').should('not.contain', 'remove')
    })

    it('blogs are ordered according to likes first blog has most likes', function(){
      cy.get('#create-blog-button').click()
      cy.get('#title').type('test title 1')
      cy.get('#author').type('test author 1')
      cy.get('#url').type('test url 1')
      cy.get('#submit-blog-button').click()
      cy.get('#create-blog-button').click()
      cy.get('#title').type('test title 2')
      cy.get('#author').type('test author 2')
      cy.get('#url').type('test url 2')
      cy.get('#submit-blog-button').click()
      cy.get('.view-hide-button-1').click()
      cy.get('.like-button').click()
      cy.get('.likes').contains('Likes 1')
      cy.get('.like-button').click()
      cy.get('.likes').contains('Likes 2')
      cy.get('.blog-0').contains('Likes 2')
    })
  })
})