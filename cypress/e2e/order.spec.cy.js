
describe('создание заказа', function () {
    before(function () {
        cy.visit('/');
        cy.intercept('GET', 'ingredients', {
            fixture: 'ingredients.json'
        }).as('getIngredients');
        cy.wait('@getIngredients');

        cy.intercept('POST', '*/auth/login', {
            fixture: 'login.json'
        }).as('login');
        cy.intercept('POST', '*/orders', {
            fixture: 'orders.json'
        });

    });

    it('перетаскивание ингредиента', function () {
        cy.get('[class^=ingredient-card_card__]').first().as('ingredient');
        cy.get('[class^=burger-constructor_burgerConstructor__]').first().as('constructor');


        cy.get('@ingredient').trigger('dragstart');
        cy.get('@constructor')
            .trigger('dragenter')
            .trigger('dragover')
            .trigger('drop')
            .trigger('dragend');

        cy.get('button').contains('Оформить заказ').click();
        cy.url().should('contain', 'login');
        cy.get('input[type=email]').type('vitaly@space.ru');
        cy.get('input[type=password]').type('123456');
        cy.get('button').contains('Войти').click();
        cy.get('button').contains('Оформить заказ').click();
        cy.get('[class^=modal_modal__]').first().should('contain', 5942);
    });



}); 