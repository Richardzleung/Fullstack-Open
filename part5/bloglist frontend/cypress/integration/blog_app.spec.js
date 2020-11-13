describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {      
      name: 'Matti Luukkainen',      
      username: 'mluukkai',      
      password: 'salainen'    
    }
    const fake = {
      name: 'DONALD',
      username: 'DONALDTRUMP',
      password: 'MAGA2020'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.request('POST', 'http://localhost:3003/api/users/', fake) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Blogs')
  })

  describe('Login', function() {
    it('fails with wrong credentials' , function() {
      cy.contains('login').click()
      cy.get('[data-cy=username]').type('Richard')
      cy.get('[data-cy=password]').type('false')
      cy.get('[data-cy=login]').click()

      cy.contains('Wrong username or pass')
    })
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.contains('mluukkai logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new blog can be created', function() {      
      cy.contains('create new blog').click()      
      cy.get('#title').type('mluukkai') 
        .get('#author').type('mluukkai') 
        .get('#url').type('mluukkai') 
        .get('[data-cy=create]').click()      
      cy.contains('new blog: mluukkai by mluukkai added')    
    })
    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Yuri',
          author: 'Ice',
          likes: 10,
          url: 'www.uoi.com'
        })
      })
      it('can like blog', function(){
        cy.get('[data-cy=view')
          .click()
          .get('[data-cy=likeButton]')
          .click()
        cy.contains('Yuri')
          .parent()
          .should('contain','11')
      })
      it('blog can be deleted by creator', function() {
        cy.get('[data-cy=view')
          .click()
        cy.get('[data-cy=delete]')
          .click()
          
        cy.on('window:alert', (str) => {
            expect(str).to.contains(`OK`).click()
          })
      })
      it('blog cannot be deleted by non-creator', function() {
        cy.get('[data-cy=logout]').click()
        cy.contains('login').click()

        cy.login({ username: 'DONALDTRUMP', password: 'MAGA2020' })
        cy.createBlog({
          title: 'FAKE NEWS',
          author: 'DAMN LIBS',
          likes: 0,
          url: 'www.FOX.com'
        })
        cy.contains('Yuri')
          .parent()
          .contains('View')
          .click()
        cy.contains('remove').should('not.exist')
        })
    })

    describe('and a list of blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Yuri',
          author: 'Ice',
          likes: 900,
          url: 'www.uoi.com'
        })
        cy.createBlog({
          title: 'Light',
          author: 'Yagami',
          likes: 1,
          url: 'www.DeathNote.com'
        })
        cy.createBlog({
          title: 'Free',
          author: 'Haru',
          likes: 9000,
          url: 'www.FREE.com'
        })
        cy.createBlog({
          title: 'Goku',
          author: 'Goku',
          likes: 400,
          url: 'www.DBZ.com'
        })
      })
      it.only('blogs are ordered by likes', function() {
        // Since blogs
        cy.createBlog({
          title: 'Kiri',
          author: 'Japan',
          likes: 3124,
          url: 'UGG'
        })
        cy.get('[data-cy=view]')
          .click({ multiple: true })
        cy.get('[data-cy=likes]').invoke('text').then((likes) => {
          expect(likes).to.eq(' 9000  3124  900  400  1 ')
        })
      })
    })
  })
})