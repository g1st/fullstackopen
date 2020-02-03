describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Justin Bieber',
      username: 'justin',
      password: 'bieber'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Bloglist');
  });

  it('login form can be opened', function() {
    cy.contains('log in').click();
  });

  it('user gets noted for wrong credentials', function() {
    cy.contains('log in').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salainen');
    cy.get('#login').click();
    cy.contains('Wrong username or password');
  });

  it('user can login', function() {
    cy.contains('log in').click();
    cy.get('#username').type('justin');
    cy.get('#password').type('bieber');
    cy.get('#login').click();
    cy.contains('Justin Bieber logged in');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click();
      cy.get('#username').type('justin');
      cy.get('#password').type('bieber');
      cy.get('#login').click();
    });

    it('name of the user is shown', function() {
      cy.contains('Justin Bieber logged in');
    });

    it('notification shows up', function() {
      cy.get('[data-cy=notification]').should('exist');
    });

    it('notification should disappear after 5s', function() {
      cy.wait(5000);
      cy.get('[data-cy=notification]').should('not.exist');
    });

    it('a new blogpost can be created', function() {
      cy.contains('new blog post').click();
      cy.get('#title').type('a note created by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('cypress url');
      cy.get('#create').click();
      cy.contains('a note created by cypress');
    });

    describe('and a blog is created', function() {
      beforeEach(function() {
        cy.contains('new blog post').click();
        cy.get('#title').type('another cypress note');
        cy.get('#author').type('cypress');
        cy.get('#url').type('cypress url');
        cy.get('#create').click();
      });

      it('a blogpost can be removed', function() {
        cy.get('[data-cy=blog-link]').click();
        cy.contains('remove').click();
        cy.on('window:confirm', str => {
          expect(str).contains('remove blog');
        });
        cy.contains('another cypress note REMOVED');
        cy.get('[data-cy=blog-link]').should('not.exist');
      });
      it('user should not have any blog posts associated', function() {
        cy.get('[data-cy=blog-link]').click();
        cy.contains('remove').click();
        cy.on('window:confirm', str => {
          expect(str).contains('remove blog');
        });
        cy.get('[data-cy=link-users]').click();
        cy.get('[data-cy=link-user]').click();
        cy.contains('no blogs found');
      });
    });
  });
});
