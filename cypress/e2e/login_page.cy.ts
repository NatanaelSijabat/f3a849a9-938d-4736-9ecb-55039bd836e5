describe('The Login Page', () => {
    beforeEach(() => {
        // seed a user in the DB that we can control from our tests
        // assuming it generates a random password for us
        cy.request('POST', 'https://dummyjson.com/auth/login', { username: 'kminchelle', password: '0lelplR' })
            .its('body')
            .as('currentUser');
    });

    it('logging in via form submission', function () {
        // destructuring assignment of the this.currentUser object
        const { username, password } = this.currentUser;

        cy.visit('/login');

        cy.get('input[name=username]').type(username);

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${password}{enter}`);

        // we should be redirected to /dashboard
        cy.url().should('include', '/');
    });
});
